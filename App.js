import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { orange, white, black } from "./utils/colors";
import { Constants } from "expo";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import IndividualDeckView from "./components/IndividualDeckView";
import { setLocalNotification } from "./utils/helpers";

function MobileFlashCardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const DeckViewStack = StackNavigator({
  Decks: {
    screen: Decks
  },
  IndividualDeckView: {
    screen: IndividualDeckView
  },
  NewCard: {
    screen: NewCard
  },
  Quiz: {
    screen: Quiz
  }
});

const Tabs = TabNavigator(
  {
    Decks: {
      screen: DeckViewStack,
      navigationOptions: {
        tabBarLabel: "DECKS",
        header: null
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "NEW DECK"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? black : white,
      activeBackgroundColor: Platform.OS === "ios" ? orange : black,

      style: {
        height: 52,
        backgroundColor: Platform.OS === "ios" ? white : orange,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        fontSize: 18,
        textAlign: "center",
        textAlignVertical: "center",
        marginBottom: 16
      },
      tabStyle: {
        flex: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  }
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MobileFlashCardsStatusBar
          backgroundColor={orange}
          barStyle="light-content"
        />
        <MainNavigator />
      </View>
    );
  }
}
