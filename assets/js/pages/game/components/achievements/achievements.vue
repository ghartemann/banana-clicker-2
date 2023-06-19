<template>
    <div>
        <div class="tw-grid tw-grid-cols-12">
            <v-tooltip v-for="achievement in achievements" bottom content-class='custom-tooltip' :disabled="achievement.unlocked === false">
                <template v-slot:activator="{ props }">
                    <div v-bind="props"
                         class="tw-text-white tw-border tw-rounded-lg tw-w-16 tw-h-16 tw-justify-center tw-flex tw-items-center tw-flex tw-flex-col tw-gap-3"
                         :class="achievement.unlocked === true ? 'tw-border-yellow-dark' : 'tw-border-green-dark tw-opacity-40'">
                        {{ achievement.text }}
                    </div>
                </template>

                <div>
                    <div class="tw-font-bold">{{ achievement.name }}</div>
                    <div>{{ achievement.description }}</div>
                    <div>Bonus : {{ achievement.bonusText }}</div>
                </div>
            </v-tooltip>
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
