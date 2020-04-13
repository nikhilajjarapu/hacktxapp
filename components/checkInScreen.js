import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";

export function addUser(user){

    response_body = null
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: {'arg1': user },
        queryParams: JSON.stringify({ arg1: user })
    };

    fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/hacktxapp-dufgi/service/add_user/incoming_webhook/webhook0?arg1='+user, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)

          if (data != null){
            alert("User already added!")
          }else{
            alert("User added!")
          }

        }
      );
}

export function checkInScreen() {
  const [value, onChangeText] = React.useState('enter your name here');
  const [textEditable, setTextEditable] = React.useState(true)
  testVarible = ""
  return (
    <React.Fragment>

      <Text style={{marginTop:100, marginLeft:100, fontWeight:"bold", fontSize:20}}>
        Check into HackTexas!
      </Text>

      <TextInput
        style={{ paddingLeft: 5, marginTop: 20, marginLeft: 20, marginRight: 20,
          height: 40, borderColor: 'gray', borderWidth: 1, color: 'gray' }}
        onChangeText={text => testVarible = text}
        value={value => value(value)}
        editable = {textEditable}
      />

      <TouchableOpacity
        onPress={() => addUser(testVarible)}
        style={{ backgroundColor: '#01cdfe', margin: 20, padding: 20, marginRight:130, marginLeft:120 }}>
          <Text style={{ fontSize: 20, color: '#fffb96', fontFamily:'System' }}> submit name </Text>
      </TouchableOpacity>

      <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <QRCode
          content={value ? value : "invalid name"}
          />
      </View>

    </React.Fragment>

  );
}
