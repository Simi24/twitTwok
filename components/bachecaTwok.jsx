import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Dimensions, Alert } from 'react-native';

import {React, useState, useEffect, useContext} from 'react';

import TwokRow from './twokRow';

import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

import StorageManager from '../model/storeManager';

const helper = new TwokLoaderHelper()

function BachecaTwok({navigation}){
  
    let[list, setList] = useState(null);
    const[sid, setSid] = useState(null);



    useEffect(() => {handleRequest(), StorageManager.getSid().then(result => setSid(JSON.stringify(result)))}, []);

    async function handleRequest(){
        await helper.createList().then(result =>{setList(list = result)})
    }


    async function handleScroll() {
        await helper.addTwok(list)
        .then(result => 'Twok aggiunti')
    }

    const handleNavigation = (uid) =>{
      navigation.navigate('BachechaUtente', {
        uid: uid,
        sid: sid
      })
    }

    //TODO: controllare il keyextractor, mette due figli con la stessa chiave
    return (
        <SafeAreaView style={styles.container}>
          <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{return <TwokRow data={twok} handleNavigation={handleNavigation}/>}}
            keyExtractor={(twok)=>list[twok]} 
            snapToInterval={(Dimensions.get('window').height - 130)}
            snapToAlignment="start"
            decelerationRate="fast"
            onEndReached={handleScroll}
            //Mi fa la richiesta quando mancano 3 elementi da mostrare
            onEndReachedThreshold={3}
            //onScrollEndDrag={()=>{handleScroll()}}

            />
          <StatusBar style="auto" />

        </SafeAreaView>
      );

}

export default BachecaTwok;

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

//<Button title='Go to bacheca utente' onPress={() => navigation.navigate('BachechaUtente')}></Button>
