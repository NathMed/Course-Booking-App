<!-- Variables and functions declared inside <script setup> are automatically available in the template. -->
<script setup>

    import {watch, ref, onBeforeMount} from 'vue';

    // import Notyf to allow the use of an alternative notification window.
    import { Notyf } from 'notyf';

    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/global.js';

    // Import the reusable axios instance for sending HTTP requests to the backend API.
    import api from '../api.js';

    // Reactive variables for the form inputs

    const firstName = ref("");
    const lastName = ref("");
    const mobileNum = ref("");

    const email = ref("");
    const password = ref("");
    const confirmPass = ref("");
    const isEnabled = ref(false);

    // Create an instance of Notyf to display popup notification
    const notyf = new Notyf();

    const router = useRouter()

    const {user} = useGlobalStore();

    // Returns true if all items have a value (none are empty)
    // Checks if password and confirm password are equal (match)
    watch([email, password, confirmPass, firstName, lastName, mobileNum], (currentValue, oldValue) => {

        if (currentValue.every(input => input !=="") && currentValue[1] === currentValue[2]) {
            // allow submit
            isEnabled.value = true;
        } else {
            // disable submit
            isEnabled.value = false;
        }
    })

    // handleSubmit is a function that runs when the form is submitted.
    async function handleSubmit(e) {
        // e - event object triggered when the form is submitted
        // preventDefault() stops the page from reloading after submit
        e.preventDefault();

        try {

            // Send the email input to the backend API to check if the email is already registered.
            // api.post('/users/check-email') - sends a POST request to check if the email already exists in the database.
            await api.post('/users/check-email', {
                email: email.value
            })

            // Send the registration form data to the backend API to create a new user account.
            let response = await api.post('/users/register', {
                // Request Body for Registration
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                mobileNo: mobileNum.value,
                password: password.value
            })

            if (response.status === 201) {

                notyf.success(response.data.message);

                // Clear input fields after successful submission
                firstName.value = "";
                lastName.value = "";
                mobileNum.value = "";
                email.value = "";
                password.value = "";
                confirmPass.value = "";

                router.push({path: '/login'})
            } else {
                notyf.error("Registration Failed. Please contact administrator.")
            }

            // console.log(email.value);
            // console.log(password.value);
            // console.log(confirmPass.value);

            // Show a success notification to the user
            
        } catch (e) {
            // Check if the error status is 404, 401, 400, or 409.
            if( e.response.status === 404 || e.response.status === 401 || e.response.status === 400 || e.response.status === 409) {

                // Display the error message returned from the backend API.
                notyf.error(e.response.data.message);

            } else {
                // Log unexpected errors in the console for debugging.
                console.error(e);

                // Display a default error message for unexpected errors.
                notyf.error("Registration Failed. Please contact administrator.");
            }
        }
    }

    onBeforeMount(() => {
        if (localStorage.getItem("token")) {
            router.push({ path: '/courses' });
        }
    });
    
</script>

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-primary text-center">Register Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5">
                <form @submit="handleSubmit">

                    <!-- Update the registration form to add the additional input fields required by the User model for user registration. -->
                    <div class="mb-3">
                        <label for="fName" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="fName" v-model="firstName" />
                    </div>
                    <div class="mb-3">
                        <label for="lName" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lName" v-model="lastName" />
                    </div>
                    <div class="mb-3">
                        <label for="mobile" class="form-label">Mobile Number</label>
                        <input type="text" class="form-control" id="mobile" v-model="mobileNum" />
                    </div>

                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <!-- v-model - connects the input and the variable so they update each other automatically. -->
                        <input type="email" class="form-control" id="emailInput" v-model="email" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" />
                    </div>
                    <div class="mb-3">
                        <label for="cpasswordInput" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="cpasswordInput" v-model="confirmPass" />
                    </div>
                    <div class="d-grid mt-5">
                        <!-- Enabled submit button -->
                        <button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Submit</button>
                        <!-- Disabled submit button -->
                        <button type="submit" class="btn btn-danger btn-block" v-else disabled>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>