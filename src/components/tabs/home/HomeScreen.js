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
  ActivityIndicator,
  Dimensions
} from "react-native";
import { inject, observer } from "mobx-react";

import displayCurrency from "../../../helpers/displayCurrency";
import Header from "../../elements/header/Header";
import BetCardSwipe from "../bets/swiper/BetCardSwipe";
import TransactionList from "../wallet/TransactionList";
import theme from "../../../config/theme";
import Button from "../../elements/button/Button";

class HomeScreen extends Component {
  static navigationOptions = props => {
    const { navigation, ...rest } = props;

    const balanceInSats = navigation.getParam("balanceInSats", "");
    const subTitle = navigation.getParam("subTitle", "");
    return {
      title: balanceInSats !== "" ? displayCurrency(balanceInSats) : null,
      headerTitle: props => (
        <Header
          {...props}
          subTitle={subTitle}
          onProfilePress={() => navigation.push("Profile")}
          animate={!!balanceInSats}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount(): void {
    const { navigation, wallet } = this.props;

    wallet.refreshAllAddresses();

    // setTimeout(() => {
    //   this.updateHeaderBalance();
    // }, 20000);
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    this.updateHeaderBalance();
  }

  updateHeaderBalance() {
    const { navigation, wallet } = this.props;

    const balances = wallet.balances;

    const { totalBalanceInSats } = balances;

    if (totalBalanceInSats !== this.totalBalanceInSats) {
      this.totalBalanceInSats = totalBalanceInSats;
      navigation.setParams({
        balanceInSats: totalBalanceInSats,
        subTitle: "Your balance"
      });
    }
  }

  render() {
    const { navigation, wallet } = this.props;

    //TODO put back somehow
    const test = wallet.balances;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.root}>
            <BetCardSwipe />

            {/*{wallet.addressUpdatesInQueue ? (*/}
            {/*  <ActivityIndicator style={styles.loader} color={theme.gray1}/>*/}
            {/*) : null}*/}
            <TransactionList />
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
  loader: {
    margin: 20
  }
});

export default inject("wallet")(observer(HomeScreen));
