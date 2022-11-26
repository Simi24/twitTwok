import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import SeguitiContext from '../context';

import {React, useState, useEffect, useContext, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UtentiSeguiti from '../components/utentiSeguiti';
import BachechaUtente from '../components/bachecaUtente';



const StackBacheca = createNativeStackNavigator();


export default function SeguitiStack(props){
    console.log('lista di utentei: ', props.followed)
    let lista = props.followed
    const handleFollow = props.handleFollow
    const handleUnFollow = props.handleUnFollow
    console.log('funzioni handle: ', props.handleFollow)

    const context = useContext(SeguitiContext);
    console.log(context)

//TODO: passare la funzione da app a bacheca utente per modificare la lista
    return(
            <StackBacheca.Navigator initialRouteName='UtentiSeguiti'>
                <StackBacheca.Screen name='UtentiSeguiti' component={UtentiSeguiti}/>
                <StackBacheca.Screen name='BachechaUtente' component={BachechaUtente}/>
            </StackBacheca.Navigator>
    )
}