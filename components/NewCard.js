import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform
} from "react-native";
import { black, white, orange } from "../utils/colors";
import SubmitButton from "./SubmitButton";
import { addNewQuestionAnswer, getDecks } from "../utils/api";
import { NavigationActions } from "react-navigation";

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add Card to ${navigation.state.params.cardTitle}`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const { entries, cardTitle } = navigation.state.params;

    Promise.resolve("Start")
      .then(() =>
        addNewQuestionAnswer({ question, answer }, cardTitle, entries)
      )
      .then(() => getDecks())
      .then(this.resetToDecks)
      .then(this.navigateToIndividualDeck)
      .catch(e => console.log(e));
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

  navigateToIndividualDeck = entries => {
    return new Promise(resolve => {
      const { navigation } = this.props;
      const navigateAction = NavigationActions.navigate({
        routeName: "IndividualDeckView",
        params: {
          entries: entries,
          cardTitle: navigation.state.params.cardTitle
        }
      });

      navigation.dispatch(navigateAction);
      resolve(entries);
    });
  };

  render() {
    const { answer, question } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{"Please enter a question"}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={question => this.setState({ question })}
          value={question}
        />
        <Text style={styles.text}>{"Please enter an answer"}</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={answer => this.setState({ answer })}
          value={answer}
        />

        <SubmitButton
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
          onPress={this.submit}
          title={"Submit"}
        >
          Submit
        </SubmitButton>
      </View>
    );
  }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
  },
  submitButton: {
    borderRadius: 10,
    overflow: "hidden",
    height: 40,
    width: 200,
    backgroundColor: orange,
    margin: 10
  },
  submitButtonText: {
    color: white,
    fontSize: 32,
    textAlign: "center"
  },
  textInput: {
    height: 40,
    width: `${95}%`,
    borderColor: black,
    borderWidth: 1,
    margin: 10
  },
  text: {
    alignItems: "center",
    color: black,
    padding: 10,
    fontSize: 24,
    textAlign: "center"
  }
});

export default NewCard;
