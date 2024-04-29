import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text,ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Ouvrir une base de données existante ou en créer une si elle n'existe pas encore
const db = SQLite.openDatabase('quiz_qcm.db');

const Ajoutquiz = () => {

    const [question, setQuestion] = useState('');
    const [option1, setOptions1] = useState('');  
    const [option2, setOptions2] = useState('');
    const [option3, setOptions3] = useState('');
    const [option4, setOptions4] = useState('');
    const [data, setData] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [lastInserted, setLastInserted] = useState(null);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS questions_quizs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    question TEXT,
                    option1 TEXT,
                    option2 TEXT,
                    option3 TEXT,
                    option4 TEXT,
                    bonneReponse TEXT
                );`,
                [],
                () => console.log('Table questions_quizs créée avec succès'),
                (_, error) => console.log('Erreur lors de la création de la table : ', error)
            );
        });

        // Récupération des données depuis la base de données
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM questions_quizs',
                [],
                (_, { rows }) => {
                    setData(rows._array);
                },
                (_, error) => console.log('Erreur lors de la récupération des données : ', error)
            );
        });

                // Récupération de la dernière question ajoutée
                db.transaction(tx => {
                  tx.executeSql(
                      'SELECT * FROM questions_quizs ORDER BY id DESC LIMIT 1',
                      [],
                      (_, { rows }) => {
                          setLastInserted(rows._array[0]);
                      },
                      (_, error) => console.log('Erreur lors de la récupération de la dernière question ajoutée : ', error)
                  );
              });
    }, [question, option1, option2, option3, option4]);

    const handleInsertQuestion = () => {
      db.transaction(tx => {
          tx.executeSql(
              'INSERT INTO questions_quizs (question, option1, option2, option3, option4, bonneReponse) VALUES (?, ?, ?, ?, ?, ?)',
              [question, option1, option2, option3, option4, correctAnswer],
              (_, result) => {
                  console.log('Question insérée avec succès !');
                  alert("Question insérée avec succès !");
                  setLastInserted({
                      question,
                      option1,
                      option2,
                      option3,
                      option4,
                      bonneReponse: correctAnswer
                  });
                  setQuestion('');
                  setOptions1('');
                  setOptions2('');
                  setOptions3('');
                  setOptions4('');
                  setCorrectAnswer('');
              },
              (_, error) => {
                  console.log('Erreur lors de l\'insertion de la question : ', error);
                  alert("Question n'a pas été insérée avec succès !");
              }
          );
      });
  };
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Stylako.container}>
        <View style={Stylako.formulaire}>
            <TextInput
                placeholder="Question"
                value={question}
                onChangeText={text => setQuestion(text)}
                style={Stylako.input}
            />
            <TextInput
                placeholder="option1"
                value={option1}
                onChangeText={text => setOptions1(text)}
                style={Stylako.input}
            />
            <TextInput
                placeholder="option2"
                value={option2}
                onChangeText={text => setOptions2(text)}
                style={Stylako.input}
            />
            <TextInput
                placeholder="option3"
                value={option3}
                onChangeText={text => setOptions3(text)}
                style={Stylako.input}
            />
            <TextInput
                placeholder="option4" 
                value={option4}
                onChangeText={text => setOptions4(text)}
                style={Stylako.input}
            />
            <TextInput
                placeholder="Réponse correcte"
                value={correctAnswer}
                onChangeText={text => setCorrectAnswer(text)}
                style={Stylako.input}
            />
            <Button
                title="Insérer question"
                onPress={handleInsertQuestion}
            />
          </View>
            <Text style={{marginTop: 20, fontSize: 20}}>Dernière question ajoutée :</Text>
            {lastInserted && (
                <View style={Stylako.containerQuiz}>
                    <Text style={Stylako.quizvaovaoQuestion}>{lastInserted.question}</Text>
                    <Text style={Stylako.quizvaovao}>Option 1: {lastInserted.option1}</Text>
                    <Text style={Stylako.quizvaovao}>Option 2: {lastInserted.option2}</Text>
                    <Text style={Stylako.quizvaovao}>Option 3: {lastInserted.option3}</Text>
                    <Text style={Stylako.quizvaovao}>Option 4: {lastInserted.option4}</Text>
                    <Text style={Stylako.quizvaovao}>Réponse correcte: {lastInserted.bonneReponse}</Text>
                </View>
            )}
        </View>
    </ScrollView>
    );
};

const Stylako = StyleSheet.create({
    container:{
        backgroundColor:'lightblue',   
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 300,
        
    },
    quizvaovao: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#7C4DFF',
        margin: '1%'
      },
      quizvaovaoQuestion: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 30,
        margin: '1%',
        backgroundColor: '#311B92',
      },
    containerQuiz:{
      marginVertical: 5,
      backgroundColor:'white',
      width:'70%',
    },
    formulaire: {
      width:'80%',
      marginTop:'10%',
  
    }
});

export default Ajoutquiz;
