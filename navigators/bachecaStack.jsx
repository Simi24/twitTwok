import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BachecaTwok from '../components/bachecaTwok';
import AggiungiTwok from '../components/aggiungiTwok';
import BachechaUtente from '../components/bachecaUtente';
import AreaPersonale from '../components/areaPersonale';

const StackBacheca = createNativeStackNavigator();

export default function BachecaStack(){
    return(
        <StackBacheca.Navigator initialRouteName='BachecaTwok'>
            <StackBacheca.Screen name='BachecaTwok' component={BachecaTwok} options={{headerStyle:styles.bar}}/>
            <StackBacheca.Screen name='BachechaUtente' component={BachechaUtente}/>
        </StackBacheca.Navigator>
    )
}

const styles = StyleSheet.create({
    bar:{
      backgroundColor: '#f4551e'
    }
  })