import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

class ProfileButton extends Component {
  onPressHandler = () => {
  	const { onPress } = this.props;

  	onPress();
  };

  render() {
  	return (
  		<TouchableOpacity onPress={this.onPressHandler}>
  			<View style={styles.root}>
  				<Image
  					style={styles.image}
  					source={{
  						uri: "https://api.adorable.io/avatars/285/jay"
  					}}
  				/>
  			</View>
  		</TouchableOpacity>
  	);
  }
}

ProfileButton.propTypes = {
	onPress: PropTypes.func.isRequired
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
