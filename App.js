import {React, useState, useEffect, Component}from 'react';
import { Text, SafeAreaView, StyleSheet, SafeAreaViewBase } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StorageManager from './model/storeManager';

import BachecaStack from './navigators/bachecaStack';
import ProfiloStack from './navigators/areaPersonaleStack'

import AggiungiTwok from './components/aggiungiTwok';
import UtentiSeguiti from './components/utentiSeguiti'

const Tab = createBottomTabNavigator();


export default function App() {
  useEffect(() => {StorageManager.checkFirstRun()}, []);
  return (
      <NavigationContainer>
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
    </NavigationContainer>
  );
}