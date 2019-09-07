import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Hoshi } from "react-native-textinput-effects";

import theme from "../../../config/theme";

const TextInput = props => {
  const { label, value, onChangeText, style, ...rest } = props;

  return (
    <View style={[styles.root, style]}>
      <Hoshi
        inputStyle={styles.input}
        label={label}
        borderColor={theme.textInputActiveBorderColor}
        inputPadding={16}
        labelHeight={24}
        labelStyle={styles.label}
        value={value}
        onChangeText={onChangeText}
        style={styles.root}
        {...rest}
      />
    </View>
  );
};

TextInput.defaultProps = {
  style: {}
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  root: {
    borderBottomColor: theme.textInputPassiveBorderColor
  },
  label: { color: theme.textInputLabelColor },
  input: {
    color: theme.textInputValueColor
  }
});

export default TextInput;
