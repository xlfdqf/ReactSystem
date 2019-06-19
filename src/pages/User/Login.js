import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Checkbox, Alert, Icon} from 'antd';
import Login from '@/components/Login';
import {routerRedux} from 'dva/router';
import styles from './Login.less';
import { reloadAuthorized } from '@/utils/Authorized';
const {
    Tab,
    UserName,
    Password,
    Mobile,
    ImageCaptcha,
    Submit,
} = Login;
@connect(({login, loading}) => ({login, submitting: loading.effects['login/login']}))
export default class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true,
        isRembPwd: true,
    };

    onTabChange = type => {
        this.setState({type});
    };

    handleSubmit = (err, values) => {
        const {type, isRembPwd} = this.state;
        const {dispatch} = this.props;

        if (!err) {
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    validKey: this.vaidCode.state.guidKey,
                    isRembPwd: isRembPwd
                        ? 1
                        : 0,
                    type,
                },
                refImageCode: () => {
                    try {
                        this.vaidCode && this
                            .vaidCoe
                            .onImageCode();
                    } catch (err) {
                        this
                            .vaidCode
                            .onImageCode();
                    }

                },
            });
        }
    };

    changeAutoLogin = e => {
        this.setState({autoLogin: e.target.checked});
    };

    changeRembPwd = e => {
        this.setState({isRembPwd: e.target.checked});
    };

    renderMessage = content => {
        return (
          <Alert
  style={{
            marginBottom: 24,
        }}
  message={content}
  type="error"
  showIcon 
/>
);
    };

    render() {
        const {login, submitting} = this.props;
        const {type, isRembPwd} = this.state;
        return (
          <div className={styles.main}>

            <Login
                defaultActiveKey={type}
                onTabChange={this.onTabChange}
                onSubmit={this.handleSubmit}
              >

                <UserName name="userName" placeholder="" />
                <Password name="password" placeholder="" />
                <ImageCaptcha
                    name="validCode"
                    ref={v => {
                        this.vaidCode = v
                    }}
                  />
                <div>
                    <Checkbox checked={isRembPwd} onChange={this.changeRembPwd}>
                            记住密码
                      </Checkbox>
                   
                  </div>
                <Submit loading={submitting}>登录</Submit>
              
              </Login>
            
          </div>

        );
    }
}
