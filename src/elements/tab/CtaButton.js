import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import PropTypes from "prop-types";

import theme from "../../config/theme";

const CtaButton = ({ onPress }) => (
	<TouchableOpacity style={styles.ctaButton} onPress={onPress}>
		<Icon name={"ios-add"} size={35} color={"#FFF"}/>
	</TouchableOpacity>
);

CtaButton.propTypes = {
	onPress: PropTypes.func.isRequired
};

export default CtaButton;

const styles = StyleSheet.create({
	ctaButton: {
		top: -37,
		backgroundColor: theme.brand1,
		width: 56,
		height: 56,
		borderRadius: 35,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 4,

		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.35,
		shadowRadius: 12,
		shadowColor: theme.brand1
	}
});
