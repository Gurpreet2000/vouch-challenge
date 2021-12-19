import React from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
} from 'react-native';

export const Input = props => {
	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				margin: 2.5,
			}}
		>
			{props.label ? (
				<>
					<Text style={styles.label}>
						{props.label}
						{props.required ? <Text style={{ color: 'red' }}>*</Text> : null}
					</Text>
				</>
			) : null}
			<TextInput
				style={styles.inputFeild}
				placeholderTextColor="grey"
				autoCapitalize="none"
				autoCorrect={false}
				{...props}
			/>
		</View>
	);
};

export const Button = ({ title, onPress, style, icon, type }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				display: 'flex',
				alignSelf: 'center',
				flexDirection: 'row',
				justifyContent: icon ? 'space-evenly' : 'center',
				alignItems: 'center',
				backgroundColor: type ? null : '#481380',
				borderRadius: 25,
				height: 40,
				margin: 5,
				...style,
			}}
		>
			{icon ? icon : null}
			{title ? (
				<Text
					style={{
						color: type === 'ghost' ? '#481380' : 'white',
						fontSize: 18,
						fontWeight: 'bold',
						padding: 5,
					}}
				>
					{title}
				</Text>
			) : null}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	inputFeild: {
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 7.5,
		margin: 2.5,
		color: 'black',
		paddingHorizontal: 10,
		paddingVertical: 5,
		fontSize: 16,
		marginTop: 5,
	},
	label: {
		color: 'black',
		paddingLeft: 5,
		fontSize: 18,
	},
});
