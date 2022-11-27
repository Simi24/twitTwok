import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';

import * as React from 'react';

function AreaPersonale({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Siamo nella pagina di area personale</Text>
            <Button title='Go To Modifica Profilo' onPress={() => navigation.navigate('ModificaProfilo')}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AreaPersonale;