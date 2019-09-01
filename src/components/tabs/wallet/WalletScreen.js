/**
 * Home screen with bets and transaction summary
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView
} from "react-native";
import { inject, observer } from "mobx-react";

import Header from "../../elements/header/Header";
import TransactionList from "./transactions/TransactionList";
import BalanceSection from "./BalanceSection";
import ReceiveButton from "./ReceiveButton";

class WalletScreen extends Component {
  static navigationOptions = props => {
    const { navigation, ...rest } = props;

    return {
      title: "Wallet",
      headerTitle: props => (
        <Header {...props} onProfilePress={() => navigation.push("Profile")} />
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { navigation, wallet } = this.props;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.root}>
            <BalanceSection />

            <TransactionList />

            {/*<ReceiveButton />*/}
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: "100%"
  }
});

export default inject("wallet")(observer(WalletScreen));
