import React,{ Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Icon, Checkbox  } from 'antd'
import styles from './Login.less';
import loginLogo from './login.png'

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inup:false
        }
    }

    //登录
    loginGo = (e) => {
        e.preventDefault();
        this.props.form.validateFields( (err,values) => {
            console.log(values);
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.form}>
                <div className={styles.logo}>
                    <img src={loginLogo} />
                    <span>不登进来看看?</span>
                </div>
                <Form>
                    <FormItem>
                        {
                           getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input onPressEnter={this.loginGo} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                           getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input onPressEnter={this.loginGo} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="password" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                    {
                        getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )
                    }
                    <a className={styles.forgot} href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" onClick={this.loginGo}>
                        登录
                    </Button>
                    没有账号？ <a>滚蛋</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Form.create()(Login));