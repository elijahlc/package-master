import React from 'react';
import { Hero, Columns, Heading, Content, Image } from 'react-bulma-components';

const HeroSection = () => {
	return (
		<Hero size="medium">
			<Hero.Body>
				<Columns vCentered>
					<Columns.Column size="two-thirds">
						<Heading textColor="primary" textFamily="secondary" textTransform="uppercase" renderAs="h1" textSize={1}>
							Say hello to effortless package tracking
						</Heading>
						<Content renderAs="p" textSize={4}>
							Say goodbye to the hassle of searching your inbox for tracking links. Add all the packages you're
							expecting to your ParcelPal profile and easily view their status in one place.
						</Content>
					</Columns.Column>
					<Columns.Column>
						<Image src="../../../static/assets/hero.png" />
					</Columns.Column>
				</Columns>
			</Hero.Body>
		</Hero>
	);
};

export default HeroSection;
