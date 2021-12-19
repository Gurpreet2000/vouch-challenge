import React, { useState } from 'react';
import {
	StyleSheet,
	FlatList,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import { signInWithPhoneNumber, verifyCode } from '../../../firebase';
import { Input, Button } from '../../components/Elements';
import VerifyOtpScreen from './VerifyOtpScreen';

const SignUpScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState(''),
		[lastName, setLastName] = useState(''),
		[username, setUsername] = useState(''),
		[email, setEmail] = useState(''),
		[phoneNumber, setPhoneNumber] = useState(''),
		[referralCode, setReferralCode] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [confirm, setConfirm] = useState(null);

	const formItems = [
		{
			label: 'First Name',
			value: firstName,
			onChangeText: setFirstName,
			placeholder: 'Enter your first name',
		},
		{
			label: 'Last Name',
			value: lastName,
			onChangeText: setLastName,
			placeholder: 'Enter your last name',
		},
		{
			label: 'Username',
			value: username,
			onChangeText: setUsername,
			placeholder: 'Enter your username(max 20 char)',
			maxLength: 20,
		},
		{
			label: 'Email',
			value: email,
			onChangeText: setEmail,
			placeholder: 'Enter your email',
		},
		{
			label: 'Phone Number',
			value: phoneNumber,
			onChangeText: setPhoneNumber,
			placeholder: 'For eg: +91 9898989898',
			required: true,
			keyboardType: 'phone-pad',
		},
		{
			label: 'Referral Code (optional)',
			value: referralCode,
			onChangeText: setReferralCode,
			placeholder: 'For eg: NEWUSER',
		},
	];

	const onFormSubmit = async (resend = false) => {
		const formData = {
			firstName,
			lastName,
			username,
			email,
			phoneNumber,
			referralCode,
		};
		try {
			const confirmation = await signInWithPhoneNumber(formData, resend);
			setErrorMessage(null);
			if (confirmation) {
				setIsLoading(true);
				setConfirm(confirmation);
			}
		} catch (err) {
			console.error(err);
			setErrorMessage('Something went wrong!');
		}
	};

	return (
		<View behavior="padding" style={styles.container}>
			{confirm ? (
				<VerifyOtpScreen
					phoneNumber={phoneNumber}
					verifyCode={code => verifyCode(confirm, code)}
					resend={() => onFormSubmit(true)}
				/>
			) : (
				<>
					<FlatList
						removeClippedSubviews={false}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						data={formItems}
						keyExtractor={item => item.label}
						renderItem={({ item }) => (
							<View style={styles.listItem}>
								<Input
									{...item}
									onChangeText={value => item.onChangeText(value)}
								/>
							</View>
						)}
					/>

					<Button
						title="Get OTP"
						onPress={() => onFormSubmit()}
						style={{ width: 300 }}
						disabled={errorMessage || isLoading ? true : false}
					/>
				</>
			)}
			{errorMessage ? (
				<Text style={styles.errorMessage}>{errorMessage}</Text>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		marginBottom: 25,
	},
	listItem: {
		marginTop: 20,
		width: 300,
	},
	errorMessage: {
		color: 'red',
	},
});

export default SignUpScreen;
