import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withRouter } from '../../tests/utils';
import Channel from '../channel/channel';
import VideoDetail from '../videoDetail/videoDetail';
import { fakeVideo } from '../../tests/videos';

jest.mock('../../components/channel/channel');

describe('VideoDetail', () => {
  afterEach(() => {
    Channel.mockReset();
  });

  it('renders video item details', () => {
    render(
      withRouter(<Route path='/' element={<VideoDetail />} />, {
        pathname: '/',
        state: { video: fakeVideo },
        key: 'fake-key',
      })
    );
    const { title, channelId, channelTitle } = fakeVideo.snippet;
    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(Channel.mock.calls[0][0]).toStrictEqual({ channelId, channelTitle });
  });
});
