import {useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';


export default function Profile() {

  useEffect(() => {
    console.log("Profile Call ")
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainView: {
    padding: 8,
  }
});