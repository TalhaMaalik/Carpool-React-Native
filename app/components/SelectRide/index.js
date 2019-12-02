

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView,StatusBar,TouchableOpacity} from 'react-native';
import { Header, Title, Icon, Left, Body, Button, Right, Text } from "native-base";
import { Card, CardItem} from "native-base";
import { Searchbar } from 'react-native-paper';
import RadioForm from 'react-native-simple-radio-button';
import { GetRides } from '../../API';
import RNFetchBlob from 'rn-fetch-blob';


export default class SelectRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          data:[],
          time:null
        };
      }
      

      componentDidMount(){

        var radius=global.radius
        var pickup=global.passengerpickup
        var dropoff=global.passengerdropoff
        radius=radius/1000
        var date= new Date()
        var datetime=date.toDateString()
        var time= date.toTimeString()
        datetime= datetime.split(" ")[3]+"-"+"12"+"-"+datetime.split(" ")[2]+" "+time.split(" ")[0]
        var email=global.email
        var session=global.session
        this.setState({time:datetime})
        RNFetchBlob.fetch('POST', GetRides, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          JSON.stringify({
            email: email,
            session_id: session,
            time:datetime,
            radius: radius,
            pickUp: pickup,
            dropOff: dropoff
          })
        )
          .then((res) => {
            let text = res.json()
            console.log(text)
            if(text.status==200){
              this.setState({data:text.data})
            }
            else{
              Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
            }
           
          })
          .catch((errorMessage, statusCode) => {
            
            Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
          })
      }

      renderList(){

        var array = this.state.data;
        if (array.length==0) {
          return(<View style={{alignItems:'center'}} ><Text>No Rides found.</Text></View>)
        }
        return Object.entries(array).map((v, index) => {
          return (<TouchableOpacity key={v}  onPress={()=> this.props.navigation.navigate('confirmride',{data:v[1],time:this.state.time})}><Card>
            <CardItem  style={styles.cardtitle}>
            <Body style={styles.cardbody}>
                <Text>
                 Fee: {v[1].fee}
                </Text>
                
              </Body>
            </CardItem>
            <CardItem>
              <Body style={styles.cardbody}>
                <Text>
                Time: {v[1].time.replace("T"," ").split(" ")[1].slice(0,5)} - {v[1].time.replace("T"," ").split(" ")[0]}
                </Text>
                
              </Body>
            </CardItem>
            <CardItem style={styles.cardtitle}>
            <Body style={styles.cardbody}>
                <Text>
                 From: {v[1].startLoc}
                </Text>
                
              </Body>          
            </CardItem>
            <CardItem style={styles.cardtitle}>
            <Body style={styles.cardbody}>
                <Text>
                 Available Seats: {v[1].seats}
                </Text>
                
              </Body>          
            </CardItem> 
         </Card></TouchableOpacity>)
        })
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

        
          <ScrollView>   
            <View style={{marginTop:10}}>
              {this.renderList()}
             
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
  

  

  