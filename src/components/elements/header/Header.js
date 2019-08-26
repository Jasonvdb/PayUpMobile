/**
 * Home screen with bets and transaction summary
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";

import ProfileButton from "./ProfileButton";

const Header = props => {
	const {
		children,
		allowFontScaling,
		style,
		onProfilePress,
		subTitle,
		animate,
		...rest
	} = props;

	const TextComponent = animate ? Animatable.Text : Text;

	return (
		<View style={styles.root}>
			<View style={styles.titleContainer}>
				<TextComponent animation="fadeInLeft" style={styles.subTitle}>
					{subTitle || ""}
				</TextComponent>
				<TextComponent animation="fadeInRight" style={styles.title}>
					{children || "PayUp"}
				</TextComponent>
			</View>
			{onProfilePress ? <ProfileButton onPress={onProfilePress}/> : null}
		</View>
	);
};

Header.propTypes = {
	onProfilePress: PropTypes.func,
	children: PropTypes.string,
	subTitle: PropTypes.string,
	animate: PropTypes.bool
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
