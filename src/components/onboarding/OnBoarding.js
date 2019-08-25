import React, { Component, Fragment } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import SnapCarousel from "react-native-snap-carousel";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import theme from "../../config/theme";
import Slide from "./Slide";
import onError from "../../helpers/onError";
import Wallet from "../../wallet/Wallet";
const windowWidth = Dimensions.get("window").width;

const sliderWidth = windowWidth;

class OnBoarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      isImporting: false
    };
  }

  componentDidMount(): void {}

  snapToNext() {
    setTimeout(() => this._carousel.snapToNext(), 50);
  }

  snapToPrevious() {
    setTimeout(() => this._carousel.snapToPrev(), 50);
  }

  onCreate() {
    //TODO ask for testnet or mainnet
    this.setState({ isCreating: true });
    this.props.wallet
      .createNewWallet()
      .then(() => {})
      .catch(e => {
        onError(e, "Failed to create new wallet.");

        this.setState({ isCreating: false });
      });
  }

  onImport() {
    this.setState({ isImporting: true });
    alert("Import");
  }

  render() {
    const { isCreating, isImporting } = this.state;

    const items = [
      {
        imageSource: require("../../../images/onboarding_2.png"),
        title: "A Bitcoin wallet betting app",
        content:
          "A bitcoin wallet with the added feature of allowing you to make secure bets with friends."
      },
      {
        imageSource: require("../../../images/onboarding_5.png"),
        title: "Make bets with your friends",
        content:
          "Add funds to the wallet, invite some friends and start betting. "
      },
      {
        imageSource: require("../../../images/onboarding_3.png"),
        title: "Your keys, your money",
        content:
          "Control of your funds can only be done on the app, and funds pending a bet outcome are controlled jointly by you and your friend."
      },
      {
        imageSource: require("../../../images/onboarding_6.png"),
        title: "Get started",
        content:
          "Either setup your wallet for the first time or import one from a backup."
      }
    ];

    return (
      <Fragment>
        <StatusBar barStyle="light-content"/>
        <View style={styles.root}>
          <SnapCarousel
            layoutCardOffset={30}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            ref={c => {
              this._carousel = c;
            }}
            data={items}
            renderItem={props => {
              const { index } = props;

              //Every slide except first needs a back button
              if (index !== 0) {
                props.onBackPress = this.snapToPrevious.bind(this);
              }

              //Every slide except last needs continue button
              if (index !== 3) {
                props.onContinuePress = this.snapToNext.bind(this);
              }

              //Last slide
              if (index === 3) {
                props.onCreate = this.onCreate.bind(this);
                props.onImport = this.onImport.bind(this);
              }

              return (
                <Slide
                  {...props}
                  isCreating={isCreating}
                  isImporting={isImporting}
                />
              );
            }}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
          />
        </View>
      </Fragment>
    );
  }
}

OnBoarding.propTypes = {
  wallet: PropTypes.instanceOf(Wallet)
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: theme.background
  }
});

export default inject("wallet")(observer(OnBoarding));
