<template>
    <div class="tw-container">
        <h1 class="tw-text-5xl tw-text-center tw-my-10">Banana Clicker 2</h1>

        <div class="tw-grid tw-grid-cols-3">
            <div class="tw-col-span-1 tw-flex tw-flex-col tw-justify-center tw-text-center">
                <div>BPS</div>

                <div>
                    <v-btn v-for="bpsModule in bpsModules"
                           @click="buyBpsModule(bpsModule)"
                           :disabled="bananas < bpsModule.price"
                           color="secondary"
                    >
                        {{ bpsModule.name}} (+{{ bpsModule.bps }} BPS, {{ bpsModule.price }} <v-icon>mdi-fruit-cherries</v-icon>) ({{ bpsModule.numberBought }})
                    </v-btn>
                </div>
            </div>

            <div class="tw-col-span-1 tw-flex tw-flex-col tw-justify-center tw-text-center">
                <div>Bananes : {{ Math.round(bananas) }}</div>
                <div>BPS : {{ bps }}</div>
                <div>BPC : {{ bpc }}</div>
                <v-btn @click="getBanana" color="primary">Obtenir des bananes</v-btn>
            </div>

            <div class="tw-col-span-1 tw-flex tw-flex-col tw-justify-center tw-text-center">
                <div>BPC</div>

                <div>
                    <v-btn v-for="bpcModule in bpcModules"
                           @click="buyBpcModule(bpcModule)"
                           :disabled="bananas < bpcModule.price"
                           color="secondary"
                    >
                        {{ bpcModule.name}} (+{{ bpcModule.bpc }} BPC, {{ bpcModule.price }} <v-icon>mdi-fruit-cherries</v-icon>) ({{ bpcModule.numberBought }})
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Home",
    data() {
        return {
            bananas: 0,
            bps: 0,
            bpc: 1,
            bpsModules: [
                {
                    name: 'Auto Clicker',
                    price: 10,
                    bps: 1,
                    numberBought: 0
                },
                {
                    name: 'Bananier',
                    price: 100,
                    bps: 5,
                    numberBought: 0
                },
                {
                    name: 'Ferme à bananes',
                    price: 500,
                    bps: 10,
                    numberBought: 0
                }
            ],
            bpcModules: [
                {
                    name: 'Meilleur curseur',
                    price: 500,
                    bpc: 1,
                    numberBought: 0
                }
            ]
        }
    },
    created() {
        this.startBPS();
    },
    methods: {
        getBanana() {
            this.bananas += this.bpc;
        },
        buyBpsModule(module) {
            if (this.bananas >= module.price) {
                this.bananas -= module.price;
                this.bps += module.bps;

                module.price = Math.round(module.price * 1.3);
                module.numberBought++;
            }
        },
        buyBpcModule(module) {
            if (this.bananas >= module.price) {
                this.bananas -= module.price;
                this.bpc += module.bpc;

                module.price = Math.round(module.price * 1.3);
                module.numberBought++;
            }
        },
        startBPS() {
            setInterval(() => {
                this.bananas += this.bps / 20;
            }, 50)
        }
    }
})
</script>

<style scoped>

</style>
