import React, {Component} from 'react';
import {Provider} from '@ant-design/react-native';
import {createAppContainer} from 'react-navigation';
import AppNavigator from "./src/router";
import Loading from "./src/views/components/Loading";
import './src/config/storage'

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider>
                <AppContainer/>
                <Loading ref={ref=>{global.loading=ref}}/>
            </Provider>
        );
    }
}

