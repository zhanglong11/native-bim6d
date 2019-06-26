import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox} from '@ant-design/react-native';

export default class CheckItem extends Component {
    state = {
        data: [],
        checkId: [],
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
            checkId: this.props.checkId || [],
            checkName:[],
            checkRow:[]
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data)
            this.setState({data: nextProps.data})
    }

    toggle=()=>{

    }

    changeCheck=checkItem=>{
        const {checkId,checkName,checkRow} = this.state;
        const {getSelect,getSelectName,getSelectRow,checkCode} = this.props;
        if (checkId.includes(checkItem.id))
            this.setState({
                checkId: checkId.filter(c => c != checkItem.id),
                checkName: checkName.filter(c => c != checkItem[checkCode]),
                checkRow:checkRow.filter(c=>c.id!=checkItem.id)
            }, () => {
                if (getSelect)
                    getSelect(this.state.checkId)
                if(getSelectName)
                    getSelectName(this.state.checkName)
                if(getSelectRow)
                    getSelectRow(this.state.checkRow)
            })
        else
            this.setState({
                checkId: [...checkId, checkItem.id],
                checkName: [...checkName, checkItem[checkCode]],
                checkRow:[...checkRow,checkItem]
            }, () => {
                if (getSelect)
                    getSelect(this.state.checkId)
                if(getSelectName)
                    getSelectName(this.state.checkName)
                if(getSelectRow)
                    getSelectRow(this.state.checkRow)
            })
    }

    renderItem = (data) => {
        const {checkId} = this.state;
        const {showCode} = this.props;
        console.log(data)
        if (data && data.length)
            return data.map(c => {
                return <TouchableOpacity onPress={() => {
                    this.toggle(c.id)
                }}>
                    <View style={styles.itemWrapper}>
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
                </TouchableOpacity>
            })
    }

    render() {
        const {data} = this.state;
        return (<ScrollView>
            {this.renderItem(data)}
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
    }
});

