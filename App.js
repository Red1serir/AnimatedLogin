import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import TESTAPP from './app/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Explore from './screens/Explore'
import Inbox from './screens/Inbox';
import Saved from './screens/Saved'
import Trips from './screens/Trips'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const Tab = createMaterialBottomTabNavigator();
 class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/bg.jpg')]);

    await Promise.all([...imageAssets]);
  }
  

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return(
      <NavigationContainer> 
       <Tab.Navigator>
      <Tab.Screen name="Explore" component={Explore}  options={{tabBarLabel: 'EXPLORE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search-outline" color={tintColor} size={24} />
      )
        
      }
      
      }

      />
      <Tab.Screen name="Saved" component={Saved} options={{ tabBarLabel: 'SAVED',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-heart-outline" color={tintColor} size={24} />
      )}}/>
      <Tab.Screen name="Inbox" component={Inbox} options={{ tabBarLabel: 'INBOX',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="logo-dropbox" color={tintColor} size={24} />
      )}} />
      <Tab.Screen name="Trips" component={Trips} options={{
            tabBarLabel:'TRIPS',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/airbnb.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
      )
      }} />

    </Tab.Navigator>
    </NavigationContainer>
    

      );
  }
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});