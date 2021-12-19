import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Elements';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CELL_COUNT = 6;

const VerifyOtpScreen = ({ phoneNumber, verifyCode, resend }) => {
	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={{ color: 'grey', fontSize: 18 }}>
					Enter the OTP sent to
					<Text style={{ color: 'black' }}> {phoneNumber}</Text>
				</Text>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={setValue}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFiledRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<View
							onLayout={getCellOnLayoutHandler(index)}
							key={index}
							style={[styles.cellRoot, isFocused && styles.focusCell]}
						>
							<Text style={styles.cellText}>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						</View>
					)}
				/>
				<Text style={{ color: 'grey', fontSize: 14 }}>
					Didn't receive the OTP?
					<TouchableOpacity onPress={() => resend()}>
						<Text style={{ color: 'red', fontWeight: 'bold' }}> RESEND IT</Text>
					</TouchableOpacity>
				</Text>
			</View>
			<Button
				title="Verify OTP"
				style={{ width: 300 }}
				onPress={() => verifyCode(value)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		display: 'flex',
		justifyContent: 'space-around',
		height: '100%',
		width: 300,
	},
	codeFiledRoot: {
		width: 280,
		marginTop: 25,
		marginBottom: 50,
	},
	cellRoot: {
		width: 25,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	cellText: {
		color: '#000',
		fontSize: 36,
		textAlign: 'center',
	},
	focusCell: {
		borderBottomColor: '#481380',
		borderBottomWidth: 2,
	},
});

export default VerifyOtpScreen;
