import React from 'react';
import Listanany from './listany/Listanany';
import {TextInput, 
         StyleSheet, 
         Text, 
         View, 
         Image, 
         ScrollView, 
         Dimensions, 
         Button,
         Pressable,
        TouchableOpacity } from 'react-native';



const Accueil = ({navigation}) => {

    const hundlePress = () =>{
       navigation.navigate('Qcm')
    }
    const hundlePress1 = () =>{
       navigation.navigate('Ajoutquiz')
    }
    const hundleToutLesQuiz = () =>{
       navigation.navigate('TousLesQuiz')
    }

  return (
    <View style={Stylako.container}>
       <ScrollView showsVerticalScrollIndicator={false}>

       <View style={Stylako.container}>
            
            <Text style={Stylako.title}>Test de connaissance en Médecine</Text>
            <View>
                <Image source={require('./images.png')} style={Stylako.image} />
                <View style={Stylako.buttonContainer}>
                  <Pressable onPress={hundlePress}>
                    <Text style={Stylako.buttonText}>commencez</Text>
                  </Pressable> 
                </View>
                <View style={Stylako.buttonContainer}>
                  <Pressable onPress={hundlePress1}>
                    <Text style={Stylako.buttonText}>ajouté des Quiz</Text>
                  </Pressable> 
                </View>
                <View style={Stylako.buttonContainer}>
                  <Pressable onPress={hundleToutLesQuiz}>
                    <Text style={Stylako.buttonText}>Supprimer un Quiz</Text>
                  </Pressable> 
                </View>

              </View>

          </View> 
                       
  
        
       </ScrollView>
      </View>
  );
};

const Stylako = StyleSheet.create({
    container:{
        backgroundColor:'lightblue', 
        flex:1,
       },
    entete: {
      height: 80,
      width: "100%",
      backgroundColor: "rgb(60,30,70)",
    },
  
    reniniView: {
      height: "auto",
      width: "100%"
    },
  
    titre: {
      fontSize: "200%",
      color: "red",
      textAlign: "center",
      
    },
  
    contenaire: {
      top: 20,
      width: "90%",
      height: "100%",
    },

    image: {
      width: 200,
      height: 200,
      marginLeft:"25%",
      borderRadius:25,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 50,
      // marginLeft:'15%',
      marginTop:'8%',
      textAlign:"center",
    },
    buttonContainer: {
      marginTop:10,
      width:"70%",
      marginLeft:"15%",
      borderRadius:30,
    },
    buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      padding: 10,
      borderRadius: 30,
      backgroundColor: 'purple',
      fontSize:17,
    }
}
)

export default Accueil;
