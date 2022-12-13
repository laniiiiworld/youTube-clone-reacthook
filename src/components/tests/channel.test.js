import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { fakeChannel } from '../../tests/channel';
import { withAllContexts, withRouter } from '../../tests/utils';
import Channel from '../channel/channel';

describe('Channel component', () => {
  const fackYouTube = {
    videoChannel: jest.fn(),
  };

  afterEach(() => {
    fackYouTube.videoChannel.mockReset();
  });

  it('renders correctly', async () => {
    fackYouTube.videoChannel.mockImplementation(() => fakeChannel);
    const { asFragment } = renderChannelInfo();
    await waitFor(() => screen.getByRole('img'));
    await waitFor(() => screen.getByText('channel title'));
    expect(asFragment).toMatchSnapshot();
  });

  it('renders without URL', () => {
    fackYouTube.videoChannel.mockImplementation(() => {
      throw new Error('error');
    });
    renderChannelInfo();

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders with URL', async () => {
    fackYouTube.videoChannel.mockImplementation(() => fakeChannel);
    renderChannelInfo();

    await screen.findByRole('img');
  });

  function renderChannelInfo() {
    return render(
      withAllContexts(
        withRouter(
          //
          <Route path='/' element={<Channel channelId='channelId' channelTitle='channel title' />} />
        ),
        fackYouTube
      )
    );
  }
});
