import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Contacte = () => {
  return (
    <View style={Stylako.container}>
      <Text>Contacte</Text>
    </View>
  );
};

const Stylako = StyleSheet.create({
    container:{
        backgroundColor:'lightblue',   
        flex:1,
        justifyContent:'center'
    }
}
)

export default Contacte;
