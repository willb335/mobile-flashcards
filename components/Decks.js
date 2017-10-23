import React, { Component } from "react";
import { Text, ScrollView, StyleSheet, Platform, View } from "react-native";
import { AppLoading } from "expo";
import Card from "./Card";
import { white } from "../utils/colors";
import { getDecks } from "../utils/api";

class Decks extends Component {
  state = {
    ready: false,
    entries: {}
  };

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    Promise.resolve("Start")
      .then(() => getDecks())
      .then(entries => {
        if (entries !== undefined && entries !== null)
          this.setState({ entries: entries });
      })
      .then(() => this.setState({ ready: true }))
      .catch(e => console.log(e));
  }

  render() {
    const { navigation } = this.props;
    const { ready, entries } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <ScrollView>
        {Object.keys(entries)
          .sort()
          .map((key, i) => (
            <Card
              cardTitle={key}
              key={key}
              entries={entries}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    );
  }
}

export default Decks;
