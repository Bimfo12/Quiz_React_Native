import React,{ Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Listanany extends Component {  
    render(){

    return(
        <View style={{width:100, height:250, marginLeft:20, borderWidth:0.5, borderColor:'#dddddd', marginTop:20}}>
          <View  style={{flex:2}}>
            <Image
             source={this.props.imageUri}
              style={{flex:1, width: null, height: null, resizeMode:'cover'}}
            />
       
        </View>
           <View  style={{flex:1,paddingLeft:10,paddingTop:10, fontSize:30, overflow:'hidden', backgroundColor:'white'}}>
            <Text style={{fontSize:10}}>Auteur : {this.props.Auteur} </Text>
            <Text style={{fontSize:10}}>Titre : {this.props.Titre} </Text> 
           </View> 
        </View>
       
    ); 
}
}

export  default Listanany