<template>
    <div class="navigation-bar">
      <button @click="sortByTime">Departure time</button>
      <button @click="sortByCity">City Name</button>
      <button>Code</button>
      <button>Airline</button>
      <button>Gate</button>
      <button>Status</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NavigationBar',
    methods: {
      sortByTime() {
        this.$emit('sort', 'time');
      },
      sortByCity() {
        this.$emit('sort', 'city');
      },
    },
  });
  </script>
  
  <style scoped>
  .navigation-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #d3d3d3; 
    padding: 10px;
    border-radius: 10px;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
  
    button:hover {
        color: #2d0af4; /* Yellow */
    }
  </style>
  