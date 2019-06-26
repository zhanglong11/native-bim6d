import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Tag, WhiteSpace, DatePicker, Button, Modal, Toast} from '@ant-design/react-native';
import TreeSelect from "../components/TreeSelect";
import {post} from "../../config/fetch";
import {BIM_URL, http} from "../../config/http";
import CheckItem from "../components/CheckItem";

export default class DrawerList extends Component {
    state = {
        projectId: global.projectId,
        queryData: {
            status: '',
            createStartTime: '',
            createEndTime: '',
            safetyLevel: '',
            floodIDs:'',
            areaId:''
        },
        floorData: [],
        areaData:[],
        startDate: undefined,
        endDate: undefined,
    }

    componentDidMount() {
        this.getFloorData();
        this.getAreaList()
    }

    getFloorData = () => {
        const {projectId} = this.state;
        post(`${http}${BIM_URL}/bim/bimFileSpace/${projectId}/getBuildTree`, {}).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            this.setState({floorData: data.data})
        })
    }

    getAreaList=()=>{
        const {projectId} = this.state;
        post(`${http}/bim6d-construction/check/safety/area/list`, {projectId}).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            this.setState({areaData: data.data.records})
        })
    }


    format = date => {
        let initDate = new Date(date);
        let mday = initDate.getDate();
        let month = initDate.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        mday = mday < 10 ? `0${mday}` : mday;
        return `${initDate.getFullYear()}-${month}-${mday}`;
    }

    formatNew = date => {
        let mday = date.getDate();
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        mday = mday < 10 ? `0${mday}` : mday;
        return `${date.getFullYear()}-${month}-${mday}`;
    }

    setNew = (isNew) => {
        const {queryData} = this.state;
        const {status} = this.state.queryData;
        let newStatus = isNew ? status ? [status, '0'].join(',') : ['0'].join(',') : status.split(',').filter(s => s != '0').join(',');
        this.setState({
            queryData: {...queryData, ...{status: newStatus}}
        })
    }

    setDel = (isDel) => {
        const {queryData} = this.state;
        const {status} = this.state.queryData;
        let newStatus = isDel ? status ? [status, '1'].join(',') : ['1'].join(',') : status.split(',').filter(s => s != '1').join(',');
        this.setState({
            queryData: {...queryData, ...{status: newStatus}}
        })
    }

    setClose = (isClose) => {
        const {queryData} = this.state;
        const {status} = this.state.queryData;
        let newStatus = isClose ? status ? [status, '2'].join(',') : ['2'].join(',') : status.split(',').filter(s => s != '2').join(',');
        this.setState({
            queryData: {...queryData, ...{status: newStatus}}
        })
    }

    setNormal = (isNormal) => {
        const {queryData} = this.state;
        const {safetyLevel} = this.state.queryData;
        let newLevel = isNormal ? safetyLevel ? [safetyLevel, '0'].join(',') : ['0'].join(',') : safetyLevel.split(',').filter(s => s != '0').join(',');
        this.setState({
            queryData: {...queryData, ...{safetyLevel: newLevel}}
        })
    }

    setVip = (isVip) => {
        const {queryData} = this.state;
        const {safetyLevel} = this.state.queryData;
        let newLevel = isVip ? safetyLevel ? [safetyLevel, '1'].join(',') : ['1'].join(',') : safetyLevel.split(',').filter(s => s != '1').join(',');
        this.setState({
            queryData: {...queryData, ...{safetyLevel: newLevel}}
        })
    }


    changeStartDate = val => {
        this.setState(state => ({
            startDate: val,
            queryData: {...state.queryData, ...{createStartTime: this.format(val)}}
        }))
    }

    changeEndDate = val => {
        this.setState(state => ({
            endDate: val,
            queryData: {...state.queryData, ...{createEndTime: this.format(val)}}
        }))
    }

    onSearch = () => {
        const {onQuery} = this.props;
        if (onQuery)
            onQuery(this.state.queryData)
    }

    reSet = () => {
        this.setState({
            queryData: {
                status: '',
                createStartTime: '',
                createEndTime: '',
                safetyLevel: ''
            },
            startDate: undefined,
            endDate: undefined
        })
    }

    getFloorCheck = checkIds => {
        this.setState(state => ({
            queryData: {...state.queryData, ...{floodIDs:checkIds.join(',')}}
        }))
    }

    getAreaCheck = checkIds => {
        this.setState(state => ({
            queryData: {...state.queryData, ...{areaId:checkIds.join(',')}}
        }))
    }


    render() {
        const {startDate, endDate} = this.state;
        return (<View style={styles.wrapper}>
            <View style={styles.item}>
                <Text style={styles.label}>
                    问题状态:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setNew}>新建</Tag>
                    </View>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setDel}>处理中</Tag>
                    </View>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setClose}>已关闭</Tag>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    创建时间:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={startDate}
                            mode="date"
                            onChange={this.changeStartDate}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={0.5}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(startDate && this.formatNew(startDate)) || "开始时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={styles.itemContent}>
                        <Text>至</Text>
                    </View>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={endDate}
                            mode="date"
                            onChange={this.changeEndDate}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={1}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(endDate && this.formatNew(endDate)) || "结束时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    问题等级:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setNormal}>一般隐患</Tag>
                    </View>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setVip}>重大隐患</Tag>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    单体楼层:
                </Text>
                <View style={styles.listContent}>
                    <ScrollView style={{maxHeight: 200}}>
                        <TreeSelect
                            multiple
                            data={this.state.floorData}
                            getSelect={this.getFloorCheck}
                            showCode='name'
                        />
                    </ScrollView>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    区域:
                </Text>
                <View style={styles.listContent}>
                    <ScrollView style={{maxHeight: 200}}>
                        <CheckItem
                            data={this.state.areaData}
                            getSelect={this.getAreaCheck}
                            showCode='name'
                        />
                    </ScrollView>
                </View>
            </View>

            <View style={styles.btnWrapper}>
                <Button style={styles.btn} type='primary' onPress={this.onSearch}>
                    确定
                </Button>
                {/*<Button style={styles.btn} onPress={this.reSet}>*/}
                    {/*重置*/}
                {/*</Button>*/}
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    item: {
        flexDirection: 'row',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 4,
        paddingBottom: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee'
    },
    label: {
        width:60,
        color: '#ccc',
        textAlignVertical: 'center'
    },
    topLabel: {
        width:60,
        color: '#ccc',
        textAlignVertical: 'top',
        paddingTop: 10
    },
    listContent: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10
    },
    itemContent: {
        marginRight: 8
    },
    dateWrapper: {
        flexDirection: 'row'
    },
    dateShow: {
        width: 50,
        borderColor: '#333',
        borderWidth: 1
    },
    btnWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 6
    },
    btn: {
        height: 30,
        marginRight: 8
    }
})

