<template>
  <div v-if="!isLoading" class="board-list-item-card">
    <p>{{ formatDateTime(new Date(scheduledDepartureDateTime)) }}</p>
    <p class="city-gate">{{ cityName }}</p>
    <p>{{ airportCode }}</p>
    <p>{{ airlineName }}</p>
    <p class="city-gate">{{ gateNumber || 'TBD' }}</p>
    <button :class="['status', statusClass]">{{ status }}</button>
  </div>
  <div v-else class="board-list-item-card skeleton">
    <div class="skeleton-line" style="width: 50%; height: 16px"></div>
    <div class="skeleton-line city-gate" style="width: 50%; height: 16px"></div>
    <div class="skeleton-line" style="width: 50%; height: 16px"></div>
    <div class="skeleton-line" style="width: 50%; height: 16px"></div>
    <div class="skeleton-line city-gate" style="width: 50%; height: 16px"></div>
    <div class="skeleton-line status" style="width: 50%; height: 32px"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BoardListItemCard',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    scheduledDepartureDateTime: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    airportCode: {
      type: String,
      required: true,
    },
    airlineName: {
      type: String,
      required: true,
    },
    gateNumber: {
      type: String,
      required: false,
      default: 'TBD',
    },
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusClass(): string {
      return this.getStatusClass(this.status)
    },
  },
  methods: {
    formatDateTime(dateTime: Date): string {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date(dateTime))
    },
    getStatusClass(status: String): string {
      const statusMap: { [key: string]: string } = {
        departed: 'departed',
        final: 'final-call',
        go: 'go-to-gate',
        scheduled: 'scheduled',
        wait: 'wait-in-lounge',
        departing: 'departing',
      }
      const firstWord: string = status.split(' ')[0].toLowerCase()
      return statusMap[firstWord] || 'status-other'
    },
  },
})
</script>

<style scoped>
.board-list-item-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.9fr 1fr 0.7fr 1.3fr;

  border: 1px solid #ddd;
  padding: 18px 6px;
  border-radius: 10px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 0.7fr 1.3fr;
    padding-left: 60px;
  }
}

.board-list-item-card p {
  padding: 4px;

  @media (min-width: 1024px) {
    padding: 0;
  }
}

.city-gate {
  color: #e9b20c;
}

.status {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  color: #ffffff;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    padding-right: 30px;
    padding-left: 20px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    font-weight: bold;
  }

  @media (min-width: 1024px) {
    padding-left: 40px;
  }
}

.departed {
  background: linear-gradient(to right, #ff8c00 5%, #dddddd 10%);
  color: #ff8c00;
}

.final-call {
  background: linear-gradient(to right, #28a745 5%, #dddddd 10%);
  color: #28a745;
}

.go-to-gate {
  background: linear-gradient(to right, #007bff 5%, #dddddd 10%);
  color: #007bff;
}

.scheduled {
  color: #e207ff;
  background: linear-gradient(to right, #e207ff 5%, #dddddd 10%);
}

.departing {
  background: linear-gradient(to right, #3e021a 5%, #dddddd 10%);
  color: #3e021a;
}

.wait-in-lounge {
  background: linear-gradient(to right, #0b441e 5%, #dddddd 10%);
  color: #0b441e;
}

.status-other {
  background: linear-gradient(to right, #9b0606 5%, #dddddd 100%);
  color: #f9faf5;
}

.skeleton {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.9fr 1fr 0.7fr 1.3fr;
  align-items: center;
  gap: 10px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 0.7fr 1.3fr;
    padding-left: 60px;
  }
}

.skeleton-line {
  background: linear-gradient(90deg, #bbbbbb 25%, #999999 50%, #bbbbbb 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  height: 16px;
}

.skeleton-line.status {
  border-radius: 20px;
  height: 32px;
}

@keyframes loading {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>
