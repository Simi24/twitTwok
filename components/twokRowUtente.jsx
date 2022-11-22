import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';


//TODO: controllare la posizione del testo nel twok
//TODO: visualizzare la mappa del twok

//TODO: funzionano il follow unfollow, bisogna settare al valore della props lo stato follow
//ora è ad undefined

function TwokRowUtente(props) {

    console.log('entro nella bacheca che: ', props.followed)
    let [image, setImage] = useState(null)
    let [loading, setLoading] = useState(true)
    const [follow, setFollow] = useState(props.followed)
    console.log('aggiorno il follow', follow)
    
    

    const sid = JSON.parse(props.sid)
    
    

    //mi serve per vedere se l'immagine è una base64, true se non lo è false altrimenti
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    var twok = props.data.item

    let SM = new StorageManager();
    const fontsize = [20, 30, 40];
    const fonttype = ['normal', 'notoserif', 'Roboto'];
    
    useEffect(() => {SM.getUserPicture(twok.uid,
            result =>{setImage(image = (JSON.stringify(result.picture)))},
            error => console.log(error)
        ),handleFollow, handleUnFollow})

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

    

      async function handleFollow() {
          await CommunicationController.follow(sid, twok.uid).catch(e => console.log(e)) 
            setFollow(true)
      }

      async function handleUnFollow () {
        await CommunicationController.unfollow(sid, twok.uid).catch(e => console.log(e))
        setFollow(false)
      }
    
    if(follow === false){
        //SE L'UTENTE NON E' SEGUITO
        if((image == 'null') || (base64regex.test(image))){
            //SE L'UTENTE NON SEGUITO NON HA L'IMMAGINE DEL PROFILO
            return(
                <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                }}>
                <View style={{
                    flex: 1
                }}>
                   <Image
                source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                style={{width: 100, height:100, resizeMode: 'contain'}}
                /> 
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
                <View style={{
                    alignItems: 'center',
                    flex: 1
                    }}>
                    <Button title='Follow' onPress={handleFollow}></Button>
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
            //SE L'UTENTE NON SEGUITO HA L'IMMAGINE
            return (
                <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                }}>
                <View style={{
                    flex: 1
                }}>
                   <Image
                    source={{uri:
                        'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                /> 
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
                <View style={{
                    alignItems: 'center',
                    flex: 1
                    }}>
                    <Button title='Follow' onPress={handleFollow}></Button>
                </View>
            </View>
            <View style={{
                flex: 4
            }}>
               <Text style={styles.textStyle}>{twok.text}</Text> 
            </View>
            
            
        </View> );
        }
    } else {
        //SE L'UTENTE E' SEGUITO
        if((image == 'null') || (base64regex.test(image))){
            //SE L'UTENTE SEGUITO NON HA L'IMMAGINE
            return(
                <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                }}>
                <View style={{
                    flex: 1
                }}>
                   <Image
                source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                style={{width: 100, height:100, resizeMode: 'contain'}}
                />
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
                <View style={{
                    alignItems: 'center',
                    flex: 1
                    }}>
                    <Button title='UnFollow' onPress={handleUnFollow}></Button>
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
            //SE L'UTENTE SEGUITO HA L'IMMAGINE
            return (
                <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                }}>
                <View style={{
                    flex: 1
                }}>
                   <Image
                    source={{uri:
                        'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                /> 
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
                <View style={{
                    alignItems: 'center',
                    flex: 1
                    }}>
                    <Button title='UnFollow' onPress={handleUnFollow}></Button>
                </View>
            </View>
            <View style={{
                flex: 4
            }}>
               <Text style={styles.textStyle}>{twok.text}</Text> 
            </View>
        </View> );
        }
    }


}





export default TwokRowUtente;