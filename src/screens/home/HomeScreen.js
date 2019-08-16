/**
 * Home screen with bets and transaction summary
 *
 * @format
 * @flow
 */

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

import { Colors } from "react-native/Libraries/NewAppScreen";
import displayCurrency from "../../helpers/displayCurrency";

class HomeScreen extends Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	const value = navigation.getParam("walletValue", null);
  	return {
  		title: value ? displayCurrency(value) : "AppSats"
  		//subTitle: "Your balance"
  	};
  };

  componentDidMount(): void {
  	setTimeout(() => {
  		this.props.navigation.setParams({ walletValue: 0.000097 });
  	}, 1000);
  }

  render() {
  	const { navigation } = this.props;

  	return (
  		<Fragment>
  			<StatusBar barStyle="dark-content"/>
  			<SafeAreaView>
  				<View style={styles.root}>
  					<View style={styles.betCardContainer}>
  						<Text>Bet cards swiping...</Text>
  					</View>

  					<ScrollView
  						contentInsetAdjustmentBehavior="automatic"
  						style={styles.scrollView}
  					>
  						<View
  							style={{
  								alignItems: "center",
  								justifyContent: "center"
  							}}
  						>
  							<Button
  								title="Profile"
  								onPress={() => navigation.navigate("Profile")}
  							/>
  						</View>
  					</ScrollView>
  				</View>
  			</SafeAreaView>
  		</Fragment>
  	);
  }
}

const styles = StyleSheet.create({
	root: {
		height: "100%"
	},
	betCardContainer: {
		//backgroundColor: "#909090"
	},
	scrollView: {
		//backgroundColor: "#555555"
	}
});

export default HomeScreen;
