import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
      padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);

  return (
    <>
      <Global />
      <div>
        <Menu mode='horizontal'>
          <Menu.Item key='home'>
            <Link href='/'>
              <a>노드버드</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='profile'>
            <Link href='/profile'>
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='mail'>
            <SearchInput
              enterButton
              placeholder='input search text'
              style={{ verticalAlign: 'middle' }}
            />
          </Menu.Item>
          <Menu.Item key='signup'>
            <Link href='/signup'>
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href='https://jonghae5.github.io/'
              target='_blank'
              rel='noreferrer noopener'
            >
              Made by John
            </a>
          </Col>
        </Row>
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // 화면에 그릴 수 있는 모든 것이 Node
};

export default AppLayout;
