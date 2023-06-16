<template>
    <div class="tw-max-w-full tw-m-auto">
        <h1 class="tw-text-6xl tw-text-center tw-py-10 tw-text-green-dark tw-font-medium">
            Banana Clicker <span class="tw-text-yellow-dark tw-font-bold">2</span>
        </h1>

        <div class="tw-grid tw-grid-cols-3 tw-gap-10">
            <div class="tw-col-span-1 tw-flex tw-flex-col tw-gap-5">
                <h2 class="tw-text-4xl tw-text-white tw-font-bold">Magasin</h2>

                <div class="tw-flex tw-flex-col tw-gap-4">
                    <template v-for="(bpsModule, index) in bpsModules" :key="index">
                        <module-button
                                v-if="index === 0 || (index > 0 && bpsModules[index - 1].numberBought > 0)"
                                :bananas="bananas"
                                :module="bpsModule"
                                type="bps"
                                @buy="(module, type) => buyModule(module, type)"
                                @buy-multiple="(module, type, n) => buyNTimes(n, module, type)">
                        </module-button>
                    </template>
                </div>
            </div>

            <div class="tw-col-span-1 tw-flex tw-flex-col tw-items-center tw-text-center animate-bounce delay-150 duration-300">
                <button class="tw-bg-green-dark tw-rounded-full tw-w-fit tw-p-8 tw-shadow tw-m-5" @click="click">
                    <img src="../../../images/banane.png" alt="Banana" class="tw-w-36 tw-h-36 ">
                </button>

                <div class="tw-w-full tw-flex tw-flex-col tw-gap-5 tw-items-center">
                    <div class="tw-text-white">
                        <div class="tw-font-bold tw-text-6xl tw-text-white">
                            {{ returnNiceNumber(bananas) }}
                        </div>

                        <v-tooltip right color="red" content-class='custom-tooltip'>
                            <template v-slot:activator="{ props }">
                                <div v-bind="props">
                                    BPS : <span class="tw-font-bold">{{ bps }}</span>
                                </div>
                            </template>

                            <span>Bananes Par Seconde</span>
                        </v-tooltip>

                        <v-tooltip right color="red" content-class='custom-tooltip'>
                            <template v-slot:activator="{ props }">
                                <div v-bind="props">
                                    BPC : <span class="tw-font-bold">{{ bpc }}</span>
                                </div>
                            </template>

                            <span>Bananes Par Clic</span>
                        </v-tooltip>

                        <div>
                            Total : <span class="tw-font-bold">{{ returnNiceNumber(totalBananas) }}</span>
                        </div>

                        <div>
                            Nombre de clics : <span class="tw-font-bold">{{ returnNiceNumber(nbClicks) }}</span>
                        </div>
                    </div>

                    <div class="tw-flex tw-flex-col tw-gap-1 tw-w-1/2">
                        <div>DEBUG</div>
                        <button @click="save" class="tw-bg-blue-100 tw-rounded-md">Save</button>
                        <button @click="load" class="tw-bg-blue-100 tw-rounded-md">Load</button>
                        <button @click="reset" class="tw-bg-red-100 tw-rounded-md">Reset</button>
                        <button @click="cheat" class="tw-bg-green-100 tw-rounded-md">Cheat</button>
                    </div>
                </div>
            </div>

            <div class="tw-col-span-1 tw-flex tw-flex-col tw-gap-5">
                <h2 class="tw-text-4xl tw-text-white tw-font-bold">Améliorations</h2>

                <div class="tw-flex tw-flex-col tw-gap-4">
                    <module-button v-for="bpcModule in bpcModules"
                                   :bananas="bananas"
                                   :module="bpcModule"
                                   type="bpc"
                                   @buy="(module, type) => buyModule(module, type)">
                    </module-button>
                </div>
            </div>
        </div>

        <div>
            <h2>Achievements</h2>

            <div>
                <div class="tw-border-2 tw-border-green-dark tw-rounded-lg tw-p-2 tw-w-12 tw-h-12">
                    A
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
            totalBananas: 0,
            bps: 0,
            bpc: 1,
            nbClicks: 0,
            bpsModules: [
                {
                    name: 'Auto Clicker',
                    article: 'un',
                    description: 'Un curseur qui clique tout seul comme un grand. Si vous êtes un tant soit peu impressionnable ça vous fera peut-être quelque chose.',
                    picture: 'autoclicker',
                    price: {
                        current: 10,
                        base: 10,
                        multiplier: 1.1,
                    },
                    bps: {
                        current: 1,
                        base: 1,
                    },
                    numberBought: 0
                },
                {
                    name: 'Bananier',
                    article: 'un',
                    description: "Un bananier. Qui produit des bananes. Écoutez c'est un arbre, il n'y a pas non plus un million de choses à dire dessus. Si vous êtes plus impressionné.e par ça que par l'auto clicker je pense qu'il faudrait songer à arrêter de jouer dès maintenant.",
                    picture: 'bananier',
                    price: {
                        current: 500,
                        base: 500,
                        multiplier: 1.2,
                    },
                    bps: {
                        current: 5,
                        base: 5,
                    },
                    numberBought: 0
                },
                {
                    name: 'Macaque',
                    article: 'un',
                    description: 'Un macaque qui ramasse des bananes. On le paie une misère et il ne semble pas s\'en plaindre mais niveau efficacité on repassera.',
                    picture: 'macaque',
                    price: {
                        current: 1000,
                        base: 1000,
                        multiplier: 1.2,
                    },
                    bps: {
                        current: 10,
                        base: 10,
                    },
                    numberBought: 0
                }
            ],
            bpcModules: [
                {
                    name: 'Meilleur curseur',
                    article: 'un',
                    description: '',
                    picture: '',
                    price: {
                        current: 200,
                        base: 200,
                        multiplier: 1.2,
                    },
                    bpc: 1,
                    numberBought: 0
                }
            ],
            achievements: [
                {
                    name: 'Première banane',
                    condition: 1,
                    unlocked: false
                }
            ]
        }
    },
    created() {
        this.load();

        this.startBPS();
        this.startAutomaticSaving();
    },
    methods: {
        click() {
            this.bananas += this.bpc;
            this.totalBananas += this.bpc;
            this.nbClicks++;
        },
        buyModule(module, type) {
            if (this.bananas >= module.price.current) {
                this.bananas -= module.price.current;

                if (type === 'bps') {
                    this.bps += module.bps.current;
                } else if (type === 'bpc') {
                    this.bpc += module.bpc;
                }

                module.price.current = Math.round(module.price.current * module.price.multiplier);
                module.numberBought++;
            }
        },
        buyNTimes(n, module, type) {
            for (let i = 0; i < n; i++) {
                this.buyModule(module, type);
            }
        },
        startBPS() {
            setInterval(() => {
                this.bananas += this.bps / 20;
                this.totalBananas += this.bps / 20;
            }, 50)
        },
        returnNiceNumber(number) {
            if (number < 1000000) {
                return new Intl.NumberFormat('fr-FR').format(Math.round(number));
            } else if (number < 1000000000) {
                return new Intl.NumberFormat('fr-FR', {
                    maximumFractionDigits: 3,
                    minimumFractionDigits: 3
                }).format(number / 1000000) + 'M';
            } else if (number >= 1000000000 ) {
                return new Intl.NumberFormat('fr-FR', {
                    maximumFractionDigits: 3,
                    minimumFractionDigits: 3
                }).format(number / 1000000000) + 'B';
            }
        },
        startAutomaticSaving() {
            setInterval(() => {
                this.save();
            }, 5000)
        },
        save() {
            let saveFile = {
                bananas: this.bananas,
                totalBananas: this.totalBananas,
                bps: this.bps,
                bpc: this.bpc,
                nbClicks: this.nbClicks,
                bpsModules: this.bpsModules,
                bpcModules: this.bpcModules,
                achievements: this.achievements
            };

            localStorage.setItem('saveFile', btoa(JSON.stringify(saveFile)));
        },
        load() {
            let saveFile = localStorage.getItem('saveFile');

            if (saveFile !== null) {
                saveFile = JSON.parse(atob(saveFile));

                this.bananas = saveFile.bananas;
                this.totalBananas = saveFile.totalBananas;
                this.bps = saveFile.bps;
                this.bpc = saveFile.bpc;
                this.nbClicks = saveFile.nbClicks;
                this.bpsModules = saveFile.bpsModules;
                this.bpcModules = saveFile.bpcModules;
                this.achievements = saveFile.achievements;
            }
        },
        reset() {
            localStorage.removeItem('saveFile');

            this.bananas = 0;
            this.totalBananas = 0;
            this.bps = 0;
            this.bpc = 1;
            this.nbClicks = 0;

            this.bpsModules.forEach(module => {
                module.price.current = module.price.base;
                module.bps.current = module.bps.base;
                module.numberBought = 0;
            });

            this.achievements.forEach(achievement => {
                achievement.unlocked = false;
            });
        },
        cheat() {
            this.bananas += 1000000;
            this.totalBananas += 1000000;
        }
    }
})
</script>

<style scoped>

</style>
