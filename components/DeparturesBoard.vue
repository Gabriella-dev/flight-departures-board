<template>
  <main>
    <DepartureHeader />
    <BoardWrapper
      :flight-data="Array.isArray(flightData) ? flightData : []"
      :is-loading="isLoading"
    />
    <section v-if="errorMessage" class="error-modal">
      <h2>We are sorry...</h2>
      <SadAirplane />
      <p>{{ errorMessage }}</p>
      <button @click="closeErrorModal">Close</button>
    </section>
  </main>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import DepartureHeader from './DepartureHeader/DepartureHeader.vue'
import BoardWrapper from './BoardWrapper/BoardWrapper.vue'
import SadAirplane from './assets/SadAirplane.vue'
import { AllDeparture } from '~/types'
import { handleError } from '~/utils/errorHandler'

export default defineComponent({
  name: 'DeparturesBoard',
  components: {
    DepartureHeader,
    BoardWrapper,
    SadAirplane,
  },
  data() {
    return {
      flightData: [] as AllDeparture[],
      isLoading: true,
      errorMessage: '',
    }
  },
  async created() {
    try {
      this.flightData = await this.getFlightData()
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage =
          'We’re experiencing a temporary issue with the flight details. Please check back soon for updates on all flights.'
      } else {
        this.errorMessage =  handleError(error)
      }
    } finally {
      this.isLoading = false
    }
  },

  mounted() {
    // Simulate data fetching delay (for testing purposes only)
    setTimeout(() => {
      this.isLoading = false // Set to false once data is loaded
    }, 2000) // Adjust the timeout duration as needed
  },

  methods: {
    async getFlightData(): Promise<AllDeparture[]> {
      const url =
        'https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata'
      const { data } = await axios.get(url);
      return data.allDepartures;
    },
    closeErrorModal() {
      this.errorMessage = ''
    },
  },
})
</script>

<style scoped>
.error-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error-modal p {
  text-align: center;
}
.error-modal button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
