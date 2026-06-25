<script>
    import CourseComponent from './CourseComponent.vue';

    export default {
        components: {
            CourseComponent
        },
        props: {
            // This is the prop passed from CoursesPage
            coursesData: Array
        },
        setup(props) {
            // Return the props so the template can access coursesData
            return {
                props
            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col my-5">
                <h1 class="text-center text-primary py-1">Courses Offered</h1>
                <p class="text-center">Select a course to enroll in!</p>
            </div>
        </div>
        <div class="row g-4">
            <CourseComponent 
                v-for="course in props.coursesData" 
                :key="course._id" 
                :courseData="course" 
            />
        </div>
    </div>
</template>