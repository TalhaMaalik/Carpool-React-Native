
import React, { Component } from 'react';
import { StyleSheet, View, TextInput,Alert} from 'react-native';
import { AsyncStorage, YellowBox } from 'react-native';
import {  Button, Text } from "native-base";
import { SetDriverRequest } from '../../API';
import { ProgressDialog } from 'react-native-simple-dialogs';
import RNFetchBlob from 'rn-fetch-blob';

export default class Login extends Component {

  constructor(props) {

    super(props)


    this.state = {
      desc:null,
      plate:null,
      year:null,
      progressVisible: false,

    }

  }

  requestRegister(){

    var errors = [];
    if (!this.state.desc) {
      errors.push("Name field is empty.")
    }
    if (this.validatePlate() == 1) {
      errors.push("Plate field is invalid(format: XXX-000)")
    }
    
    if (!this.state.year || this.state.year.length!=4 || (this.state.year>2020 || this.state.year<1980)) {
      errors.push("Year field is invalid")
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
    else {
      this.setState({
        progressVisible: true
      })

      RNFetchBlob.fetch('POST', SetDriverRequest, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        JSON.stringify({
          email: global.email,
          session_id: global.session,
          model: this.state.year,
          description:this.state.desc,
          plate:this.state.plate
        })

      )
        .then((res) => {
          let text = res.json()
          this.setState({
            progressVisible: false
          })
          if (text.status == 200) {
            console.log("here")
            Alert.alert('Sucesss', "Registered", [{ text: 'OK' }], { cancelable: true });
            global.isDriver=1
            this.props.navigation.navigate('mainpagedriver')

          }
          else {
            Alert.alert('Error', "Invalid Details", [{ text: 'OK' }], { cancelable: true });
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

  validatePlate() {

    let reg = /^[A-Za-z]{3}-[0-9]{3}$/;
    if (reg.test(this.state.plate) === false) {
      return 1;
    }
    else {
      return 0;
    }

  }
  


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Register Vehicle
             </Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.text}>Enter Your Vehicle Name</Text>
          <TextInput style={styles.inputText}  onChangeText={text => this.setState({ desc: text })} placeholder="Vehicle name"/>
          <Text style={styles.text}>Enter Your Vehicle Plate</Text>
          <TextInput style={styles.inputText}  onChangeText={text => this.setState({ plate: text })}  placeholder="Vehicle plate"/>
          <Text style={styles.text}>Enter your Manufacture Year</Text>
          <TextInput style={styles.inputText} keyboardType='numeric'  onChangeText={text => this.setState({ year: text })} placeholder="Vehicle year(eg: 2019)"/>
        </View>

        <View style={styles.buttonView}>
        <View style={styles.buttonView}>
        <Button dark style = {styles.btn}  onPress={() => this.requestRegister()} > 
          <Text>Register</Text>
        </Button>
        </View>

        </View>
        <ProgressDialog visible={this.state.progressVisible} title="Processing" message="Please, wait..." />
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
