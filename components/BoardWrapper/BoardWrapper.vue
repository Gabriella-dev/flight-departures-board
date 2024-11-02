<template>
  <div class="board-wrapper">
    <NavigationBar />
    <section>
      <!-- Use flightData here, e.g., render a list -->
      <ul class="board-list">
        <li v-for="flight in flightData" :key="flight.flightNumber">
          <BoardListItemCard
            :is-loading="isLoading"
            :scheduled-departure-date-time="flight.scheduledDepartureDateTime"
            :city-name="flight.arrivalAirport.cityName"
            :airport-code="flight.flightNumber"
            :airline-name="flight.airline.name"
            :gate-number="flight.departureGate?.number"
            :status="flight.status"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import NavigationBar from '../NavigationBar/NavigationBar.vue'
import BoardListItemCard from '../BoardListItemCard/BoardListItemCard.vue'
import { AllDeparture } from '~/types'

export default defineComponent({
  name: 'BoardWrapper',

  components: {
    NavigationBar,
    BoardListItemCard,
  },
  props: {
    flightData: {
      type: Array as PropType<AllDeparture[]>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true, 
    },
  },
})
</script>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: black;
  color: white;
}

.board-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
