import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { black, white, orange } from "../utils/colors";
import SubmitButton from "./SubmitButton";
import { getDecks, saveDeckTitle } from "../utils/api";
import { NavigationActions } from "react-navigation";

class NewDeck extends Component {
  state = { text: "" };

  submit = () => {
    const { text } = this.state;
    Promise.resolve(text)
      .then(saveDeckTitle)
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
        params: { entries: entries, cardTitle: this.state.text }
      });
      this.setState({ text: "" });

      navigation.dispatch(navigateAction);
      resolve(entries);
    });
  };

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{"What is the title of your new deck?"}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
          value={text}
        />

        <SubmitButton
          textStyle={[styles.submitButtonText]}
          style={styles.submitButton}
          onPress={this.submit}
          title={"Create Deck"}
        >
          Create Deck
        </SubmitButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: white,
    alignItems: "center"
  },
  text: {
    alignItems: "center",
    color: black,
    padding: 25,
    fontSize: 42,
    textAlign: "center",
    marginTop: 50
  },
  textInput: {
    height: 40,
    borderColor: black,
    borderWidth: 1,
    margin: 20,
    width: `${80}%`
  },
  submitButton: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: black,
    height: 40,
    width: 200,
    margin: 10
  },
  submitButtonText: {
    color: white,
    fontSize: 32,
    textAlign: "center"
  }
});

export default NewDeck;
