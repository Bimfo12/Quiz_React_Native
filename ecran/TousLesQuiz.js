import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz_qcm.db');

const TousLesQuiz = () => {

  const [question, setQuestion] = useState('');
  const [option1, setOptions1] = useState('');
  const [option2, setOptions2] = useState('');
  const [option3, setOptions3] = useState('');
  const [option4, setOptions4] = useState('');
  const [data, setData] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [lastInserted, setLastInserted] = useState(null);

  useEffect(() => {

    // db.transaction(tx => {
    //   tx.executeSql(
    //     'INSERT INTO questions_quizs (question, option1, option2, option3, option4, bonneReponse) VALUES (?, ?, ?, ?, ?, ?)',
    //     ["Myologie :" ,

    //     "Le bilan musculaire clinique (testing) constitue une étude subjective de la force musculaire.  ",

    //       "Les muscles courts sont plus lents que les muscles longs.",

    //       "Une contraction musculaire isotonique entraîne un raccourcissement du muscle.",  

    //       "Une contraction tendineuse isométrique produit un mouvement.",
          
    //       "Les muscles courts sont plus lents que les muscles longs.",],

    //     (_, result) => { 
    //       console.log('Données insérées avec succès !');
    //       alert("Données insérées avec succès !")
    //     },
    //     (_, error) => {
    //       console.log('Erreur lors de l\'insertion des données : ', error);
    //     }
    //   );
    // });

    fetchData();
    fetchLastInserted();
  }, []);

  const fetchData = () => {
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
  };

  const fetchLastInserted = () => {
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
  };

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
          fetchData(); // Rafraîchir les données après l'insertion
        },
        (_, error) => {
          console.log('Erreur lors de l\'insertion de la question : ', error);
          alert("Question n'a pas été insérée avec succès !");
        }
      );
    });
  };

  const handleDeleteQuestion = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM questions_quizs WHERE id = ?',
        [id],
        (_, result) => {
          console.log('Question supprimée avec succès !');
          alert("Question supprimée avec succès !");
          fetchData(); // Rafraîchir les données après la suppression
        },
        (_, error) => {
          console.log('Erreur lors de la suppression de la question : ', error);
          alert("Erreur lors de la suppression de la question !");
        }
      );
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Stylako.container}>

        <Text style={{ marginTop: 20, fontSize: 20 }}>Tout Les Questions</Text>
        {data.map(item => (
          <View key={item.id} style={Stylako.containerQuiz}>
            <Text style={Stylako.quizvaovaoQuestion}>{item.question}</Text>
            <Text style={Stylako.quizvaovao}>Option 1: {item.option1}</Text>
            <Text style={Stylako.quizvaovao}>Option 2: {item.option2}</Text>
            <Text style={Stylako.quizvaovao}>Option 3: {item.option3}</Text>
            <Text style={Stylako.quizvaovao}>Option 4: {item.option4}</Text>
            <Text style={Stylako.quizvaovao}>Réponse correcte: {item.bonneReponse}</Text>
            {/* <Button title="Modifier" onPress={() => handleUpdateQuestion(item.id)} /> */}
            <Button title="Supprimer" onPress={() => handleDeleteQuestion(item.id)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Stylako = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
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
  containerQuiz: {
    marginVertical: 5,
    // height:'15%',
    backgroundColor: 'white',
    width:'70%',
  }
});

export default TousLesQuiz;
