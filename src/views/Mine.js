import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
export default class Mine extends Component {

    state = {
        username: 'username',
        password: '123456',
    };

    onLogin=()=>{
        alert('嘿嘿')
    }

    render() {
        return (<View>
            <Text>Mine</Text>
        </View>)
    }
}

let styles=StyleSheet.create({
    homeImg:{
        width:'100%',
        height:200
    }
})
