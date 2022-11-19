import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';

import * as React from 'react';

function ModificaProfilo(){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Siamo nella pagina in cui modificare il profilo</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ModificaProfilo;