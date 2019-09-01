import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard
} from "react-native";
import PropTypes from "prop-types";
// import QRCode from "react-native-qrcode";

const copyToClipboard = string => {};

class ReceiveSheetContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCopied: false
    };
  }

  onCopy() {
    const { address } = this.props;

    if (address) {
      Clipboard.setString(address);

      this.setState({ isCopied: true }, () =>
        setTimeout(() => this.setState({ isCopied: false }), 2000)
      );
    }
  }

  render() {
    const { address } = this.props;
    const { isCopied } = this.state;

    return (
      <View>
        {address ? (
          <View>
            <TouchableOpacity onPress={this.onCopy.bind(this)}>
              <Text style={styles.text}>{address}</Text>

              {isCopied ? (
                <Text style={styles.text}>Copied to clipboard</Text>
              ) : null}
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator />
        )}

        {/*<QRCode value={"Test"} size={200} bgColor="purple" fgColor="white"/>*/}
      </View>
    );
  }
}

ReceiveSheetContent.propTypes = {
  address: PropTypes.string
};

const styles = StyleSheet.create({
  root: {},
  text: {
    textAlign: "center",
    marginBottom: 10
  }
});

export default ReceiveSheetContent;
