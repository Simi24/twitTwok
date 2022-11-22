import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';

const sid = StorageManager.getSid();

//TODO: controllare la posizione del testo nel twok
//TODO: visualizzare la mappa del twok

function TwokRow(props) {
    let [image, setImage] = useState(null)
    let [loading, setLoading] = useState(true)
    
    

    //mi serve per vedere se l'immagine è una base64, true se non lo è false altrimenti
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    var twok = props.data.item

    let SM = new StorageManager();
    const fontsize = [20, 30, 40];
    const fonttype = ['normal', 'notoserif', 'Roboto'];
    
    useEffect(() => {SM.getUserPicture(twok.uid,
            result =>{setImage(image = (JSON.stringify(result.picture)))},
            error => console.log(error)
        )})

    const styles = StyleSheet.create({
        twokStyle: {
            width: "100%",
            height: Dimensions.get('window').height,
            backgroundColor:'#'+twok.bgcol,
            
            flex: 1
        },
        textStyle: {
            fontSize: fontsize[twok.fontsize],
            fontFamily: fonttype[twok.fonttype],
            fontWeight: "700",
            color: '#'+twok.fontcol,
            textAlign: 'left'
        },
      });
    
    const handlePress = () => {
        props.handleNavigation(twok.uid)
    }

    if((image == 'null') || (base64regex.test(image))){
        return(
            <View style={styles.twokStyle}>
        <View style={{
            backgroundColor: 'grey',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            <View>
                <TouchableOpacity onPress={handlePress}>
            <Image
            source={require('../images/placeholder_No_Profile_Picture.jpeg')}
            style={{width: 100, height:100, resizeMode: 'contain'}}
            />
        </TouchableOpacity>
            </View>
            <View style={{
                    flex: 2,
                    textAlign: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                <Text style={{fontSize:30}}>{twok.name}</Text>
            </View>
        </View>
        <View style={{
            flex: 4
        }}>
           <Text style={styles.textStyle}>{twok.text}</Text> 
        </View>
        
        
    </View>
        )
    } else {
        return (
            <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <View>
                  <TouchableOpacity onPress={handlePress}>
           <Image
                source={{uri:
                    'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            /> 
        </TouchableOpacity>  
                </View>
                <View style={{
                    flex: 2,
                    textAlign: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    <Text style={{fontSize:30}}>{twok.name}</Text>
                </View>
              
               
            </View>
            <View style={{
                flex: 4,
                textAlign: 'center',
                textAlignVertical: 'top',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}>
               <Text style={styles.textStyle}>{twok.text}</Text> 
            </View>
            
            
        </View> );
    }

    <TouchableOpacity onPress={handlePress}>
           <Image
                source={{uri:
                    'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            /> 
        </TouchableOpacity>
}



export default TwokRow;