<template>
    <div class="tw-flex-col tw-flex tw-items-center">
        <div class="tw-font-bold">{{ heroName }}</div>
        <div>{{ hero.life.current }} / {{ hero.life.max }}</div>
        <v-progress-linear :model-value="hero.life.current"></v-progress-linear>

        <img src="/assets/images/exploration/hero.png"
             alt="Hero"
             class="tw-w-20 tw-h-20 tw-mx-auto tw-mb-5"
             id="hero"
             style="--animate-duration: 0.2s;"
        >

        <div>PV max : {{ hero.life.max }}</div>
        <div>ATK : {{ hero.attack }}</div>
        <div>DEF : {{ hero.defense }}</div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "hero",
    props: {
        hero: {
            type: Object,
            required: true
        },
        heroName: {
            type: String,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
