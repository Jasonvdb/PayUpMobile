/**
 * BetCardSwipe
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
	Button,
	Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";
import { withNavigation } from "react-navigation";

import Carousel from "../../../elements/carousel/Carousel";
import BetCard from "./BetCard";

const windowWidth = Dimensions.get("window").width;

const itemWidth = windowWidth / 1.2;

class BetCardSwipe extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: null
		};
	}

	componentDidMount(): void {
		const { navigation } = this.props;

		setTimeout(() => {
			this.setState({
				items: [
					{
						title: "Won card",
						type: "won",
						onPress: () => navigation.push("Bet")
					},
					{
						title: "Lost card",
						type: "lost",
						onPress: () => navigation.push("Bet")
					},

					{
						title: "Active card",
						type: "active",
						onPress: () => navigation.push("Bet")
					},
					{
						title: "Add card",
						type: "add",
						onPress: () => navigation.push("Bet")
					}
				]
			});
		}, 200);
	}

	render() {
		const { navigation } = this.props;
		const { items } = this.state;

		if (!items) {
			return null; //TODO loader
		}

		return (
			<Animatable.View animation="fadeIn" style={styles.root}>
				<Carousel
					items={items}
					ItemComponent={BetCard}
					itemWidth={itemWidth}
					firstItem={items.length - 2}
				/>
			</Animatable.View>
		);
	}
}

const styles = StyleSheet.create({
	root: {}
});

export default withNavigation(BetCardSwipe);
