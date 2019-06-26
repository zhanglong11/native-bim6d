import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Tag, WhiteSpace, DatePicker, Button, Toast} from '@ant-design/react-native';
import SingleTree from "../components/SingleTree";
import {post} from "../../config/fetch";
import {http,APP_URL} from "../../config/http";

export default class AllDrawer extends Component {
    state = {
        projectId: global.projectId,
        queryData: {
            planStartTimeBegin:'',
            planStartTimeEnd:'',
            planEndTimeBegin: '',
            planEndTimeEnd: '',
            actualStartTimeBegin: '',
            actualStartTimeEnd: '',
            actualEndTimeBegin: '',
            actualEndTimeEnd: '',
            taskStatus:''
        },
        personData:[],
        dateO: undefined,
        dateT: undefined,
        dateTH: undefined,
        dateF: undefined,
        dateFI: undefined,
        dateS: undefined,
        dateSE: undefined,
        dateE: undefined,
    }

    componentDidMount() {
        this.getPersonData();
    }

    getPersonData = () => {
        const {projectId} = this.state;
        post(`${http}${APP_URL}/app/schedule/task/principalReturn/${projectId}`, {}).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            this.setState({personData:data.data});
        })
    }

    initPerson=(data)=>{
        if(data&&data.length){
            let ary=[];
            data.map(d=>
                d.userList.map(u=>{ary.push(u)})
            )
            this.setState({personData:ary});
        }
    }

    format = date => {
        let initDate=new Date(date);
        console.log(initDate)
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
        console.log(`${date.getFullYear()}-${month}-${mday}`)
        return `${date.getFullYear()}-${month}-${mday}`;
    }

    setNew=(isNew)=>{
        const {queryData}=this.state;
        const {taskStatus}=this.state.queryData;
        let newStatus=isNew?taskStatus?[taskStatus,'0'].join(','):['0'].join(','):taskStatus.split(',').filter(s=>s!='0').join(',');
        this.setState({
            queryData:{...queryData,...{taskStatus:newStatus}}
        })
    }

    setDel=(isDel)=>{
        const {queryData}=this.state;
        const {taskStatus}=this.state.queryData;
        let newStatus=isDel?taskStatus?[taskStatus,'1'].join(','):['1'].join(','):taskStatus.split(',').filter(s=>s!='1').join(',');
        this.setState({
            queryData:{...queryData,...{taskStatus:newStatus}}
        })
    }

    setClose=(isClose)=>{
        const {queryData}=this.state;
        const {taskStatus}=this.state.queryData;
        let newStatus=isClose?taskStatus?[taskStatus,'2'].join(','):['2'].join(','):taskStatus.split(',').filter(s=>s!='2').join(',');
        this.setState({
            queryData:{...queryData,...{taskStatus:newStatus}}
        })
    }

    changeDateO = val => {
        this.setState(state=>({
            dateO:val,
            queryData:{...state.queryData,...{planStartTimeBegin:this.format(val)}}
        }))
    }

    changeDateT = val => {
        this.setState(state=>({
            dateT:val,
            queryData:{...state.queryData,...{planStartTimeEnd:this.format(val)}}
        }))
    }

    changeDateTH = val => {
        this.setState(state=>({
            dateTH:val,
            queryData:{...state.queryData,...{planEndTimeBegin:this.format(val)}}
        }))
    }

    changeDateF = val => {
        this.setState(state=>({
            dateF:val,
            queryData:{...state.queryData,...{planEndTimeEnd:this.format(val)}}
        }))
    }

    changeDateFI = val => {
        this.setState(state=>({
            dateFI:val,
            queryData:{...state.queryData,...{actualStartTimeBegin:this.format(val)}}
        }))
    }

    changeDateS = val => {
        this.setState(state=>({
            dateS:val,
            queryData:{...state.queryData,...{actualStartTimeEnd:this.format(val)}}
        }))
    }

    changeDateSE = val => {
        this.setState(state=>({
            dateSE:val,
            queryData:{...state.queryData,...{actualEndTimeBegin:this.format(val)}}
        }))
    }

    changeDateE = val => {
        this.setState(state=>({
            dateE:val,
            queryData:{...state.queryData,...{actualEndTimeEnd:this.format(val)}}
        }))
    }

    onSearch = () => {
        const {onQuery} = this.props;
        if (onQuery)
            onQuery(this.state.queryData)
    }

    getPerson=(checkIds)=>{
        this.setState(state=>({queryData:{...state.queryData,...{principal:checkIds.join(',')}}}))
    }

    reSet=()=>{
        this.setState({
            queryData: {
                planStartTimeBegin:'',
                planStartTimeEnd:'',
                planEndTimeBegin: '',
                planEndTimeEnd: '',
                actualStartTimeBegin: '',
                actualStartTimeEnd: '',
                actualEndTimeBegin: '',
                actualEndTimeEnd: '',
                status:''
            },
            dateO: undefined,
            dateT: undefined,
            dateTH: undefined,
            dateF: undefined,
            dateFI: undefined,
            dateS: undefined,
            dateSE: undefined,
            dateE: undefined
        })
    }


    render() {
        const {dateO,dateT,dateTH,dateF,dateFI,dateE,dateS,dateSE} = this.state;
        return (<View style={styles.wrapper}>
            <View style={styles.item}>
                <Text style={styles.label}>
                    问题状态:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setNew}>未开工</Tag>
                    </View>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setDel}>已开工</Tag>
                    </View>
                    <View style={styles.itemContent}>
                        <Tag onChange={this.setClose}>已完工</Tag>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    计划开工日期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateO}
                            mode="date"
                            onChange={this.changeDateO}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={0.5}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateO && this.formatNew(dateO)) || "开始时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={styles.itemContent}>
                        <Text>至</Text>
                    </View>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateT}
                            mode="date"
                            onChange={this.changeDateT}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={1}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateT && this.formatNew(dateT)) || "结束时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    计划完工日期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateTH}
                            mode="date"
                            onChange={this.changeDateTH}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={0.5}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateTH && this.formatNew(dateTH)) || "开始时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={styles.itemContent}>
                        <Text>至</Text>
                    </View>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateF}
                            mode="date"
                            onChange={this.changeDateF}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={1}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateF && this.formatNew(dateF)) || "结束时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    实际开工日期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateFI}
                            mode="date"
                            onChange={this.changeDateFI}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={0.5}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateFI && this.formatNew(dateFI)) || "开始时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={styles.itemContent}>
                        <Text>至</Text>
                    </View>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateS}
                            mode="date"
                            onChange={this.changeDateS}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={1}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateS && this.formatNew(dateS)) || "结束时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    实际完工日期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateSE}
                            mode="date"
                            onChange={this.changeDateSE}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={0.5}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateSE && this.formatNew(dateSE)) || "开始时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                    <View style={styles.itemContent}>
                        <Text>至</Text>
                    </View>
                    <View style={styles.itemContent}>
                        <DatePicker
                            value={dateE}
                            mode="date"
                            onChange={this.changeDateE}
                            format="YYYY-MM-DD"
                        >
                            <TouchableOpacity
                                onPress={this.show}
                                activeOpacity={1}
                                underlayColor="#a9d9d4">
                                <Text>
                                    {(dateE && this.formatNew(dateE)) || "结束时间"}
                                </Text>
                            </TouchableOpacity>
                        </DatePicker>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    负责人:
                </Text>
                <View style={styles.listContent}>
                    <ScrollView style={{maxHeight: 200}}>
                        <SingleTree
                            data={this.state.personData}
                            getPerson={this.getPerson}
                        />
                    </ScrollView>
                </View>
            </View>


            <View style={styles.btnWrapper}>
                <Button style={styles.btn} type='primary'  onPress={this.onSearch}>
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
        color: '#ccc',
        textAlignVertical: 'center'
    },
    labelTop: {
        color: '#ccc',
        textAlignVertical: 'top',
        paddingTop: 10
    },
    listContent: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10
    },
    itemContent:{
        marginRight:8
    },
    dateWrapper: {
        flexDirection: 'row'
    },
    dateShow: {
        width: 50,
        borderColor: '#333',
        borderWidth: 1
    },
    btnWrapper:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop:6
    },
    btn:{
        height: 30,
        marginRight:8
    }
})

