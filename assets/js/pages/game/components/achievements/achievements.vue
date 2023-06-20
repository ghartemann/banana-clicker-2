<template>
    <div>
        <div class="tw-text-white tw-mb-10">
            <div class="tw-text-5xl">Succès</div>

            <div>Des accomplissements parfaitement inutiles qui donnent une fausse impression de progression.</div>
        </div>

        <div class="tw-grid tw-grid-cols-12">
            <div v-for="achievement in achievements" class="tw-col-span-1 tw-flex tw-justify-center">
                <v-tooltip bottom content-class='custom-tooltip' :disabled="achievement.unlocked === false">
                    <template v-slot:activator="{ props }">
                        <v-badge color="#d54b4b" :model-value="achievement.unlocked === true && achievement.seen === false" content="!">
                            <div v-bind="props"
                                 @mouseover="achievement.seen = achievement.unlocked === true"
                                 class="tw-text-white tw-border-2 tw-rounded-lg tw-w-16 tw-h-16 tw-justify-center tw-flex tw-flex-col tw-items-center tw-gap-3"
                                 :class="achievement.unlocked === true ? 'tw-border-yellow-dark' : 'tw-border-green-dark tw-opacity-40'">
                                {{ achievement.text }}
                            </div>
                        </v-badge>
                    </template>

                    <div>
                        <div class="tw-font-bold">{{ achievement.name }}</div>
                        <div>{{ achievement.description }}</div>
                        <div>Bonus : {{ achievement.bonusText }}</div>
                    </div>
                </v-tooltip>
            </div>
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
