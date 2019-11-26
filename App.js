/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import React, {Component} from 'react';
import {createDrawerNavigator } from 'react-navigation-drawer';
import Login from './app/components/Login';
import Register from './app/components/Register';
import MainPanelPassenger from './app/components/MainPanelPassenger'
import Sidebar from './app/components/Sidebar'
import MainPanelDriver from './app/components/MainPanelDriver'
import Splash from './app/components/Splash'
import VehicleRegistration from './app/components/VehicleRegistration'


export {
  App
}
class App extends Component {


  render() {
    return (
      <Appstack/>
    );
  }
}

const StackNavigator = createStackNavigator({
    login: Login, 
    register: Register, 
}, 
{
  defaultNavigationOptions: {
    header: null
  }, 
}); 

const Stackwithdrawerpassenger = createStackNavigator({
  mainpanelpassenger : MainPanelPassenger,

}, 
{
  defaultNavigationOptions: {
    header: null,
  },
});

const Stackwithdrawerdriver = createStackNavigator({
  mainpaneldriver : MainPanelDriver,
  vehicleregistration : VehicleRegistration,
}, 
{
  defaultNavigationOptions: {
    header: null,
  },
});

const DrawerNavigatorpanel1 = createDrawerNavigator(
  {
    panel1: Stackwithdrawerpassenger,
    
  },{
    contentComponent: Sidebar,
  }
);

const DrawerNavigatorpanel2 = createDrawerNavigator(
  {
    
    panel2: Stackwithdrawerdriver
  },{
    contentComponent: Sidebar,
  }
);


const SwitchNavigator = createSwitchNavigator(
  {
    splash: Splash,
    login_register: StackNavigator,
    passenger: DrawerNavigatorpanel1,
    driver: DrawerNavigatorpanel2,

  },
  {
    initialRouteName: 'splash',
  }
); 

export default appContainer =  createAppContainer(SwitchNavigator)
