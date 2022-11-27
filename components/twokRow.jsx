import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import CommunicationControlle from '../model/CC';
import StorageManager from '../model/storeManager';

const sid = StorageManager.getSid();



function TwokRow(props) {
    let [image, setImage] = useState(null)
    let [loaded, setLoaded] = useState(false)
    var twok = props.data.item
    let SM = new StorageManager();

    useEffect(() => {handleGetPicture()}, [])

    async function handleGetPicture(){
        SM.getUserPicture(twok.uid,
            result => console.log("L'immagine nella row:", (result.picture)),
            error => console.log(error)
        )
    }
    
    return (<View style={styles.twokStyle}>
        <Text>{twok.uid}</Text>
        <Text style={styles.textStyle}>{twok.text}</Text>
        <Image
        />
    </View> );
}

const styles = StyleSheet.create({
    twokStyle: {
        width: "100%",
        height: Dimensions.get('window').height,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 40,
        fontWeight: "700"
    }
  });

export default TwokRow;