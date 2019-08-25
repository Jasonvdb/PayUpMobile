/**
 * Final wallet creation view for on boarding
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";

import Button from "../elements/button/Button";
import theme from "../../config/theme";

const CreateWalletSlide = props => {
	const { onBackPress, item } = props;

	const { imageSource } = item;

	return (
		<View style={styles.root}>
			<Image style={styles.image} source={imageSource}/>

			<View style={styles.buttonContainer}>
				<Button onPress={() => alert("Create")} variant={"cta"}>
          Create new wallet
				</Button>
				<Button onPress={() => alert("Import")} variant={"default"}>
          Import existing wallet
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

CreateWalletSlide.propTypes = {
	//TODO
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
		flex: 3
	},
	buttonContainer: {
		paddingLeft: 35,
		paddingRight: 35,
		paddingBottom: 35,
		flex: 1,
		display: "flex",
		justifyContent: "flex-end"
	}
});
export default CreateWalletSlide;
