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
import SnapCarousel from "react-native-snap-carousel";
import PropTypes from "prop-types";

const windowWidth = Dimensions.get("window").width;

const sliderWidth = windowWidth;

class Carousel extends Component {
	render() {
		const { items, ItemComponent, itemWidth, firstItem } = this.props;

		return (
			<SnapCarousel
				//layout={"stack"}
				//layoutCardOffset={30}
				ref={c => {
					this._carousel = c;
				}}
				data={items}
				renderItem={ItemComponent}
				sliderWidth={sliderWidth}
				itemWidth={itemWidth}
				firstItem={firstItem}
			/>
		);
	}
}

Carousel.propTypes = {
	items: PropTypes.array.isRequired,
	ItemComponent: PropTypes.func.isRequired,
	itemWidth: PropTypes.number.isRequired,
	firstItem: PropTypes.number
};

const styles = StyleSheet.create({});

export default Carousel;
