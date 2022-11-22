import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import {React, useState, useEffect, Component} from 'react';


import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';
import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

import TwokRowUtente from './twokRowUtente';


const SM = new StorageManager();
const helper = new TwokLoaderHelper();


function BachechaUtente({route, navigation}){
    let [followed, setFollowed] = useState(false)
    let [list, setList] = useState(null)

    const uid = JSON.stringify(route.params.uid);
    const sid = route.params.sid

    useEffect(() => {handleRequest()}, []);

    async function handleRequest(){
        setList(await helper.getUserTwoks(uid))
        //console.log(JSON.parse(sid))
        setFollowed((await CommunicationController.isFollowed(JSON.parse(sid), uid).catch(e => console.log(e))))
        
    }

    async function handleScroll() {
        await helper.addUserTwok(uid,list)
        .then(result => 'Twok aggiunti')
    }


    
        return(
        <SafeAreaView style={styles.container}>
          <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{return <TwokRowUtente data={twok} followed={followed.followed} sid={sid}/>}}
            keyExtractor={(twok)=>list[twok]} 
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            onEndReached={handleScroll}
            //Mi fa la richiesta quando mancano 3 elementi da mostrare
            onEndReachedThreshold={3}
            //onScrollEndDrag={()=>{handleScroll()}}

            />
          <StatusBar style="auto" />

        </SafeAreaView>     
    )
    
}

export default BachechaUtente;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listStyle: {
      width: "100%"
    }
  });