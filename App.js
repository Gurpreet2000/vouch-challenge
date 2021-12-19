import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './src/screens/AuthScreens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#481380',
		background: 'white',
		card: 'white',
		text: '#481380',
	},
};

const Stack = createStackNavigator();

const App = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	const onAuthStateChanged = user => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator
				screenOptions={{
					cardStyle: { backgroundColor: 'white' },
				}}
			>
				{user ? (
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
				) : (
					<Stack.Screen
						name="SignUp"
						component={SignUpScreen}
						options={{ title: 'Sign Up!' }}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
