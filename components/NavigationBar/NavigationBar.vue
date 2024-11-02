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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationBar',

  methods: {
    sortByTime() {
      // Add tracking logic here
      this.$emit('sort', 'time')
    },
    sortByCity() {
      // Add tracking logic here
      this.$emit('sort', 'city')
    },
    // todo add other sorting methods and tracking logic for them
  },
})
</script>

<style scoped>
.navigation-bar {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.9fr 1fr 0.7fr 1.3fr;
  align-items: start;
  background-color: #d3d3d3;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 0.7fr 1.3fr;
    padding-left: 60px;
  }
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-align: left;
  padding: 0;
}

button:hover {
  color: #2d0af4;
}
</style>
