

import React, {Component} from 'react';
import {StyleSheet, View, Picker} from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";
import { Form, Card, CardItem} from "native-base";
import { Searchbar } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default class ConfirmRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          language: undefined
        };
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
            <Title>Settings</Title>
          </Body>

          <Right>

          </Right>
        </Header>

        <View style={{marginTop: 20}}>
        <Card>
               
                <CardItem>
                  <Body style={styles.cardbody}>
                  <Text style={styles.text}>Select Pickup Range </Text>
                   <Picker
                      selectedValue={this.state.language}
                      style={{height: 25, width: 100}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="1 km" value="1" />
                    <Picker.Item label="2 km" value="2" />
                    <Picker.Item label="3 km" value="3" />
                    <Picker.Item label="4 km" value="4" />
            </Picker>
          
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
                    <Text>Save Settings</Text>
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
    


    cardbody: {
    
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
  

  

  