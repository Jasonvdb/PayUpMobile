import React, { Component, Fragment } from "react";
import { StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import TransactionRow from "../wallet/TransactionRow";
import BottomSheet from "../../elements/bottom-sheet/BottomSheet";
import TransactionDetailsBottomSheet from "../wallet/TransactionDetailsBottomSheet";
import Wallet from "../../../wallet/Wallet";

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
    const { navigation, wallet } = this.props;
    const { selectedTransaction } = this.state;

    const { neatTransactionHistory } = wallet;

    return (
      <Fragment>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          {neatTransactionHistory.map((transaction, index) => (
            <TransactionRow
              key={index}
              {...transaction}
              onPress={() => {
                this.setState({ selectedTransaction: transaction }, () => {});
              }}
            />
          ))}
        </ScrollView>

        <TransactionDetailsBottomSheet
          transaction={selectedTransaction}
          onClose={() => this.setState({ selectedTransaction: null })}
        />
      </Fragment>
    );
  }
}

TransactionList.propTypes = {
  wallet: PropTypes.instanceOf(Wallet)
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "transparent",
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default inject("wallet")(observer(TransactionList));
