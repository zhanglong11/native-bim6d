import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox, Icon, Tag} from '@ant-design/react-native';

let count = 0;

const data = [
    {
        "roleId": "113c5f7a633d481abbe206a4fc4e6da3",
        "roleName": "管理岗位",
        "principal": null,
        "principalName": null,
        "userList": [
            {
                "principal": "1",
                "principalName": "测试"
            },
            {
                "principal": "c9ad06872b574feab76f1270d28c23cf",
                "principalName": "刘向光"
            }
        ]
    },
    {
        "roleId": "161cc254cf75405db74374ab2ea61424",
        "roleName": "项目经理",
        "principal": null,
        "principalName": null,
        "userList": [
            {
                "principal": "c9ad06872b574feab76f1270d28c23cf",
                "principalName": "刘向光"
            }
        ]
    }
];

export default class SingleTree extends Component {
    state = {
        data: [],
        checkId: [],
        openId: []
    }

    componentDidMount() {
        this.setState({data: this.props.data})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data)
            this.setState({data: nextProps.data})
    }

    toggle = id => {
        const {openId} = this.state;
        if (openId.includes(id))
            this.setState({
                openId: openId.filter(c => c != id)
            })
        else
            this.setState({
                openId: [...openId, id]
            })
    }

    setChoose = (check, d) => {
        const {checkId} = this.state;
        const {getPerson} = this.props;
        if (check) {
            checkId.push(d.principal);
            this.setState({checkId}, () => {
                if (getPerson)
                    getPerson(this.state.checkId)
            })
        } else {
            this.setState({checkId: checkId.filter(c => c != d.principal)}, () => {
                if (getPerson)
                    getPerson(this.state.checkId)
            })
        }
    }

    renderItem = (data) => {
        const {checkId} = this.state;
        if (data && data.length)
            return data.map(d => (<View>
                <Tag
                    style={styles.tag}
                    selected={checkId.includes(d.principal)}
                    onChange={value => {
                        this.setChoose(value, d)
                    }}
                >
                    {d.principalName}
                </Tag>
            </View>))
    }

    renderData = data => {
        const {openId} = this.state;
        if (data && data.length) {
            return data.map(d => (
                <TouchableOpacity onPress={() => {
                    this.toggle(d.roleId)
                }}>
                    <View style={styles.itemWrapper}>
                        <Icon name={openId.includes(d.roleId) ? 'caret-down' : 'caret-right'}/>
                        <Text style={styles.text}>{d.roleName}</Text>
                    </View>
                    <View style={styles.tagWrapper}>
                        {openId.includes(d.roleId) ? d.userList && d.userList.length ? this.renderItem(d.userList) : null : null}
                    </View>
                </TouchableOpacity>
            ))
        }
    }

    render() {
        const {data} = this.state;
        return (<ScrollView>
            {this.renderData(data)}
        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    itemWrapper: {
        flexDirection: 'row',
        textAlignVertical: 'top'
    },
    checkbox: {
        textAlignVertical: 'top'
    },
    tagWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 20,
    },
    tag: {
        marginRight: 6
    },
    text: {
        textAlignVertical: 'top'
    }
});

