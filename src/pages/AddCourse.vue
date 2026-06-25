<script>
import { Notyf } from 'notyf';

export default {
  name: 'AddCourse',

  data() {
    return {
      courseName: '',
      description: '',
      price: 0,
      isLoading: false,
      errorMessage: '',
    };
  },

  computed: {
    
    isFormValid() {
      return (
        this.courseName.length > 0 &&
        this.description.length > 0 &&
        this.price > 0
      );
    },
  },

  methods: {
    async addCourse() {
      if (!this.isFormValid) return;

      this.isLoading = true;
      this.errorMessage = '';

      // Retrieve the auth token from localStorage
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${import.meta.env.VITE_COURSE_BOOKING_API}/courses/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: this.courseName,
            description: this.description,
            price: this.price,
          }),
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
          throw new Error(data.message || 'Failed to add course.');
        }

        
         const notyf = new Notyf();
        notyf.success('Course added successfully!');

        setTimeout(() => {
          this.$router.push({ name: 'Courses' });
        }, 1500);

      } catch (error) {
        
        this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">Add New Course</h3>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6">

        <!-- Course Name -->
        <div class="mb-3">
          <label for="courseName" class="form-label">Course Name</label>
          <input
            id="courseName"
            v-model.trim="courseName"
            type="text"
            class="form-control"
          />
        </div>

        <!-- Description -->
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model.trim="description"
            class="form-control"
            rows="5"
          ></textarea>
        </div>

        <!-- Price -->
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input
            id="price"
            v-model.number="price"
            type="number"
            class="form-control"
            min="0"
          />
        </div>

        <!-- Submit Button: disabled + red when fields empty, blue when filled -->
        <button
          class="btn"
          :class="isFormValid ? 'btn-primary' : 'btn-danger'"
          :disabled="!isFormValid || isLoading"
          @click="addCourse"
        >
          <span v-if="isLoading">
            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
            Adding...
          </span>
          <span v-else>Add Course</span>
        </button>

      </div>
    </div>
  </div>
</template>

