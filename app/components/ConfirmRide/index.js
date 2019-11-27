

import React, {Component} from 'react';
import {StyleSheet, View, Picker} from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";
import { Form, Card, CardItem} from "native-base";
import { Searchbar } from 'react-native-paper';


export default class ConfirmRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          language: undefined
        };
      }

    render() {
     
      return (
        <View style={styles.container}> 
        <Header style={{backgroundColor: 'black'}}>       
          <Left >
            <Button transparent  onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Confirm Ride</Title>
          </Body>

          <Right>

          </Right>
        </Header>

        <View style={{marginTop: 20}}>
        <Card>
                <CardItem  header style={styles.cardtitle}>
                  <Text style={{fontSize: 30}}>Ride Details</Text>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Driver name:
                    </Text>
                    <Text>
                      XYZ
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Vehicle Number:
                    </Text>
                    <Text>
                      123
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Ride fair:
                    </Text>
                    <Text>
                      123
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Available seats:
                    </Text>
                    <Text>
                      4
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Number of seats:
                    </Text>
                    <Picker
                      selectedValue={this.state.language}
                      style={{height: 25, width: 80}}
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
                  <Body style={styles.cardbody}>
                    <Text>
                      Route:
                    </Text>
                    <Text>
                      abc
                    </Text>
                  </Body>
                </CardItem>

                <CardItem footer >
                <View style={styles.buttonView}>
                    <Button dark style = {styles.btn}> 
                    <Text>Book Ride</Text>
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

  });
  

  

  