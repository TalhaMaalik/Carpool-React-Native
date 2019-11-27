import React, {Component} from 'react';
import {StyleSheet, View, Alert } from 'react-native';
import {Avatar} from 'react-native-paper'
import { Provider as PaperProvider, List} from 'react-native-paper';
import { Button, ListItem, Text, Icon, Left, Body,Right } from 'native-base';


export default class Sidebar extends Component {

    logout(){

        Alert.alert(
            'Confirmation',
            'Are you sure you want to log out?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {


               // this.deletetoken()
                this.props.navigation.navigate('login')
            
            }},
            ],
            {cancelable: false},
          );
      }
      
    render() {
      return (
        <PaperProvider>
            <View style = {styles.titleView}>
            
            </View>

            <View style = {styles.imageView}>
                <Avatar.Icon size={80} theme = {defaulttheme} icon="account-circle" />
            </View>

            <View style = {styles.infoView}>
                <Text style = {styles.text}>Username</Text>
                <Text style = {styles.text}>Username@nu.edu.pk</Text>
            </View>

            <View style = {styles.menuView}>


           <ListItem  onPress = {() => this.props.navigation.navigate('mainpanelpassenger')}>
           
              <Button transparent >  
                <Icon active name="home" style={styles.icn}/>
              </Button>
            
            <Text>Home</Text>  
           </ListItem>

           <ListItem onPress={() => this.props.navigation.navigate('settings')}>

              <Button transparent >
                <Icon active name="settings" style={styles.icn} />
              </Button>

              <Text>Settings</Text>
          
          </ListItem>

          <ListItem  onPress={() => this.logout()} >
              <Button transparent>
              <Icon name='power-off' type='FontAwesome' style={styles.icn}/>
              </Button>
            
            
              <Text>Log Out</Text>
          </ListItem>
               

            <View style={styles.buttonView}>
                <Button dark style = {styles.btn} onPress={() => this.props.navigation.navigate('vehicleregistration')}> 
                  <Text>Become A Driver</Text>
                </Button>
            </View>
              
            </View>
        </PaperProvider>
        
      );
    }
  }

  const styles = StyleSheet.create({
  
    titleView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    infoView: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
    },

    buttonView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    menuView: {
        flex: 4,
    },

      titleText: {
        color: 'black',
        fontSize: 35,
        fontFamily: 'Montserrat-Light'
      },

    lineStyle:{
        marginTop:10,
    },

    text: {
        fontFamily: 'Montserrat-Bold',
        //color: 'white',
        marginTop:5,
        fontSize: 15
    },

    btn: {
      height: 50,
      width: 200,
      color: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },

    icn: {
      color: 'black'
    }
  });

  const defaulttheme = {
    roundness: 2,
    colors: {
      primary: 'black',
    }
  };
