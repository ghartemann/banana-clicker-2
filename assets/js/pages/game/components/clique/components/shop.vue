<template>
    <div class="tw-col-span-1 tw-flex tw-flex-col tw-gap-5">
        <h2 class="tw-text-4xl tw-text-white tw-font-bold">
            Magasin
        </h2>

        <div v-if="bpsModules[0].numberBought > 0 || bananas >= 30" class="tw-flex tw-flex-col tw-gap-4">
            <template v-for="(bpsModule, index) in bpsModules" :key="index">
                <module-button
                    v-if="bpsModule.unlocked === true"
                    :bananas="bananas"
                    :module="bpsModule"
                    type="bps"
                    @buy-n-times="(module, type, n) => buyNTimes(module, type, n, index)">
                </module-button>
            </template>
        </div>

        <div v-else class="tw-text-2xl tw-text-white">Cliquez sur la banane.</div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import ModuleButton from "@pages/game/components/clique/components/module-button.vue";

export default defineComponent({
    name: "shop",
    components: {ModuleButton},
    props: {
        bananas: {
            type: Number,
            required: true
        },
        bpsModules: {
            type: Array,
            required: true
        }
    }
})
</script>

<style scoped>

</style>
