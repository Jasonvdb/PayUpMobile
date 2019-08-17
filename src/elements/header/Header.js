/**
 * Home screen with bets and transaction summary
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import ProfileButton from "./ProfileButton";

const Header = props => {
	const { children, allowFontScaling, style, onProfilePress, ...rest } = props;
	return (
		<View style={styles.root}>
			<View style={styles.titleContainer}>
				<Text style={styles.subTitle}>Your balance</Text>
				<Text style={styles.title}>{children || "AppSats"}</Text>
			</View>
			{onProfilePress ? <ProfileButton onPress={onProfilePress}/> : null}
		</View>
	);
};

Header.propTypes = {
	onProfilePress: PropTypes.func
};

const styles = StyleSheet.create({
	root: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		paddingLeft: 18,
		paddingRight: 18
	},
	titleContainer: {},
	title: {
		color: "#171D33",
		fontWeight: "600",
		fontSize: 32
	},
	subTitle: {
		color: "#A6AAB4",
		fontSize: 14,
		marginBottom: 4
	}
});
export default Header;
