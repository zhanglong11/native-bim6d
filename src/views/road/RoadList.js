import React, {Component} from 'react';
import {View, Image, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, WhiteSpace, WingBlank, Drawer, Button} from '@ant-design/react-native';

const iconUrl = require('../../image/back.png');
const data = [
    {
        id: '1',
        text: '蔡篮球',
        status: 0,
        icon: require('../../image/back.png'),
        content: '我是一段内容',
        createTime: '2019-13-01'
    },
    {
        id: '2',
        text: '黄总',
        status: 1,
        icon: require('../../image/back.png'),
        content: '我也是一段内容',
        createTime: '2019-2-30'
    },
    {
        id: '3',
        text: '张总',
        status: 2,
        icon: require('../../image/back.png'),
        content: '我还是一段内容',
        createTime: '2019-2-30'
    }

]
const statusAry = [
    {text: '新建', color: '#e659a2'},
    {text: '处理中', color: '#fbde00'},
    {text: '已关闭', color: '#74cc97'}
]
export default class RoadList extends Component {

    pressItem = id => {
        alert(id)
    }

    addQues = () => {
        alert('新建啥呀，不让建')
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

    renderList = () => {
        return data.map((d, i) => (
            <TouchableOpacity onPress={() => {
                this.pressItem(d.id)
            }} key={i}>
                <Card>
                    <Card.Body>
                        <View style={styles.cardBody}>
                            <Image
                                style={styles.homeImg}
                                source={d.icon}
                            />
                            <View style={styles.cardInfo}>
                                <View style={styles.cardTitle}>
                                    <Text>{d.text}</Text>
                                    {this.renderStatus(d.status)}
                                </View>
                                <View style={styles.cardContent}>
                                    <Text>{d.content}</Text>
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
        return (
            <View style={styles.wrapper}>
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
            </View>
        );
    }
}
let styles = StyleSheet.create({
    wrapper: {
        height:'100%'
    },
    cardBody: {
        flex: 1,
        width: '100%',
        flexDirection: 'row'
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
    addBtn:{
        color: '#fff'
    }
})
