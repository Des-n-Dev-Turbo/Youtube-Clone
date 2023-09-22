/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import VideoHorizontal from '@components/video-horizontal/VideoHorizontal';

import {
  getSubscribedChannels,
  getSubscriptionChannelLoading,
  getSubscriptionChannelVideos,
} from '@store/reducers/subscriptionChannelSlice';

import './_subscriptionsscreen.scss';

const SubscriptionsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  const loading = useSelector(getSubscriptionChannelLoading);
  const videos = useSelector(getSubscriptionChannelVideos);

  return (
    <Container fluid>
      {!loading && videos ? (
        videos?.map((video) => <VideoHorizontal video={video} key={video.id} subScreen />)
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
