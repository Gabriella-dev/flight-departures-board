<template>
    <div class="header">
        <HeaderLogo />
        <h1>Departures</h1>
    </div>
</template>

<script lang="ts">
import HeaderLogo from '../Logo.vue';

export default {
    name: 'DepartureHeader',
    components: {
    HeaderLogo,
  },
};
</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #f4cd0a;
  border-bottom: 1px solid #f0470f;
  gap: 20px;
  margin-bottom: 2px;
}

</style>