import React, { Component } from 'react';
import { StyleSheet, View,TouchableOpacity, StatusBar, TextInput, Text,Alert,ScrollView } from 'react-native';
import {  Header, Title, Button, Icon, Left, Body, Right} from "native-base";
import RNFetchBlob from 'rn-fetch-blob';

export default class SelectRoute extends Component {

    constructor(props) {

        super(props)
    
        this.state = {
          pickupLocation: null,
          search: null,
          inputSearch: 0,
          pickupObject: null,
          textInput : [],
          points: [],
          objects:[],
          disabled:true
    
        }
      }
    
      locationListener(text) {
        this.setState({
          search: null,
        })
        if(this.state.points.length<5){

          if (text.length >= 3) {
            var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
      
            text = encodeURI(text)
            var region = "&location=24.93201,67.06969&radius=500&key=AIzaSyDcAzMoBi_1fxlaMxrpRcQr-P5vI4YL7Wk&sessiontoken=1234567890"
            url = url + text + region
      
            RNFetchBlob.fetch('GET', url, { 'Accept': 'application/json', 'Content-Type': 'application/json' }).then((res) => {
      
              let text = res.json()
      
              this.setState({
                search: text.predictions
              })
            })
          }
        }
        else{
          Alert.alert('Error', "You can only add upto 5 points", [{ text: 'OK' }], { cancelable: true });

        }
        
      }

    
      locationSelect(location) {
        
        this.setState({
          search: null,
          pickupLocation:location.description.split(',')[0]
        })
         
          var locUrl = "https://maps.googleapis.com/maps/api/geocode/json?place_id="
          var locationEncoded=location.place_id
          var key = "&key=AIzaSyDcAzMoBi_1fxlaMxrpRcQr-P5vI4YL7Wk"
          locUrl = locUrl + locationEncoded + key
          RNFetchBlob.fetch('GET', locUrl, { 'Accept': 'application/json', 'Content-Type': 'application/json' }).then((res) => {
            let text = res.json()
           
            if (text.status == "OK") {
                  let point = [ ...this.state.points ];

                  let obj= {name: location.description.split(',')[0], lat: text.results[0].geometry.location.lat, lon: text.results[0].geometry.location.lng}
                  point.push(obj)
                  this.setState({ points: point })

                  let object = [ ...this.state.objects ]
                  let temp={lat: text.results[0].geometry.location.lat, lon: text.results[0].geometry.location.lng}
                  object.push(temp)
                  this.setState({ objects: object })

                  if(this.state.points.length>0){
                    this.setState({disabled:false})
                  }

                }
            })
    
     
      }
      renderPoints(){
        var points= this.state.points
        if (points.length==0) {
          return (<View><Text>You need atleast 1 pickup point</Text></View>)
        }

        return Object.entries(points).map((v, index) => {
          return (<View key={index} style={{backgroundColor:'#3b5fcc',width:'100%',height:50, flexDirection:"row",alignItems:'center'}}><View style={{flex:0.90}}><Text style={{marginLeft: 16,fontSize:16,color:"white"}}>{v[1].name}</Text></View><View style={{flex:0.1}}><Icon onPress={()=>{this.removeItem(v[0])}} style={{alignItems:'flex-end',color:'red'}} name='close' /></View></View>)
        })

      }

      removeItem(index){
        Alert.alert(
          'Confirmation',
          'Do you want to delete it?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
              
              var array = [...this.state.points];
              array.splice(index, 1);
              this.setState({points:array})

            
          }},
          ],
          {cancelable: false},
        );
      }

      mapSearch() {
        var searchArray = this.state.search;
        if (searchArray == null) {
          return
        }
        return Object.entries(searchArray).map((v, index) => {
          return (<TouchableOpacity onPress={() => { this.locationSelect(v[1]) }} key={index}>
            <View style={styles.locationBlock}>
              <View style={styles.locationText}>
                <View styles={styles.locationUpperText}><Text style={{ fontSize: 18,color:'black'}}>{v[1].description.split(',')[0]}</Text></View>
                <View styles={styles.locationLowerText}><Text style={{ fontSize: 15, opacity: 0.5,color:'black' }}>{v[1].description.split(',')[1]}</Text></View>
              </View>
            </View>
          </TouchableOpacity>)
        })
    
      }

      r
    
      render() {
        global.points=this.state.objects
        return (
          <View style={styles.container}>
            <Header style={{ backgroundColor: 'black' }}>
              <StatusBar backgroundColor="black" barStyle="light-content" />
              <Left >
                <Button transparent onPress={() => this.props.navigation.navigate('mainpaneldriver')}>
                  <Icon name='md-arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>Pickup Points</Title>
              </Body>
              <Right></Right>
               
            </Header>
    
            <View style={styles.body}>
    
              <View style={styles.upperBody}>
    
                <View style={styles.inputContainer}>
    
                  <View style={styles.inputBox}><TextInput onChangeText={text => this.locationListener(text, 0)} onFocus={() => { this.setState({ pickupLocation: null }) }} placeholderTextColor="black" value={this.state.pickupLocation} placeholder="Your location" /></View>
                  {this.renderPoints()}
              
                </View>
                    
              </View>
    
              <View style={styles.lowerBody}>
                <View style={styles.lowerBodyHeader}><Text style={styles.lowerBodyHeaderText}>Locations</Text></View>
                <ScrollView>
                
                {this.mapSearch()}
                </ScrollView>
              </View>

    
            </View>

            <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}><Button disabled={this.state.disabled} onPress={()=>{this.props.navigation.navigate('RideDetailsDriver')}} style={{width:"90%", alignItems:'center',justifyContent:'center',height:60}}><Text style={{color:"white",fontSize:16}}>CONFIRM</Text></Button></View>
           
    
          </View>
    
        );
      }
    }
    
    const styles = StyleSheet.create({
    
      container: {
        flex: 1,
      },
      body: {
        flex: 9
      },
      upperBody: {
      },
      lowerBody: {
      },
      lowerBodyHeader: {
        height: 35,
        backgroundColor: '#e6ebed',
        justifyContent: 'center'
      },
      lowerBodyHeaderText: {
        fontSize: 15,
        marginLeft: 16,
        opacity: 0.5
    
      },
      locationBlock: {
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
      },
      locationText: {
    
        height: 70,
        justifyContent: 'center',
        marginLeft: 16
    
      },
      locationUpperText: {
        fontSize: 15
    
      },
      locationLowerText: {
        fontSize: 12,
        opacity: 0.5
    
      },
    
      inputContainer: {
        justifyContent: 'center',
        alignItems: "center",
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
        elevation: 1
      },
    
      inputBox: {
        backgroundColor: '#E8EDEF',
        width: "95%",
        margin: 7,
        borderRadius: 10,
    
      },

      addButton:{

        width:100,
         height:40,
         justifyContent:'center',
         alignItems:'center'
        
      }
    
    
    });
    
    
    
    
    