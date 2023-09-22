/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Container, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import CategoriesBar from '@components/categories-bar/CategoriesBar';
import Video from '@components/video/Video';
import SkeletonVideo from '@components/skeletons/SkeletonVideo';

import {
  getPopularVideos,
  getVideos,
  getVideosActiveCategory,
  getVideosByCategory,
  getVideosLoading,
  getVideosNextPageToken,
} from '@store/reducers/videoSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const videos = useSelector(getVideos);
  const activeCategory = useSelector(getVideosActiveCategory);
  const loading = useSelector(getVideosLoading);
  const nextPageToken = useSelector(getVideosNextPageToken);

  const fetchData = () => {
    if (activeCategory === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <CategoriesBar />

      <InfiniteScroll
        dataLength={videos?.length}
        next={fetchData}
        hasMore={true}
        loader={<div className="spinner-border text-danger d-block mx-auto"></div>}
        className="row"
      >
        {!loading
          ? videos?.map((video) => {
              return (
                <Col key={video?.id?.videoId || video?.id} lg={4} md={6}>
                  <Video video={video} />
                </Col>
              );
            })
          : [...Array(20)].map((_, i) => {
              return (
                <Col key={i} lg={4} md={6}>
                  <SkeletonVideo />
                </Col>
              );
            })}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
