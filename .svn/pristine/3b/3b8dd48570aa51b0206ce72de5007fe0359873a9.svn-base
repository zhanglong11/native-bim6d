import React, {Component} from 'react';
import {View, ActivityIndicator,StyleSheet} from 'react-native';

export default class Loading extends Component {
    state={
        loading:false
    }

    showLoading=()=>{
        this.setState({loading:true})
    }

    dismissLoading=()=>{
        this.setState({loading:false})
    }

    render() {
        if(!this.state.loading)
            return null;
        return (<View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="#1890ff"/>
        </View>)
    }
}

let styles=StyleSheet.create({
    loadingWrapper:{
        flex:1,
        backgroundColor:'#eee',
        position:'absolute',
        top:0,
        width:'100%',
        height:'100%',
        justifyContent:'center'
    }
})
