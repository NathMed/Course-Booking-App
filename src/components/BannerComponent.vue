<!-- App.vue - main layout where we place and organize components -->
<!-- Single File Component - one .vue file that contains logic, user interface, and styles -->

<!-- Script - contains JavaScript code such as data, functions, and imports -->
<script>

  // Options API
    // A way of writing Vue components using sections (options) to organize code
  export default {
    // Props are data passed from a parent component to a child component.
      // Parent component - provides data (HomePage.vue)
      // Child component - receives data (BannerComponent.vue)
    props: {
      // Declares the inputs this component expects to receive
      // title: String,
      // tagline: String
      bannerProps: Object
    },
    // mounted() is a lifecycle hook (from the Options API)
    // It runs after the component is already displayed in the page (DOM)
    // Lifecycle hook - function that runs at a specific moment in a component's lifecycle.
    mounted() {
      console.log(this.bannerProps.title);
      console.log(this.bannerProps.tagline);
    }
  }

</script>

<!-- Template - contains what is displayed in the browser -->
<template>

  <div class="container-fluid">
    <div class="row mb-5 py-5" id="banner">
      <div class="col-md-10 p-5 m-5">
        <!-- {{ }} is called interpolation (Double Moustaches). 
        It takes data (such as props) and renders it on the screen. -->
        <h1 class="mb-3" id="banner-title"> {{bannerProps.title}} </h1>
        <p class="mb-5" id="motto">
          {{bannerProps.tagline}}
        </p>
        <a class="btn btn-primary btn-lg rounded-pill px-3">
        View our Courses!
        <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>

</template>

<!-- Style - contains the design that applies only to this component -->
<!-- scoped - contains styles that affect only this component and not others -->
<style scoped>

  h1 {
    font-family: serif;
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
  }

</style>