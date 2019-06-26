import React, {Component} from 'react';
import {View, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {InputItem, Button, Checkbox, Toast} from '@ant-design/react-native';
import {post} from "../config/fetch";
import {http, SYSTEM_URL} from "../config/http";
import loadingUtils from '../utils/loadingUtils'

const AgreeItem = Checkbox.AgreeItem;

export default class Login extends Component {
    state = {
        username: 'admin',
        password: '123456',
        autoLogin:false
    };

    componentWillMount(){
        global.storage.load({
            key:'login'
        }).then(ret=>{
            if(ret.token){
                global.token=ret.token;
                this.props.navigation.navigate('Home');
            }
        })
    }

    onLogin = () => {
        loadingUtils.showLoading();
        const {username, password,autoLogin} = this.state;
        if (!username) {
            Toast.info('请输入用户名')
            return;
        }
        if (!password) {
            Toast.info('请输入密码')
            return;
        }
        fetch(`${http}${SYSTEM_URL}/login/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
            .then(data => data.json())
            .then(data => {
                if (data.code !== 200) {
                    Toast.fail(data.message);
                    return;
                }
                Toast.success(data.message);
                if(autoLogin){
                    global.storage.save({
                        key:'login',
                        data:{
                            token:data.data
                        }
                    })
                }
                global.token = data.data || '';
                loadingUtils.dismissLoading();
                this.props.navigation.navigate('Home');
            });
    }

    render() {
        const logo = require('../image/submitLogo.png');
        return (<View>
            <KeyboardAvoidingView
                behavior='height'
                enabled>
                <View>
                    <Image
                        style={styles.homeImg}
                        source={logo}
                    />
                </View>
                <View>
                    <InputItem
                        clear
                        value={this.state.username}
                        onChange={value => {
                            this.setState({username: value})
                        }}
                        placeholder="请输入用户名"
                    >
                        用户名:
                    </InputItem>
                    <InputItem
                        clear
                        type='password'
                        value={this.state.password}
                        onChange={value => {
                            this.setState({password: value})
                        }}
                        placeholder="请输入密码"
                    >
                        密码:
                    </InputItem>
                    <AgreeItem
                        checked={this.state.autoLogin}
                        onChange={e => {
                            this.setState({autoLogin: e.target.checked})
                        }}
                    >
                        7天内自动登录</AgreeItem>
                    <View style={styles.btnWrapper}>
                        <Button
                            styles={styles.loginBtn}
                            type='primary'
                            onPress={this.onLogin}
                        >登录</Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>)
    }
}

let styles = StyleSheet.create({
    homeImg: {
        width: '100%',
        height: 200
    },
    btnWrapper: {
        marginTop: 50,
        paddingLeft: 50,
        paddingRight: 50
    },
    loginBtn: {
        width: '80%'
    }
})
