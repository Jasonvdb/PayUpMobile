import React, { Component } from "react";
import { Text, TouchableOpacity, Linking, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import theme from "../../../config/theme";
import Header from "../header/Header";

// 1. Changed to a class based component
class Button extends Component {
	constructor(props) {
		super(props);
	}

  // 2. Custom function called onPress TouchableOpacity
  onPressHandler = () => {
  	const { onPress, url } = this.props;
  	if (url) {
  		Linking.openURL(url);
  	}
  	onPress ? onPress() : null;
  };

  render() {
  	const { children, variant } = this.props;

  	let labelStyle = styles.label;

  	//TODO don't use TouchableOpacity fro android

  	if (variant === "default") {
  		return (
  			<TouchableOpacity onPress={this.onPressHandler}>
  				<View style={styles.button}>
  					<Text style={styles.label}>{children}</Text>
  				</View>
  			</TouchableOpacity>
  		);
  	}

  	if (variant === "cta") {
  		labelStyle = { ...labelStyle, ...styles.ctaLabel };
  	}

  	return (
  		<TouchableOpacity onPress={this.onPressHandler}>
  			<LinearGradient
  				start={{ x: 0, y: 0 }}
  				end={{ x: 1, y: 1 }}
  				colors={theme.buttonGradients}
  				style={styles.button}
  			>
  				<Text style={labelStyle}>{children}</Text>
  			</LinearGradient>
  		</TouchableOpacity>
  	);
  }
}

Button.defaultProps = {
	variant: "default"
};

Header.propTypes = {
	onPress: PropTypes.func,
	url: PropTypes.string,
	children: PropTypes.string
};

const styles = {
	button: {
		height: 55,
		alignSelf: "stretch",
		justifyContent: "center",
		backgroundColor: "transparent",
		borderRadius: 30
	},
	label: {
		alignSelf: "center",
		color: theme.defaultButtonLabelColor,
		fontSize: 18,
		fontWeight: "200",
		textTransform: "uppercase"
	},
	ctaLabel: {
		color: "#fff",
		fontSize: 22
	}
};

export default Button;
