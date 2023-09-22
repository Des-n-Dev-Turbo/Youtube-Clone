/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Col, Row } from 'react-bootstrap';

import VideoMetadata from '@components/video-metadata/VideoMetadata';
import Comments from '@components/comments/Comments';

import { getSelectedVideo, getSelectedVideoLoading, getVideoById } from '@store/reducers/selectedVideoSlice';

import './_watchScreen.scss';

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const video = useSelector(getSelectedVideo);
  const loading = useSelector(getSelectedVideoLoading);

  useEffect(() => {
    dispatch(getVideoById(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Col lg={8}>
        <div className="watch-screen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title="My Video"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading && video ? <VideoMetadata video={video} videoId={id} /> : <h6>Loading</h6>}
        {!loading && video ? (
          <Comments videoId={id} totalComments={video?.statistics?.commentCount} />
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
