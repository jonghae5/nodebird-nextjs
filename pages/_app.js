import React from 'react';
import 'antd/dist/antd.css';
import propTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired, // 리액트 props나 객체의 타입을 체크
};

export default wrapper.withRedux(NodeBird);
