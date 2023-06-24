<template>
    <v-tooltip right content-class='custom-tooltip'>
        <template v-slot:activator="{ props }">
            <div v-bind="props" class="tw-grid tw-grid-cols-12 tw-gap-4">
                <button :ref="'button' + type + module.slug + 1"
                        @click="clickButton(1)"
                        :disabled="bananas < priceForOneModule || module.numberBought >= module.max"
                        style="--animate-duration:0.1s;"
                        class="tw-flex tw-w-full tw-text-xl tw-rounded-2xl tw-relative tw-p-3 tw-cursor-pointer tw-shadow-lg disabled:tw-bg-opacity-50 hover:tw-brightness-110 disabled:tw-cursor-not-allowed"
                        :class="type === 'bps' ? 'tw-bg-green-dark tw-col-span-9' : 'tw-bg-yellow-dark tw-col-span-12'"
                >
                    <div class="tw-w-1/5 tw-h-full tw-flex tw-items-center">
                        <img :src="'/assets/images/modules/' + type + '/' + module.slug + '.png'"
                             :alt="module.slug"
                             class="tw-w-14 tw-h-14">
                    </div>

                    <div class="tw-w-4/5 tw-flex tw-flex-col tw-items-start tw-text-start tw-text-white">
                        <div class="tw-text-xl">
                            Acheter {{ module.article }} <span class="tw-font-bold">{{ module.name }}</span>
                        </div>

                        <div v-if="type === 'bps'" class="tw-text-lg">
                            +{{ useReturnNicerNumber(module.bps.current) }} BPS
                        </div>

                        <div v-else-if="type === 'bpc'" class="tw-text-lg">
                            +{{ useReturnNicerNumber(module.bpc) }} BPC
                        </div>

                        <div v-else-if="type === 'buff'" class="tw-text-lg">
                            bps / {{ module.moduleToModify.slug }} +{{ returnPercentage(module.moduleToModify.multiplier) }}%
                        </div>

                        <div class="tw-flex tw-gap-2 tw-items-center tw-text-lg">
                            <img src="/assets/images/banane.png" alt="Banana" class="tw-w-4 tw-h-4">
                            {{ useReturnNicerNumber(priceForOneModule) }}
                        </div>

                        <div class="tw-absolute tw-right-2 tw-bottom-1 tw-opacity-50">
                            {{ module.numberBought === module.max ? 'MAX' : module.numberBought }}
                        </div>
                    </div>
                </button>

                <button :ref="'button' + type + module.slug + 10"
                        @click="clickButton(10)"
                        v-if="type === 'bps'"
                        :disabled="bananas < priceForTenModules"
                        style="--animate-duration:0.1s;"
                        class="tw-col-span-3 tw-rounded-2xl tw-p-3 tw-cursor-pointer tw-shadow-lg tw-bg-green-dark disabled:tw-bg-opacity-50 hover:tw-brightness-110 disabled:tw-cursor-not-allowed tw-text-white"
                >
                    <div>x 10</div>

                    <div class="tw-flex tw-gap-2 tw-items-center">
                        <img src="/assets/images/banane.png" alt="Banana" class="tw-w-4 tw-h-4">
                        {{ useReturnNicerNumber(priceForTenModules) }}
                    </div>
                </button>
            </div>
        </template>

        <div class="tw-text-green-darker tw-flex tw-flex-col tw-gap-2">
            <div>{{ module.description }}</div>

            <div v-if="type === 'bps'">Chaque {{ module.name }} produit {{ useReturnNicerNumber(module.bps.current) }} banane{{ module.bps.currentmodule.bps.current <= 1 ? '' : 's' }} par seconde.</div>

            <div>
                <div>
                    Acquis : <span class="tw-font-bold">{{ module.numberBought }}</span>
                </div>

                <div v-if="type === 'bps'">
                    Production : <span class="tw-font-bold">{{ module.numberBought * module.bps.current }} bps</span>
                </div>
            </div>
        </div>
    </v-tooltip>
</template>

<script>
import {defineComponent} from 'vue';
import {useAnimateCss} from "../../../../../composables/animateCssComposable";
import {useReturnNicerNumber} from "../../../../../composables/numbersComposable";

export default defineComponent({
    name: "module-button",
    data: () => ({}),
    props: {
        module: {
            type: Object,
            required: true
        },
        bananas: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        priceForOneModule() {
            if (this.module.numberBought === 0) {
                return this.module.price.base;
            } else {
                return Math.floor(this.module.price.base * (Math.pow(this.module.price.multiplier, this.module.numberBought + 1) - 1) / (this.module.price.multiplier - 1));
            }
        },
        priceForTenModules() {
            return Math.floor(this.priceForOneModule * (Math.pow(this.module.price.multiplier, 10) - 1) / (this.module.price.multiplier - 1));
        },
    },
    methods: {
        useAnimateCss,
        useReturnNicerNumber,
        clickButton(n) {
            this.$emit('buy-n-times', this.module, this.type, n);
            this.useAnimateCss(this.$refs['button' + this.type + this.module.slug + n], 'pulse');
        },
        returnPercentage(number) {
            return number * 100 - 100;
        }
    }
})
</script>

<style lang="scss" scoped>
:deep(.v-overlay__content) {
    background: #f1c40f !important;
    border-radius: 10px;
    width: 30vh !important;
}
</style>
