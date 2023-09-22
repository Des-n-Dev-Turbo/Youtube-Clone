/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import request from '@axios/api';

import moment from 'moment';
import numeral from 'numeral';
import cls from 'classnames';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Col, Row } from 'react-bootstrap';
import { AiFillEye } from 'react-icons/ai';

import './_videoHorizontal.scss';

const VideoHorizontal = ({ video, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      resourceId,
      thumbnails: { high },
    },
  } = video;

  const navigate = useNavigate();

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const isVideo = !(id.kind === 'youtube#channel' || subScreen);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo ? navigate(`/watch/${id.videoId}`) : navigate(`/channel/${_channelId}`);
  };

  return (
    <Row className="video-horizontal m-1 py-2 align-items-center" onClick={handleClick}>
      <Col xs={12} md={4} className="video-horizontal__left">
        <LazyLoadImage
          src={high.url}
          alt={title}
          effect="blur"
          className={cls('video-horizontal__thumbnail', { 'video-horizontal__thumbnail-channel': !isVideo })}
          wrapperClassName="video-horizontal__thumbnail-wrapper"
        />
        {isVideo && <span className="video-horizontal__duration">{_duration}</span>}
      </Col>
      <Col xs={12} md={8} className="video-horizontal__right p-0">
        <p className="video-horizontal__title mb-1">{title}</p>
        {isVideo && (
          <div className="video-horizontal__details">
            <AiFillEye /> {numeral(views).format('0.a')} views • {moment(publishedAt).fromNow()}
          </div>
        )}
        <p className={cls('mt-1', { 'video-horizontal__desc': subScreen })}>{description}</p>
        <div className="video-horizontal__channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} alt={channelTitle} effect="blur" />}
          <p>{channelTitle}</p>
        </div>
        {subScreen && <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
