<template>
    <v-tooltip right color="red" content-class='custom-tooltip'>
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <button @click="buy(module)"
                        :disabled="bananas < module.price"
                        class="tw-flex tw-w-full tw-text-xl tw-rounded-2xl tw-relative tw-p-5 tw-cursor-pointer tw-shadow-lg tw-bg-green-dark disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                    <div class="tw-w-1/4">
                        <img src="../../../../images/bps/autoclicker.png" :alt="module.picture"
                             class="tw-w-20 tw-h-20 tw-mr-5">
                    </div>

                    <div class="tw-w-3/4 tw-flex tw-flex-col tw-items-start tw-text-start tw-text-white">
                        <div>
                            Acheter {{ module.article }} <span class="tw-font-bold">{{ module.name }}</span>
                        </div>

                        <div>
                            +{{ module.bps }} BPS
                        </div>

                        <div class="tw-flex tw-gap-2 tw-items-center">
                            <img src="../../../../images/banane.png" alt="Banana" class="tw-w-4 tw-h-4">
                            {{ module.price }}
                        </div>

                        <div class="tw-absolute tw-right-0 tw-bottom-0">
                            {{ module.numberBought }}
                        </div>
                    </div>
                </button>
            </div>
        </template>

        <div class="tw-text-green-darker">
            <div class="tw-font-bold">{{ module.name }}</div>

            <div>{{ module.description }}</div>

            <div>
                <div>
                    Acquis : <span class="tw-font-bold">{{ module.numberBought }}</span>
                </div>

                <div>
                    Production : <span class="tw-font-bold">{{ module.numberBought * module.bps }} bps</span>
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
        buy(module) {
            this.$emit('buy', module)
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
