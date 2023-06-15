<template>
    <div class="tw-container">
        <h1 class="tw-text-5xl tw-text-center tw-my-10">Banana Clicker 2</h1>

        <div class="tw-grid tw-grid-cols-3 tw-gap-10">
            <div class="tw-col-span-1 tw-flex tw-flex-col tw-justify-center">
                <div>BPS</div>

                <div class="tw-flex tw-flex-col tw-gap-4">
                    <module-button v-for="bpsModule in bpsModules"
                                   :bananas="bananas"
                                   :module="bpsModule"
                                   type="bps"
                                   @buy="(module) => buyBpsModule(module)">
                    </module-button>
                </div>
            </div>

            <div class="tw-col-span-1 tw-flex tw-flex-col tw-items-center tw-text-center animate-bounce delay-150 duration-300">
                <button class="tw-bg-green-dark tw-rounded-full tw-w-fit tw-p-8 tw-shadow tw-m-5" @click="getBanana">
                    <img src="../../../images/banane.png" alt="Banana" class="tw-w-36 tw-h-36 ">
                </button>

                <div class="tw-font-bold tw-text-6xl">{{ Math.round(bananas) }}</div>

                <div>
                    <div>BPS : {{ bps }}</div>
                    <div>BPC : {{ bpc }}</div>
                </div>
            </div>

            <div class="tw-col-span-1 tw-flex tw-flex-col tw-justify-center tw-text-center">
                <div>BPC</div>

                <div class="tw-flex tw-flex-col tw-gap-4">
                    <module-button v-for="bpcModule in bpcModules"
                                   :bananas="bananas"
                                   :module="bpcModule"
                                   type="bpc"
                                   @buy="(module) => buyBpcModule(module)">
                    </module-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import ModuleButton from "./components/module-button.vue";

export default defineComponent({
    name: "Home",
    components: {ModuleButton},
    data() {
        return {
            bananas: 0,
            bps: 0,
            bpc: 1,
            bpsModules: [
                {
                    name: 'Auto Clicker',
                    article: 'un',
                    description: 'Un curseur qui clique tout seul comme un grand. Si vous êtes un tant soit peu impressionnable ça vous fera peut-être quelque chose.',
                    picture: 'autoclicker',
                    price: 10,
                    bps: 1,
                    numberBought: 0
                },
                {
                    name: 'Bananier',
                    article: 'un',
                    description: "Un bananier. Qui produit des bananes. Écoutez c'est un arbre, il n'y a pas non plus un million de choses à dire dessus. Si vous êtes plus impressionné.e par ça que par l'auto clicker je pense qu'il faudrait songer à arrêter de jouer dès maintenant.",
                    picture: 'bananier',
                    price: 500,
                    bps: 5,
                    numberBought: 0
                },
                {
                    name: 'Macaque',
                    article: 'un',
                    description: 'Un macaque qui ramasse des bananes. On le paie une misère et il ne semble pas s\'en plaindre mais niveau efficacité on repassera.',
                    picture: 'macaque',
                    price: 1000,
                    bps: 10,
                    numberBought: 0
                }
            ],
            bpcModules: [
                {
                    name: 'Meilleur curseur',
                    article: 'un',
                    description: '',
                    picture: '',
                    price: 200,
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
