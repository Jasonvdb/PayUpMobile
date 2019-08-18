import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import React from "react";
import PropTypes from "prop-types";

import theme from "../../config/theme";

const TabButton = ({
	route,
	onPress,
	onLongPress,
	getAccessibilityLabel,
	isActive,
	iconString
}) => (
	<TouchableOpacity
		style={styles.tabButton}
		onPress={() => {
			onPress(route);
		}}
		onLongPress={() => {
			onLongPress(route);
		}}
		accessibilityLabel={getAccessibilityLabel({
			route
		})}
	>
		<Icon
			name={iconString}
			size={25}
			color={isActive ? theme.brand1 : theme.disabled1}
		/>
	</TouchableOpacity>
);

TabButton.propTypes = {
	route: PropTypes.object.isRequired,
	onPress: PropTypes.func.isRequired,
	onLongPress: PropTypes.func.isRequired,
	getAccessibilityLabel: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
	iconString: PropTypes.string.isRequired
};

export default TabButton;

const styles = StyleSheet.create({
	tabButton: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		height: "100%",
		alignItems: "center"
	}
});
