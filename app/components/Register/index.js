import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import {AsyncStorage,YellowBox} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { ProgressDialog } from 'react-native-simple-dialogs';
import RNFetchBlob from 'rn-fetch-blob';
import { RegisterRequest } from '../../API';




export default class Register extends Component {

    static navigationOptions = {
      header: null
    }
    

    constructor(props){

      super(props);

      this.state={

        name: null,
        email: null,
        password: null,
        phone: null,
        gender: "1",
        progressVisible: false
      }

    }

    requestRegistration(){

      var errors = [];

     


      if (!this.state.name) {
        errors.push("Name field is Empty.")
      }
      if (!this.state.email) {
        errors.push("Email field is Empty.")
      }
      else if (this.validateEmail() == 1) {
  
        errors.push("Email is not NU affiliated.")
      }
  
      if (!this.state.password) {

        errors.push("Password field is Empty.")
      }
      else if(this.state.password.length<6){

        errors.push("Password length is less than 6 character.")
      }
      if (!this.state.phone) {
        errors.push("Phone field is Empty.")
      }
      else if(this.state.phone.length!=11){
        errors.push("Phone is incorrect.")
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
              
          RNFetchBlob.fetch('POST', RegisterRequest, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              phone: this.state.phone,
              gender:this.state.gender
              
            })
          )
            .then((res) => {
              let text = res.json()
              this.setState({
                progressVisible: false
              })

              if(text.title=="success"){

                Alert.alert('Sucesss', "You can now log in", [{ text: 'OK' }], { cancelable: true });

                this.props.navigation.navigate('login')

              }
              else{
                Alert.alert('Error', "You are email address is already registered", [{ text: 'OK' }], { cancelable: true });
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

        var radio_props = [
          {label: 'Male     ', value: "1" },
          {label: 'Female', value: "0" }
        ];
        
        return (
          <View style={styles.container}>
  
            <View style={styles.titleView}>
               
            </View>
    
            <View style={styles.inputView}>
                <Text style={styles.text}>Full Name</Text>
                    <TextInput style={styles.inputText} placeholder={"Enter Name"}
                      onChangeText={text => this.setState({ name: text})}
                    />

                <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.inputText} placeholder="Enter Email"
                      onChangeText={text => this.setState({ email: text})}
                    />
              
                <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.inputText} secureTextEntry={true} placeholder="Enter Password"
                      onChangeText={text => this.setState({ password: text})}
                    />
  
  
                <Text style={styles.text}>Phone Number</Text>
                    <TextInput style={styles.inputText} keyboardType="numeric" placeholder="Enter Phone"
                      onChangeText={text => this.setState({ phone: text})}
                    />

                <Text style={styles.text}>Select Gender</Text>
                <Text></Text>
                <RadioForm
                   radio_props={radio_props}
                   initial={0}
                   formHorizontal={true}
                   onPress={(value) => {this.setState({gender:value})}}
                />
                
            </View>
            
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.btn} onPress={() =>this.requestRegistration()} >
                    <Text>Register</Text>
                </TouchableOpacity>
    
            </View>
            <ProgressDialog visible={this.state.progressVisible} title="Registering" message="Please, wait..." />
          </View>
        );
      }
    }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40
      },
    
      titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      inputView: {
        flex: 12, 
        left: 5,
        right: 5
      },
    
      buttonView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      titleText: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Montserrat-Light'
      },
    
      text: {
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