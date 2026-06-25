
<script>
    export default {
        props: {
            coursesData: Array
        },
        setup(props) {
            // By returning props, the template can access coursesData directly
            return {
                props
            }
        }
    }
</script>

<template>
    <div class="row mt-3">
        <div class="col-12">
            <h1 class="text-center text-primary py-1">Admin Dashboard</h1>
            
            <div class="table-responsive shadow-sm border rounded-3 bg-white p-3">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light text-uppercase fs-7">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Availability</th>
                            <th scope="col" colspan="2" class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in props.coursesData" :key="item._id">
                            <td class="font-monospace text-secondary fs-7">{{ item._id }}</td>
                            <td class="fw-bold text-primary">{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td class="fw-semibold text-dark">PHP {{ item.price }}</td>
                            <td>
                                <span class="text-success" v-if="item.isActive">Available</span>
                                <span class="text-danger" v-else>Unavailable</span>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-primary btn-sm" type="button">Edit</button>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" type="button">Archive</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>


    .fs-7 { font-size: 0.8rem; }
</style>
