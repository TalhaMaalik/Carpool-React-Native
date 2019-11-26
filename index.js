/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';


export default function Main() {
    return (
    
      <StyleProvider style={getTheme(material)}>
       <App />
      </StyleProvider>
    
    );
  }


AppRegistry.registerComponent(appName, () => App);
