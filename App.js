import {React, useState, useEffect, Component}from 'react';
import { Text, SafeAreaView, StyleSheet, SafeAreaViewBase, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StorageManager from './model/storeManager';

import BachecaStack from './navigators/bachecaStack';
import ProfiloStack from './navigators/areaPersonaleStack'

import AggiungiTwok from './components/aggiungiTwok';
import UtentiSeguiti from './components/utentiSeguiti'
import BachecaTwok from './components/bachecaTwok';
import { createContext } from 'react/cjs/react.production.min';
import CommunicationController from './model/CC';

const Tab = createBottomTabNavigator();

//TODO: guardare il primo avvio dell'app, mi da un sacco di errori nella lista, probabilmente perchè
//non ha ancora scaricato il sid
export default function App() {
const [registered, setRegistered] = useState(false)
const [sid, setSid] = useState(null)

  useEffect(() => {StorageManager.checkFirstRun().then(result  => setRegistered(true)), StorageManager.getSid()
    .then(result => setSid(result))}, []);

  let ContextSid = createContext();

  if(registered == false){
    <SafeAreaView>
      <ActivityIndicator
      size={'big'}
      />
    </SafeAreaView>
  } else {
    return (
        <NavigationContainer>
          <ContextSid.Provider value={sid}>
            <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profilo') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Seguiti') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Aggiungi Twok') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={BachecaStack}/>
        <Tab.Screen name="Seguiti" component={UtentiSeguiti} />
        <Tab.Screen name='Aggiungi Twok' component={AggiungiTwok}/>
        <Tab.Screen name='Profilo' component={ProfiloStack} />
      </Tab.Navigator>
          </ContextSid.Provider>
      
    </NavigationContainer>
      
  );
  }
  
}