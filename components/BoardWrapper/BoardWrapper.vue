<template>
  <div class="board-wrapper">
    <NavigationBar />
    <UpdateStatusForm
      v-if="selectedFlight"
      :selected-flight="selectedFlight"
      @status-updated="handleStatusUpdate"
      @close-form="closeUpdateForm"
    />

    <section>
      <ul class="board-list">
        <li
          v-for="flight in sortedFlightData"
          :key="flight.flightNumber"
          @click="selectFlight(flight)"
        >
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
import axios from 'axios'
import NavigationBar from '../NavigationBar/NavigationBar.vue'
import UpdateStatusForm from '../UpdateStatusForm/UpdateStatusForm.vue'
import BoardListItemCard from '../BoardListItemCard/BoardListItemCard.vue'
import { AllDeparture } from '~/types'

export default defineComponent({
  name: 'BoardWrapper',

  components: {
    NavigationBar,
    UpdateStatusForm,
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

  data() {
    return {
      selectedFlight: null as AllDeparture | null,
    }
  },
  computed: {
    sortedFlightData() {
      return [...this.flightData].sort((a, b) => {
        const dateA = new Date(a.scheduledDepartureDateTime).getTime()
        const dateB = new Date(b.scheduledDepartureDateTime).getTime()
        return dateA - dateB
      })
    },
  },

  watch: {
    flightData(newData) {
      console.log('Flight Data updated:', newData)
    },
  },

  mounted() {
    console.log('Flight Data on mount:', this.flightData)
  },



  methods: {
    selectFlight(flight: AllDeparture) {
      // Select a new flight and show the form
      this.selectedFlight = flight
    },
    closeUpdateForm() {
      // Hide the form
      this.selectedFlight = null
    },
    async handleStatusUpdate(newStatus: string) {
      if (!this.selectedFlight) return

      try {
        // Example: Making an API call to update the specific flight status
        const response = await axios.post('/api/update-flight-status', {
          flightNumber: this.selectedFlight.flightNumber,
          status: newStatus,
        })
        console.log('Status updated successfully:', response.data)
        // Optionally, update the status locally
        this.selectedFlight.status = newStatus
      } catch (error) {
        console.error('Failed to update flight status:', error)
      }
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

.board-list :hover {
  cursor: pointer;
  background-color: rgb(29, 29, 39);
}
</style>
