import React, { Component } from "react";
import { Text, StyleSheet, Platform, View, Dimensions } from "react-native";
import { black, white, orange } from "../utils/colors";
import SubmitButton from "./SubmitButton";

class IndividualDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.cardTitle}`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: white
    }
  });

  navigateToAddCardView = () => {
    const { navigation } = this.props;
    const { entries, cardTitle } = navigation.state.params;
    navigation.navigate("NewCard", {
      entries: entries,
      cardTitle: cardTitle
    });
  };

  navigateToStartQuizView = () => {
    const { navigation } = this.props;
    const { entries, cardTitle } = navigation.state.params;
    navigation.navigate("Quiz", {
      title: "Quiz",
      entries: entries,
      cardTitle: cardTitle
    });
  };

  render() {
    const { entries, cardTitle } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text style={styles.dataTitle}>{`${cardTitle}`}</Text>
        <Text style={styles.cardNumber}>{`${entries[cardTitle]
          ? entries[cardTitle].questions.length
          : 0} cards`}</Text>
        <View style={{ flex: 0.65 }}>
          <SubmitButton
            style={styles.submitButton}
            textStyle={styles.submitButtonText}
            onPress={this.navigateToAddCardView}
            title={"Add Card"}
          />
          <SubmitButton
            style={[styles.submitButton, { backgroundColor: orange }]}
            textStyle={styles.submitButtonText}
            onPress={this.navigateToStartQuizView}
            title={"Start Quiz"}
          />
        </View>
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
  },

  dataTitle: {
    textAlign: "center",
    fontSize: 40,
    paddingTop: 5,
    paddingBottom: 5
  },
  cardNumber: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default IndividualDeckView;
