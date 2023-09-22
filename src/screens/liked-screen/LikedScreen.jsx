import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Container, Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Video from '@components/video/Video';
import { getLikedVideos, getLikedVideosData, getLikedVideosLoading } from '@store/reducers/likedVideosSlice';

const LikedScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  const videosLoading = useSelector(getLikedVideosLoading);
  const videos = useSelector(getLikedVideosData);

  return (
    <Container>
      <Row className="mt-2">
        {!videosLoading && videos
          ? videos.map((video) => (
              <Col md={3} lg={3} key={video?.id}>
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map((_, i) => (
              <Col md={3} lg={3} key={i}>
                <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                  <Skeleton width="100%" height="140px" />
                </SkeletonTheme>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default LikedScreen;
