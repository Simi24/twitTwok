<<<<<<< Updated upstream
import {React, useState, useEffect, Component}from 'react';
import { Text, SafeAreaView, StyleSheet, SafeAreaViewBase } from 'react-native';
=======
import {React, useState, useEffect, Component, createContext}from 'react';
import { Text, SafeAreaView, StyleSheet, SafeAreaViewBase, ActivityIndicator } from 'react-native';
>>>>>>> Stashed changes
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SeguitiContext from './context';

import StorageManager from './model/storeManager';

import BachecaStack from './navigators/bachecaStack';
import ProfiloStack from './navigators/areaPersonaleStack'

import AggiungiTwok from './components/aggiungiTwok';
<<<<<<< Updated upstream
import UtentiSeguiti from './components/utentiSeguiti'

const Tab = createBottomTabNavigator();


export default function App() {
  useEffect(() => {StorageManager.checkFirstRun()}, []);
  return (
      <NavigationContainer>
      <Tab.Navigator
=======

import SeguitiStack from './navigators/seguitiStack';
import CommunicationController from './model/CC';

const Tab = createBottomTabNavigator();

//TODO: guardare il primo avvio dell'app, mi da un sacco di errori nella lista, probabilmente perchè
//non ha ancora scaricato il sid
export default function App() {
const [registered, setRegistered] = useState(false)
const [sid, setSid] = useState(null)
let [seguiti, setSeguiti] = useState(null)

//console.log('Utenti seguiti: ', seguiti)

const SidContext = createContext()

  useEffect(() => {handleSid(), StorageManager.getSid()
    .then(result => setSid(result)),
    CommunicationController.getFollowed(sid)
    .then(result => setSeguiti(result))}, []);

    
  async function handleSid(){
    await StorageManager.checkFirstRun();
    setRegistered(true)
  }


  async function handleFollow(uid) {
    console.log('funzione follow chiamata per utente ', uid)
    await CommunicationController.follow(sid, uid).catch(e => console.log(e));
    setSeguiti(await CommunicationController.getFollowed(sid))
  }

async function handleUnFollow (uid) {
  console.log('funzione unFollow chiamta per utente ', uid)
  await CommunicationController.unfollow(sid, uid).catch(e => console.log(e))
  setSeguiti(await CommunicationController.getFollowed(sid))
}


  if(registered == false){
    <SafeAreaView>
      <ActivityIndicator
      size={'big'}
      />
    </SafeAreaView>
  } else {
    return (
      <SeguitiContext.Provider value={{sid: sid, seguiti: seguiti, handleFollow: handleFollow, handleUnFollow: handleUnFollow}}>
        <NavigationContainer>
            <Tab.Navigator
>>>>>>> Stashed changes
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
          headerShown: false,
          tabBarStyle: 60
        })}
      >
        <Tab.Screen name="Home" component={BachecaStack}/>
        <Tab.Screen name="Seguiti" component={SeguitiStack}/>
        <Tab.Screen name='Aggiungi Twok' component={AggiungiTwok}/>
        <Tab.Screen name='Profilo' component={ProfiloStack} />
      </Tab.Navigator>
<<<<<<< Updated upstream
    </NavigationContainer>
  );
}
=======
      
    </NavigationContainer>
      </SeguitiContext.Provider>
        
  );
  }
  
}
>>>>>>> Stashed changes
