import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
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
      scannedBookID: '',
      scannedStudentID: ''
    }
  };


  getCameraPermissions = async (ID)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
     /*status === "granted" is true, then user has granted permission
     status === "granted" is false, then user has not granted permission*/
      hasCameraPermission: status === "granted",
      buttonState: ID,
      scanned: false,
    });
  };


//why need buttonState 'clicked'?
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

            <View>
              <Image 
                source = {require("../assets/booklogo.jpg")}
                style = {{width: 200, height: 200}}
              />
              <Text style = {{textAlign: "center", fontSize: 30}}>WILY</Text>
            </View>
  
            <View style = {styles.inputView}>
              <TextInput 
                  style = {styles.inputBox}
                  placeholder = "Book ID"
                  value = {this.state.scannedBookID}
              />
              <TouchableOpacity 
                style = {styles.scanButton}
                onPress = {()=>{
                this.getCameraPermissions("Book ID")
              }}>
                <Text style = {styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>

            <View style = {styles.inputView}>
              <TextInput 
                  style = {styles.inputBox}
                  placeholder = "Student ID"
                  value = {this.state.scannedStudentID}
              />
              <TouchableOpacity 
                  style = {styles.scanButton}
                  onPress = {()=>{
                  this.getCameraPermissions("Student ID")
                }}>
                  <Text style = {styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
  
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
    backgroundColor: '#60BFB7',
    borderWidth: 1.5,
    borderLeftWidth: 0,
    width: 50,
    justifyContent: "center",
    textAlign: 'center'
  },

  buttonText: {
    fontSize: 20
  },

  inputView: {
    flexDirection: "row",
    margin: 20
  },

  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },

});