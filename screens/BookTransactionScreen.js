import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component {

  constructor(){
    super();

    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    }
  };


  getCameraPermissions = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
     /*status === "granted" is true, then user has granted permission
     status === "granted" is false, then user has not granted permission*/
      hasCameraPermission: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  };

//why need buttonState 'clciked'?
  handleBarcodeScanned = async ({type, data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'clicked'
    });
  };


  render() {
    const hasCameraPermissions = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

//why is hasCameraPermissions (const)?
//don't understand ternary operator on line 53 
    if(buttonState === 'clicked' && hasCameraPermissions){
      return(
          <BarCodeScanner
          onBarCodeScanned = { scanned ? undefined : this.handleBarcodeScanned }
          style = {StyleSheet.absoluteFillObject} />
        );
    }

    else if(buttonState === "normal"){
      return (
          <View style = {styles.container}>
  
            <Text style = {styles.displayText}>
              {hasCameraPermissions === true?
              this.state.scannedData: "request Camera Permission"}
            </Text>
            <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions}>
              <Text style = {styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
  
          </View>
        );
    };
        
  };


}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },

  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },

  buttonText: {
    fontSize: 20
  }

});