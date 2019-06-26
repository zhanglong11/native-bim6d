import React, {Component} from 'react';
import {View, Text, StyleSheet,BackHandler,Image, TouchableOpacity, ScrollView} from 'react-native';
import {Grid, Carousel, Button, Icon, Modal, Radio, Toast} from '@ant-design/react-native';
import {post} from "../config/fetch";
import {http, SYSTEM_URL} from "../config/http";

const RadioItem = Radio.RadioItem;

const data = [
    {
        icon: require('../image/quality.png'),
        text: '质量问题',
    },
    {
        icon: require('../image/safe.png'),
        text: '安全问题',
    },
    {
        icon: require('../image/progress.png'),
        text: '进度',
    },
    {
        icon: require('../image/log.png'),
        text: '施工日志',
    },
    {
        icon: require('../image/photo.png'),
        text: '相册',
    },
    {
        icon: require('../image/location.png'),
        text: '定点巡视',
    }
]

const imageData = [
    {
        icon: require('../image/backO.png'),
    },
    {
        icon: require('../image/backT.jpg'),
    },
    {
        icon: require('../image/backTh.jpg'),
    }
]

const iconColor = '#1890ff'

const modelId = '1'

export default class Home extends Component {
    static navigationOptions = () => {
        return {
            header: () => null, // 隐藏头部
        }
    }


    state = {
        projectName: '',
        projectList: [],
        showModal: true,
        projectId: ''
    }


    componentDidMount = () => {
        this.getData();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }

    componentWillMount() {
        this.backHandler && this.backHandler.remove();
    }

    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            Toast.info("再按一次退出");
            return true;
        }
    }

    getData = () => {
        post(`${http}${SYSTEM_URL}/basic/project/list`, {}).then(data => {
            if (data.code != 200)
                return;
            this.setState({projectList: data.data});
        })
    }

    renderProjectList = () => {
        const {projectList} = this.state;
        if (projectList.records) {
            return projectList.records.map(p => (<RadioItem
                checked={this.state.projectId === p.id}
                key={p.id}
                onChange={event => {
                    if (event.target.checked) {
                        global.projectId = p.id;
                        this.setState({projectId: p.id, projectName: p.name});
                    }
                }}
            >
                {p.name}
            </RadioItem>))
        }
    }

    pressMenu = (item, i) => {
        const {navigate} = this.props.navigation;
        switch (i) {
            case 0:
                navigate('QualityList');
                return;
            case 1:
                navigate('SafeList');
                return;
            case 2:
                navigate('ProgressList');
                return;
            case 3:
                navigate('RoadList');
                return;
            case 4:
                navigate('PhotoList');
                return;
            case 5:
                navigate('PollingList');
                return;
            default:
                return;
        }
    }
    pressHome = () => {
        //alert('首页')
    }

    changeProject = () => {
        this.setState({showModal: true});
    }

    pressUser = () => {
        //this.props.navigation.navigate('Mine');
    }
    pressCode = () => {
        this.props.navigation.navigate('QRCode');
    }

    saveProject = () => {
        const {projectId} = this.state;
        if (!projectId) {
            Toast.info('请选择项目');
            return;
        }
        this.setState({showModal: false})
        global.projectId = this.state.projectId;
        global.modelId = modelId;
    }

    onClose = () => {

    }

    render() {
        const footerButtons = [
            {
                text: '确定', onPress: () => {
                    this.saveProject()
                }
            }
        ];
        return (<View style={styles.homeWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleName}>{this.state.projectName}</Text>
                <Button type='primary' size='small' onPress={this.changeProject}>切换项目</Button>
            </View>
            <Carousel
                autoplay
                infinite
                autoplayInterval={10000}
            >
                {imageData.map((d, i) => (
                    <View key={i}>
                        <Image
                            style={styles.homeImg}
                            source={d.icon}
                        />
                    </View>)
                )}
            </Carousel>
            <Grid
                data={data}
                columnNum={3}
                onPress={this.pressMenu}
                itemStyle={styles.itemWrapper}
                renderItem={(dataItem, i) => (
                    <View style={styles.contentItem} key={i}>
                        <Image
                            style={styles.itemImg}
                            source={dataItem.icon}
                        />
                        <Text style={styles.menuText}>{dataItem.text}</Text>
                    </View>
                )}
            />
            <View style={styles.navWrapper}>
                <TouchableOpacity onPress={this.pressHome}>
                    <View style={styles.navItem}>
                        <Icon name="home" size="md" color={iconColor}/>
                        <Text>
                            首页
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.pressUser}>
                    <View style={styles.navItem}>
                        <Icon name="user" size="md" color={iconColor}/>
                        <Text>
                            我的
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/*<View style={styles.photoWrapper}>*/}
            {/*<TouchableOpacity onPress={this.pressCode}>*/}
            {/*<View style={styles.photoContent}>*/}
            {/*<Icon name="camera" size='lg' color='#fff'/>*/}
            {/*<Text style={{color: '#fff'}}>*/}
            {/*扫码*/}
            {/*</Text>*/}
            {/*</View>*/}
            {/*</TouchableOpacity>*/}
            {/*</View>*/}

            <Modal
                transparent
                onClose={this.onClose}
                title="选择项目"
                visible={this.state.showModal}
                footer={footerButtons}
            >
                <ScrollView style={{paddingVertical: 12, maxHeight: 200}}>
                    {this.renderProjectList()}
                </ScrollView>
            </Modal>
        </View>)
    }
}

let styles = StyleSheet.create({
    homeWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    titleWrapper: {
        flexDirection: 'row',
        padding: 6
    },
    titleName: {
        maxWidth: 200,
        height: 20,
        overflow: 'hidden',
        flexWrap: 'nowrap',
        fontWeight: '500',
        fontSize: 16,
        marginRight: 6
    },
    homeImg: {
        width: '100%',
        height: 200
    },
    itemWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImg: {
        width: 50,
        height: 50,
        marginBottom: 6,
    },
    menuText: {
        textAlign: 'center'
    },
    navWrapper: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navItem: {
        width: 50,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoWrapper: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
    },
    photoContent: {
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#1890ff',
        borderRadius: 60
    }
})
