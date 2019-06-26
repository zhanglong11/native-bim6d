import React, {Component} from 'react';
import {View, Image, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Icon,
    Tag,
    Button,
    Modal, TextareaItem, InputItem, Toast,
    Radio
} from '@ant-design/react-native';
import ImageSelect from "react-native-image-picker";
import {upload, post} from "../../config/fetch";
import {http, mobileHttp, SYSTEM_URL, BIM_URL, CONSTRUCTION_URL} from "../../config/http";
import TreeSelect from "../components/TreeSelect";
import {treeMaker} from "../../utils/treeMaker";
import {mirrorTo_} from '../../utils/objectFun';
import CheckItem from "../components/CheckItem";

const mirrorToTreeData = mirrorTo_({name: 'title'});
const RadioItem = Radio.RadioItem;

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

const modelId = '1';

export default class QualityAdd extends Component {
    state = {
        projectId: global.projectId,
        modelId: modelId,
        floorId: '',
        floorName: '',
        specialtyId: '',
        specialtyName: '',
        isPublic: '',
        isNotify: '',
        qualityLevel: '',
        remark: '',
        principal: '',
        qualityCheckIssuePrincipalList: [],
        checkPersonName: [],
        itemIds: [],
        itemName: [],
        uriAry: [],
        fileUrl: '',
        fileIds: [],
        specialData: [],
    }

    componentDidMount() {
        this.getFloorData();
        this.getCheckData();
        this.getSpecialData();
        this.getPersonData();
    }

    addData = (param) => {
        post(`${mobileHttp}${CONSTRUCTION_URL}/check/quality/app/issue/add`, param).then(data => {
            console.log(data)
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            Toast.success(data.message)
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
                this.setState({fileIds: uriAry.map(u => u.id)})
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
                this.setState({fileIds: uriAry.map(u => u.id)})
            });
        })
    }

    getFloorData = () => {
        const {projectId} = this.state;
        post(`${http}${BIM_URL}/bim/bimFileSpace/${projectId}/getBuildTree`, {}).then(data => {
            console.log(data.data)
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            this.setState({floorData: data.data})
        })
    }

    getSpecialData = () => {
        post(`${http}${BIM_URL}/bim/bimFileSpecial/listAll`, {parentId: ''}).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            console.log(data.data)
            this.setState({specialData: data.data})
        })
    }

    getPersonData = () => {
        const {projectId} = this.state;
        post(`${http}${SYSTEM_URL}/system/user/list`, {projectId}).then(data => {
            if (data.code !== 200) {
                Toast.fail(data.message);
                return;
            }
            if (data.data.records)
                this.setState({personData: data.data.records})
        })
    }

    getCheckData = () => {
        const {projectId} = this.state;
        post(`${http}/bim6d-construction/check/quality/items/list`, {projectId, modelId, keyword: ''}).then(data => {
            if (data.code == "200") {
                const treeData = data.data.records.map(mirrorToTreeData);
                const _treeData = treeMaker(treeData, {pidKey: 'parentId'});
                this.setState({checkData: _treeData})
            }
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


    setNotice = isNotice => {
        this.setState({isNotify: isNotice ? '1' : null})
    }

    setNoNotice = isNoNotice => {
        this.setState({isNotify: isNoNotice ? '0' : null})
    }

    setPublic = isPublic => {
        this.setState({isPublic: isPublic ? '1' : null})
    }

    setNoPublic = isNoPublic => {
        this.setState({isPublic: isNoPublic ? '0' : null})
    }

    setNormal = isNormal => {
        this.setState({qualityLevel: isNormal ? '0' : null})
    }

    setVip = isVip => {
        this.setState({qualityLevel: isVip ? '1' : null})
    }

    getFloorCheck = checkIds => {
        this.setState({
            floorId: checkIds.join(',')
        })
    }

    getFloorRow = row => {
        this.setState({
            floorName: row.name
        })
    }

    getPersonId = checkIds => {
        this.setState({principal: checkIds.join(',')})
    }

    getPersonName = checkName => {
        this.setState({checkPersonName: checkName})
    }

    getPersonRow = checkRow => {
        this.setState({
            qualityCheckIssuePrincipalList: checkRow.map(c => {
                let o = {};
                o.principal = c.id;
                o.principalName = c.realName;
                return o
            })
        })
    }


    getCheck = (checkIds) => {
        this.setState({
            itemIds: checkIds
        })
    }

    getCheckRow = checkName => {
        this.setState({
            itemName: checkName
        })
    }

    saveFloor = () => {
        console.log(11)
    }

    addQuality = () => {
        const {projectId, modelId, floorId, floorName, specialtyId, specialtyName, isPublic, isNotify, qualityLevel, remark, principal, qualityCheckIssuePrincipalList, itemIds, fileIds} = this.state;
        if (!floorId) {
            Toast.info('请选择楼层');
            return;
        }
        // if (!specialtyId) {
        //     Toast.info('请选择专业');
        //     return;
        // }
        // if (!qualityLevel) {
        //     Toast.info('请选择问题级别');
        //     return;
        // }
        // if (!isPublic) {
        //     Toast.info('请选择是否公布');
        //     return;
        // }
        // if (!isNotify) {
        //     Toast.info('请选择是否通知');
        //     return;
        // }
        // if (!remark) {
        //     Toast.info('请选择备注');
        //     return;
        // }
        // if (!principal) {
        //     Toast.info('请选择责任人');
        //     return;
        // }
        // if (!itemIds) {
        //     Toast.info('请选择检查项');
        //     return;
        // }
        this.addData({
            projectId,
            modelId,
            floorId,
            floorName,
            specialtyId,
            specialtyName,
            isPublic,
            isNotify,
            qualityLevel,
            remark,
            qualityCheckIssuePrincipalList,
            itemIds,
            fileIds
        })
    }

    cancel = () => {
        this.props.navigation.navigate('QualityList');
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

    renderSpecial = () => {
        const {specialData} = this.state;
        if (specialData.length) {
            return specialData.map(p => (<RadioItem
                checked={this.state.specialtyId === p.id}
                key={p.id}
                onChange={event => {
                    if (event.target.checked) {
                        this.setState({specialtyId: p.id, specialtyName: p.name});
                    }
                }}
            >
                {p.name}
            </RadioItem>))
        }
    }

    renderPerson = () => {
        const {personData} = this.state;
        if (personData.records) {
            return personData.records.map(p => (<RadioItem
                checked={this.state.principal === p.id}
                key={p.id}
                onChange={event => {
                    if (event.target.checked) {
                        this.setState({principal: p.id, personName: p.realName});
                    }
                }}
            >
                {p.realName}
            </RadioItem>))
        }
    }


    render() {
        const {itemName} = this.state;
        return (<ScrollView style={styles.wrapper}>
            <View style={styles.item}>
                <Text style={styles.label}>
                    单体楼层:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <TouchableOpacity style={styles.pressOpacity} onPress={() => {
                            this.setState({showModel: true})
                        }}>
                            <Icon name='right'/>
                            <Text>{this.state.floorName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    专业:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <TouchableOpacity style={styles.pressOpacity} onPress={() => {
                            this.setState({showSpecial: true})
                        }}>
                            <Icon name='right'/>
                            <Text>{this.state.specialtyName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    问题级别:
                </Text>
                <View style={styles.listContent}>
                    <Tag
                        style={styles.tag}
                        selected={this.state.qualityLevel == '1'}
                        onChange={this.setVip}>重大隐患</Tag>
                    <Tag
                        style={styles.tag}
                        selected={this.state.qualityLevel == '0'}
                        onChange={this.setNormal}>一般隐患</Tag>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    是否公开:
                </Text>
                <View style={styles.listContent}>
                    <Tag
                        style={styles.tag}
                        selected={this.state.isPublic == '0'}
                        onChange={this.setNoPublic}>否</Tag>
                    <Tag
                        style={styles.tag}
                        selected={this.state.isPublic == '1'}
                        onChange={this.setPublic}>是</Tag>
                </View>
            </View>


            <View style={styles.item}>
                <Text style={styles.label}>
                    是否通知责任人:
                </Text>
                <View style={styles.listContent}>
                    <Tag
                        style={styles.tag}
                        selected={this.state.isNotify == '0'}
                        onChange={this.setNoNotice}>否</Tag>
                    <Tag
                        style={styles.tag}
                        selected={this.state.isNotify == '1'}
                        onChange={this.setNotice}>是</Tag>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    备注:
                </Text>
                <View style={styles.inputWrapper}>
                    <InputItem
                        last
                        style={styles.input}
                        value={this.state.remark}
                        onChange={val => this.setState({remark: val})}
                    />
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    责任人:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <TouchableOpacity style={styles.pressOpacity} onPress={() => {
                            this.setState({showPrincipal: true})
                        }}>
                            <Icon name='right'/>
                            <Text>{this.state.checkPersonName.join(',')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>
                    检查项:
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        <TouchableOpacity style={styles.pressOpacity} onPress={() => {
                            this.setState({showCheck: true})
                        }}>
                            <Icon name='right'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {itemName.length ? <View style={styles.item}>
                <Text style={styles.label}>
                </Text>
                <View style={styles.listContent}>
                    <View style={styles.itemNameContent}>
                        {itemName.map(d => (
                            <View><Text>{d}</Text></View>
                        ))}
                    </View>
                </View>
            </View> : null}


            <View style={styles.item}>
                <TouchableOpacity style={styles.label} onPress={this.onChoosePicker}>
                    <Icon name='camera' size='lg' color='#1890ff'/>
                </TouchableOpacity>

                <View style={styles.listContent}>
                    <View style={styles.itemContent}>
                        {this.renderImage()}
                    </View>
                </View>
            </View>


            <View style={styles.btnWrapper}>
                <Button style={styles.btn} type='primary' onPress={this.addQuality}>
                    确定
                </Button>
                <Button style={styles.btn} onPress={this.cancel}>
                    取消
                </Button>
            </View>


            <Modal
                visible={this.state.showModel}
                title="选择楼层"
                onClose={() => {
                    this.setState({showModel: false})
                }}
                transparent
                maskClosable
            >
                <ScrollView style={{maxHeight: 200}}>
                    <TreeSelect
                        data={this.state.floorData}
                        getSelect={this.getFloorCheck}
                        getSelectRow={this.getFloorRow}
                        showCode='name'
                    />
                </ScrollView>
                <View style={styles.btnWrapper}>
                    <Button style={styles.btn} type='primary' onPress={() => {
                        this.setState({showModel: false})
                    }}>
                        确定
                    </Button>
                </View>
            </Modal>

            <Modal
                visible={this.state.showSpecial}
                title="选择专业"
                onClose={() => {
                    this.setState({showSpecial: false})
                }}
                transparent
                maskClosable
            >
                <ScrollView style={{maxHeight: 200}}>
                    {this.renderSpecial()}
                </ScrollView>
                <View style={styles.btnWrapper}>
                    <Button style={styles.btn} type='primary' onPress={() => {
                        this.setState({showSpecial: false})
                    }}>
                        确定
                    </Button>
                </View>
            </Modal>

            <Modal
                visible={this.state.showPrincipal}
                title="选择负责人"
                onClose={() => {
                    this.setState({showPrincipal: false})
                }}
                transparent
                maskClosable
            >
                <ScrollView style={{maxHeight: 200}}>
                    <CheckItem
                        data={this.state.personData}
                        getSelect={this.getPersonId}
                        getSelectName={this.getPersonName}
                        getSelectRow={this.getPersonRow}
                        showCode='realName'
                        checkCode='realName'
                    />
                </ScrollView>
                <View style={styles.btnWrapper}>
                    <Button style={styles.btn} type='primary' onPress={() => {
                        this.setState({showPrincipal: false})
                    }}>
                        确定
                    </Button>
                </View>
            </Modal>

            <Modal
                visible={this.state.showCheck}
                title="检查项"
                onClose={() => {
                    this.setState({showCheck: false})
                }}
                transparent
                maskClosable
            >
                <ScrollView style={{paddingVertical: 20, maxHeight: 200}}>
                    <TreeSelect
                        multiple
                        data={this.state.checkData}
                        getSelect={this.getCheck}
                        getSelectRow={this.getCheckRow}
                        showCode='title'
                        checkCode='title'
                    />
                </ScrollView>
                <View style={styles.btnWrapper}>
                    <Button style={styles.btn} type='primary' onPress={() => {
                        this.setState({showCheck: false})
                    }}>
                        确定
                    </Button>
                </View>
            </Modal>

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
    itemWrapper: {
        flexDirection: 'row',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6,
    },
    pressOpacity: {
        width: '100%',
        flexDirection: 'row-reverse'
    },
    label: {
        color: '#ccc',
        textAlignVertical: 'center'
    },
    listContent: {
        flex: 1,
        flexDirection: 'row-reverse',
        marginLeft: 10,
    },
    itemNameContent: {
        flex: 1,
        marginLeft: 10,
    },
    itemContent: {
        flex: 1,
        width: '100%',
        marginRight: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    },
    input: {
        borderWidth: 1,
        height: 40,
        borderColor: '#eee',
        fontSize: 14
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
    tag: {
        marginRight: 6,
        // height: 34,
        // paddingVertical: 8,
        // // transform: [{scale: 1.2}],
        // paddingHorizontal: 4
    },
    photo: {
        width: 100,
        height: 100
    },
    inputWrapper: {
        flex: 1
    }
})


