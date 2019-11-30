

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Picker,StatusBar} from 'react-native';
import { Container, Header, Title, Icon, Left, Body, Button,Content, Input, Item, Right, Text } from "native-base";
import { Form, Card, CardItem} from "native-base";
import { Searchbar } from 'react-native-paper';
import RadioForm from 'react-native-simple-radio-button';


export default class SelectRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined
        };
      }
      

    render() {
      var radio_props = [
        {label: 'Any     ', value: "1" },
        {label: 'Same', value: "0" }
      ];
     
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
            <Title>Rides List</Title>
          </Body>

          <Right>

          </Right>
        </Header>

        <View style={styles.filters}>
          <View style={{flex:1}}><RadioForm buttonSize={15} buttonColor={'#2196f3'} labelStyle={{fontSize: 15}}  buttonStyle={{color:"black"}}
                   radio_props={radio_props}
                   initial={0}
                   formHorizontal={true}
                   onPress={(value) => {this.setState({gender:value})}}/></View>
          <View style={{flex:1, backgroundColor: '#E8EDEF'}}><Searchbar style={styles.search}placeholder="Maximum fare"/></View>
        </View>
        
          <ScrollView>   
            <View style={{marginTop:10}}>
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
            </View> 
              
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
       width: 250,
       zIndex:0,
       elevation:0
    },

    filters: {
      marginTop: 5,
      justifyContent: 'space-between',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:"center",
      height:60,
      justifyContent: 'center',
      alignItems: "center",
 
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
  

  

  