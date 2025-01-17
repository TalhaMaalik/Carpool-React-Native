import React, {Component} from 'react';
import {StyleSheet, View, Alert } from 'react-native';
import {Avatar} from 'react-native-paper'
import { Provider as PaperProvider} from 'react-native-paper';
import { Button, ListItem, Text, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';



export default class Sidebar extends Component {


  deletetoken = async () => {

    try {
           await AsyncStorage.removeItem('session');
        
    } catch (error) {
        console.log("error");
    }

  }

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


                this.deletetoken()
                this.props.navigation.navigate('login')
            
            }},
            ],
            {cancelable: false},
          );
      }

      renderButton(){
        
        if(global.frompassenger==1){

          if(global.isDriver==1){
            return(
            <Button dark style = {styles.btn} onPress={() => this.props.navigation.navigate('mainpaneldriver')}> 
            <Text>Driver Panel</Text>
          </Button>)
          }
          else{
            return(
              <Button dark style = {styles.btn} onPress={() => this.props.navigation.navigate('VehicleRegistration')}> 
              <Text>Register as Driver</Text>
            </Button>)

          }
          
        }
        else{
          return(
            <Button dark style = {styles.btn} onPress={() => this.props.navigation.navigate('mainpanelpassenger')}> 
            <Text>Passenger Panel</Text>
          </Button>)
        }


      }

      renderTrips(){

        if(global.frompassenger==1){
          return(
            <ListItem onPress={() => this.props.navigation.navigate('PassengerRides')}>

              <Button transparent >
                <Icon active name="car" style={styles.icn} />
              </Button>

              <Text>Your Trips</Text>
          
          </ListItem>
         )
        }
        else{
          return(
            <ListItem onPress={() => this.props.navigation.navigate('DriverRides')}>

              <Button transparent >
                <Icon active name="car" style={styles.icn} />
              </Button>

              <Text>Your Rides</Text>
          
          </ListItem>

          )
        }
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
                <Text style = {styles.text}>{global.name}</Text>
                <Text style = {styles.text}>{global.email}</Text>
            </View>

            <View style = {styles.menuView}>


           <ListItem  onPress = {() => this.props.navigation.navigate('mainpanelpassenger')}>
           
              <Button transparent >  
                <Icon active name="home" style={styles.icn}/>
              </Button>
            
            <Text>Home</Text>  
           </ListItem>

           {this.renderTrips()}

          <ListItem  onPress={() => this.logout()} >
              <Button transparent>
              <Icon name='power-off' type='FontAwesome' style={styles.icn}/>
              </Button>
            
            
              <Text>Log Out</Text>
          </ListItem>
               

            <View style={styles.buttonView}>
              {this.renderButton()}
                
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
