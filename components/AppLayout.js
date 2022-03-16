import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import styled from 'styled-components';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div>
        <Menu mode='horizontal'>
          <Menu.Item>
            <Link href='/'>
              <a>노드버드</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/profile'>
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <SearchInput
              enterButton
              placeholder='input search text'
              style={{ verticalAlign: 'middle' }}
            />
          </Menu.Item>
          <Menu.Item>
            <Link href='/signup'>
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {isLoggedIn ? (
              <UserProfile setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )}
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
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // 화면에 그릴 수 있는 모든 것이 Node
};

export default AppLayout;
