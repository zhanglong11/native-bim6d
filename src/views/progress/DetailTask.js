import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {TextareaItem, Button, Slider, Tag, Modal, Toast, Icon} from '@ant-design/react-native';
import ProgressTabDetail from './ProgressTabDetail';
import {post, upload} from "../../config/fetch";
import {APP_URL, http, mobileHttp, SYSTEM_URL} from "../../config/http";
import ImageSelect from "react-native-image-picker";
import loadingUtils from '../../utils/loadingUtils'
import DealTaskList from "./DealTaskList";

const headerStyle = {
    flex: 1,
    textAlign: 'center',
    marginRight: 60
}

const photoOptions = {
    title: '请选择',
    quality: 0.8,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: false,
    noData: true,
    maxWidth: 1920,
    maxHeight: 1920,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class DetailTask extends Component {

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
            scheduleTaskPrincipalList: [],
            actualProgress: ''
        },
        progress: 0,
        progressRemark: '',
        isDelay: '',
        delayRemark: '',
        modificationMeasure: '',
        message: '',
        showModel: false,
        reportData: [],
        uriAry: [],
        progressFileIds: '',
        reportId:''
    }

    componentDidMount() {
        this.setState({id: this.props.navigation.state.params.id}, () => {
            this.getData();
        })
    }

    getData = () => {
        loadingUtils.showLoading();
        const {id} = this.state;
        post(`${mobileHttp}${APP_URL}/app/schedule/task/get/${id}`, {}).then(data => {
            console.log(data.data)
            if (data.code != 200)
                return;
            loadingUtils.dismissLoading();
            this.setState({data: data.data, reportData: data.data.allTaskReport});
        })
    }

    uploadData = (file) => {
        upload(`${http}${SYSTEM_URL}/file/upload`, file).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            this.setState(state => ({
                uriAry: [...state.uriAry, {uri: data.data.fileUrl, id: data.data.id}]
            }), () => {
                const {uriAry} = this.state;
                this.setState({progressFileIds: uriAry.map(u => u.id).join(',')})
            });
        })
    }

    delData = (id, i) => {
        post(`${http}${SYSTEM_URL}/file/delete`, [id]).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            const {uriAry} = this.state;
            uriAry.splice(i, 1);
            this.setState({uriAry}, () => {
                const {uriAry} = this.state;
                this.setState({progressFileIds: uriAry.map(u => u.id).join(',')})
            });
        })
    }

    saveData = (param) => {
        post(`${mobileHttp}${APP_URL}/app/schedule/task/addTaskReport`, param).then(data => {
            if (data.code != 200) {
                Toast.fail(data.message);
                return
            }
            Toast.success(data.message);
            this.getData();
        })
    }

    onChoosePicker = () => {
        ImageSelect.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri, fileName: response.fileName};
                this.uploadData(source);
            }
        });
    }

    delImg = (id, i) => {
        this.delData(id, i)
    }

    renderImage = () => {
        const {uriAry} = this.state;
        if (uriAry.length)
            return uriAry.map((u, i) => (
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={u}
                    />
                    <TouchableOpacity style={styles.delIcon} onPress={() => {
                        this.delImg(u.id, i)
                    }}>
                        <Icon name='delete' color='#f13b3f'/>
                    </TouchableOpacity>
                </View>
            ))
    }


    chooseProgress = val => {
        this.setState({progress: (val * 100).toFixed(2)})
    }

    setDelay = (isDelay) => {
        if (isDelay)
            this.setState({isDelay: '1'})
        else
            this.setState({isDelay: ''})
    }

    setNoDelay = (isNoDelay) => {
        if (isNoDelay)
            this.setState({isDelay: '0'})
        else
            this.setState({isDelay: ''})
    }

    showDetail = (t) => {
        this.props.navigation.navigate('ProgressTabDetail', {id:t.id});

    }

    closeModel = () => {
        this.setState({showModal: false})
    }

    onSearch = () => {
        const {id, progress, isDelay, progressRemark, delayRemark, modificationMeasure, progressFileIds} = this.state;
        this.saveData({
            taskId: id,
            progress, isDelay, progressRemark, delayRemark, modificationMeasure, progressFileIds
        })
    }

    renderTabBody = () => {
        const {reportData} = this.state;
        if (reportData.length)
            return reportData.map(t => (<TouchableOpacity onPress={() => {
                this.showDetail(t)
            }}>
                <View style={styles.tabBody}>
                    <Text style={styles.tabTd}>{t.reportDate}</Text>
                    <Text style={styles.tabTd}>{t.progress}%</Text>
                    <Text style={styles.tabTd}>{t.isDelay == '1' ? '是' : t.isDelay == '0' ? '否' : ''}</Text>
                </View>
            </TouchableOpacity>))
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
                        <Text>{data.duration}</Text>
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
                        <Text>{data.planStartTime}</Text>
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
                        <Text>{data.planEndTime}</Text>
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
                        <Text>{data.uniqueName}</Text>
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
                        <Text>{data.actualStartTime}</Text>
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
                        <Text>{data.actualEndTime}</Text>
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
                        <Text>{data.scheduleTaskPrincipalList.map(c => c.principalname).join(',')}</Text>
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
                        <Text>{data.actualProgress?data.actualProgress:0}%</Text>
                    </View>
                </View>
            </View>


            {/*进度选择*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    进度选择:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <Slider onChange={this.chooseProgress}/>
                    </View>
                    <Text>{this.state.progress}%</Text>
                </View>
            </View>

            {/*changeRemark*/}
            <View style={styles.item}>
                <Text style={styles.topLabel}>
                    进度说明:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <TextareaItem
                            style={styles.textArea}
                            rows={3}
                            last={true}
                            onChange={value => {
                                this.setState({progressRemark: value})
                            }}
                        >
                            {data.progressRemark}
                        </TextareaItem>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <TouchableOpacity style={styles.label} onPress={this.onChoosePicker}>
                    <Icon name='camera' size='lg' color='#1890ff'/>
                </TouchableOpacity>

                <View style={styles.cameraList}>
                    <View style={styles.cameraContent}>
                        {this.renderImage()}
                    </View>
                </View>
            </View>


            {/*是否延期*/}
            <View style={styles.item}>
                <Text style={styles.label}>
                    是否延期:
                </Text>
                <View style={styles.listContent}>
                    <Tag
                        style={styles.tag}
                        onChange={this.setDelay}
                        selected={this.state.isDelay == '1'}
                    >是</Tag>
                    <Tag
                        style={styles.tag}
                        onChange={this.setNoDelay}
                        selected={this.state.isDelay == '0'}
                    >否</Tag>
                </View>
            </View>


            {/*changeRemark*/}
            {this.state.isDelay == '1' ?
                <View style={styles.item}>
                    <Text style={styles.topLabel}>
                        延期说明:
                    </Text>
                    <View style={styles.listContent}>
                        <View style={styles.itemContent}>
                            <TextareaItem
                                style={styles.textArea}
                                rows={3}
                                last={true}
                                onChange={value => {
                                    this.setState({delayRemark: value})
                                }}
                            >
                                {data.delayRemark}
                            </TextareaItem>
                        </View>
                    </View>
                </View> : null}

            {/*changeRemark*/}
            {this.state.isDelay == '1' ?
                <View style={styles.item}>
                    <Text style={styles.topLabel}>
                        整改措施:
                    </Text>
                    <View style={styles.listContent}>
                        <View style={styles.itemContent}>
                            <TextareaItem
                                style={styles.textArea}
                                rows={3}
                                last={true}
                                onChange={value => {
                                    this.setState({modificationMeasure: value})
                                }}
                            >
                                {data.modificationMeasure}
                            </TextareaItem>
                        </View>
                    </View>
                </View> : null}

            <View style={styles.btnWrapper}>
                <Button style={styles.btn} type='primary' onPress={this.onSearch}>
                    确定
                </Button>
            </View>

            <View style={styles.tabWrapper}>
                <View style={styles.tabHeader}>
                    <Text style={styles.tabTd}>填报日期</Text>
                    <Text style={styles.tabTd}>任务进度</Text>
                    <Text style={styles.tabTd}>是否延期</Text>
                </View>
                {this.renderTabBody()}
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
    cameraList: {
        flex: 1,
        flexDirection: 'row-reverse',
        marginLeft: 10,
    },
    cameraContent: {
        flex: 1,
        width: '100%',
        marginRight: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
        width: 80,
        position: 'relative',
        marginRight: 6,
        marginBottom: 4
    },
    delIcon: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    image: {
        width: 80,
        height: 80
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
    },
    tag: {
        marginRight: 6
    }
})

