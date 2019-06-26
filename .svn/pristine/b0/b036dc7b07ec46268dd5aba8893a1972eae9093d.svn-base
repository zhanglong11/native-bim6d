import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {post} from "../../config/fetch";
import {APP_URL, mobileHttp} from "../../config/http";
import loadingUtils from "../../utils/loadingUtils";

const headerStyle = {
    flex: 1,
    textAlign: 'center',
    marginRight: 60
}

export default class ProgressTabDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: params ? params.name?params.name: '进度报表':'进度报表',
            headerTitleStyle: headerStyle
        }
    }

    state = {
        data: {
            actualProgress: '',
            progressRemark: '',
            isDelay: '',
            delayRemark: '',
            modificationMeasure: '',
            progressFileIds: ''
        }
    }

    componentDidMount() {
        this.setState({id: this.props.navigation.state.params.id}, () => {
            this.getData();
        })
    }

    getData=()=>{
        loadingUtils.showLoading();
        const {id} = this.state;
        post(`${mobileHttp}${APP_URL}/app/schedule/task/getTaskReport/${id}`, {}).then(data => {
            if (data.code != 200)
                return;
            loadingUtils.dismissLoading();
            this.setState(state => ({data: {...state.data, ...data.data}}))
        })
    }


    showImage=(imageUrl,index)=>{
        this.props.navigation.navigate('ImageShow',{imageUrl,index});
    }

    renderImage = (fileIds) => {
        let fileId=fileIds.map(c=>c.trim())
        if (fileId && fileId.length)
            return fileId.map((f,i) => (
                <View>
                    <TouchableOpacity
                        onPress={()=>{this.showImage(fileId,i)}}
                        activeOpacity={1}
                        underlayColor="#a9d9d4">
                        <Image
                            style={styles.image}
                            source={{uri: f}}
                        />
                    </TouchableOpacity>
                </View>
            ))
    }

    render() {
        const {closeModel} = this.props;
        const {data} = this.state;
        return (<ScrollView style={styles.wrapper}>
            {/*进度选择*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    进度选择:
                </Text>
                <View style={styles.listContent}>
                    <Text>{data.progress}%</Text>
                </View>
            </View>

            {/*changeRemark*/}
            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    进度说明:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{data.progressRemark}</Text>
                    </View>
                </View>
            </View>

            {/*changeRemark*/}
            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    进度照片:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <View style={styles.imageWrapper}>
                            {this.renderImage(data.progressFileIds.split(',').map(a => a.replace(/[\[\]]/g, '')))}
                        </View>
                    </View>
                </View>
            </View>

            {/*是否延期*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    是否延期:
                </Text>
                <View style={styles.listContent}>
                    <Text>{data.isDelay == '1' ? '是' : data.isDelay == '0' ? '否' : ''}</Text>
                </View>
            </View>


            {/*changeRemark*/}
            {data.isDelay == '1' ?
                <View style={styles.item}>
                    <Text style={styles.topLabel}>
                        延期说明:
                    </Text>
                    <View style={styles.listContent}>
                        <View style={styles.itemContent}>
                            <Text>{data.delayRemark}</Text>
                        </View>
                    </View>
                </View> : null}

            {/*changeRemark*/}
            {data.isDelay == '1' ?
                <View style={styles.item}>
                    <Text style={styles.topLabel}>
                        整改措施:
                    </Text>
                    <View style={styles.listContent}>
                        <View style={styles.itemContent}>
                            <Text>{data.modificationMeasure}</Text>
                        </View>
                    </View>
                </View> : null}

        </ScrollView>)
    }
}


const styles = StyleSheet.create({
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
        alignItems: 'center',
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
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    inputWrapper: {
        flex: 1,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        height: 40,
        borderColor: '#eee',
        fontSize: 14
    },
    messageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageBtn: {
        height: 40
    },
    headerImage: {
        width: 40,
        height: 40,
        borderRadius: 40
    },
    titleWrapper: {},
    btnWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 6
    },
    btn: {
        height: 30,
        marginRight: 8
    },
    tabWrapper: {
        padding: 6
    },
    tabHeader: {
        flex: 1,
        flexDirection: 'row',
        borderLeftWidth: .5,
        borderTopWidth: .5,
        borderColor: '#eee',
    },
    tabTd: {
        flex: 1,
        borderBottomWidth: .5,
        borderRightWidth: .5,
        borderColor: '#eee'
    },
    tabBody: {
        flexDirection: 'row',
    }
})

