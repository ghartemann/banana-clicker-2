<template>
    <div class="tw-max-w-full tw-m-auto">
        <div class="tw-flex tw-justify-center tw-gap-5">
            <h1 class="tw-text-6xl tw-text-center tw-py-10 tw-text-green-dark tw-font-medium">
                Banana Clicker
            </h1>

            <h1 class="tw-text-6xl tw-text-center tw-py-10 tw-text-yellow-dark tw-font-bold animate__animated tw-animate-wiggle-more animate__infinite">
                2
            </h1>
        </div>

        <clique v-show="page === 'click'" @achievements-updated="(ach) => this.achievements = ach"></clique>
        <exploration v-show="page === 'exploration'"></exploration>
        <achievements v-show="page === 'achievements'" :achievements="achievements"></achievements>
        <settings v-show="page === 'settings'"></settings>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Clique from "./components/clique/clique";
import Exploration from "./components/exploration/exploration";
import Achievements from "./components/achievements/achievements";
import Settings from "./components/settings/settings";
import achievements from "@pages/game/components/achievements/achievements.vue";

export default defineComponent({
    name: "index",
    components: {Settings, Achievements, Exploration, Clique},
    props: {
        page: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        achievements: [],
    }),
    created() {
        console.log('ATTENTON: il est strictement INTERDIT d\'utiliser la console pour tricher. Si vous le faites, ' +
            'sachez que je serai très triste et déçu par votre comportement et qu\'il me faudra sûrement plusieurs ' +
            'années de thérapie supplémentaires pour tenter de passer outre le profond sentiment de trahison dont vous ' +
            'serez au moins partiellement sinon totalement responsable.');
    }
})
</script>
<style scoped>

</style>
