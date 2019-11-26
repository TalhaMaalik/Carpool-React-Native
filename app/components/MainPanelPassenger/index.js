

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity,StatusBar,TextInput,Alert } from 'react-native';
import { Container, Header, Title, Button, Icon, Left, Body, Content, Textarea, Form, Right,Card, CardItem,Text,Item, Input,Label} from "native-base";
import MapView from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

export default class MainPanelPassenger extends Component {


    constructor(props){

      super(props)

      this.state={
        region:{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }
       

      }
    }

    componentDidMount(){
      Geolocation.getCurrentPosition(
        position => {
          console.log(position)
          this.setState({ region:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            latitudeDelta:0.003,
            longitudeDelta:0.003,

          }});
        },
        error => console.log(error.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })

    }


    render() {
      
      return (
        <View style={styles.container}> 
        <Header style={{backgroundColor: 'black'}}>   
        <StatusBar backgroundColor="black" barStyle="light-content" />    
          <Left >
            <Button transparent  onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Select Location</Title>
          </Body>

          <Right>

          </Right>
        </Header>
        <View style={styles.cardView}>
        <View style={{alignItems:"center"}}>
        <View style={styles.card}>
            <View style={styles.inputStyle}>
              <TextInput placeholder="Pickup location"/>
              <View style={{borderBottomColor: 'black',borderBottomWidth: 1,opacity:0.2,width:"100%"}}/>
              <TextInput placeholder="Dropoff location"/>
            
            </View>
          </View>
        </View>
      <MapView style={styles.map}
      region={this.state.region}
      initialRegion={{
      latitude: 24.910848,
      longitude: 67.074366,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
      }}/>   
      </View>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      flex: 1,
      zIndex: 0
    },
    
    searchbar : {
      width: 200,
      
    },

    cardView:{
      flex:1,
    },
    
    card:{
      flex:0.30,
      position: 'absolute',
      width:'90%',
      alignItems:'center',
      justifyContent:"center",
      marginTop:20,
      borderColor:'black',
      zIndex: 1,
      backgroundColor:'white',
      borderWidth:0.2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1, 
      elevation:5,
      borderRadius:3
      
    },

    inputStyle:{
      width:'95%',
    }

  });
  

  

  