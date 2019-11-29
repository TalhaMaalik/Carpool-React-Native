

import React, {Component} from 'react';
import {StyleSheet, View, Picker, TouchableOpacity} from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";
import { Form, Card, CardItem} from "native-base";
import { Searchbar } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import TimePicker from "react-native-24h-timepicker";


export default class ConfirmRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          language: undefined,
          time: "0:00"
        };
    }

    onCancel() {
      this.TimePicker.close();
    }

    onConfirm(hour, minute) {
      this.setState({ time: `${hour}:${minute}` });
      this.TimePicker.close();
    }

    render() {
        var radio_props = [
            {label: 'Male     ', value: "male" },
            {label: 'Female   ', value: "female" },
            {label: 'Any', value: "any" },
          ];
     
      return (
        <View style={styles.container}> 
        <Header style={{backgroundColor: 'black'}}>       
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

        <View style={{marginTop: 20}}>
             <Card>   
                <CardItem>
                  <Body>
                  <Text style={styles.text}>Select Seats Available </Text>
                  <Text></Text>
                   <Picker
                      selectedValue={this.state.language}
                      style={{height: 25, width: 130}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                  </Picker>
          
                  </Body>
                </CardItem>
                

                <CardItem>
                  <Body >
                  <Text style={styles.text}>Enter Amount Per Seat</Text>
                  <Text></Text>
                  <Picker
                      selectedValue={this.state.language}
                      style={{height: 25, width: 130}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
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

                
                <CardItem>
                  <Body >
                  <Text style={styles.text}>Select Leaving Time</Text>
                  <Text></Text>

                  <Text onPress={() => this.TimePicker.open()} style={styles.text} >{this.state.time}  </Text>
                  
                  <TimePicker
                  ref={ref => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.onCancel()}
                  onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                  />
 
                  </Body>
                
                </CardItem>

                <CardItem>
                  <Body style={styles.cardbody}>
                  <Text style={styles.text}>Select Genger Preference</Text>
                  <Text></Text>
          <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                onPress={(value) => {this.setState({gender:value})}}
          />
                  </Body>
                  
                </CardItem>
                <Text></Text>
                <CardItem footer >
                <View style={styles.buttonView}>
                    <Button dark style = {styles.btn}> 
                    <Text>Post Ride Info</Text>
                    </Button>
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

  });
  

  

  