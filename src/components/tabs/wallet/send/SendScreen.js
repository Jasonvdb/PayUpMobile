import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView
} from "react-native";
import { inject, observer } from "mobx-react";

import Header from "../../../elements/header/Header";
import BalanceSection from "./../BalanceSection";
import TextInput from "../../../elements/input/TextInput";
import theme from "../../../../config/theme";
import Button from "../../../elements/button/Button";
import FeeButton from "./FeeButton";
import DismissKeyboardView from "../../../elements/keyboard-view/DismissKeyboardView";

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

    this.state = {
      address: "",
      amountInSatsString: ""
    };
  }

  onAddressChange(address) {
    this.setState({ address });
  }

  onAmountChange(amountInSatsString) {
    this.setState({ amountInSatsString });
  }

  onChangeFee(fee) {
    console.log(fee);
  }

  render() {
    const { navigation, wallet } = this.props;
    const { address, amountInSatsString } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <DismissKeyboardView>
            <View style={styles.root}>
              <BalanceSection style={styles.balances} hideBets/>

              {/*<ScrollView*/}
              {/*  contentContainerStyle={{ flexGrow: 1 }}*/}
              {/*  keyboardShouldPersistTaps="handled"*/}
              {/*>*/}
              {/*  <TextInput*/}
              {/*    label={"Address"}*/}
              {/*    style={styles.input}*/}
              {/*    value={address}*/}
              {/*    onChangeText={this.onAddressChange.bind(this)}*/}
              {/*  />*/}

              {/*  <TextInput*/}
              {/*    label={"Amount (sats)"}*/}
              {/*    style={styles.input}*/}
              {/*    value={amountInSatsString}*/}
              {/*    onChangeText={this.onAmountChange.bind(this)}*/}
              {/*    keyboardType="numeric"*/}
              {/*  />*/}

              {/*  <View style={styles.feeButtonContainer}>*/}
              {/*    <FeeButton*/}
              {/*      style={styles.input}*/}
              {/*      onChange={this.onChangeFee.bind(this)}*/}
              {/*    />*/}
              {/*  </View>*/}
              {/*</ScrollView>*/}

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <TextInput
                    label={"Address"}
                    style={styles.input}
                    value={address}
                    onChangeText={this.onAddressChange.bind(this)}
                  />

                  <TextInput
                    label={"Amount (sats)"}
                    style={styles.input}
                    value={amountInSatsString}
                    onChangeText={this.onAmountChange.bind(this)}
                    keyboardType="numeric"
                  />

                  <View style={styles.feeButtonContainer}>
                    <FeeButton
                      style={styles.input}
                      onChange={this.onChangeFee.bind(this)}
                    />
                  </View>
                </View>

                <Button variant={"cta"}>Create transaction</Button>
              </View>
            </View>
          </DismissKeyboardView>
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
  form: {
    padding: theme.sidePadding,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: theme.bottomTabHeight + theme.sidePadding
  },
  inputContainer: {
    // display: "flex",
    // // flexDirection: "column",
    // alignItems: "center"
  },
  input: {
    marginTop: 30
    // flex: 1
  },
  feeButtonContainer: {
    display: "flex",
    alignItems: "center"
  }
});

export default inject("wallet")(observer(SendScreen));
