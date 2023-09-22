/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '@components/comment/Comment';

import {
  addComment,
  getCommentsByVideoId,
  getVideoComments,
  getVideoCommentsLoading,
} from '@store/reducers/commentsSlice';

import { getUser } from '@store/reducers/authSlice';

import './_comments.scss';

const Comments = ({ videoId, totalComments }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(getCommentsByVideoId(videoId));
  }, [dispatch, videoId]);

  const loading = useSelector(getVideoCommentsLoading);
  const comments = useSelector(getVideoComments);

  const _comments = comments?.map((comment) => ({
    ...comment.snippet.topLevelComment.snippet,
    id: comment.snippet.topLevelComment.id,
  }));

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim().length) return;

    dispatch(addComment({ id: videoId, text: commentText }));
    setCommentText('');
  };

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img src={user.photoURL} alt={user.displayName} className="rounded-circle mar-3" />
        <form onSubmit={handleSubmitComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {!loading && _comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default Comments;
