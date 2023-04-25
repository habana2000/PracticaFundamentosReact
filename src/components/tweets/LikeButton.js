import React from 'react';
import classNames from 'classnames';

import { ReactComponent as IconNotLiked } from '../../assets/like.svg';
import { ReactComponent as IconLiked } from '../../assets/like-filled.svg';
import './LikeButton.css';

const LikeButton = ({ likes, isLike, onLike }) => {
  const Icon = isLike ? IconLiked : IconNotLiked;

  return (
    <div
      className={classNames('likeButton', {
        'likeButton--active': isLike,
      })}
      onClick={event => {
        event.preventDefault();
        onLike(event);
      }}
    >
      <span className="likeButton-icon">
        <Icon width="20" height="20" />
      </span>
      <span className="likeButton-label">{likes}</span>
    </div>
  );
};

export default LikeButton;
