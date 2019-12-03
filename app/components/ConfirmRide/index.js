

import React, { Component } from 'react';
import { StyleSheet, View, Picker, StatusBar,Alert } from 'react-native';
import { Header, Title, Icon, Left, Body, Button, Right, Text } from "native-base";
import { Card, CardItem } from "native-base";
import { BookTrip,CancelTrip} from '../../API';
import RNFetchBlob from 'rn-fetch-blob';


export default class ConfirmRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: 1,
      phone:0,
      complete:0,
      trip:null,
      timer:null
    };
  }



  book(){

    if(this.state.book>this.props.navigation.state.params.data.seats){
      Alert.alert('Error', "Not enough seats available", [{ text: 'OK' }], { cancelable: true });
    }
    else{

      var time=this.props.navigation.state.params.time
      var ride=this.props.navigation.state.params.data.rideId

      
      RNFetchBlob.fetch('POST', BookTrip, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        JSON.stringify({
          email: global.email,
          session_id: global.session,
          time:time,
          ride_id:ride,
          seats:this.state.book
        })
      )
        .then((res) => {
          let text = res.json()


          if(text.status ==200){
            Alert.alert('Successful', "You ride is booked.", [{ text: 'OK' }], { cancelable: true });

            this.setState({complete:1,trip:text.data.trip_id})
            var timer= setTimeout(() => {this.setState({complete: 2})}, 300000)
           
            this.setState({timer:timer})

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

    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel the trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {

          RNFetchBlob.fetch('POST', CancelTrip, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            JSON.stringify({
              email: global.email,
              session_id: global.session,
              tripID:this.state.trip
            })
          )
            .then((res) => {
              let text = res.json()
      
              if(text.status==200){
                this.setState({complete:0})
              }
              else{
                Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
              }
              
            })
            .catch((errorMessage, statusCode) => {
              Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
            })
      
      }},
      ],
      {cancelable: false},
    );

   
  

  }
  componentWillUnmoun (){

    clearInterval()
    
  };
  


  renderButton(){

    if(this.state.complete==0){
      return( <Button style={styles.btn} onPress={()=>{this.book()}}><Text>Book Ride</Text></Button>)
    }
    if(this.state.complete==1){
      return( <Button danger style={styles.btn} onPress={()=>{this.cancel()}}><Text>Cancel</Text></Button>)
    }
    if(this.state.complete==2){
      return( <Button success style={styles.btn} ><Text>Booked</Text></Button>)
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




