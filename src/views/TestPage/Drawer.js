import React,{Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button,List,WhiteSpace,Drawer} from "@ant-design/react-native";

export default class DrawerPage extends Component{
    onOpenChange=()=>{
        console.log(11)
    }

    render() {
        const sidebar = (
            <ScrollView>
                <View><Text>111</Text></View>
            </ScrollView>
        );

        return (
            <Drawer
                sidebar={sidebar}
                position="left"
                open={false}
                drawerRef={el => (this.drawer = el)}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="#ccc"
            >
                <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
                    <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
                        Open drawer
                    </Button>
                    <WhiteSpace />
                </View>
            </Drawer>
        );
    }
}
