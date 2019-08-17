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

import Carousel from "../../../elements/carousel/Carousel";
import BetCard from "./BetCard";

const windowWidth = Dimensions.get("window").width;

const itemWidth = windowWidth / 1.6;

class BetCardSwipe extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: null
		};
	}

	componentDidMount(): void {
		setTimeout(() => {
			this.setState({
				items: [
					{ title: "Won card", type: "won" },
					{ title: "Lost card", type: "lost" },

					{ title: "Active card", type: "active" },
					{ title: "Add card", type: "add" }
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

export default BetCardSwipe;
