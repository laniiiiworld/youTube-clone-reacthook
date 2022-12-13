import '@testing-library/jest-dom';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import { fakeRelatedVideos, fakeSearchVideos, fakeVideos } from '../../tests/videos';
import VideoList from '../videoList/videoList';

describe('VideoList', () => {
  const fackYouTube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fackYouTube.search.mockImplementation((keyword, videoId) => {
      if (videoId) return fakeRelatedVideos;
      return keyword ? fakeSearchVideos : fakeVideos;
    });
  });

  afterEach(() => {
    fackYouTube.search.mockReset();
  });

  it('renders correctly', async () => {
    const { asFragment } = renderWithPath('/');
    await waitForElementToBeRemoved(() => screen.getByTitle('loading'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all videos when keyword is not specified', async () => {
    renderWithPath('/');
    expect(fackYouTube.search).toHaveBeenCalledWith(undefined, undefined);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length));
  });

  it('when keyword is specified, renders search results', async () => {
    const searchKeyword = 'fake-keyword';
    renderWithPath(`/search/${searchKeyword}`);

    expect(fackYouTube.search).toHaveBeenCalledWith(searchKeyword, undefined);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(fakeSearchVideos.length));
  });

  it('renders related videos correctly', async () => {
    const relatedVideoId = 'related-video-id';
    renderWithPath(`/detail/${relatedVideoId}`);

    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(fakeRelatedVideos.length));
  });

  it('renders loading state when items are being fetched', () => {
    renderWithPath('/');

    expect(screen.getByTitle('loading')).toBeInTheDocument();
  });

  it('renders error state when fetching items fails', async () => {
    fackYouTube.search.mockImplementation(async () => {
      throw new Error('error');
    });
    renderWithPath('/');

    await waitFor(() => expect(screen.getByText(/Error/i)).toBeInTheDocument());
  });

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          //
          <>
            <Route path='/' element={<VideoList />} />
            <Route path='/search/:keyword' element={<VideoList />} />
            <Route path='/detail/:videoId' element={<VideoList videoId='videoId' />} />
          </>,
          path
        ),
        fackYouTube
      )
    );
  }
});
