/**
 * Slide view for on boarding
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";

import Button from "../elements/button/Button";
import theme from "../../config/theme";

const Slide = props => {
	const { onContinuePress, onBackPress, item } = props;

	const { imageSource, title, content } = item;

	return (
		<View style={styles.root}>
			<Image style={styles.image} source={imageSource}/>

			<View style={styles.contentContainer}>
				<Text style={styles.titleText}>{title}</Text>
				<Text style={styles.contentText}>{content}</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button onPress={onContinuePress} variant={"cta"}>
          Continue
				</Button>
				{onBackPress ? (
					<Button onPress={onBackPress}>Back</Button>
				) : (
					<View style={{ height: 55 }}/>
				)}
			</View>
		</View>
	);
};

Slide.propTypes = {
	onContinuePress: PropTypes.func,
	onBackPress: PropTypes.func
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: theme.background,
		height: "100%",
		display: "flex"
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		flex: 5
	},
	contentContainer: {
		paddingLeft: 35,
		paddingRight: 35,
		flex: 4,
		display: "flex",
		justifyContent: "center"
	},
	titleText: {
		fontSize: 24,
		textAlign: "center",
		marginBottom: 20,
		fontWeight: "600",
		color: theme.fontColor1
	},
	contentText: {
		fontSize: 18,
		textAlign: "center",
		color: theme.fontColor2,
		fontWeight: "200"
	},
	buttonContainer: {
		paddingLeft: 35,
		paddingRight: 35,
		paddingBottom: 20,
		flex: 2,
		display: "flex",
		justifyContent: "space-around"

		// borderStyle: "solid",
		// borderColor: "red",
		// borderWidth: 1
	}
});
export default Slide;
