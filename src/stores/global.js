// defineStore - function from Pinia used to create a global store
// A global store allows different components to share and use the same data.
// A store acts like a global container for shared data.
import {defineStore} from 'pinia';

// reactive - makes an object reactive so the UI updates automatically when data changes
import {reactive} from 'vue';

import axios from 'axios';

// useGlobalStore - exported function used to access this global store in other components
// defineStore() - creates a Pinia store
// It accepts 2 parameters:
    // 1st parameter - unique name/id of the store
    // 2nd parameter - callback function that contains the data and functions of the store
export const useGlobalStore = defineStore('global', () => {
	
	// user - global reactive object that stores user information
    // reactive() - makes the object reactive across the application
	let user = reactive({
		token: localStorage.getItem('token'),
		email: null,
		isAdmin: null
	})

	// getUserDetails() - function used to update the user's email
    // email - parameter that receives the user's email value

    // async - allows the function to use await for asynchronous operations such as API requests.
	async function getUserDetails(token) {
		// Update the email property inside the reactive user object

		// If the token does not exist, treat the user logged out
		if (!token) {
			user.token = null;
			user.email = null;
			user.isAdmin = null;

			// Stop the function if there is no token
			return;
		}

		let {data} = await axios.get(`${import.meta.env.VITE_COURSE_BOOKING_API}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		user.token = token;
		user.email = data.email;
		user.isAdmin = data.isAdmin;
	}

	return{
		// user - shared user data from the store
		user,
		// getUserDetails - function used to update the user data
		getUserDetails
	}

})

