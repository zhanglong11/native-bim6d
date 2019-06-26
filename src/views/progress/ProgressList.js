import React, {Component} from 'react';
import {View, Image, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Tabs, Drawer} from '@ant-design/react-native';
import DealTaskList from './DealTaskList';
import MyTaskList from './MyTaskList';
import AllTaskList from "./AllTaskList";
import DealDrawer from "./DealDrawer";
import MyDrawer from "./MyDrawer";
import AllDrawer from "./AllDrawer";

const statusAry = [
    {text: '新建', color: '#e659a2'},
    {text: '处理中', color: '#fbde00'},
    {text: '已关闭', color: '#74cc97'}
]
export default class ProgressList extends Component {

    state = {
        total: 0,
        tabIndex: 0,
        queryData: {}
    }

    openDrawer = () => {
        this.drawer && this.drawer.openDrawer()
    }

    getQuery = (queryData) => {
        this.drawer && this.drawer.closeDrawer()
        const {tabIndex} = this.state;
        switch (tabIndex) {
            case 0:
                if (this.dealList)
                    this.dealList.getData(queryData);
                return;
            case 1:
                if (this.myList)
                    this.myList.getData(queryData);
                return;
            case 2:
                if (this.allList)
                    this.allList.getData(queryData);
                return;
            default:
                break;
        }
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

    renderSidebar = () => {
        const {tabIndex} = this.state;
        switch (tabIndex) {
            case 0:
                return (<DealDrawer onQuery={this.getQuery}/>)
            case 1:
                return (<MyDrawer onQuery={this.getQuery}/>)
            case 2:
                return (<AllDrawer onQuery={this.getQuery}/>)
        }
    }

    changeTab = (item, i) => {
        this.setState({
            tabIndex: i
        })
    }

    render() {

        const tabs = [
            {title: '已启动任务'},
            {title: '我的任务'},
            {title: '全部任务'},
        ];

        return (<Drawer
            sidebar={this.renderSidebar()}
            position="right"
            open={false}
            drawerRef={el => (this.drawer = el)}
            onOpenChange={this.onOpenChange}
            drawerBackgroundColor="#fff"
            style={styles.wrapper}
        >
            <Tabs
                tabs={tabs}
                onChange={this.changeTab}
                prerenderingSiblingsNumber={2}
                tabBarActiveTextColor='#4b9dfa'
                tabBarUnderlineStyle={{width: 0}}
            >
                <View>
                    <DealTaskList
                        ref={el => this.dealList = el}
                        openDrawer={this.openDrawer}
                        navigate={this.props.navigation.navigate}
                    />
                </View>
                <View>
                    <MyTaskList
                        ref={el => this.myList = el}
                        openDrawer={this.openDrawer}
                        navigate={this.props.navigation.navigate}
                    />
                </View>
                <View>
                    <AllTaskList
                        ref={el => this.allList = el}
                        openDrawer={this.openDrawer}
                        navigate={this.props.navigation.navigate}
                    />
                </View>
            </Tabs>
        </Drawer>)
    }
}

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
        width: 60,
        height: 60
    },
    cardInfo: {
        flex: 1,
        marginLeft: 10
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
