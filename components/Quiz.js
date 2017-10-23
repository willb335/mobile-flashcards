import React, { Component } from "react";
import { Text, View, StyleSheet, Platform, Dimensions } from "react-native";
import { black, white, orange } from "../utils/colors";
import SubmitButton from "./SubmitButton";
import { NavigationActions } from "react-navigation";
import { getDecks } from "../utils/api";
import QuizFront from "./QuizFront";
import QuizBack from "./QuizBack";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.cardTitle} Quiz`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  state = { questionNumber: 0, correctAnswers: 0, front: true };

  onRestartQuiz = () => {
    const { navigation } = this.props;
    const { cardTitle } = navigation.state.params;

    clearLocalNotification().then(setLocalNotification);

    Promise.resolve("Start")
      .then(() => getDecks())
      .then(this.resetToDecks)
      .then(this.navigateToQuiz);
  };

  resetToDecks = entries => {
    return new Promise(resolve => {
      const { navigation } = this.props;
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Decks" })]
      });

      navigation.dispatch(resetAction);
      resolve(entries);
    });
  };

  navigateToQuiz = entries => {
    return new Promise(resolve => {
      const { navigation } = this.props;
      const { cardTitle } = navigation.state.params;

      const navigateAction = NavigationActions.navigate({
        routeName: "Quiz",
        params: { entries: entries, cardTitle: cardTitle }
      });

      navigation.dispatch(navigateAction);
      resolve(entries);
    });
  };

  onBackToDeck = () => {
    clearLocalNotification().then(setLocalNotification);

    Promise.resolve("Start")
      .then(() => getDecks())
      .then(this.resetToDecks)
      .then(this.navigateToIndividualDeckView);
  };

  navigateToIndividualDeckView = entries => {
    return new Promise(resolve => {
      const { navigation } = this.props;
      const { cardTitle } = navigation.state.params;

      const navigateAction = NavigationActions.navigate({
        routeName: "IndividualDeckView",
        params: { entries: entries, cardTitle: cardTitle }
      });

      navigation.dispatch(navigateAction);
      resolve(entries);
    });
  };

  onAnswerSubmission = answer => {
    const { entries, cardTitle } = this.props.navigation.state.params;
    const stackQuestions = entries[cardTitle].questions;
    if (answer === true) {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1,
        correctAnswers: prevState.correctAnswers + 1
      }));
    } else {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1
      }));
    }
  };

  onClickQuestionOrAnswer = () => {
    if (this.state.front) {
      this.setState({ front: false });
    } else {
      this.setState({ front: true });
    }
  };

  render() {
    const { questionNumber, correctAnswers, front } = this.state;
    const { navigation } = this.props;
    const { entries, cardTitle } = navigation.state.params;
    const stackQuestions = entries[cardTitle].questions;

    return (
      <View style={styles.container}>
        {front ? (
          <QuizFront
            {...this.state}
            {...this.props}
            entries={entries}
            cardTitle={cardTitle}
            stackQuestions={stackQuestions}
            onCorrectAnswerSubmission={() => this.onAnswerSubmission(true)}
            onIncorrectAnswerSubmission={() => this.onAnswerSubmission(false)}
            onBackToDeck={this.onBackToDeck}
            onRestartQuiz={this.onRestartQuiz}
            onClickQuestionOrAnswer={this.onClickQuestionOrAnswer}
          />
        ) : (
          <QuizBack
            {...this.state}
            {...this.props}
            entries={entries}
            cardTitle={cardTitle}
            stackQuestions={stackQuestions}
            onCorrectAnswerSubmission={() => this.onAnswerSubmission(true)}
            onIncorrectAnswerSubmission={() => this.onAnswerSubmission(false)}
            onBackToDeck={this.onBackToDeck}
            onRestartQuiz={this.onRestartQuiz}
            onClickQuestionOrAnswer={this.onClickQuestionOrAnswer}
          />
        )}
      </View>
    );
  }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: deviceHeight * 0.845,
    width: deviceWidth - 20,
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
});

export default Quiz;
