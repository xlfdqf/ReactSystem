import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Row, Col} from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import map from './map';
/* import {serverConfig} from "configPath/config.js" */
const FormItem = Form.Item;

function generator({defaultProps, defaultRules, type}) {
    return WrappedComponent => {
        return class BasicComponent extends Component {
            static contextTypes = {
                form: PropTypes.object,
                updateActive: PropTypes.func
            };

            constructor(props) {
                super(props);
                this.state = {
                    count: 0,
                    imgSrc: '',
                    guidKey: ''
                };
            }

            componentDidMount() {
                const {updateActive} = this.context;
                const {name} = this.props;
                if (updateActive) {
                    updateActive(name);
                }
                if (type == 'ImageCaptcha') {
                    this.onImageCode();
                }

            }

            componentWillUnmount() {
                clearInterval(this.interval);
            }

            onGetCaptcha = () => {
                let count = 59;
                this.setState({count});
                const {onGetCaptcha} = this.props;
                if (onGetCaptcha) {
                    onGetCaptcha();
                }
                this.interval = setInterval(() => {
                    count -= 1;
                    this.setState({count});
                    if (count === 0) {
                        clearInterval(this.interval);
                    }
                }, 1000);
            };
            guid =()=> {
              
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
            };
            onImageCode =()=> {
                const key = this.guid();
                this.setState({imgSrc: `/validImg/${key}`, guidKey: key})
            };
            getGuidKey() {
                return this.state.guidKey;
            };
            render() {
                const {form} = this.context;
                const {getFieldDecorator} = form;
                const options = {};
                let otherProps = {};
                const {
                    onChange,
                    defaultValue,
                    rules,
                    name,
                    ...restProps
                } = this.props;
                const {count} = this.state;
                options.rules = rules || defaultRules;
                if (onChange) {
                    options.onChange = onChange;
                }
                if (defaultValue) {
                    options.initialValue = defaultValue;
                }
                otherProps = restProps || otherProps;
                if (type === 'Captcha') {
                    const inputProps = omit(otherProps, ['onGetCaptcha']);
                    return (
                        <FormItem>
                            <Row gutter={8}>
                                <Col span={16}>
                                    {getFieldDecorator(name, options)(<WrappedComponent {...defaultProps} {...inputProps}/>)}
                                </Col>
                                <Col span={8}>
                                    <Button
                                        disabled={count}
                                        className={styles.getCaptcha}
                                        size="large"
                                        onClick={this.onGetCaptcha}>
                                        {count
                                            ? `${count} s`
                                            : '获取验证码'}
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    );
                } else if (type == "ImageCaptcha") {
                    const inputProps = omit(otherProps, ['onImageCode']);
                    return (
                        <FormItem>
                            <Row gutter={8}>
                                <Col span={16}>
                                    {getFieldDecorator(name, options)(<WrappedComponent {...defaultProps} {...inputProps}/>)}
                                </Col>
                                <Col span={8}>
                                    <img
                                        src={this.state.imgSrc}
                                        onClick={() => {
                                        this.onImageCode();
                                    }}/>
                                </Col>
                            </Row>
                        </FormItem>
                    )
                }
                return (
                    <FormItem>
                        {getFieldDecorator(name, options)(<WrappedComponent {...defaultProps} {...otherProps}/>)}
                    </FormItem>
                );
            }
        };
    };
}

const LoginItem = {};
Object
    .keys(map)
    .forEach(item => {
        LoginItem[item] = generator({defaultProps: map[item].props, defaultRules: map[item].rules, type: item})(map[item].component);
    });

export default LoginItem;
