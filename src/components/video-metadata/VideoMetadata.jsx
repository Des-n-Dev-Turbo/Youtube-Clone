/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import cls from 'classnames';

import ReactShowMoreText from 'react-show-more-text';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';

import {
  getChannelById,
  getChannelSubscribedStatus,
  getVideoChannelData,
  getVideoChannelSubscriptionStatus,
} from '@store/reducers/channelSlice';
import { dislikeVideo, likeVideo } from '@store/reducers/likedVideosSlice';

import './_videoMetadata.scss';

const VideoMetadata = ({ video, videoId }) => {
  const { publishedAt, channelId, title, description, channelTitle } = video.snippet;
  const { viewCount, likeCount } = video.statistics;
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);

  const channelData = useSelector(getVideoChannelData);
  const channelSubscriptionStatus = useSelector(getVideoChannelSubscriptionStatus);

  useEffect(() => {
    dispatch(getChannelById(channelId));
    dispatch(getChannelSubscribedStatus(channelId));
  }, [channelId, dispatch]);

  const handleLike = () => {
    dispatch(likeVideo(videoId));
    setLike(true);
    setDisLike(false);
  };

  const handleDislike = () => {
    dispatch(dislikeVideo(videoId));
    setDisLike(true);
    setLike(false);
  };

  return (
    <div className="video-metadata py-2">
      <div className="video-metadata__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format('0.a')} views • {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className={cls('mar-2', { active: like })} onClick={handleLike}>
              <MdThumbUp size={26} /> {numeral(likeCount).format('0.a')}
            </span>
            <span className={cls({ active: disLike })} onClick={handleDislike}>
              <MdThumbDown size={26} />
            </span>
          </div>
        </div>
      </div>
      <div className="video-metadata__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelData?.snippet?.thumbnails?.default?.url}
            alt={channelTitle}
            className="mar-3 rounded-circle"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>{numeral(channelData?.statistics?.subscriberCount).format('0.a')} Subscribers</span>
          </div>
        </div>
        <button className={cls('btn border-0 p-2 m-2', { 'btn-gray': channelSubscriptionStatus })}>
          {channelSubscriptionStatus ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className="video-metadata__description">
        <ReactShowMoreText lines={3} more="Show more" less="Show less" anchorClass="showMoreText" expanded={false}>
          {description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetadata;
