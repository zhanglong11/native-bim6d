import React, {Component} from 'react';
import {View,Image,ScrollView,Text} from 'react-native';
import { List} from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
export default class ListPage extends Component{

    render() {
        return (
            <ScrollView>
                <List>
                    <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png">
                        thumb
                    </Item>
                </List>
            </ScrollView>
        );
    }
}
