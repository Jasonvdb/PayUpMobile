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
import BetCard from "../../tabs/bets/swiper/BetCard";

const windowWidth = Dimensions.get("window").width;

const sliderWidth = windowWidth;

class Carousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: 0
		};
	}

	//TODO
	//https://github.com/archriss/react-native-snap-carousel/blob/master/doc/PROPS_METHODS_AND_GETTERS.md
	render() {
		const { items, ItemComponent, itemWidth, firstItem } = this.props;
		const { selectedIndex } = this.state;

		return (
			<SnapCarousel
				onBeforeSnapToItem={index => this.setState({ selectedIndex: index })}
				//enableSnap={false}
				//loop
				//layout={"stack"}
				//layoutCardOffset={30}
				inactiveSlideOpacity={0.3}
				//inactiveSlideScale={0.9}
				ref={c => {
					this._carousel = c;
				}}
				data={items}
				renderItem={props => (
					<ItemComponent {...props} isSelected={props.index === selectedIndex}/>
				)}
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
