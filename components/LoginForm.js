import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

/* CSS 적듯이 표현 */

// const ButtonWrapper = styled.div`
//   margintop: 10px;
// `;

// const FormWrapper = styled(Form)`
//   padding: 10px;
// `;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // const style = useMemo(() => {
  //   marginTop: 10;
  // }, []);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password,
      },
    });
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor='user-email'>이메일</label>
        <br />
        <Input
          name='user-email'
          value={email}
          type='email'
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor='user-password'>비밀번호</label>
        <br />
        <Input
          name='user-password'
          value={password}
          onChange={onChangePassword}
          type='password'
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type='primary' htmlType='submit' loading={logInLoading}>
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
