<script setup>

    import { watch, ref } from 'vue';
    import { Notyf } from 'notyf';

    import axios from 'axios';

    import { onBeforeMount } from 'vue';

    // useGlobalStore - imports the global Pinia store used for managing login state and updating the Navbar
    import {useGlobalStore} from '../stores/global';

    // useRouter - imports Vue Router functions for redirecting users after login
    import {useRouter} from 'vue-router';

    // getUserDetails - gets the global function from the store used to update the shared user data
    const store = useGlobalStore();
    const getUserDetails = store.getUserDetails;

    // useRouter() - creates the router object for redirecting users after login
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    const notyf = new Notyf();

    watch([email,password], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    async function handleSubmit(e){
        e.preventDefault();

        try {

            let res = await axios.post(`${import.meta.env.VITE_COURSE_BOOKING_API}/users/login`, {
                // Request Body - send the email and password input to the backend
                email: email.value,
                password: password.value
            })

            if(res.data) {

                notyf.success("Login Successful");

                // localStorage - browser storage used to save data persistently (even after refresh)
                // setItem - method used to save data
                // "email" - key (name used to identify the stored data)
                // email.value - value (actual data being saved)

                // access - property that holds the token
                localStorage.setItem("token", res.data.access);

                // getUserDetails() - updates the global user state with the current email input
                getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                // router.push() - redirects the user to another page without refreshing the app
                router.push({path: '/courses'})
            }
        } catch (e) {
            if(e.response.status === 404 || e.response.status === 401 || e.response.status === 400) {
                // Display the error message returned from the backend API.
                notyf.error(e.response.data.message);
            } else {
                notyf.error("Login Failed. Please contact administrator.")
            }

        }
        // window - global browser object that provides access to browser features
        // location - represents the current page URL
        // reload() - reloads the current page so other components like the Navbar can read the updated localStorage data.
        // window.location.reload();
    }

    onBeforeMount(() => {
        if (localStorage.getItem("token")) {
            router.push({ path: '/courses' });
        }
    });
</script>

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-primary text-center">Login Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5">
                <form v-on:submit="handleSubmit">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" />
                    </div>
                    <div class="d-grid mt-5">
                        <button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Login</button>
                        <button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
