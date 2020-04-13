import * as React from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export function adminScreen() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    console.log(data)

    const requestOptions = {
        method: 'POST',
        headers: {'arg1': data },
        queryParams: JSON.stringify({ arg1: data })
    };

    fetch('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/hacktxapp-dufgi/service/get_user/incoming_webhook/webhook0?arg1='+data, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)

          if (data != null){
            alert("Accepted")
          }else{
            alert("Rejected Invalid")
          }

        }
      );
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
