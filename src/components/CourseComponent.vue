<script>

    // ref - reactive variable for a single value that updates the UI automatically.
    // watch - listens to a reactive variable and runs a function whenever that value changes.
    import { ref, watch } from "vue";

    // Notyf
    import { Notyf } from 'notyf';

    // import the useGlobalStore to gain access to our global user state
    import { useGlobalStore } from "../stores/global";

    const notyf = new Notyf();

    export default {
        // Props are data passed from a parent component to a child component.
            // Parent component - provides data (CoursesPage.vue)
            // Child component - receives data (CourseComponent.vue)
        props: {
            courseData: Object
        },
        // Extracts the courseData prop from props
        // emit is a function used to send events or data from a child component to its parent.
        // Will be used to send the number of enrollees from the child component to the parent CoursesPage.vue
        setup({ courseData }) {

            const {user} = useGlobalStore();

            // 0 - initial value
            // const enrollees = ref(0);
            // const seats = ref(30);

            // Reactive data for button
            // const isEnabled = ref(true);

            // enroll() - increases the enrollees count by 1 each time it is called
            // function enroll() {
            //     // Increases the value of enrollees by 1
            //     enrollees.value++;

            //     seats.value--;

            //     // Tells the parent to add 1 more enrollee each time the function runs
            //     // enrollment - event name
            //     // 1 - data sent to the parent
            //     emit('enrollment', 1)
            // }

            // watch() is a Vue function that listens to a reactive variable and runs a function whenever that value changes.
            // It accepts two parameters
                // the reactive variable to observe 
                // callback function that runs whenever the value changes
                    // A callback function is a function you give to another function to run later.
            // currentValue - the latest value of "seats" coming from the reactive variable (seats.value after change)
            // oldValue - the previous value of "seats" before the change (seats.value before update)
            // Vue automatically provides these values when "seats" changes
            // watch(seats, (currentValue, oldValue) => {

            //     // If seats becomes 0, disable the button (set to false)
            //     if(currentValue === 0) {
            //         isEnabled.value = false

            //         notyf.error("No more seats available");
                    
            //     } else {
            //         // Otherwise, enable the button (set to true)
            //         isEnabled.value = true
            //     }
            // })

            return {
                user
                // courseData,
                // enrollees,
                // enroll,
                // seats,
                // isEnabled
            }
        }
    }
    
</script>

<template>
    <div class="col-md-4">
        <div id="CourseCard" class="cardHighlights card p-2 shadow-sm">

            <img 
                class="card-img-top"
                :src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(courseData.name)}`"
                :alt="courseData.name"
            >

            <div class="card-body fw-bold mb-2">
                <h4 class="card-title">
                    {{courseData.name}}
                </h4>
                <p class="card-text mt-3">
                    {{courseData.description}}
                </p>
                <p class="mb-1">
                    <span class="fw-semibold">
                        Price: PHP {{courseData.price}}
                    </span>
                </p>
                <!-- <p>
                    Enrollees: {{enrollees}}
                </p>
                <p>
                    Seats: {{seats}}
                </p> -->
                <div class="d-grid mt-3">
                    <router-link class="btn btn-outline-primary d-block" 
                    :to="{ path: `/courses/${courseData._id}`}">
                        View Course
                    </router-link>
                    <!-- v-on - Vue directive used to listen to events -->
                    <!-- v-on:click - listens for a click event and runs the enroll function.  -->
                    <!-- <button class="btn btn-outline-primary btn-block" v-if="isEnabled" v-on:click="enroll">Enroll</button>
                    <button class="btn btn-outline-danger btn-block" v-else disabled>Enroll</button> -->
                    <!-- <button class="btn btn-outline-primary btn-block" @click="enroll">Enroll</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
