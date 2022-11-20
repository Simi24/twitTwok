import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Dimensions, Alert } from 'react-native';

import {React, useState, useEffect} from 'react';

import TwokRow from './twokRow';

import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

const helper = new TwokLoaderHelper()

//TODO: visualizzare il twok con le opzioni del twok stesso
//TODO:rendere immagine utente o nome cliccabile per andare sull'altra pagina, bacheca utente
function BachecaTwok({navigation}){
  
    let[list, setList] = useState(null);

    useEffect(() => {handleRequest()}, []);

    async function handleRequest(){
        await helper.createList().then(result =>{setList(list = result)})
    }

    async function handleScroll() {
        await helper.addTwok(list)
        .then(result => console.log('tutto procede per il meglio'))
    }

    //TODO: controllare il keyextractor, mette due figli con la stessa chiave
    return (
        <SafeAreaView style={styles.container}>
          <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{return <TwokRow data={twok}/>}}
            keyExtractor={(twok)=>twok.id} 
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