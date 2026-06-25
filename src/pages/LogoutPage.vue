<script setup>

	import {onBeforeMount} from 'vue';

	import {useGlobalStore} from '../stores/global';
	import {useRouter} from 'vue-router';

	const {getUserDetails} = useGlobalStore();

	const router = useRouter();

	onBeforeMount(() => {
		// Removes all stored data in the browser (logs out the user)
		localStorage.clear();

		getUserDetails(null);

		router.push({name: 'Home'})

		// window.location.href = "/login"
	})
	
</script>

<template>
	
</template>

<style>
	
</style>