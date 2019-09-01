import React, { Component, Fragment } from "react";
import { StyleSheet, ScrollView, RefreshControl, View } from "react-native";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import TransactionRow from "./TransactionRow";
import TransactionDetailsBottomSheet from "./TransactionDetailsBottomSheet";
import Wallet from "../../../../wallet/Wallet";

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTransaction: null
    };
  }

  componentDidMount(): void {
    const { navigation, wallet } = this.props;
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    const { selectedTransaction } = this.state;
    if (selectedTransaction) {
      const { neatTransactionHistory } = this.props.wallet;

      const currentlySelectedTransaction = neatTransactionHistory.find(
        tx => tx.txid === selectedTransaction.txid
      );

      //Quick and dirty way of checking if the transaction details were at all updated. Must be a better way though.
      if (
        currentlySelectedTransaction &&
        JSON.stringify(currentlySelectedTransaction) !==
          JSON.stringify(selectedTransaction)
      ) {
        this.setState({ selectedTransaction: currentlySelectedTransaction });
      }
    }
  }

  render() {
    const { style, wallet, filter } = this.props;
    const { selectedTransaction } = this.state;

    const { neatTransactionHistory } = wallet;

    const transactions = [];
    neatTransactionHistory.forEach(tx => {
      if (
        filter === "all" ||
        (filter === "received" && tx.receivedValueInSats) ||
        (filter === "sent" && tx.sentValueInSats)
      ) {
        transactions.push(tx);
      }
    });

    //TODO use SectionList rather

    const isRefreshing = !!wallet.addressUpdatesInQueue;

    const refreshControl = (
      <RefreshControl
        title={
          isRefreshing
            ? "Refreshing transactions..."
            : "Pull to refresh transactions"
        }
        refreshing={isRefreshing}
        onRefresh={() => wallet.refreshAllAddresses()}
      />
    );

    return (
      <Fragment>
        <ScrollView
          refreshControl={refreshControl}
          contentInsetAdjustmentBehavior="automatic"
          style={{ ...styles.scrollView, ...style }}
        >
          {transactions.map((transaction, index) => (
            <TransactionRow
              key={index}
              {...transaction}
              onPress={() => {
                this.setState({ selectedTransaction: transaction }, () => {});
              }}
            />
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        <TransactionDetailsBottomSheet
          transaction={selectedTransaction}
          onClose={() => this.setState({ selectedTransaction: null })}
        />
      </Fragment>
    );
  }
}

TransactionList.defaultProps = {
  style: {},
  filter: "all"
};

TransactionList.propTypes = {
  wallet: PropTypes.instanceOf(Wallet),
  style: PropTypes.object,
  filter: PropTypes.oneOf(["all", "received", "sent"])
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FFF",
    paddingTop: 20
  },
  bottomSpacer: {
    marginTop: 150
  }
});

export default inject("wallet")(observer(TransactionList));
