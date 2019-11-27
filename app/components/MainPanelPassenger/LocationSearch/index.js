

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity,StatusBar,TextInput,Alert,Text } from 'react-native';
import { Container, Header, Title, Button, Icon, Left, Body, Content, Textarea, Form, Right,Card, CardItem,Item, Input,Label} from "native-base";


export default class LocationSearch extends Component {


  
    render() {
      
      return (

        <View style={styles.container}>
        <Header style={{backgroundColor: 'black'}}>   
        <StatusBar backgroundColor="black" barStyle="light-content" />    
          <Left >
            <Button transparent  onPress={() => this.props.navigation.navigate('mainpanelpassenger')}>
              <Icon name='md-arrow-back'  />
            </Button>
          </Left>
          <Body>
            <Title>Search</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={styles.body}>

          <View style={styles.upperBody}>

              <View style={styles.inputContainer}> 

                  <View style={styles.inputBox}><TextInput placeholder="Pickup location"/></View>
                  <View style={styles.inputBox}><TextInput placeholder="Dropoff location"/></View>

              </View>

          </View>

          <View style={styles.lowerBody}>
            <View style={styles.lowerBodyHeader}><Text style={styles.lowerBodyHeaderText}>Locations</Text></View>
            <View style={styles.locationBlock}> 
              <View style={styles.locationText}>
                <View styles={styles.locationUpperText}><Text style={{fontSize:18}}>Perfume Chowk</Text></View>
                <View styles={styles.locationLowerText}><Text style={{fontSize:15,opacity:0.5}}>Gulistan-E-Jauhar block 18</Text></View>
              </View>
            </View>
            <View style={styles.locationBlock}> 
              <View style={styles.locationText}>
                <View styles={styles.locationUpperText}><Text style={{fontSize:18}}>Johar Chowrangi</Text></View>
                <View styles={styles.locationLowerText}><Text style={{fontSize:15,opacity:0.5}}>Gulistan-E-Jauhar block 15</Text></View>
              </View>
            </View>
            <View style={styles.locationBlock}> 
              <View style={styles.locationText}>
                <View styles={styles.locationUpperText}><Text style={{fontSize:18}}>Quaidabaad</Text></View>
                <View styles={styles.locationLowerText}><Text style={{fontSize:15,opacity:0.5}}>Malir</Text></View>
              </View>
            </View>

          

          </View>

        </View>



        </View>
       
      );
    }
  }

  const styles = StyleSheet.create({
    
    container:{
      flex:1
    },
    body:{
      flex:1
    },
    upperBody:{
      flex:0.22,
      
    },
    lowerBody:{
      flex:0.78
    },
    lowerBodyHeader:{
      height:35,
      backgroundColor:'#e6ebed',
      justifyContent:'center'
    },
    lowerBodyHeaderText:{
      fontSize:15,
      marginLeft:16,
      opacity:0.5

    },
    locationBlock:{
      borderBottomColor: '#A9A9A9', 
      borderBottomWidth:1,
    },
    locationText:{

      height:70,
      justifyContent:'center',
      marginLeft:16

    },
    locationUpperText:{
      fontSize:15

    },
    locationLowerText:{
      fontSize:12,
      opacity:0.5

    },

    inputContainer:{
      flex:1,
      justifyContent: 'center',
      alignItems:"center",
      borderBottomColor: '#A9A9A9', 
      borderBottomWidth:1,
      elevation:1
    },

    inputBox:{
      backgroundColor:'#E8EDEF',
      width:"95%",
      margin:7,
      borderRadius:10,

    }


  });
  

  

  