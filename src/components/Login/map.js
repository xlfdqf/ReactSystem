import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
      {
        pattern: /^[a-zA-Z0-9_-]{4,16}$/,
        message:"请输入由4到16位数字母格式的用户名!",
      }
    ],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
    },
    rules: [
      {
        required: true,
        message: '请输入密码!',
      },
      {
        pattern: /^[a-zA-Z0-9]{6,16}$/,
        message:"请输入由6到16位数字母格式的密码!",
      },
    ],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: '请输入手机号码!',
      },
      {
        pattern: /^1\d{10}$/,
        message: '请输入正确的手机号码!',
      },
    ],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      },
    ],
  },
  ImageCaptcha:{
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: '',
    },
    rules: [
      {
        required: true,
        message: '请输入验证码!',
      },
    ],
  }
};

export default map;
