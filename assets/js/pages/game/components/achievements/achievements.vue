<template>
    <div>
        <div v-for="achievement in achievements" class="tw-text-white">
            {{ achievement.name }} {{ achievement.unlocked }}
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "achievements",
    props: {
        achievements: {
            type: Array,
            required: true
        }
    }
})
</script>

<style scoped>

</style>
