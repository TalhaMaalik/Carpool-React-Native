
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import { AsyncStorage, YellowBox } from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";

export default class Login extends Component {
  render() {
    

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Register Your Vehicle
             </Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.text}>Enter Your Vehicle Name</Text>
          <TextInput style={styles.inputText} placeholder="vehicle name"
            
          />
          <Text style={styles.text}>Enter Your Vehicle Number</Text>
          <TextInput style={styles.inputText}  placeholder="vehicle number"
            
          />
        </View>

        <View style={styles.buttonView}>
        <View style={styles.buttonView}>
        <Button dark style = {styles.btn}  onPress={() => this.props.navigation.navigate('mainpaneldriver')} > 
          <Text>Register</Text>
        </Button>
        </View>

        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },

  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputView: {
    flex: 3,
    top: 0,
    left: 5,
    right: 5
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'Montserrat-Light'
  },

  text: {
    fontFamily: 'Montserrat-Light',
    color: 'black',
    fontSize: 15
  },

  textBottom: {
    fontFamily: 'Montserrat-Light',
    color: 'black',
    fontSize: 15
  },

  inputText: {
    height: 36,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 14,
    borderWidth: 1,
   
    backgroundColor: 'white',
  },

  btn: {
    height: 50,
    width: 200,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
