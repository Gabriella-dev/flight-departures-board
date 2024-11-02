<template>
  <div v-if="selectedFlight" class="update-status-form">
    <h2>
      Update Status for {{ selectedFlight.arrivalAirport.cityName }} -
      {{ selectedFlight.airline.name }} - {{ selectedFlight.flightNumber }}
    </h2>
    <form @submit.prevent="updateFlightStatus">
      <div class="form-group">
        <label for="status-input">Status:</label>
        <select id="status-input" v-model="status" required>
          <option value="">-- Select Status --</option>
          <option value="Custom">Custom (Enter your own status)</option>
          <option value="Departed">Departed</option>
          <option value="Diverted">Diverted</option>
          <option value="Delayed">Delayed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div v-if="status === 'Custom'" class="form-group">
        <label for="custom-status-input">Enter Custom Status:</label>
        <input
          id="custom-status-input"
          v-model="customStatus"
          type="text"
          placeholder="Write your own status"
          maxlength="25"
          required
        />
        <p v-if="warningMessage" class="warning">{{ warningMessage }}</p>
      </div>
      <button type="submit">Update Status</button>
      <button type="button" @click="closeForm">Close</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { AllDeparture } from '~/types'

export default defineComponent({
  name: 'UpdateStatusForm',
  props: {
    selectedFlight: {
      type: Object as PropType<AllDeparture | null>,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      status: '',
      customStatus: '',
      warningMessage: '',
    }
  },

  watch: {
    customStatus(newVal) {
      // Show a warning if the custom status exceeds 20 characters
      if (newVal.length > 20) {
        this.warningMessage = 'Custom status must be 20 characters or fewer.'
      } else {
        this.warningMessage = '' // Clear the warning if within limit
      }
    },
    selectedFlight() {
      // Reset form when a new flight is selected
      this.resetForm()
    },
  },
  methods: {
    updateFlightStatus() {
      let statusToUpdate = this.status
      if (this.status === 'Custom') {
        statusToUpdate = this.customStatus // Use custom status if selected
      }

      if (!statusToUpdate) return

      this.$emit('status-updated', statusToUpdate)
      this.resetForm() // Reset the form after submission
    },
    closeForm() {
      this.$emit('close-form') // Emit event to hide the form
    },
    resetForm() {
      this.status = ''
      this.customStatus = '' // Reset custom status
      this.warningMessage = '' // Reset warning message
    },
  },
})
</script>

<style scoped>
.update-status-form {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
