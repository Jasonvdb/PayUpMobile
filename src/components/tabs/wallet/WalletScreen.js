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
import TabSelector from "../../elements/tab-selector/TabSelector";

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

    this.state = {
      filter: "all"
    };
  }

  onTabSwitch(index) {
    let filter = "all";
    switch (index) {
      case 0:
        filter = "all";
        break;
      case 1:
        filter = "received";
        break;
      case 2:
        filter = "sent";
        break;
    }

    this.setState({ filter });
  }

  render() {
    const { navigation, wallet } = this.props;
    const { filter } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.root}>
            <BalanceSection style={styles.balances} />

            <TabSelector
              style={styles.tabs}
              labels={["All", "Received", "Sent"]}
              onChange={this.onTabSwitch.bind(this)}
            />

            <TransactionList style={styles.transactionList} filter={filter} />

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
  },
  balances: {
    paddingTop: 6
  },
  tabs: {
    marginTop: 20
  },
  transactionList: {
    paddingTop: 25
  }
});

export default inject("wallet")(observer(WalletScreen));
