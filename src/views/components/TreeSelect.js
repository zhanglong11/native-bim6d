import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox, Icon, WingBlank} from '@ant-design/react-native';

let count=0;
export default class TreeSelect extends Component {
    state = {
        data: [],
        checkId: [],
        openId: []
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
            checkId: this.props.checkId || [],
            openId: this.props.openId || [],
            checkName: []
        })
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

    changeCheck = checkItem => {
        const {checkId, checkName} = this.state;
        const {getSelect, getSelectRow, multiple, checkCode} = this.props;
        if (multiple) {
            if (checkId.includes(checkItem.id))
                this.setState({
                    checkId: checkId.filter(c => c != checkItem.id),
                    checkName: checkName.filter(c => c != checkItem[checkCode]),
                }, () => {
                    if (getSelect)
                        getSelect(this.state.checkId)
                    if (getSelectRow)
                        getSelectRow(this.state.checkName)
                })
            else
                this.setState({
                    checkId: [...checkId, checkItem.id],
                    checkName: [...checkName, checkItem[checkCode]],
                }, () => {
                    if (getSelect)
                        getSelect(this.state.checkId)
                    if (getSelectRow)
                        getSelectRow(this.state.checkName)
                })
        } else {
            if (checkId.includes(checkItem.id))
                this.setState({
                    checkId: []
                }, () => {
                    if (getSelect)
                        getSelect(this.state.checkId)
                    if (getSelectRow)
                        getSelectRow({})
                })
            else
                this.setState({
                    checkId: [checkItem.id]
                }, () => {
                    if (getSelect)
                        getSelect(this.state.checkId)
                    if (getSelectRow)
                        getSelectRow(checkItem)
                })
        }
    }

    reset=()=>{
        const {getSelect, getSelectRow} = this.props;
        this.setState({
            checkId: []
        }, () => {
            if (getSelect)
                getSelect(this.state.checkId)
            if (getSelectRow)
                getSelectRow({})
        })
    }

    renderItem = (data,count) => {
        const {checkId, openId} = this.state;
        const {showCode} = this.props;
        if (data && data.length)
            return data.map(c => {
                return <TouchableOpacity onPress={() => {
                    this.toggle(c.id)
                }}>
                    <View style={styles.itemWrapper}>
                        <View style={{width:count*10}}/><Icon name={openId.includes(c.id) ? 'caret-down' : 'caret-right'}/>
                        <View style={styles.checkbox}>
                            <Checkbox
                                checked={checkId.includes(c.id)}
                                onChange={() => {
                                    this.changeCheck(c)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>{c[showCode]}</Text>
                    </View>
                    {openId.includes(c.id) ? c.children && c.children.length ? this.renderItem(c.children,count+1) : null : null}
                </TouchableOpacity>
            })
    }

    render() {
        const {data} = this.state;
        return (<ScrollView>
            {this.renderItem(data,1)}
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
    text: {
        textAlignVertical: 'top'
    }
});

