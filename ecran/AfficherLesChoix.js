import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';

const AfficherLesChoix = ({ route, navigation }) => {
    const { userAnswers, questions } = route.params;

    const handleReturnToHome = () => {
      navigation.navigate('Accueil');
  };
    return (
        <ScrollView style={styles.container}>
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.question}</Text>
                    {userAnswers[index].selectedOption === question.bonneReponse ? (
                        <Text style={styles.correctAnswer}>{userAnswers[index].selectedOption}</Text>
                    ) : (
                        <View style={styles.incorrectAnswerContainer}>
                            <Text style={styles.incorrectAnswer}>{userAnswers[index].selectedOption}</Text>
                            <Text style={styles.correctAnswer}>La bonne réponse est: {question.bonneReponse}</Text>
                        </View>
                    )}
                </View>
            ))}
                   <Pressable onPress={handleReturnToHome}>
                       <Text style={styles.quizvaovao}>Accueil</Text>
                    </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    questionContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    questionText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    correctAnswer: {
        color: 'green',
        fontWeight: 'bold',
    },
    incorrectAnswerContainer: {
        backgroundColor: 'pink',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
    },
    incorrectAnswer: {
        color: 'red',
        fontWeight: 'bold',
    },
    quizvaovao: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      padding: 10,
      borderRadius: 30,
      margin: '1%',
      fontSize: 17,
      backgroundColor: 'purple',
  },
});

export default AfficherLesChoix;
