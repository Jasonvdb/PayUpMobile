import React, { Component, Fragment } from "react";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Dimensions,
	Image
} from "react-native";
import SnapCarousel from "react-native-snap-carousel";

import theme from "../../config/theme";
import Slide from "./Slide";
import CreateWalletSlide from "./CreateWalletSlide";
const windowWidth = Dimensions.get("window").width;

const sliderWidth = windowWidth;

class Container extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(): void {}

	snapToNext() {
		setTimeout(() => this._carousel.snapToNext(), 50);
	}

	snapToPrevious() {
		setTimeout(() => this._carousel.snapToPrev(), 50);
	}

	render() {
		const { navigation } = this.props;

		const items = [
			{
				imageSource: require("../../../images/onboarding_2.png"),
				title: "A Bitcoin wallet betting app",
				content:
          "A bitcoin wallet with the added feature of allowing you to make secure bets with friends."
			},
			{
				imageSource: require("../../../images/onboarding_5.png"),
				title: "Make bets with your friends",
				content:
          "Add funds to the wallet, invite some friends and start betting. "
			},
			{
				imageSource: require("../../../images/onboarding_3.png"),
				title: "Your keys, your money",
				content:
          "Control of your funds can only be done on the app, and funds pending a bet outcome are controlled jointly by you and your friend."
			},
			{
				imageSource: require("../../../images/onboarding_6.png")
			}
		];

		return (
			<Fragment>
				<StatusBar barStyle="light-content"/>
				<View style={styles.root}>
					<SnapCarousel
						layoutCardOffset={30}
						inactiveSlideOpacity={1}
						inactiveSlideScale={1}
						ref={c => {
							this._carousel = c;
						}}
						data={items}
						renderItem={props => {
							const { index } = props;

							if (index === 3) {
								return (
									<CreateWalletSlide
										{...props}
										onBackPress={
											index > 0 ? this.snapToPrevious.bind(this) : null
										}
									/>
								);
							}

							return (
								<Slide
									{...props}
									onContinuePress={this.snapToNext.bind(this)}
									onBackPress={
										index > 0 ? this.snapToPrevious.bind(this) : null
									}
								/>
							);
						}}
						sliderWidth={sliderWidth}
						itemWidth={sliderWidth}
					/>
				</View>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		height: "100%",
		backgroundColor: theme.background
	}
});

export default Container;
