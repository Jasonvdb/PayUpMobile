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
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { inject, observer } from "mobx-react";

import displayCurrency from "../../../helpers/displayCurrency";
import Header from "../../elements/header/Header";
import BetCardSwipe from "../bets/swiper/BetCardSwipe";
import TransactionRow from "../wallet/TransactionRow";
import BottomSheet from "../../elements/bottom-sheet/BottomSheet";
import TransactionDetails from "../wallet/TransactionDetails";

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

    this.state = {
      selectedTransactionDetails: null
    };
  }

  componentDidMount(): void {
    const { navigation, wallet } = this.props;

    wallet.refreshAllAddresses();
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    const { navigation, wallet } = this.props;

    const balances = wallet.balances;

    const {
      confirmedInSats,
      unconfirmedReceivedInSats,
      lastReceivedMoment
    } = balances;

    const balanceInSats = confirmedInSats + unconfirmedReceivedInSats;

    if (balanceInSats !== this.balanceInSats) {
      this.balanceInSats = balanceInSats;
      navigation.setParams({
        balanceInSats,
        subTitle: "Your balance"
      });
    }
  }

  render() {
    const { navigation, wallet } = this.props;
    const { selectedTransactionDetails } = this.state;

    const { neatTransactionHistory } = wallet;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <View style={styles.root}>
            <BetCardSwipe/>

            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
            >
              {neatTransactionHistory.map((tx, index) => (
                <TransactionRow
                  key={index}
                  {...tx}
                  onPress={() => {
                    this.setState({ selectedTransactionDetails: tx }, () => {
                      this.RBSheet.open();
                    });
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
        <BottomSheet
          closeOnDragDown
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={340}
          duration={200}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          {selectedTransactionDetails ? (
            <TransactionDetails {...selectedTransactionDetails}/>
          ) : null}
        </BottomSheet>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: "100%"
  },
  scrollView: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default inject("wallet")(observer(HomeScreen));
