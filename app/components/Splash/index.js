
import React from 'react';
import { View, Text } from 'react-native';


 export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null
  }



    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { resolve('result') },
            3000
          )
        )
      }
    
      async componentDidMount() {
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
          this.props.navigation.navigate('login');
        }
      }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.titleView}>
             <Text style={styles.titleText}>
                 NUCES Carpool
             </Text>
          </View>
        </View>
      );
    }
  }

  const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
      },
    
      titleView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },

      titleText: {
        color: 'black',
        fontSize: 40,
        fontFamily: 'Montserrat-Light'
      }
  }