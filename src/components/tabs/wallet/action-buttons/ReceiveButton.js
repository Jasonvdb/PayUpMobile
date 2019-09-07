import React, { Component, Fragment } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Button from "../../../elements/button/Button";
import BottomSheet from "../../../elements/bottom-sheet/BottomSheet";
import ReceiveSheetContent from "../ReceiveSheetContent";
import onError from "../../../../helpers/onError";
import Wallet from "../../../../wallet/Wallet";

const windowHeight = Dimensions.get("window").height;

class ReceiveButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {}

  showAddress() {
    const { wallet, onOpen } = this.props;

    this.RBSheet.open();

    onOpen();

    wallet
      .unusedReceiveAddress()
      .then(address => this.setState({ address }))
      .catch(e => onError(e));
  }

  render() {
    const { onClose } = this.props;
    const { address } = this.state;

    return (
      <Fragment>
        <Button
          onPress={this.showAddress.bind(this)}
          variant={"receive"}
          style={styles.root}
        >
          Receive
        </Button>

        <BottomSheet
          closeOnDragDown
          ref={ref => {
            this.RBSheet = ref;
          }}
          onClose={onClose}
          height={windowHeight * 0.75}
          duration={200}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <ReceiveSheetContent address={address}/>
        </BottomSheet>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

ReceiveButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  wallet: PropTypes.instanceOf(Wallet)
};

export default inject("wallet")(observer(ReceiveButton));
