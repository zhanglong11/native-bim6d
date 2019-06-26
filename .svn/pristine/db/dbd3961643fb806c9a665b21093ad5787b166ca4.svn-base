import React, {Component} from 'react';
import { withNavigationFocus } from 'react-navigation';
import {View, Image, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, WhiteSpace, WingBlank, Drawer, Icon, Modal, Toast} from '@ant-design/react-native';
import DrawerList from './DrawerList'
import SafeAdd from './SafeAdd'
import {post} from "../../config/fetch";
import {mobileHttp, APP_URL, http, BIM_URL} from "../../config/http";
import loadingUtils from '../../utils/loadingUtils'

const statusAry = [
    {text: '新建', color: '#e659a2'},
    {text: '处理中', color: '#fbde00'},
    {text: '已关闭', color: '#74cc97'}
]

const defaultImage = require('../../image/sourceImg.png');
 class SafeList extends Component {
    state = {
        projectId: global.projectId,
        modelId: modelId,
        queryData: {
            projectId: global.projectId,
            modelId: global.modelId
        },
        floorData: [],
        total: 0,
        qualityList: []
    }

    componentDidMount() {
        this.getData();
        this.getFloorData();
    }

    getData = () => {
        loadingUtils.showLoading();
        const {queryData} = this.state;
        post(`${mobileHttp}${APP_URL}/check/safety/app/issue/list`, queryData).then(data => {
            console.log(data.data)
            if (data.code != 200)
                return;
            loadingUtils.dismissLoading();
            this.setState({qualityList: data.data, total: data.data.records.length});
        })
    }

   componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.isFocused){
            this.getData();
        }
   }

    getFloorData = () => {
        const {projectId} = this.state;
        post(`${http}${BIM_URL}/bim/bimFileSpace/${projectId}/getBuildTree`, {}).then(data => {
            console.log(data.data)
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            this.setState({floorData: data.data})
        })
    }

    goBack=()=>{
        alert('哈哈，老子返回刷新了这个页面')
    }

    pressItem = item => {
        this.props.navigation.navigate('SafeDetail', {name: item.remark, id: item.id,onGoBack: () => this.goBack()});
    }

    addQues = () => {
        this.props.navigation.navigate('SafeAdd');
    }

    onOpenChange = isOpen => {

    }

    getQuery = (data) => {
        this.setState(state => ({
            queryData: {...state.queryData, ...data}
        }), () => {
            console.log(this.state.queryData)
            this.getData()
        })
        this.drawer && this.drawer.closeDrawer()
    }


    renderStatus = (status) => {
        let statusBadgeStyle = styles.statusBadge;
        let statusBadgeColor = {
            ...statusBadgeStyle, ...{
                backgroundColor: statusAry[status].color
            }
        }
        return (<View style={styles.statusWrapper}>
            <Text style={styles.statusFont}>{statusAry[status].text}</Text>
            <Text style={statusBadgeColor}></Text>
        </View>)
    }

    renderImage = (d) => {
        if (d.firstFileId)
            return <Image
                style={styles.homeImg}
                source={{uri: d.firstFileId}}
            />
        else
            return <Image
                style={styles.homeImg}
                source={defaultImage}
            />
    }

    renderList = () => {
        const {qualityList} = this.state;
        if (qualityList.records)
            return qualityList.records.map((d, i) => (
                <TouchableOpacity onPress={() => {
                    this.pressItem(d)
                }} key={i}>
                    <Card>
                        <Card.Body>
                            <View style={styles.cardBody}>
                                {this.renderImage(d)}
                                <View style={styles.cardInfo}>
                                    <View style={styles.cardTitle}>
                                        <Text>{d.creator}</Text>
                                        {this.renderStatus(d.status)}
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text>{d.remark}</Text>
                                    </View>
                                    <View style={styles.cardFooter}>
                                        <Text>{d.createTime}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="md"/>
                </TouchableOpacity>
            ))
    }


    render() {
        const {total} = this.state;
        const sidebar = (
            <ScrollView>
                <DrawerList onQuery={this.getQuery} floorData={this.state.floorData}/>
            </ScrollView>
        );

        return (
            <Drawer
                sidebar={sidebar}
                position="right"
                open={false}
                drawerRef={el => (this.drawer = el)}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="#fff"
                style={styles.wrapper}
            >
                <View style={styles.listTitle}>
                    <Text>共计{total}个</Text>
                    <TouchableOpacity onPress={() => this.drawer && this.drawer.openDrawer()}>
                        <Icon name="filter" size="md"/>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <WingBlank size="md">
                        {this.renderList()}
                    </WingBlank>
                </ScrollView>

                <View style={styles.addButton}>
                    <TouchableOpacity onPress={this.addQues}>
                        <Text style={styles.addBtn}>新建问题</Text>
                    </TouchableOpacity>
                </View>

            </Drawer>
        );
    }
}

export default withNavigationFocus(SafeList)

const styles = StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    cardBody: {
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    },
    listTitle: {
        padding: 6,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    homeImg: {
        width: 70,
        height: 70,
        marginLeft:6
    },
    cardInfo: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statusWrapper: {
        flexDirection: 'row',
        marginRight: 6,
    },
    statusFont: {
        color: '#ccc'
    },
    cardContent: {
        color: '#ccc'
    },
    statusBadge: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginLeft: 6,
        marginTop: 6
    },
    cardFooter: {
        paddingRight: 6,
        alignItems: 'flex-end',
    },
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 80,
        backgroundColor: '#1890ff',
    },
    addBtn: {
        color: '#fff'
    }
})
