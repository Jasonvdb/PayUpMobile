import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import Slider from "@react-native-community/slider";

import BottomSheet from "../../../elements/bottom-sheet/BottomSheet";
import displayCurrency from "../../../../helpers/displayCurrency";
import theme from "../../../../config/theme";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

class FeeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeInSats: 2
    };
  }

  showFeePicker() {
    this.RBSheet.open();

    Keyboard.dismiss();
  }

  onValueChange(feeInSats) {
    this.setState({ feeInSats });
  }

  render() {
    const { style } = this.props;
    const { feeInSats } = this.state;

    return (
      <Fragment>
        <TouchableOpacity
          onPress={this.showFeePicker.bind(this)}
          style={[styles.button, style]}
        >
          <Text style={styles.buttonText}>{`${displayCurrency(
            feeInSats
          )}/b`}</Text>
        </TouchableOpacity>

        <BottomSheet
          closeOnDragDown
          ref={ref => {
            this.RBSheet = ref;
          }}
          // onClose={}
          height={windowHeight * 0.25}
          duration={200}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <View>
            <Text style={styles.displayLabel}>
              {displayCurrency(feeInSats)}/byte
            </Text>

            <Slider
              style={styles.slider}
              step={1}
              minimumValue={1}
              maximumValue={20}
              minimumTrackTintColor={theme.brand1}
              maximumTrackTintColor={theme.gray1}
              onValueChange={this.onValueChange.bind(this)}
            />
          </View>
        </BottomSheet>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 115,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.feeButtonBackgroundColor,
    borderRadius: 12
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16
  },
  displayLabel: {
    textAlign: "center",
    color: theme.fontColor2,
    fontSize: 20
  },
  slider: {
    width: windowWidth * 0.85,
    height: 40
  }
});

FeeButton.defaultProps = {
  style: {}
};

FeeButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default FeeButton;
