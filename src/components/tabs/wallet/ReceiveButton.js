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
  Text,
  Dimensions
} from "react-native";
import { inject, observer } from "mobx-react";

import displayCurrency from "../../../helpers/displayCurrency";
import Header from "../../elements/header/Header";
import BetCardSwipe from "../bets/swiper/BetCardSwipe";
import TransactionList from "../wallet/TransactionList";
import theme from "../../../config/theme";
import Button from "../../elements/button/Button";
import BottomSheet from "../../elements/bottom-sheet/BottomSheet";
import ReceiveSheetContent from "./ReceiveSheetContent";

const windowHeight = Dimensions.get("window").height;

class ReceiveButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {}

  showAddress() {
    this.RBSheet.open();
  }

  render() {
    const { navigation, wallet } = this.props;

    return (
      <Fragment>
        <Button onPress={this.showAddress.bind(this)} variant={"text"}>
          Receive
        </Button>

        <BottomSheet
          closeOnDragDown
          ref={ref => {
            this.RBSheet = ref;
          }}
          //onClose={onClose}
          height={windowHeight * 0.75}
          duration={200}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <ReceiveSheetContent/>
        </BottomSheet>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default inject("wallet")(observer(ReceiveButton));
