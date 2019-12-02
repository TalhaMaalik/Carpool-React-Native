

import React, {Component} from 'react';
import {StyleSheet, View, Picker, StatusBar,Alert} from 'react-native';
import { Header, Title, Icon, Left, Body, Button, Right, Text ,DatePicker} from "native-base";
import { Card, CardItem} from "native-base";
import TimePicker from "react-native-24h-timepicker";
import RNFetchBlob from 'rn-fetch-blob';
import { AddRide } from '../../API';


export default class ConfirmRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          time: "0:00",
          chosenDate: new Date(),
          seats:1,
          fees:50,
          booking:0
        };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
      this.setState({ chosenDate: newDate });
    }

    onCancel() {
      this.TimePicker.close();
    }

    onConfirm(hour, minute) {
      this.setState({ time: `${hour}:${minute}` });
      this.TimePicker.close();
    }

    postRide(){
      var seats= this.state.seats
      var fees= this.state.fees
      var time= this.state.time+":00"
      var date= this.state.chosenDate.toDateString()
      var dateformat=date.split(" ")[3]+"-"+"12"+"-"+date.split(" ")[2]
      var email= global.email
      var session= global.session
      var startLocation=global.driverpickup.name
      var endLocation=global.driverdrop.name
      var datetime= dateformat+" "+time
      var points=global.points
      
      if(time=="0:00:00"){
        Alert.alert('Error',"Select time for ride",[{ text: 'OK' }, ],{ cancelable: false });
      }
      else{

      var start={
        lat:global.driverpickup.lat,
        lon:global.driverpickup.lon
      }
      var end={
        lat:global.driverdrop.lat,
        lon:global.driverdrop.lon
      }
      
      points.splice( 0, 0, start );
      points.push(end)

    

        RNFetchBlob.fetch('POST', AddRide, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          JSON.stringify({
            email: email,
            session_id: session,
            seats: seats,
            fee: fees,
            startLocation:startLocation,
            endLocation: endLocation,
            time:datetime,
            locations:points
          })
        )
          .then((res) => {
            let text = res.json()
            
            
            if(text.status==200){
              Alert.alert('Success', "Your ride is posted", [{ text: 'OK' }], { cancelable: true });
              this.setState({booking:1})
            }
            else{
              Alert.alert('Error', "Your inputs are not valid", [{ text: 'OK' }], { cancelable: true });
            }
           
          })
          .catch((errorMessage, statusCode) => {
            
            Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
          })

      }


    }

    cancelBooking(){
      console.log("cancelled")

    }

    renderButton(){

      if(this.state.booking==0){

        return(  <Button style = {styles.btn} onPress={()=>{this.postRide()}}> 
        <Text>Post Ride Info</Text>
        </Button>)

      }
      else{
        return(  <Button success style = {styles.btn} onPress={()=> this.props.navigation.navigate('DriverRides')}> 
        <Text>Go to Booking</Text>
        </Button>)

      }
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
            <Title>Enter Ride Details</Title>
          </Body>

          <Right>

          </Right>
        </Header>

        <View style={{flex:1}}>
             <Card style={{height:'100%'}}>   
                <CardItem style={styles.cardStyle}>
                  <Body>
                  <Text style={styles.text}>Select Seats Available </Text>
                  <Text></Text>
                   <Picker
                      selectedValue={this.state.seats}
                      style={{height: 25, width: 130}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({seats: itemValue})
                    }>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                  </Picker>
          
                  </Body>
                </CardItem>
                

                <CardItem style={styles.cardStyle}>
                  <Body >
                  <Text style={styles.text}>Enter Amount Per Seat</Text>
                  <Text></Text>
                  <Picker
                      selectedValue={this.state.fees}
                      style={{height: 25, width: 130}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({fees: itemValue})
                    }>
                    <Picker.Item label="50 PKR" value="50" />
                    <Picker.Item label="100 PKR" value="100" />
                    <Picker.Item label="150 PKR" value="150" />
                    <Picker.Item label="200 PKR" value="200" />
                    <Picker.Item label="250 PKR" value="250" />
                    <Picker.Item label="300 PKR" value="300" />
                  </Picker>
                  </Body>
                  
                </CardItem>

                
                <CardItem style={styles.cardStyle}>
                  <Body >
                  <Text style={styles.text}>Select Date</Text>
                  <Text></Text>
                  <DatePicker
                  defaultDate={new Date(2019, 11, 3)}
                  minimumDate={new Date(2019, 11, 3)}
                  maximumDate={new Date(2019, 11, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={this.state.chosenDate.toDateString()}
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={this.setDate}
                  disabled={false}
                  />
                  </Body>
                
                </CardItem>

                <CardItem style={styles.cardStyle}>
                  <Body >
                  <Text style={styles.text}>Select Leaving Time</Text>
                  <Text></Text>

                  <Text onPress={() => this.TimePicker.open()} style={{marginLeft:11}}>{this.state.time}  </Text>
                  
                  <TimePicker
                  ref={ref => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.onCancel()}
                  onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                  />
 
                  </Body>
                
                </CardItem>
              
                <Text></Text>
                <CardItem footer >
                <View style={styles.buttonView}>
                  {this.renderButton()}
                </View>
                </CardItem>
             </Card>

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
  
     time: {
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontFamily: 'Montserrat-Light',
        color: 'black',
        fontSize: 20
      },
      cardStyle:{
        backgroundColor:'#f7f7f7',
        borderBottomWidth:1,
        borderBottomColor:'gray'
      }

  });
  

  

  