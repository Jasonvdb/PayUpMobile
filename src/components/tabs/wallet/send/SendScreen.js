import React, { Component, Fragment } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import { inject, observer } from "mobx-react";

import Header from "../../../elements/header/Header";
import BalanceSection from "./../BalanceSection";

class SendScreen extends Component {
  static navigationOptions = props => {
    const { navigation, ...rest } = props;

    return {
      title: "Send",
      headerTitle: props => (
        <Header {...props} onProfilePress={() => navigation.push("Profile")}/>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { navigation, wallet } = this.props;
    const { filter } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <View style={styles.root}>
            <BalanceSection style={styles.balances}/>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: "100%"
  },
  balances: {
    paddingTop: 6
  }
});

export default inject("wallet")(observer(SendScreen));
