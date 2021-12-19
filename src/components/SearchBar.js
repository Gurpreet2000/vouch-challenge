import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const SearchBar = () => {
	return (
		<View style={styles.searchBar}>
			<EvilIcons
				name="search"
				size={30}
				color="#481380"
				style={{ paddingLeft: 25, paddingRight: 15 }}
			/>
			<TextInput
				placeholder="Find people who are vouched"
				style={{ fontSize: 14 }}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	searchBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'silver',
		borderWidth: 1,
		borderRadius: 25,
		height: 50,
		width: 350,
		alignSelf: 'center',
	},
});
export default SearchBar;
