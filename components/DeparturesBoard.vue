<!-- <template>
  <main>
    <DepartureHeader />
    <BoardWrapper :flight-data="Array.isArray(flightData) ? flightData : []" />
  </main>
</template> -->

<!-- to do: ce mesaj apare daca apare an error display a modal for user ceva de tipul : ne pare rau dar dar... ne cerem scuze penru... nu stiu -->

<!-- <script lang="ts">
import axios from 'axios'

import DepartureHeader from './DepartureHeader/DepartureHeader.vue'
import BoardWrapper from './BoardWrapper/BoardWrapper.vue'
import { AllDeparture } from '~/types'

export default {
  name: 'DeparturesBoard',

  components: {
    DepartureHeader,
    BoardWrapper,
  },
// use state not exact but...
  data() {
    return {
      flightData: [] as AllDeparture[],
    }
  },

  // 
  async created() {
    this.flightData = await this.getFlightData()
  },

  methods: {
    async getFlightData() {
      const url =
        'https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata'
      try {
        const { data } = await axios.get(url)
console.log(data.allDepartures)
        return data.allDepartures
      } catch (error) {
        // to do: handle error by types of error
        // console.log(error); map() 500 - da mesajul asta  error handling developer friendly
        throw new Error('Failed to fetch flight data')
      }
    },
  },
}
</script> -->


<template>
  <main>
    <DepartureHeader />
    <BoardWrapper :flight-data="Array.isArray(flightData) ? flightData : []" />
  </main>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import DepartureHeader from './DepartureHeader/DepartureHeader.vue'
import BoardWrapper from './BoardWrapper/BoardWrapper.vue'
import { AllDeparture } from '~/types'

export default defineComponent({
  name: 'DeparturesBoard',
  components: {
    DepartureHeader,
    BoardWrapper,
  },
  data() {
    return {
      flightData: [] as AllDeparture[],
    }
  },
  async created() {
    try {
      this.flightData = await this.getFlightData()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unknown error occurred')
      }
      throw new Error('Failed to fetch flight data')
      // Add any error handling or user notification logic here
    }
  },
  methods: {
    async getFlightData(): Promise<AllDeparture[]> {
      const url = 'https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata'
      try {
        const { data } = await axios.get(url)
        console.log(data.allDepartures)
        return data.allDepartures
      } catch (error) {
        console.error('Failed to fetch flight data', error)
        throw new Error('Failed to fetch flight data')
      }
    },
  },
})
</script>
