

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";
import MapView from 'react-native-maps';
import { Appbar , Provider as PaperProvider , Dialog, Portal} from 'react-native-paper';


export default class MainPanelDriver extends Component {

    render() {
     
      return (
        <View style={styles.container}> 
        <Header style={{backgroundColor: 'black'}}>       
          <Left >
            <Button transparent  onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Select Route</Title>
          </Body>

          <Right>

          </Right>
        </Header>


      <MapView style={styles.map}
      initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}/>
       
      </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      flex: 1
    },

    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     },
    
    btn: {
        height: 50,
        width: 200,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
  });
  

  

  