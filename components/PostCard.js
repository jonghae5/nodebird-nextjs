import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import styled from 'styled-components';
import Link from 'next/link';

import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';

moment.locale('ko');
const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  // const [liked, setLiked] = useState(false);
  const { removePostLoading } = useSelector(state => state.post);
  // const id = useSelector(state => state.user.me && state.user.me.id);
  const id = useSelector(state => state.user.me?.id);
  const liked = post.Likers.find(v => v.id === id);
  const [editMode, setEditMode] = useState(false);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    editText => () => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: editText,
        },
      });
    },
    [post]
  );

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  });
  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: { postId: post.id },
    });
  }, [post]);
  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor='#eb2f96'
              key='heart'
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key='heart' onClick={onLike} />
          ),
          <MessageOutlined key='comment' onClick={onToggleComment} />,
          <Popover
            key='more'
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && (
                      <Button onClick={onClickUpdate}>수정</Button>
                    )}
                    <Button
                      type='danger'
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <span style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD.')}
            </span>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  postData={post.Retweet.content}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                />
              }
            />
          </Card>
        ) : (
          <>
            <span style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD.')}
            </span>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  postData={post.content}
                  editMode={editMode}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
