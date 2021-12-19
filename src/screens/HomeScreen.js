import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	StatusBar,
	FlatList,
	Image,
} from 'react-native';
import { Button } from '../components/Elements';
import SearchBar from '../components/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { signOut } from '../../firebase';

const HomeScreen = ({ navigation }) => {
	const recentIcons = [
		{
			source: require('../assets/all_notifications.png'),
			text: 'All Notifications',
		},
		{
			source: require('../assets/who_is_using_vouch.png'),
			text: 'Who is using',
		},
		{
			source: require('../assets/help_bot.png'),
			text: 'Help Bot',
		},
	];

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor={'rgba(255,255,255,0)'}
				barStyle="dark-content"
				translucent={true}
			/>
			<ImageBackground
				style={styles.header}
				source={require('../assets/background_image.png')}
				resizeMode="contain"
			>
				<View style={{ width: 400, alignSelf: 'center' }}>
					<Button
						style={{ width: 50, height: 50, alignSelf: 'flex-end' }}
						icon={<Feather name="log-out" size={24} color="#481380" />}
						type="ghost"
						onPress={() => signOut()}
					/>
					<Text style={styles.title}>Your protected Payments</Text>
					<Text style={styles.description}>
						We are excited for you to protect your first payment!!
					</Text>
				</View>
			</ImageBackground>
			<SearchBar />
			<View style={styles.card}>
				<View style={styles.cardItem}>
					<Text style={styles.cardHeader}>Recent</Text>
					<FlatList
						data={recentIcons}
						keyExtractor={item => item.source}
						horizontal={true}
						renderItem={({ item }) => (
							<View style={styles.cardContent}>
								<Button
									icon={<Image source={item.source} />}
									style={{
										width: 55,
										height: 55,
										borderRadius: 100,
									}}
								/>
								<Text style={{ textAlign: 'center' }}>{item.text}</Text>
							</View>
						)}
					/>
					<Button
						title="New Payments"
						icon={<AntDesign name="plus" size={24} color="white" />}
						style={{
							width: 225,
						}}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	header: {
		width: 450,
		height: 200,
		marginBottom: 25,
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 21,
		color: '#481380',
		textAlign: 'center',
	},
	description: {
		textAlign: 'center',
		color: 'grey',
		marginTop: 15,
		maxWidth: 250,
		alignSelf: 'center',
	},
	card: {
		marginTop: 15,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderColor: 'silver',
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		paddingVertical: 30,
		paddingHorizontal: 35,
		width: 400,
		alignSelf: 'center',
	},
	cardItem: {
		height: 300,
	},
	cardHeader: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	cardContent: {
		width: 85,
		height: 100,
		marginVertical: 25,
		marginRight: 10,
		alignItems: 'center',
	},
});

export default HomeScreen;
