<template>
    <div class="tw-flex-col tw-flex tw-items-center">
        <div class="tw-font-bold tw-h-12">
            {{ enemy.name }}
        </div>

        <v-progress-linear
            :model-value="enemy.life.current"
            :max="enemy.life.max"
            bg-color="error"
            color="error"
            rounded
            height="20">
            <span class="tw-text-black">
                {{ enemy.life.current }} / {{ enemy.life.max }}
            </span>
        </v-progress-linear>

        <img :src="'/assets/images/exploration/enemies/' + enemy.picture"
             :alt="enemy.name"
             class="tw-w-20 tw-h-20 tw-mx-auto tw-mb-5"
             id="enemy"
             style="--animate-duration: 0.2s;"
        >
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "enemy",
    props: {
        enemy: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
