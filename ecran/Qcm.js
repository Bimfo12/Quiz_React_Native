import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Ouvrir une base de données existante ou en créer une si elle n'existe pas encore
const db = SQLite.openDatabase('quiz_qcm.db');

const Qcm = ({ navigation }) => {
    const [quizqcm, setQuizQcm] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM questions_quizs',
                [],
                (_, { rows }) => {
                    setQuestions(rows._array);
                    setCurrentQuestionIndex(0);
                    setSelectedOption(null);
                    setQuizQcm(rows._array[0]);
                },
                (_, error) => console.log('Erreur lors de la récupération des questions : ', error)
            );
        });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleValidate = () => {
        const userAnswer = { question: quizqcm.question, selectedOption };
        setUserAnswers([...userAnswers, userAnswer]);

        if (selectedOption === quizqcm.bonneReponse) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setQuizQcm(questions[currentQuestionIndex + 1]);
            setSelectedOption(null);
        } else {
            // Fin du quiz
            setModalVisible(true);
        }
    };

    const handleShowAnswers = () => {
        navigation.navigate('AfficherLesChoix', { userAnswers, questions });
    };

    const handleReturnToHome = () => {
        navigation.navigate('Accueil');
    };

    return (
        <View style={Stylako.container}>
            <Text style={Stylako.titre1}>Question {currentQuestionIndex + 1} :</Text>
            {quizqcm && (
                <View style={Stylako.containerQuiz}>
                    <Text style={Stylako.quizvaovaoQuestion}>{quizqcm.question}</Text>

                    <TouchableOpacity
                        onPress={() => handleOptionSelect(quizqcm.option1)}>
                        <Text style={[Stylako.quizvaovao, selectedOption === quizqcm.option1 ? Stylako.selectedOption : null]}>Option 1: {quizqcm.option1}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleOptionSelect(quizqcm.option2)}>
                        <Text style={[Stylako.quizvaovao, selectedOption === quizqcm.option2 ? Stylako.selectedOption : null]}>Option 2: {quizqcm.option2}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleOptionSelect(quizqcm.option3)}>
                        <Text style={[Stylako.quizvaovao, selectedOption === quizqcm.option3 ? Stylako.selectedOption : null]}>Option 3: {quizqcm.option3}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleOptionSelect(quizqcm.option4)}>
                        <Text style={[Stylako.quizvaovao, selectedOption === quizqcm.option4 ? Stylako.selectedOption : null]}>Option 4: {quizqcm.option4}</Text>
                    </TouchableOpacity>

                    <Button title="Valider" onPress={handleValidate} />
                </View>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={Stylako.centeredView}>
                    <View style={Stylako.modalView}>
                        <Text>Réponses correctes : {correctAnswers}</Text>
                        <Text>Réponses incorrectes : {incorrectAnswers}</Text>
                        <Text>Votre score est :</Text>
                        <Text>{correctAnswers}/{questions.length}</Text>

                        <Pressable onPress={handleShowAnswers}>
                            <Text style={Stylako.quizvaovao}>Voir vos Réponses</Text>
                        </Pressable>
                        <Pressable onPress={handleReturnToHome}>
                            <Text style={Stylako.quizvaovao}>Accueil</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const Stylako = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        flex: 1,
    },
    quizvaovao: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 30,
        margin: '1%',
        fontSize: 17,
        backgroundColor: '#7C4DFF',
    },
    quizvaovaoQuestion: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 30,
        margin: '1%',
        fontSize: 17,
        backgroundColor: '#311B92',
    },
    containerQuiz: {
        marginTop: '5%',
        marginVertical: 5,
    },
    titre1: {
        marginTop: '17%',
        fontSize: 22,
        marginLeft: '15%',
    },
    selectedOption: {
        backgroundColor: 'green',
        fontSize: 17,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Qcm;
