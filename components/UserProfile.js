import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Link from 'next/link';
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector(state => state.user);
  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          <Link href={`/user/${me.id}`} prefetch={false}>
            <a>
              트윗
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key='followings'>
          <Link href='/profile' prefetch={false}>
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key='followings'>
          <Link href='/profile' prefetch={false}>
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
