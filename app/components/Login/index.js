
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { YellowBox } from 'react-native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import RNFetchBlob from 'rn-fetch-blob';
import { LoginRequest } from '../../API';
import AsyncStorage from '@react-native-community/async-storage';


export default class Login extends Component {

  constructor(props) {

    super(props);

    this.state = {

      email: null,
      password: null,
      progressVisible: false,
      autolog:false

    }

  }

  componentWillMount(){

    this._loadInitialState()

  }

  _loadInitialState = async () => {

    try {
        var value = await AsyncStorage.getItem('session')

        if (value != null) {
          this.props.navigation.navigate('passenger')
          
        }
        
    } catch (error) {
        this.setState({autolog:true})
    }

  }

  requestLogin() {
    var errors = [];
    if (!this.state.email) {
      errors.push("Email field is Empty.")
    }
    else if (this.validateEmail() == 1) {

      errors.push("Email is not NU affiliated.")
    }

    if (!this.state.password) {
      errors.push("Password field is Empty.")
    }

    if (errors.length != 0) {

      Alert.alert(
        'Error Occured',
        errors.join('\n'),
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
    else{
      this.setState({
        progressVisible: true
      })
      
      console.log(this.state.email)
      console.log(this.state.password)
  RNFetchBlob.fetch('POST', LoginRequest, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
    JSON.stringify({
      email: this.state.email,
      password: this.state.password,  
    })
  )
    .then((res) => {
      let text = res.json()
      this.setState({
        progressVisible: false
      })

      if(text.status == 200){
        Alert.alert('Sucesss', "Logging you in", [{ text: 'OK' }], { cancelable: true });
        console.log(res.info().headers.session)
        AsyncStorage.setItem('session', res.info().headers.session);
        this.props.navigation.navigate('passenger')
        
      }
      else{
        Alert.alert('Error', "Invalid Email/Password", [{ text: 'OK' }], { cancelable: true });
      }


    })
    .catch((errorMessage, statusCode) => {
      this.setState({
        progressVisible: false
      })
      Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
    })
    } 

  }

  validateEmail() {

    let reg = /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+nu.edu.pk$/;
    if (reg.test(this.state.email) === false) {
      return 1;
    }
    else {
      return 0;
    }

  }

  render() {
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

    if(this.state.autolog==true){
      return(<View><ProgressDialog visible={this.state.progressVisible} title="Loading" message="Please, wait..." /></View>)
    }
    else{

      return (
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              NUCES Carpool
               </Text>
          </View>
  
          <View style={styles.inputView}>
            <Text style={styles.text}>Enter Your NU mail</Text>
            <TextInput style={styles.inputText} placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
            />
            <Text style={styles.text}>Enter Your Password</Text>
            <TextInput style={styles.inputText} secureTextEntry={true} placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
  
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => this.requestLogin()} style={styles.btn}>
              <Text>Login</Text>
            </TouchableOpacity>
  
            <Text style={styles.textBottom} onPress={() => this.props.navigation.navigate('register')}>
              {"\n"}
              No Account ? {"\n"}
              Register Here
                </Text>
          </View>
          <ProgressDialog visible={this.state.progressVisible} title="Logging" message="Please, wait..." />
        </View>
      );

    }
    
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
    width: 150,
    backgroundColor: 'white',
    fontSize: 14,
    borderWidth: 1,
    
    justifyContent: 'center',
    alignItems: 'center'
  }
});
