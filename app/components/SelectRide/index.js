

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Picker} from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";
import { Form, Card, CardItem} from "native-base";
import { Searchbar } from 'react-native-paper';


export default class SelectRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined
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
            <Title>Rides List</Title>
          </Body>

          <Right>

          </Right>
        </Header>

        <View style={styles.filters}>
        <Form>
        <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 120}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
        </Picker>
          </Form>

          <Searchbar style={styles.search}
             placeholder="Search by fare"
          />

        </View>
        
          <ScrollView>    
              <Card>
                <CardItem  style={styles.cardtitle}>
                  <Text >Leaving Time</Text>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Ride fair
                    </Text>
                    <Text>
                      Available Seats
                    </Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.cardtitle}>
                  <Text>Route</Text>
                </CardItem>
             </Card>
    
             <Card>
                <CardItem style={styles.cardtitle}>
                  <Text>Leaving Time</Text>
                </CardItem>
                <CardItem>
                <Body style={styles.cardbody}>
                    <Text>
                      Ride fair
                    </Text>
                    <Text>
                      Available Seats
                    </Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.cardtitle}>
                  <Text>Route</Text>
                </CardItem>
             </Card>
    
             <Card>
                <CardItem style={styles.cardtitle}>
                  <Text>Leaving Time</Text>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Ride fair
                    </Text>
                    <Text>
                      Available Seats
                    </Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.cardtitle}>
                  <Text>Route</Text>
                </CardItem>
             </Card>
    
             <Card>
                <CardItem style={styles.cardtitle}>
                  <Text>Leaving Time</Text>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardbody}>
                    <Text>
                      Ride fair
                    </Text>
                    <Text>
                      Available Seats
                    </Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.cardtitle}>
                  <Text>Route</Text>
                </CardItem>
             </Card>
              
            </ScrollView>
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
    
    search: {
       width: 250
    },

    filters: {
      marginTop: 5,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },

    cardbody: {
      justifyContent: 'space-between',
      flexDirection: 'row'
    },

    cardtitle: {
        justifyContent: 'center',
        alignItems: 'center',
    }

  });
  

  

  