import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import { withRouter } from '../../tests/utils';
import { fakeVideo as video } from '../../tests/videos';
import { formatAgo } from '../../util/date';
import VideoItem from '../videoItem/videoItem';

describe('VideoItem', () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it('renders grid type correctly', () => {
    const component = renderer.create(withRouter(<Route path='/' element={<VideoItem video={video} />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders list type correctly', () => {
    const component = renderer.create(withRouter(<Route path='/' element={<VideoItem video={video} displayType='list' />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders video items', () => {
    render(withRouter(<Route path='/' element={<VideoItem video={video} />} />));

    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it('navigates to detailed video page with video state when clicked', async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      withRouter(
        <>
          <Route path='/' element={<VideoItem video={video} />} />
          <Route path={`/detail/${video.id}`} element={<LocationStateDisplay />} />
        </>
      )
    );

    const item = screen.getByRole('listitem');
    await waitFor(() => userEvent.click(item));

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
