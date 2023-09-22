/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiFillEye } from 'react-icons/ai';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import request from '@axios/api';

import './_video.scss';

const Video = ({ video, channelScreen }) => {
  const {
    id,
    snippet: { channelId, channelTitle, publishedAt, thumbnails, title },
    contentDetails,
  } = video;

  const navigate = useNavigate();

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    (async () => {
      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    })();
  }, [_videoId]);

  useEffect(() => {
    (async () => {
      const {
        data: { items },
      } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      });

      setChannelIcon(items[0].snippet.thumbnails.high);
    })();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <LazyLoadImage src={thumbnails?.high?.url} alt={title} />
        <span className="video__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format('0.a')} views • {moment(publishedAt).fromNow()}
        </span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          <LazyLoadImage src={channelIcon?.url} alt={channelTitle} />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
