import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {TextareaItem, Button, Tag, Toast, DatePicker} from '@ant-design/react-native';
import {post} from "../../config/fetch";
import {mobileHttp, http, SYSTEM_URL, APP_URL, CONSTRUCTION_URL} from "../../config/http";
import loadingUtils from '../../utils/loadingUtils';
import ImageViewer from 'react-native-image-zoom-viewer';

const headerStyle = {
    flex: 1,
    textAlign: 'center',
    marginRight: 60
}


export default class QualityDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            title: params ? params.name?params.name: '质量详情':'质量详情',
            headerTitleStyle: headerStyle
        }
    }

    state = {
        qualityDetail: {
            modelName: '',
            floorName: '',
            specialtyName: '',
            qualityLevel: '',
            isPublic: '',
            isNotify: '',
            status: '',
            remark: '',
            qualityCheckIssuePrincipalList: [],
            creatorName: '',
            qualityCheckItemsList: [],
            points: '',
            createTime: '',
            updateTime: '',
            fileIds: [],
            canUpdate: false,
            rectificationRemake: ''
        },
        message: '',
        uriAry: [],
        isModify: false,
        rectificationRemake: ''
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        loadingUtils.showLoading()
        const qualityId = this.props.navigation.state.params.id;
        post(`${mobileHttp}${APP_URL}/check/quality/app/issue/get/${qualityId}`, {}).then(data => {
            if (data.code != 200)
                return;
            loadingUtils.dismissLoading()
            this.setState(state => ({qualityDetail: {...state.qualityDetail, ...data.data}}))
        })
    }

    changeStatusData = () => {
        const qualityId = this.props.navigation.state.params.id;
        const {status} = this.state.qualityDetail;
        post(`${mobileHttp}${CONSTRUCTION_URL}/check/quality/app/issue/updateStatus/${qualityId}/${status}`, {}).then(data => {
            if (data.code != 200) {
                Toast.fail(data.message)
                return;
            }
            Toast.success(data.message)
            this.getData();
        })
    }

    changeRectificationData = () => {
        const qualityId = this.props.navigation.state.params.id;
        const {rectificationRemake} = this.state;
        post(`${mobileHttp}${CONSTRUCTION_URL}/check/quality/app/issue/updateRectificationRemake`, {
            id: qualityId,
            rectificationRemake
        }).then(data => {
            if (data.code != 200) {
                Toast.fail(data.message)
                return;
            }
            Toast.success(data.message)
            this.getData();
        })
    }

    renderStatus = status => {
        switch (status) {
            case 0:
                return '新建'
            case 1:
                return '处理中'
            case 2:
                return '已关闭'
            default:
                return ''
        }
    }

    renderPub = isPub => {
        switch (isPub) {
            case 0:
                return '不公开'
            case 1:
                return '公开 '
            default:
                return ''
        }
    }

    renderLevel = level => {
        switch (level) {
            case 0:
                return '一般'
            case 1:
                return '重大'
            default:
                return ''
        }
    }

    renderNotice = isNotice => {
        switch (isNotice) {
            case '0':
                return '未通知'
            case '1':
                return ' 已通知'
            default:
                return ''
        }
    }


    renderCheckList = (checkList) => {
        return checkList.map(c => {
            return (<View>
                <Text>{c.name}</Text>
            </View>)
        })
    }

    showImage=(imageUrl,index)=>{
        this.props.navigation.navigate('ImageShow',{imageUrl,index});
    }

    renderImage = (fileIds) => {
        if (fileIds && fileIds.length)
            return fileIds.map((f,i) => (
                <View>
                    <TouchableOpacity
                        onPress={()=>{this.showImage(fileIds,i)}}
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

    setNew = () => {
        this.setState(state => ({isModify: false, qualityDetail: {...state.qualityDetail, ...{status: '0'}}}), () => {
            this.changeStatusData()
        })
    }
    setDel = () => {
        this.setState(state => ({isModify: false, qualityDetail: {...state.qualityDetail, ...{status: '1'}}}), () => {
            this.changeStatusData()
        })
    }

    setClose = () => {
        this.setState(state => ({isModify: false, qualityDetail: {...state.qualityDetail, ...{status: '2'}}}), () => {
            this.changeStatusData()
        })
    }

    // renderDetailStatus=(status)=>{
    //     const {canModify}=this.state.qualityDetail;
    //     const {isModify}=this.state;
    //     if(canModify){
    //         if(isModify){
    //             return <View style={styles.listContent}>
    //                 <Tag
    //                     style={styles.tag}
    //                     onChange={this.setNew}>新建</Tag>
    //                 <Tag
    //                     style={styles.tag}
    //                     onChange={this.setDel}>处理中</Tag>
    //                 <Tag
    //                     style={styles.tag}
    //                     onChange={this.setClose}>已关闭</Tag>
    //             </View>
    //         }
    //         return <View><Text>{this.renderStatus(status)}</Text> <Button onPress={()=>{this.setState({isModify:true})}}>更改</Button></View>
    //     }else{
    //         return <Text>{this.renderStatus(status)}</Text>
    //     }
    // }

    changeStatus = () => {
        this.setState({isModify: true})
    }

    changeRectification = (val) => {
        this.setState({rectificationRemake: val})
    }


    setRectificationRemake = () => {
        this.changeRectificationData();
    }


    renderDetailStatus = (status) => {
        const {canUpdate} = this.state.qualityDetail;
        const {isModify} = this.state;
        if (canUpdate) {
            if (isModify) {
                return <View style={styles.listContent}>
                    <Tag
                        style={styles.tag}
                        disabled
                        onChange={this.setNew}>新建</Tag>
                    <Tag
                        style={styles.tag}
                        onChange={this.setDel}>处理中</Tag>
                    <Tag
                        style={styles.tag}
                        onChange={this.setClose}>已关闭</Tag>
                </View>
            } else {
                return <View style={styles.statusWrapper}>
                    <Text style={{textAlignVertical: 'center'}}>{this.renderStatus(status)}</Text>
                    <Button onPress={this.changeStatus} style={styles.btn} type='ghost'>更改</Button>
                </View>
            }
        } else {
            return <Text>{this.renderStatus(status)}</Text>
        }
    }

    changeTextArea = val => {
        console.log(val)
    }

    sendMessage = () => {
        alert(this.state.message);
        this.setState({message: ''})
    }

    render() {
        const {qualityDetail} = this.state;
        return (<ScrollView style={styles.wrapper}>
            {/*单体*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    单体:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.modelName}</Text>
                    </View>
                </View>
            </View>
            {/*楼层*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    楼层:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.floorName}</Text>
                    </View>
                </View>
            </View>

            {/*专业*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    专业:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.specialtyName}</Text>
                    </View>
                </View>
            </View>
            {/*问题级别*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    问题级别:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{this.renderLevel(qualityDetail.qualityLevel)}</Text>
                    </View>
                </View>
            </View>
            {/*是否公开*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    是否公开:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{this.renderPub(qualityDetail.isPublic)}</Text>
                    </View>
                </View>
            </View>

            {/*是否通知责任人*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    是否通知责任人:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{this.renderNotice(qualityDetail.isNotify)}</Text>
                    </View>
                </View>
            </View>

            {/*问题状态*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    问题状态:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        {this.renderDetailStatus(qualityDetail.status)}
                    </View>
                </View>
            </View>

            {/*备注*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    备注:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.remark}</Text>
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
                        <Text>{qualityDetail.qualityCheckIssuePrincipalList.map(c => c.principalName).join(',')}</Text>
                    </View>
                </View>
            </View>

            {/*创建人*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    创建人:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.creatorName}</Text>
                    </View>
                </View>
            </View>

            {/*检查项*/}
            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    检查项:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        {this.renderCheckList(qualityDetail.qualityCheckItemsList)}
                    </View>
                </View>
            </View>


            {/*创建时间*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    创建时间:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.createTime}</Text>
                    </View>
                </View>
            </View>

            {/*更新时间*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    更新时间:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Text>{qualityDetail.updateTime}</Text>
                    </View>
                </View>
            </View>

            {/*ImageList*/}
            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    图片:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <View style={styles.imageWrapper}>
                            {this.renderImage(qualityDetail.fileIds)}
                            {/*<ImageViewer imageUrls={imageUrl} enableImageZoom/>*/}
                        </View>
                    </View>
                </View>
            </View>

            {/*changeRemark*/}
            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    整改说明:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.remarkWrapper}>
                        <TextareaItem
                            style={styles.textArea}
                            rows={4}
                            last={true}
                            onChange={this.changeRectification}
                        >
                            {qualityDetail.rectificationRemake}
                        </TextareaItem>
                        <Button style={styles.remarkBtn} type='ghost'
                                onPress={this.setRectificationRemake}>保存</Button>
                    </View>
                </View>
            </View>


            {/*/!*message*!/*/}
            {/*<View style={styles.item}>*/}
                {/*<View style={styles.listContent}>*/}
                    {/*<Image*/}
                        {/*style={styles.headerImage}*/}
                        {/*source={headerIcon}*/}
                    {/*/>*/}
                    {/*<View style={styles.itemContent}>*/}
                        {/*<View style={styles.messageWrapper}>*/}
                            {/*<View style={styles.inputWrapper}>*/}
                                {/*<InputItem*/}
                                    {/*last*/}
                                    {/*style={styles.input}*/}
                                    {/*value={this.state.message}*/}
                                    {/*onChange={val => this.setState({message: val})}*/}
                                {/*/>*/}
                            {/*</View>*/}
                            {/*<Button style={styles.messageBtn} type='ghost' onPress={this.sendMessage}>发送</Button>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}
            {/*</View>*/}

            {/*/!*talkList*!/*/}
            {/*<View style={styles.item}>*/}
                {/*<View style={styles.listContent}>*/}
                    {/*<Text>*/}
                        {/*123*/}
                    {/*</Text>*/}
                {/*</View>*/}
            {/*</View>*/}
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
        alignItems: 'center',
        marginLeft: 10
    },
    remarkWrapper: {
        position: 'relative',
        flex: 1,
        marginRight: 8
    },
    itemContent: {
        flex: 1,
        marginRight: 8
    },
    remarkBtn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        transform: [{scale:0.7}]
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
        // width:500,
        // height:400
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
    statusWrapper: {
        flexDirection: 'row',
        textAlignVertical: 'center'
    },
    btn: {
        height: 30,
        marginLeft: 6
        // transform: [{scale:0.8}]
    },
    tag: {
        marginRight: 6
    }
})

