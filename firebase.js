import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const signInWithPhoneNumber = async (user, resend = false) => {
	try {
		const confirmation = await auth().signInWithPhoneNumber(
			user.phoneNumber,
			resend
		);
		user.confirmation = confirmation;
		return user;
	} catch (e) {
		throw e;
	}
};

const verifyCode = async (user, code) => {
	try {
		await user?.confirmation?.confirm(code);
		delete user.confirmation;
		createUser(user);
	} catch (error) {
		throw error;
	}
};

const createUser = async user => {
	try {
		return await firestore()
			.collection('Users')
			.doc(user.phoneNumber)
			.set(user);
	} catch (err) {
		console.log(err);
	}
};

const signOut = async () => {
	return await auth().signOut();
};

export { signInWithPhoneNumber, verifyCode, signOut, createUser };
