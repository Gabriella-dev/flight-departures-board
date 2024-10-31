<template>
  <main>
    <DepartureHeader/>
    <BoardWrapper :flight-data="flightData"/>
  </main>
</template>

<script lang="ts">
import axios from 'axios';

import DepartureHeader from './DepartureHeader/DepartureHeader.vue';
import BoardWrapper from './BoardWrapper/BoardWrapper.vue';
import { AllDeparture } from '~/types';

export default {
  name: 'DeparturesBoard',

  components: {
    DepartureHeader,
    BoardWrapper, 
  },

data() {
    return {
      flightData: [] as AllDeparture[], 
    };
  },

  created(this: any) {
    this.getFlightData();
  },

  methods: {
    async getFlightData() {
      const url = 'https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata';
      try {
    const { data } = await axios.get(url);

    console.log('data.allDepartures>>>',data.allDepartures);

    const dataStatusArray = data.allDepartures.map((flight: AllDeparture) => flight.status);
    console.log('data arr>>>>>>', dataStatusArray);

    // console.log('data arr>>>>>>', dataStatusArray); returns TypeError: Cannot read properties of undefined (reading 'map')
  

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch flight data');
  }
    }
  },
 
}
</script>
