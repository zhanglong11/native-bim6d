import React from 'react';
import { createStackNavigator} from 'react-navigation';
import Login from '../views/Login';
import Home from '../views/Home';
import Mine from '../views/Mine';
import QRCode from '../views/components/QRCode';
import ImageShow from '../views/components/ImageShow';
import QualityList from '../views/quality/QualityList';
import QualityAdd from '../views/quality/QualityAdd';
import SafeList from '../views/safe/SafeList';
import SafeDetail from '../views/safe/SafeDetail';
import SafeAdd from '../views/safe/SafeAdd';
import ProgressList from '../views/progress/ProgressList';
import RoadList from '../views/road/RoadList';
import PhotoList from '../views/photo/PhotoList';
import PollingList from '../views/polling/PollingList';
import QualityDetail from '../views/quality/QualityDetail';
import DealTaskList from '../views/progress/DealTaskList';
import DetailTask from '../views/progress/DetailTask';
import ProgressTabDetail from '../views/progress/ProgressTabDetail'

const headerStyle={
    flex:1,
    textAlign: 'center',
    marginRight:60
}

const getToken=()=>{
    console.log(global.storage)
}

getToken();

const AppNavigator = createStackNavigator({
    //登录
    Login:{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    //首页
    Home: {
        screen: Home,
        navigationOptions:{
            header:null
        }
    },
    //我的
    Mine: {
        screen: Mine,
        navigationOptions:{
            title:'我的',
            headerTitleStyle:headerStyle
        }
    },
    //质量
    QualityList: {
        screen: QualityList,
        navigationOptions:{
            title:'质量问题',
            headerTitleStyle:headerStyle
        }
    },
    //添加质量
    QualityAdd: {
        screen: QualityAdd,
        navigationOptions:{
            title:'添加质量',
            headerTitleStyle:headerStyle
        }
    },
    //质量详情
    QualityDetail: {
        screen: QualityDetail
    },
    //安全
    SafeList: {
        screen: SafeList,
        navigationOptions:{
            title:'安全问题',
            headerTitleStyle:headerStyle
        }
    },
    //添加安全
    SafeAdd: {
        screen: SafeAdd,
        navigationOptions:{
            title:'添加安全',
            headerTitleStyle:headerStyle
        }
    },
    //安全详情
    SafeDetail: {
        screen: SafeDetail
    },
    //进度列表
    ProgressList: {
        screen: ProgressList,
        navigationOptions:{
            title:'工程进度',
            headerTitleStyle:headerStyle
        }
    },
    //进度列表
    DealTaskList: {
        screen: DealTaskList,
        navigationOptions:{
            title:'工程进度',
            headerTitleStyle:headerStyle
        }
    },
    //进度详情
    DetailTask: {
        screen: DetailTask
    },
    //启动报表详情
    ProgressTabDetail: {
        screen: ProgressTabDetail
    },
    //施工日志
    RoadList: {
        screen: RoadList,
        navigationOptions:{
            title:'施工日志',
            headerTitleStyle:headerStyle
        }
    },
    //相册
    PhotoList: {
        screen: PhotoList,
        navigationOptions:{
            title:'相册',
            headerTitleStyle:headerStyle
        }
    },
    //定点巡视
    PollingList: {
        screen: PollingList,
        navigationOptions:{
            title:'定点巡视',
            headerTitleStyle:headerStyle
        }
    },
    //图片查看
    ImageShow: {
        screen: ImageShow,
        navigationOptions:{
            header:null
        }
    },
    //扫码
    QRCode: {
        screen: QRCode,
        navigationOptions:{
            title:'扫码',
            headerTitleStyle:headerStyle
        }
    }

});
export default AppNavigator;
