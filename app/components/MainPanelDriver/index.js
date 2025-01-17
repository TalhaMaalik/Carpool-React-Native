

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import {  Header, Title, Button, Icon, Left, Body, Right, Text,Picker} from "native-base";
import  MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { ProgressDialog } from 'react-native-simple-dialogs';



export default class MainPanelDriver extends Component {

  
  constructor(props) {

    super(props)
    global.frompassenger=0


    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      pickup: {
        name: "(Your Location)",
        lat: null,
        lon: null
      },
      dropoff: {
        name: "Enter your dropoff Location",
        lat: null,
        lon: null
      },
      radius:200,
      fetchProcess:0,
      disabled:true

    }


  }

  forceUpdate() {
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.pickupObject) {
        this.setState({
          pickup: {
            name: this.props.navigation.state.params.pickupObject.name,
            lat: this.props.navigation.state.params.pickupObject.lat,
            lon: this.props.navigation.state.params.pickupObject.lon
          },
          region: {
            latitude: this.props.navigation.state.params.pickupObject.lat,
            longitude:this.props.navigation.state.params.pickupObject.lon,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          },

        })

      }

      if (this.props.navigation.state.params.dropoffObject) {
        this.setState({
          dropoff: {
            name: this.props.navigation.state.params.dropoffObject.name,
            lat: this.props.navigation.state.params.dropoffObject.lat,
            lon: this.props.navigation.state.params.dropoffObject.lon
          },
          region: {
            latitude: this.state.pickup.lat,
            longitude:this.state.pickup.lon,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          },
          disabled:false
        })
      }
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          pickup: {
            name: "(Your Location)",
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          fetchProcess:1

        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })


    this.willFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.forceUpdate();
      }
    );
  }


  renderCircle() {
    
    var radius= parseInt(this.state.radius)
    if(this.state.dropoff.lat!=null){
      return  <MapView.Circle 
      center={{
        latitude: this.state.dropoff.lat,
        longitude: this.state.dropoff.lon,
      }}
      radius={radius}
      strokeWidth={2}
      strokeColor="#C21515"
      fillColor="rgba(255,0,0,0.2)"
    />
    }
    return null
   

  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }



  render() {
    global.driverpickup=this.state.pickup
    global.driverdrop= this.state.dropoff

    var radius= 200
    if(this.state.fetchProcess==0){
      return(<View><ProgressDialog animationType="fade" visible={true} title="Fetching Data" message="Please, wait..." /></View>)
    }
    else{
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
            <Title>Ride Location</Title>
          </Body>

          <Right>

          </Right>
        </Header>
        <View style={styles.cardView}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.card}>
              <View style={styles.inputStyle}>
                <TouchableOpacity style={styles.locationButton} onPress={() => { this.props.navigation.navigate('LocationSearchDriver') }}><Text style={{ opacity: 0.8 }}>{this.state.pickup.name}</Text></TouchableOpacity>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.2, width: "100%" }} />
                <TouchableOpacity style={styles.locationButton} onPress={() => { this.props.navigation.navigate('LocationSearchDriver') }}><Text style={{ opacity: 0.8 }}>{this.state.dropoff.name}</Text></TouchableOpacity>

              </View>
            </View>
          </View>
          <View style={styles.buttonCard}>
            <Button disabled={this.state.disabled} full style={styles.goButton} onPress={() => this.props.navigation.navigate('SelectRoute')}><Text style={{ fontSize: 18 }}>Go</Text></Button>
          </View>
          
          <MapView style={styles.map}
            region={this.state.region}
            initialRegion={{
              latitude: 24.910848,
              longitude: 67.074366,
              latitudeDelta: 0.5,
              longitudeDelta: 0.004,
            }}>
            <MapView.Circle 
              center={{
                latitude: this.state.pickup.lat,
                longitude: this.state.pickup.lon,
              }}
              radius={radius}
              strokeWidth={2}
              strokeColor="#3399ff"
              fillColor="rgba(0,0,255,0.2)"
            />
            {this.renderCircle()}
        </MapView>


        </View>
      </View>
      
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    zIndex: 0
  },

  searchbar: {
    width: 200,

  },

  cardView: {
    flex: 1,
  },

  card: {
    flex: 0.35,
    position: 'absolute',
    width: '90%',
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 20,
    borderColor: 'black',
    zIndex: 1,
    backgroundColor: 'white',
    borderWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 5,

  },

  inputStyle: {
    width: '95%',
  },
  locationButton: {
    height: 55,
    justifyContent: "center"
  },
  buttonCard: {
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    left:20,
    width: "100%",
    backgroundColor:"black",
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    width:"90%",
    alignItems:'center',
    alignContent:'center'
  }
    ,

  goButton: {
    height: 65,
    width:"100%",
    

  }

});