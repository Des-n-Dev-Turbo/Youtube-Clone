/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Col, Container, Row } from 'react-bootstrap';
import numeral from 'numeral';
import cls from 'classnames';

import Video from '@components/video/Video';

import {
  getChannelById,
  getChannelSubscribedStatus,
  getVideoChannelData,
  getVideoChannelLoading,
  getVideoChannelSubscriptionStatus,
} from '@store/reducers/channelSlice';
import {
  getChannelVideosData,
  getChannelVideosLoading,
  getVideosByChannelId,
} from '@store/reducers/channelVideosSlice';

import './_channelScreen.scss';

const ChannelScreen = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannelId(channelId));
    dispatch(getChannelById(channelId));
    dispatch(getChannelSubscribedStatus(channelId));
  }, [channelId, dispatch]);

  const videosLoading = useSelector(getChannelVideosLoading);
  const videos = useSelector(getChannelVideosData);

  const loading = useSelector(getVideoChannelLoading);
  const channel = useSelector(getVideoChannelData);
  const channelSubscriptionStatus = useSelector(getVideoChannelSubscriptionStatus);

  return (
    <>
      {!loading && channel && (
        <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader__left">
          <div className="d-flex align-items-center">
            <img src={channel?.snippet?.thumbnails?.default?.url} alt="" />

            <div className="mal-3 channelHeader__details">
              <h3>{channel?.snippet?.title}</h3>
              <span>{numeral(channel?.statistics?.subscriberCount).format('0.a')} subscribers</span>
            </div>
          </div>

          <button className={cls('btn border-0 p-2 m-2 button', { 'btn-gray': channelSubscriptionStatus })}>
            {channelSubscriptionStatus ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      )}
      <Container>
        <Row className="mt-2">
          {!videosLoading && videos
            ? videos.map((video) => (
                <Col md={3} lg={3} key={video?.id}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map((_, i) => (
                <Col md={3} lg={3} key={i}>
                  <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
