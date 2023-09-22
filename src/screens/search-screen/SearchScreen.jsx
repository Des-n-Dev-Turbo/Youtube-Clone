/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Container } from 'react-bootstrap';

import VideoHorizontal from '@components/video-horizontal/VideoHorizontal';

import {
  getSearchedVideos,
  getSearchedVideosData,
  getSearchedVideosLoading,
} from '@store/reducers/searchedVideosSlice';

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchedVideos(query));
  }, [dispatch, query]);

  const searchedVideos = useSelector(getSearchedVideosData);
  const loading = useSelector(getSearchedVideosLoading);

  return (
    <Container>
      {!loading && searchedVideos ? (
        searchedVideos?.map((video) => (
          <VideoHorizontal key={video.id.videoId || video.id.channelId || video.id} video={video} />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
