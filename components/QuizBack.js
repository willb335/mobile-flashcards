import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { black, white, orange } from "../utils/colors";

export default function QuizBack(props) {
  const {
    questionNumber,
    correctAnswers,
    cardTitle,
    entries,
    stackQuestions,
    onCorrectAnswerSubmission,
    onIncorrectAnswerSubmission,
    onBackToDeck,
    onRestartQuiz,
    onClickQuestionOrAnswer
  } = props;

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.counterText}>
          {questionNumber + 1 <= stackQuestions.length
            ? `${questionNumber + 1}/${stackQuestions.length}`
            : `${stackQuestions.length}/${stackQuestions.length}`}
        </Text>
      </View>

      {entries[cardTitle].questions[questionNumber] !== undefined ? (
        <View>
          <View>
            <Text style={styles.text}>
              {entries[cardTitle].questions[questionNumber].answer}
            </Text>
          </View>
          <View>
            <Text
              style={styles.showQuestionText}
              onPress={onClickQuestionOrAnswer}
            >
              Show Question
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: black }]}
              onPress={() => {
                onClickQuestionOrAnswer();
                onCorrectAnswerSubmission();
              }}
            >
              <Text style={styles.submitButtonText}>{"Correct"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: orange }]}
              onPress={() => {
                onClickQuestionOrAnswer();
                onIncorrectAnswerSubmission();
              }}
            >
              <Text style={styles.submitButtonText}>{"Incorrect"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View>
            <Text style={styles.text}>{`You answered ${correctAnswers} of
                ${stackQuestions.length}`}</Text>
          </View>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: black }]}
            onPress={onRestartQuiz}
          >
            <Text style={styles.submitButtonText}>{"Restart Quiz"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: orange }]}
            onPress={onBackToDeck}
          >
            <Text style={styles.submitButtonText}>{"Back to Deck"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  counterText: { fontSize: 28 },
  text: {
    fontSize: 25,
    textAlign: "center",
    margin: 20
  },
  showQuestionText: { color: orange, textAlign: "center", fontSize: 30 },
  submitButton: {
    borderRadius: 10,
    overflow: "hidden",
    height: 40,
    width: 200,
    margin: 10,
    alignSelf: "center"
  },
  submitButtonText: {
    color: white,
    fontSize: 32,
    textAlign: "center"
  }
});
