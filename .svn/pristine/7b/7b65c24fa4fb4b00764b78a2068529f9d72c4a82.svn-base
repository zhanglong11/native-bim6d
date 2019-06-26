import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import err from '../../image/img_error.png';

export default class ImageShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageIndex: 1,
        };
    }
    componentWillMount() {
        // 上个界面传来的照片集合
        const params = this.props.navigation.state.params;
        const imageUrls=params.imageUrl;
        let images=[];
        imageUrls.forEach(i=>{
            images.push({
                url:i
            })
        })
        const index = params.index;
        this.setState({
            images,
            imageIndex: index,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageViewer
                    imageUrls={this.state.images} // 照片路径
                    enableImageZoom // 是否开启手势缩放
                    saveToLocalByLongPress={false}
                    index={this.state.imageIndex} // 初始显示第几张
                    failImageSource={err} // 加载失败图片
                    onClick={() => { // 图片单击事件
                        this.props.navigation.pop();
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


