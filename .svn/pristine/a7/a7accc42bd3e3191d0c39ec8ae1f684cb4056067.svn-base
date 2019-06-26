import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {TextareaItem,InputItem,Button} from '@ant-design/react-native';

const headerStyle = {
    flex: 1,
    textAlign: 'center',
    marginRight: 60
}

const data = {
    name: '大基坑9.22',
    planWork: '18',
    planStartDate: '2019-01-19',
    planEndDate: '2019-01-19',
    prevTask: '前置四驱',
    actualStartDate: '2019-03-19',
    actualEndDate: '2019-03-30',
    principal: '马云,马超,马卖啤',
    progress: 20
}

const headerIcon=require('../../image/talkHeader.png');

const imageData = [
    {icon: require('../../image/back.png')},
    {icon: require('../../image/back.png')},
    {icon: require('../../image/back.png')},
    {icon: require('../../image/back.png')},
    {icon: require('../../image/back.png')},
    {icon: require('../../image/back.png')},
    {icon: require('../../image/back.png')}
]
export default class DealTaskDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: params ? params.name : '任务信息',
            headerTitleStyle: headerStyle
        }
    }

    state = {
        data: {
            name: '',
            planWork: '',
            planStartDate: '',
            planEndDate: '',
            prevTask: '',
            actualStartDate: '',
            actualEndDate: '',
            principal: '',
            progress: ''
        },
        message:''
    }

    componentDidMount() {
        this.setState(state => ({data: {...state.data, ...data}}))
    }

    renderStatus = status => {
        switch (status) {
            case 1:
                return '新建'
            case 2:
                return '处理中'
            default:
                return '已关闭'
        }
    }

    renderImage = () => {
        return imageData.map((image, i) => (
            <Image
                key={i}
                style={styles.image}
                source={image.icon}
            />
        ))
    }

    changeTextArea = val => {
        console.log(val)
    }

    sendMessage=()=>{
        alert(this.state.message);
        this.setState({message:''})
    }

    render() {
        const {data} = this.state;
        return (<ScrollView style={styles.wrapper}>
            {/*任务名称*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    任务名称:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.name}</Text>
                    </View>
                </View>
            </View>

            {/*计划工期*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    计划工期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.planWork}</Text>
                    </View>
                </View>
            </View>

            {/*计划开工时间*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    计划开工时间:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.planStartDate}</Text>
                    </View>
                </View>
            </View>

            {/*计划完工时间*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    计划完工时间:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.planEndDate}</Text>
                    </View>
                </View>
            </View>

            {/*前置任务*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    前置任务:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.prevTask}</Text>
                    </View>
                </View>
            </View>

            {/*实际开工日期*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    实际开工日期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.actualStartDate}</Text>
                    </View>
                </View>
            </View>

            {/*实际完工日期*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    实际完工日期:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.actualEndDate}</Text>
                    </View>
                </View>
            </View>

            {/*责任人*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    责任人:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.principal}</Text>
                    </View>
                </View>
            </View>

            {/*任务进度*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    任务进度:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.progress}</Text>
                    </View>
                </View>
            </View>

        </ScrollView>)
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
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee'
    },
    label: {
        // width:100,
        color: '#d1d1d1',
        textAlignVertical: 'center'
    },

    listContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        marginLeft: 10
    },
    itemContent: {
        flex: 1,
        marginRight: 8
    },
    topLabel: {
        color: '#ccc',
        textAlignVertical: 'top',
        paddingTop: 10
    },
    textArea: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 12
    },
    imageWrapper: {
        width:'100%',
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    image: {
        width: '20%',
        height: 60,
        marginRight:10
    },
    inputWrapper:{
        flex:1,
    },
    input:{
        flex:1,
        borderWidth: 1,
        height:40,
        borderColor: '#eee',
        fontSize: 14
    },
    messageWrapper:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    messageBtn:{
        height:40
    },
    headerImage:{
        width:40,
        height:40,
        borderRadius:40
    }
})

