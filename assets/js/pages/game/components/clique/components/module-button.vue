<template>
    <v-tooltip right color="red" content-class='custom-tooltip'>
        <template v-slot:activator="{ props }">
            <div v-bind="props" class="tw-grid tw-grid-cols-12 tw-gap-4">
                <button @click="$emit('buy', module, type)"
                        :disabled="bananas < module.price.current || module.numberBought >= module.max"
                        class="tw-flex tw-w-full tw-text-xl tw-rounded-2xl tw-relative tw-p-3 tw-cursor-pointer tw-shadow-lg disabled:tw-bg-opacity-50 hover:tw-brightness-110 disabled:tw-cursor-not-allowed"
                        :class="type === 'bps' ? 'tw-bg-green-dark tw-col-span-9' : 'tw-bg-yellow-dark tw-col-span-12'"
                >
                    <div class="tw-w-1/5">
                        <img :src="'/assets/images/modules/' + type + '/' + module.slug + '.png'"
                             :alt="module.slug"
                             class="tw-w-14 tw-h-14 tw-mr-5">
                    </div>

                    <div class="tw-w-4/5 tw-flex tw-flex-col tw-items-start tw-text-start tw-text-white">
                        <div class="tw-text-xl">
                            Acheter {{ module.article }} <span class="tw-font-bold">{{ module.name }}</span>
                        </div>

                        <div v-if="type === 'bps'" class="tw-text-lg">
                            +{{ returnNiceNumber(module.bps.current) }} BPS
                        </div>

                        <div v-else-if="type === 'bpc'" class="tw-text-lg">
                            +{{ returnNiceNumber(module.bpc) }} BPC
                        </div>

                        <div v-else-if="type === 'buff'" class="tw-text-lg">
                            bps / {{ module.moduleToModify.slug }} +{{ returnPercentage(module.moduleToModify.multiplier) }}%
                        </div>

                        <div class="tw-flex tw-gap-2 tw-items-center tw-text-lg">
                            <img src="/assets/images/banane.png" alt="Banana" class="tw-w-4 tw-h-4">
                            {{ returnNiceNumber(module.price.current) }}
                        </div>

                        <div class="tw-absolute tw-right-2 tw-bottom-1 tw-opacity-50">
                            {{ module.numberBought === module.max ? 'MAX' : module.numberBought }}
                        </div>
                    </div>
                </button>

                <button @click="$emit('buy-multiple', module, type, 10)"
                        v-if="type === 'bps'"
                        :disabled="bananas < priceForTenModules(module.price.current)"
                        class="tw-col-span-3 tw-rounded-2xl tw-p-3 tw-cursor-pointer tw-shadow-lg tw-bg-green-dark disabled:tw-bg-opacity-50 hover:tw-brightness-110 disabled:tw-cursor-not-allowed tw-text-white"
                >
                    <div>x 10</div>

                    <div class="tw-flex tw-gap-2 tw-items-center">
                        <img src="/assets/images/banane.png" alt="Banana" class="tw-w-4 tw-h-4">
                        {{ returnNiceNumber(priceForTenModules(module.price.current)) }}
                    </div>
                </button>
            </div>
        </template>

        <div class="tw-text-green-darker tw-flex tw-flex-col tw-gap-2">
            <div>{{ module.description }}</div>

            <div v-if="type === 'bps'">Chaque {{ module.name }} produit {{ module.bps.current }} bananes par seconde.</div>

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
import {defineComponent} from 'vue'

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
    methods: {
        priceForTenModules(price) {
            return Math.floor(price * (Math.pow(1.2, 10) - 1) / (1.2 - 1));
        },
        returnNiceNumber(number) {
            if (number < 1000000) {
                return new Intl.NumberFormat('fr-FR').format(Math.floor(number));
            } else {
                return new Intl.NumberFormat('fr-FR', {
                    maximumFractionDigits: 3,
                    minimumFractionDigits: 3
                }).format(number / 1000000) + 'M';
            }
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
