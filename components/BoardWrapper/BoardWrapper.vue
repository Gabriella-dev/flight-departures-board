<template>
    <div class="board-wrapper">
      <NavigationBar/>
      <section>
        <!-- Use flightData here, e.g., render a list -->
        <ul>
          <li v-for="flight in flightData" :key="flight.flightNumber">
            {{ flight.flightNumber }} - {{ flight.airline}} - {{ flight.status }}
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import NavigationBar from '../NavigationBar/NavigationBar.vue';
  import { AllDeparture } from '~/types';
  
  
  export default defineComponent({
    name: 'BoardWrapper',

    components: {
      NavigationBar,
    },
    props: {
      flightData: {
        type: Array as PropType<AllDeparture[]>, 
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .board-wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: black;
    color: white;
  }
  </style>
  