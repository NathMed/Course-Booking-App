<script>
  import BannerComponent from '../components/BannerComponent.vue';
  import HighlightsComponent from '../components/HighlightsComponent.vue';

  export default {
    components: {
      BannerComponent,
      HighlightsComponent
    },
    // data() defines the reactive state of the component using the Options API
    // Reactive state refers to data that can change over time and automatically update the UI when it changes
    data() {
      return {
        // bannerProps is an object that groups related data to be passed a single prop.
        bannerProps: {
          title: "Zuitt Course Booking System",
          tagline: "Opportunities for Everyone, Everywhere!"
        }
      }
    }
  }
</script>

<template>
  <div class="container-fluid">
    <!-- Pass data from the parent HomePage.vue to the child BannerComponent.vue -->
    <!-- Uses props to send values through title and tagline attributes -->
    <!-- <BannerComponent v-bind:bannerProps=bannerProps/> -->
    <!-- ":" is shorthand for v-bind in vue -->
    <!-- v-bind is used to bind (connect) dynamic data to a component or element -->
      <!-- bannerProps (left side) - the prop name expected by the child component -->
      <!-- bannerProps (right side) - the variable from the parent’s data() -->
    <BannerComponent :bannerProps=bannerProps />
    <HighlightsComponent />
  </div>
</template>

<style scoped>

</style>
