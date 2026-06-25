<script>
    import api from '../api.js';
    import { reactive, watch } from 'vue';
    
    // Import the required view components
    import AdminView from '../components/AdminView.vue';
    import UserView from '../components/UserView.vue';
    
    // Import the global Pinia store
    import { useGlobalStore } from '../stores/global.js'; 

    export default {
        components: {
            AdminView,
            UserView
        },
        setup() {
            const globalStore = useGlobalStore();
            const courses = reactive({ data: [] });

            // 1. watch the global state "user.isAdmin"
            watch(
                () => globalStore.user.isAdmin, 
                async (isAdmin) => {
                    try {
                        // 2. Fetch data based on user role
                        if (isAdmin) {
                            let { data } = await api.get('/courses/all');
                            courses.data = data;
                        } else {
                            let { data } = await api.get('/courses');
                            courses.data = data;
                        }
                    } catch (error) {
                        console.error("Error fetching courses:", error);
                    }
                }, 
                // 3. Set immediate to true to run on mount
                { immediate: true } 
            );

            return {
                courses,
                user: globalStore.user 
            }
        }
    }
</script>

<template>
    <div class="container">
        <AdminView 
            v-if="user.isAdmin" 
            :coursesData="courses.data" 
        />

        <UserView 
            v-else 
            :coursesData="courses.data" 
        />
    </div>
</template>