<template>
    <div class="board-wrapper">
   <h1>BoardWrapper</h1>
    </div>
</template>

<script lang="ts">


export default {
    name: 'BoardWrapper',

};

</script>


<!--   -->
props: {
    flightData: {
        type: Array,
        required: true,
    },
},