import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from '../reducers/user';
import { backUrl, devUrl } from '../config/config';

const fetcher = url =>
  axios.get(url, { withCredentials: true }).then(result => result.data);

const Profile = () => {
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  const { data: followingsData, error: followingError } = useSWR(
    `${
      process.env.NODE_ENV == 'production' ? backUrl : devUrl
    }/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  const { data: followersData, error: followerError } = useSWR(
    `${
      process.env.NODE_ENV == 'production' ? backUrl : devUrl
    }/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit(prev => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit(prev => prev + 3);
  }, []);

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return '팔로잉/팔로워 로딩 중 에러가 발생했습니다.';
  }

  if (!me) {
    return '내 정보 로딩중...';
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header='팔로잉'
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingError && !followingsData}
        />
        <FollowList
          header='팔로워'
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followerError && !followersData}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Profile;
