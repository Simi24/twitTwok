import { StatusBar } from 'expo-status-bar';
<<<<<<< Updated upstream
import { StyleSheet, Text, View, Button } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function BachechaUtente(){
    return(
        <Text>Siamo nella pagina di BachecaUtente</Text>
=======
import { StyleSheet, Text, View, Button, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import {React, useState, useEffect, Component, useContext} from 'react';

import SeguitiContext from '../context';

import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';
import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

import TwokRowUtente from './twokRowUtente';

import HeaderBachecaUtente from './headerBachecaUtente';


const SM = new StorageManager();
const helper = new TwokLoaderHelper();


function BachechaUtente(props){
    let [list, setList] = useState(null)

    const handleFollowContext = useContext(SeguitiContext)

    console.log('seguiti context', handleFollowContext)
    const uid = JSON.stringify(props.route.params.uid);
    const sid = props.route.params.sid
    

    /* posso leggere il sid così
    const contextType = SeguitiContext
    console.log(contextType)*/

    useEffect(() => {handleRequest()}, []);

    async function handleRequest(){
        setList(await helper.getUserTwoks(uid))
        //console.log(JSON.parse(sid))
        /*let utentiSeguiti = handleFollowContext.seguiti;
        console.log('stampo gli utenti seguiti in bacheca utente', utentiSeguiti)
        for(let i = 0; i < utentiSeguiti.length; i++){
          if(utentiSeguiti[i].uid == uid){
            setFollowed(true)
          } else {
            setFollowed(false)
          }
        }*/
        
    }

    async function handleScroll() {
        await helper.addUserTwok(uid,list)
        .then(result => 'Twok aggiunti')
    }


    
        return(
        <SafeAreaView style={styles.container}>
          <View style={{
            flex:1,
            width: '100%',
            flexDirection: 'row'
          }}>
            <HeaderBachecaUtente sid={sid} uid={uid}></HeaderBachecaUtente>
          </View>
          <View style={{
            flex:4,
            width: '100%'
          }}>
            <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{return <TwokRowUtente data={twok} sid={sid}/>}}
            keyExtractor={(twok)=>list[twok]} 
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            onEndReached={handleScroll}
            //Mi fa la richiesta quando mancano 3 elementi da mostrare
            onEndReachedThreshold={3}
            //onScrollEndDrag={()=>{handleScroll()}}

            />
          </View>
          
          <StatusBar style="auto" />

        </SafeAreaView>     
>>>>>>> Stashed changes
    )
}

export default BachechaUtente;