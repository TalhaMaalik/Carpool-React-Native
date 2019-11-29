

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity,StatusBar,TextInput,Alert,Text  } from 'react-native';
import { Container, Header, Title, Button, Icon, Left, Body, Content, Textarea, Form, Right,Card, CardItem,Item, Input,Label} from "native-base";
import RNFetchBlob from 'rn-fetch-blob';


export default class LocationSearch extends Component {

    constructor(props){

      super(props)

      this.state={
        pickupLocation:null,
        dropoffLocation:null,
        search:null,
        pickupSearch:0,
        pickupObject:null,
        dropoffObject:null

      }
    }

    locationListener(text,pickup){
        this.setState({
          search:null,
          pickupSearch:pickup,
        })
        if(text.length>=3){
          var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
          
          text= encodeURI(text)
          var region ="&location=24.93201,67.06969&radius=500&key=AIzaSyDcAzMoBi_1fxlaMxrpRcQr-P5vI4YL7Wk&sessiontoken=1234567890"
          url=url+text+region
          
          RNFetchBlob.fetch('GET', url, {'Accept': 'application/json','Content-Type': 'application/json'}).then((res) => {
          
            let text = res.json()

            this.setState({
              search:text.predictions
            }) 
          })
        }
    }

    locationSelect(location){
      this.setState({
        search:null
      })
      if(this.state.pickupSearch ==1 ){
        this.refs.pick.blur()
        this.setState({
          pickupLocation:location
        })
        var locUrl= "https://maps.googleapis.com/maps/api/geocode/json?address="
        var locationEncoded= encodeURI(location)
        var key="&key=AIzaSyDcAzMoBi_1fxlaMxrpRcQr-P5vI4YL7Wk"
        locUrl=locUrl+locationEncoded+key
        RNFetchBlob.fetch('GET', locUrl, {'Accept': 'application/json','Content-Type': 'application/json'}).then((res) => { 
          let text = res.json()
          if(text.status=="OK"){
          var pickupObj={name:location,lat:text.results[0].geometry.location.lat, lon:text.results[0].geometry.location.lng}
          this.setState({pickupObject:pickupObj})}
        })
      

      }
      else{
        this.refs.drop.blur()
        this.setState({
          dropoffLocation:location
        })
        var locUrl= "https://maps.googleapis.com/maps/api/geocode/json?address="
        var locationEncoded= encodeURI(location)
        var key="&key=AIzaSyDcAzMoBi_1fxlaMxrpRcQr-P5vI4YL7Wk"
        locUrl=locUrl+locationEncoded+key
        RNFetchBlob.fetch('GET', locUrl, {'Accept': 'application/json','Content-Type': 'application/json'}).then((result) => { 
          let text = result.json()
          if(text.status=="OK"){
            var dropoffObj={name:location,lat:text.results[0].geometry.location.lat, lon:text.results[0].geometry.location.lng}
            this.setState({dropoffObject:dropoffObj})
            this.props.navigation.navigate("mainpanelpassenger",{ pickupObject: this.state.pickupObject,dropoffObject:this.state.dropoffObject })
          }
         
        })
      }
    }

    logstate(){
      console.log(this.state.dropoffObject)
    }


    mapSearch(){
      var searchArray=this.state.search;
      if(searchArray==null){
        return null
      }
      return Object.entries(searchArray).map((v,index)=>{
        return (<TouchableOpacity onPress={()=>{this.locationSelect(v[1].description.split(',')[0])}} key={index}>
         <View style={styles.locationBlock}> 
           <View style={styles.locationText}>
             <View styles={styles.locationUpperText}><Text style={{fontSize:18}}>{v[1].description.split(',')[0]}</Text></View>
             <View styles={styles.locationLowerText}><Text style={{fontSize:15,opacity:0.5}}>{v[1].description.split(',')[1]}</Text></View>
           </View>
         </View>
         </TouchableOpacity>)})

    }
    
    render() {
     
      return (

        <View style={styles.container}>
        <Header style={{backgroundColor: 'black'}}>   
        <StatusBar backgroundColor="black" barStyle="light-content" />    
          <Left >
            <Button transparent  onPress={() => this.props.navigation.navigate('mainpanelpassenger')}>
              <Icon name='md-arrow-back'  />
            </Button>
          </Left>
          <Body>
            <Title>Search</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        
        <View style={styles.body}>

          <View style={styles.upperBody}>

              <View style={styles.inputContainer}> 

                  <View style={styles.inputBox}><TextInput ref="pick" onChangeText={text => this.locationListener(text,1)} onFocus={()=>{this.setState({pickupLocation:null})}} placeholderTextColor="black" value={this.state.pickupLocation}  placeholder="Your location"/></View>
                  <View style={styles.inputBox}><TextInput ref="drop" onChangeText={text => this.locationListener(text,0)} onFocus={()=>{this.setState({dropoffLocation:null})}} autoFocus={true} value={this.state.dropoffLocation} placeholder="Dropoff location"/></View>

              </View>

          </View>
          
          <View style={styles.lowerBody}>
            <View style={styles.lowerBodyHeader}><Text style={styles.lowerBodyHeaderText}>Locations</Text></View>
            {this.mapSearch()}
              
          </View>
          
        </View>      

        </View>
       
      );
    }
  }

  const styles = StyleSheet.create({
    
    container:{
      flex:1
    },
    body:{
      flex:1
    },
    upperBody:{
      flex:0.22,
      
    },
    lowerBody:{
      flex:0.78
    },
    lowerBodyHeader:{
      height:35,
      backgroundColor:'#e6ebed',
      justifyContent:'center'
    },
    lowerBodyHeaderText:{
      fontSize:15,
      marginLeft:16,
      opacity:0.5

    },
    locationBlock:{
      borderBottomColor: '#A9A9A9', 
      borderBottomWidth:1,
    },
    locationText:{

      height:70,
      justifyContent:'center',
      marginLeft:16

    },
    locationUpperText:{
      fontSize:15

    },
    locationLowerText:{
      fontSize:12,
      opacity:0.5

    },

    inputContainer:{
      flex:1,
      justifyContent: 'center',
      alignItems:"center",
      borderBottomColor: '#A9A9A9', 
      borderBottomWidth:1,
      elevation:1
    },

    inputBox:{
      backgroundColor:'#E8EDEF',
      width:"95%",
      margin:7,
      borderRadius:10,

    }


  });
  

  

  