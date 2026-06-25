<script setup>
import BannerComponent from '../components/BannerComponent.vue'
 
const banner = {
  title: '404 - Not Found',
  tagline: 'The page you are looking for cannot be found.',
  destination: 'Home',
  buttonLabel: 'Back to Home'
}
</script>

<template>
  <BannerComponent :bannerProps="banner" />
</template>
 

<style>

</style>