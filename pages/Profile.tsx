import {useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Button, Image } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { useNavigation } from '@react-navigation/native'

import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export default function Profile() {

  const [cameraPermission, setCameraPermission] = useState<any>(null)
  const [gelleryPermission, setGalleryPermission] = useState<any>(null)

  const [camera, setCamera] = useState<any>(null)
  const [imageUri, setImageUri] = useState<any>(null)
  const [imageBase64, setImageBase64] = useState<any>(null)
  const [type, setType] = useState(CameraType.back)

  const permissionFnc = async () => {
    const camPermisson = await Camera.requestCameraPermissionsAsync()
    setCameraPermission(camPermisson.status === 'granted')

    const galPermission = await  ImagePicker.getMediaLibraryPermissionsAsync()
    setGalleryPermission(galPermission.status === 'granted')

    if (camPermisson.status !== 'granted' && galPermission.status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permission Camera or Gallery Fail!'
      })
    }
  }

  const takePicker = async () => {
    if (camera) {
      const data = await camera.takePickerAsync(null)
      setImageUri(data.uri)
      setImageBase64(data.base64)
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
      base64: true,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
    })
    if (!result.canceled) {
      //console.log("Base64", result.assets[0].base64)
      setImageUri(result.assets[0].uri)
      setImageBase64(result.assets[0].base64)
    }
  }

  const navigation = useNavigation()
  useEffect(() => {
    permissionFnc()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.mainView}>
        
        <Hoshi
          label={'Username'}
          borderColor={'#b76c94'}
          borderHeight={1}
          inputPadding={16}
        />
        <Hoshi
          label={'Password'}
          borderColor={'#b76c94'}
          borderHeight={1}
          inputPadding={16}
          secureTextEntry
        />
        <Button 
        title="Goto Map"
        onPress={() => navigation.navigate('UserMap') }
        />

        <Camera 
          style={{height: 200, width: '100%'}}
          ref={(ref) => setCamera(ref)}
          type={type}
          ratio={'1:1'}
        />
        <Button title="Picture" onPress={takePicker} />
        <Button title="Gallery" onPress={pickImage} />
        {imageUri && <Image  source={{uri: imageUri}} style={{ width: '100%', height: 200 }}/>}
        <Button title='Send' />
        
      </View>
      </ScrollView>
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