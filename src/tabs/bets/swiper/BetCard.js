import React, { Component, Fragment } from "react";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Button
} from "react-native";
import PropTypes from "prop-types";

import theme from "../../../config/theme";

const BetCard = props => {
	console.log(props);
	const { item, index } = props;

	return (
		<View style={{ ...styles.root, ...styles[item.type] }}>
			<Text>Card {index}</Text>
		</View>
	);
};

BetCard.propTypes = {
	item: PropTypes.shape({
		type: PropTypes.oneOf(["active", "lost", "won", "add"])
	}).isRequired,
	index: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
	root: {
		height: 140,

		shadowOffset: { width: 5, height: 5 },
		shadowColor: theme.brand1,
		shadowOpacity: 0.1,
		shadowRadius: 2
		//box-shadow: 0px 8px 28px rgba(134, 118, 251, 0.6);
	},
	active: { backgroundColor: theme.brand1 },
	lost: { backgroundColor: theme.lost },
	won: { backgroundColor: theme.won },
	add: { backgroundColor: "gray" }
});

export default BetCard;
