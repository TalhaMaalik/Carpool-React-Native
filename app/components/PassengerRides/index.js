import React, {Component} from 'react';
import {StyleSheet, View,StatusBar,Alert,ScrollView} from 'react-native';
import { Header, Title, Icon, Left, Body, Button, Right, Text} from "native-base";
import { Card, CardItem} from "native-base";
import RNFetchBlob from 'rn-fetch-blob';
import { GetTrips } from '../../API';


export default class PassengerRides extends Component {
    constructor(props) {
        super(props);

        this.state={
            data:[]
        }
        
      }

    componentDidMount(){

        RNFetchBlob.fetch('POST', GetTrips, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            JSON.stringify({
              email: global.email,
              session_id: global.session,
            })
          )
            .then((res) => {
              let text = res.json()
              
                if(text.status==200){
                    this.setState({data:text.data})
                }
                else{
                
                    Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
                }
            })
            .catch((errorMessage, statusCode) => {
                 console.log(errorMessage)
                Alert.alert('Error', "Could not connect to server!", [{ text: 'OK' }], { cancelable: true });
             
            })

    }



    renderList(){

        var array = this.state.data;
        if (array.length==0) {
          return(<View style={{alignItems:'center'}} ><Text>You haven't booked any trip yet.</Text></View>)
        }
        return Object.entries(array).map((v, index) => {
          return (<Card key={index}>
 
            <CardItem >
              <Body style={styles.cardbody}>
              <Text >Plate: {v[1].plate}</Text>
              <Text>Date: {v[1].time.replace("T"," ")}</Text>
              </Body>
            </CardItem>
            <CardItem style={styles.cardtitle}>
            <Text>Start:  {v[1].startLoc}</Text>
            </CardItem>
         </Card>)
        })
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
            <Title>Your Trips</Title>
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
  

  

  
    
    
    
    