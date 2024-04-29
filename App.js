import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Accueil from './ecran/Accueil';
import Contacte from './ecran/Contacte';
import Apropos from './ecran/Apropos';
import Ajoutquiz from './ecran/Ajoutquiz';
import Qcm from './ecran/Qcm';
import AfficherLesChoix from './ecran/AfficherLesChoix';
import TousLesQuiz from './ecran/TousLesQuiz';

const Stack = createStackNavigator();

export default function App() {
 
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "slateblue"}, headerTintColor: 'white' }}>
        <Stack.Screen  name="Accueil" component={Accueil} />
        <Stack.Screen  name="Contacte" component={Contacte} />
        <Stack.Screen  name="Apropos" component={Apropos} />
        <Stack.Screen  name="Ajoutquiz" component={Ajoutquiz} options={{title:'Ajouté des Quiz'}}/>
        <Stack.Screen  name="Qcm" component={Qcm} options={{title:'QCM'}}/>
        <Stack.Screen  name="AfficherLesChoix" component={AfficherLesChoix} options={{title:'Affichage Des Choix'}}/>
        <Stack.Screen  name="TousLesQuiz" component={TousLesQuiz} options={{title:'Tous Les Quiz'}}/>
        {/* <Stack.Screen name="Page1" component={Page1} options={{title:'Total Recall'}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
