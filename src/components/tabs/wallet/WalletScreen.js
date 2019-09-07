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
import ReceiveButton from "./action-buttons/ReceiveButton";
import TabSelector from "../../elements/tab-selector/TabSelector";
import theme from "../../../config/theme";
import SendButton from "./action-buttons/SendButton";

class WalletScreen extends Component {
  static navigationOptions = props => {
    const { navigation, ...rest } = props;

    return {
      title: "Wallet",
      headerTitle: props => (
        <Header {...props} onProfilePress={() => navigation.push("Profile")}/>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      filter: "all",
      maskBalanceValues: false
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
    const { filter, maskBalanceValues } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <View style={styles.root}>
            <BalanceSection
              style={styles.balances}
              maskValues={maskBalanceValues}
            />

            <TabSelector
              style={styles.tabs}
              labels={["All", "Received", "Sent"]}
              onChange={this.onTabSwitch.bind(this)}
            />

            <TransactionList style={styles.transactionList} filter={filter}/>

            <View style={styles.actionButtons}>
              <ReceiveButton
                onOpen={() => this.setState({ maskBalanceValues: true })}
                onClose={() => this.setState({ maskBalanceValues: false })}
              />
              <View style={styles.actionSpacer}/>
              <SendButton onPress={() => navigation.push("Send")}/>
            </View>
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
  },
  actionButtons: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 70,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingLeft: theme.sidePadding,
    paddingRight: theme.sidePadding
  },
  actionSpacer: {
    marginLeft: theme.sidePadding
  }
});

export default inject("wallet")(observer(WalletScreen));
