import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Animated,
  AsyncStorage
} from "react-native";
import { white } from "../utils/colors";

class Card extends Component {
  componentWillMount() {
    // AsyncStorage.clear();
    this._animatedValue = new Animated.Value(0);
  }

  animate = cardTitle => {
    return new Promise(resolve => {
      Animated.timing(this._animatedValue, {
        toValue: 100,
        duration: 1000
      }).start();
      setTimeout(() => {
        resolve(cardTitle);
      }, 1020);
    });
  };

  navigateToIndividualDeck = cardTitle => {
    const { navigation, entries } = this.props;
    this.animate();
    Promise.resolve(cardTitle)
      .then(this.animate)
      .then(cardTitle => {
        navigation.navigate("IndividualDeckView", {
          cardTitle: cardTitle,
          entries: entries
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    const { cardTitle, navigation, entries } = this.props;
    const interpolatedRotateAnimation = this._animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ rotate: interpolatedRotateAnimation }] }
        ]}
      >
        <TouchableOpacity
          onPress={() => this.navigateToIndividualDeck(cardTitle)}
        >
          <Text style={styles.dataText}>{`${cardTitle}`}</Text>
          <Text>{`${entries[cardTitle].questions
            ? entries[cardTitle].questions.length
            : 0} cards`}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  dataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default Card;
