import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';

const sid = StorageManager.getSid();



function TwokRow(props) {
    let [image, setImage] = useState(null)
    let [loaded, setLoaded] = useState(false)
    let [nome, setNome] = useState(null)

    var twok = props.data.item
    let SM = new StorageManager();

    useEffect(() => {handleGetPicture()}, [])

    async function handleGetPicture(){
        SM.getUserPicture(twok.uid,
            result =>{console.log('Il risultato nel twokRow', result.name), setImage(image = (result.picture)), setNome(nome = result.name)},
            error => console.log(error)
        )
    }

    if(image == null){
        return(
            <View style={styles.twokStyle}>
        <Text>{nome}</Text>
        <Text style={styles.textStyle}>{twok.text}</Text>
        <Image
        source={require('../images/placeholder_No_Profile_Picture.jpeg')}
        style={{width: 100, height:50, resizeMode: 'contain'}}
        />
    </View>
        )
    } else {
        return (<View style={styles.twokStyle}>
        <Text>{nome}</Text>
        <Text style={styles.textStyle}>{twok.text}</Text>
        <Image
        source={{uri:
            'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
        />
        </View> );
    }

    
    
    
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