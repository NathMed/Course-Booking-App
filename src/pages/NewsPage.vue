<script>
    import newsData from '../data/newsData.js';

    import { reactive, ref, watch } from 'vue';
    import { Notyf } from 'notyf';

    import NewsComponent from '../components/NewsComponent.vue';

    import { useGlobalStore }  from '../stores/global.js';

    export default {
        components: {
            NewsComponent
        },
        setup() {

            const store = useGlobalStore();

            const news = reactive(newsData)

            const feedback = ref("");
            const isEnabled = ref(false);

            const notyf = new Notyf();

            watch(feedback, (currentValue) => {
                if (currentValue.trim() !== "") {
                    isEnabled.value = true;
                } else {
                    isEnabled.value = false;
                }
            });

            function handleSubmit(e){
                
                e.preventDefault();

                notyf.success("Feedback Sent");

                feedback.value = "";
                isEnabled.value = false;
            }


            return {
                news,
                feedback,
                isEnabled,
                handleSubmit,
                store

            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col my-5">
                <h1 class="text-center text-primary py-1">News</h1>
            </div>
        </div>

        <div class="row g-4">
            <NewsComponent v-for="indivNews in news" :newsData="indivNews"/>
        </div>

        <div class="row" v-if="store.user.email !== null">
            <h1 class="my-5 pt-3 text-primary text-center">Feedback Form</h1>

            <div class="col-md-9 border border rounded-3 mx-auto p-5">
                <form v-on:submit="handleSubmit">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" v-model="store.user.email" />
                    </div>
                    <div class="mb-3">
                        <label for="feedbackInput" class="form-label">Feedback</label>
                        <textarea class="form-control" id="feedbackInput" placeholder="Let us know what you think" rows="5" v-model="feedback"></textarea>
                    </div>
                    <div class="d-grid mt-5">
                        <button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Send Feedback</button>
                        <button type="submit" class="btn btn-danger btn-block" disabled v-else>Send Feedback</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>