

import React, { Component } from 'react';
import { StyleSheet, View, Picker, StatusBar,Alert } from 'react-native';
import { Header, Title, Icon, Left, Body, Button, Right, Text } from "native-base";
import { Card, CardItem } from "native-base";
import { BookTrip } from '../../API';
import RNFetchBlob from 'rn-fetch-blob';


export default class ConfirmRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: 1,
      phone:0,
      complete:0
    };
  }

  book(){

    if(this.state.book>this.props.navigation.state.params.data.seats){
      Alert.alert('Error', "Not enough seats available", [{ text: 'OK' }], { cancelable: true });
    }
    else{

      var time=this.props.navigation.state.params.time
      var ride=this.props.navigation.state.params.data.ride_id

      console.log(global.email)
      console.log(global.session)
      console.log(this.props.navigation.state.params.time)
      console.log(this.props.navigation.state.params.data.rideId)
      console.log(this.state.book)
      

      
      RNFetchBlob.fetch('POST', BookTrip, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        JSON.stringify({
          email: global.email,
          session_id: global.session,
          time:time,
          ride_id:ride,
          seats:this.state.seats
        })
      )
        .then((res) => {
          let text = res.json()

          console.log(text)

          if(text.status ==400){
            this.setState({complete:1})


          }
          else{
            Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
          }

          
        })
        .catch((errorMessage, statusCode) => {
          Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
        })
    

    }

  }
  
  cancel(){

    this.setState({complete:0})

  }

  renderButton(){

    if(this.state.complete==0){
      return( <Button style={styles.btn} onPress={()=>{this.book()}}><Text>Book Ride</Text></Button>)
    }
    else{
      return( <Button danger style={styles.btn} onPress={()=>{this.cancel()}}><Text>Cancel Ride</Text></Button>)
    }

  }

  renderPhone(){

    if(this.state.complete==0){
      return
    }
    else{
      return( <CardItem>
        <Body style={styles.cardbody}>
          <Text>Contact Number:</Text>
          <Text>{this.props.navigation.state.params.data.phone}</Text>
        </Body>
      </CardItem>)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: 'black' }}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <Left >
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Confirm Ride</Title>
          </Body>

          <Right>

          </Right>
        </Header>

        <View style={{ flex: 70 }}>
          <Card style={{ elevation: 0, height: '100%' }}>
            <CardItem header style={styles.cardtitle}>
              <Text style={{ fontSize: 30 }}>Ride Details</Text>
            </CardItem>

            <CardItem>
              <Body style={styles.cardbody}>
                <Text>
                  Vehicle Number:
                    </Text>
                <Text>ATF-890</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={styles.cardbody}>
                <Text>Ride fair:</Text>
                <Text>{this.props.navigation.state.params.data.fee}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={styles.cardbody}>
                <Text>Available seats:</Text>
                <Text>{this.props.navigation.state.params.data.seats}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={styles.cardbody}>
                <Text>
                  Number of seats:
                    </Text>

                <Picker
                  selectedValue={this.state.book}
                  style={{ height: 25, width: 80, marginLeft: 180 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ book: itemValue })
                  }>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                </Picker>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={styles.cardbody}>
                <Text>Driver's Gender:</Text>
                <Text>{this.props.navigation.state.params.data.gender == 0 ? "Female" : "Male"}</Text>
              </Body>
            </CardItem>
            {this.renderPhone()}

          </Card>
        </View>
        <View style={styles.buttonView}>
          {this.renderButton()}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },



  cardbody: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  cardtitle: {
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

  buttonView: {
    flex: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',

  },

});




