import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import PropTypes from "prop-types";

const ProfileButton = ({ onClick }) => {
	return (
		<View style={styles.root} onClick={onClick}>
			<Image
				style={styles.image}
				source={{
					uri: "https://api.adorable.io/avatars/285/jay"
				}}
			/>
		</View>
	);
};

ProfileButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	root: {
		shadowColor: "black",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		borderWidth: 1,
		borderColor: "#F2F2F2",
		borderRadius: 16,
		borderStyle: "solid"
	},
	image: {
		borderRadius: 16,
		width: 30,
		height: 30
	}
});

export default ProfileButton;
