<template>
    <div class="tw-grid tw-grid-cols-3 tw-gap-10">
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
                            @buy="(module, type) => buyModule(module, type, index)"
                            @buy-multiple="(module, type, n) => buyNTimes(module, type, n, index)">
                    </module-button>
                </template>
            </div>

            <div v-else class="tw-text-2xl tw-text-white">Cliquez sur la banane.</div>
        </div>

        <div class="tw-col-span-1 tw-flex tw-flex-col tw-items-center tw-text-center animate-bounce delay-150 duration-300">
            <button class="tw-bg-green-dark tw-rounded-full tw-w-fit tw-p-8 tw-shadow tw-m-5">
                <img ref="banane"
                     src="/assets/images/banane.png" alt="Banana"
                     class="tw-w-36 tw-h-36 animate__faster"
                     style="--animate-duration: 0.2s;"
                     @click="clickBanana">
            </button>

            <div class="tw-w-full tw-flex tw-flex-col tw-gap-5 tw-items-center">
                <div class="tw-text-white">
                    <div class="tw-font-bold tw-text-6xl tw-text-white">
                        {{ returnNiceNumber(bananas) }}
                    </div>

                    <v-tooltip right color="red" content-class='custom-tooltip'>
                        <template v-slot:activator="{ props }">
                            <div v-bind="props">
                                BPS :
                                <span class="tw-font-bold">
                                    {{ returnNiceNumber(bps) }}
                                </span>
                            </div>
                        </template>

                        <span>Bananes Par Seconde</span>
                    </v-tooltip>

                    <v-tooltip right color="red" content-class='custom-tooltip'>
                        <template v-slot:activator="{ props }">
                            <div v-bind="props">
                                BPC :
                                <span class="tw-font-bold">
                                    {{ returnNiceNumber(bpc) }}
                                </span>
                            </div>
                        </template>

                        <span>Bananes Par Clic</span>
                    </v-tooltip>

                    <div>
                        Total :
                        <span class="tw-font-bold">
                            {{ returnNiceNumber(totalBananas) }}
                        </span>
                    </div>

                    <div>
                        Nombre de clics :
                        <span class="tw-font-bold">
                            {{ returnNiceNumber(nbClicks) }}
                        </span>
                    </div>
                </div>

                <div class="tw-flex tw-flex-col tw-gap-1 tw-w-1/2">
                    <div>DEBUG</div>
                    <button @click="save" class="tw-bg-blue-100 tw-rounded-md">Save</button>
                    <button @click="load" class="tw-bg-blue-100 tw-rounded-md">Load</button>
                    <button @click="reset" class="tw-bg-red-100 tw-rounded-md">Reset</button>
                    <button @click="cheat" class="tw-bg-green-100 tw-rounded-md">Cheat</button>
                    <button @click="superCheat" class="tw-bg-green-100 tw-rounded-md">Super cheat</button>
                </div>
            </div>
        </div>

        <div class="tw-col-span-1 tw-flex tw-flex-col tw-gap-5">
            <h2 class="tw-text-4xl tw-text-white tw-font-bold">
                Améliorations
            </h2>

            <div v-if="bpcModules[0].unlocked === true || bpsBuffsModules[0].unlocked === true" class="tw-flex tw-flex-col tw-gap-4">
                <template v-for="(bpcModule, index) in bpcModules" :key="index">
                    <module-button
                        v-if="bpcModule.unlocked === true"
                        :bananas="bananas"
                        :module="bpcModule"
                        type="bpc"
                        @buy="(module, type) => buyModule(module, type)">
                    </module-button>
                </template>

                <template v-for="(bpsBuffsModule, index) in bpsBuffsModules" :key="index">
                    <module-button
                        v-if="bpsBuffsModule.unlocked === true"
                        :bananas="bananas"
                        :module="bpsBuffsModule"
                        type="buff"
                        @buy="(module, type) => buyModule(module, type)">
                    </module-button>
                </template>
            </div>

            <div v-else class="tw-text-2xl tw-text-white">Rien à améliorer pour l'instant.</div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import ModuleButton from "./components/module-button";
import {useAnimateCss} from "../../../../composables/animateCssComposable";

export default defineComponent({
    name: "clique",
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
                    description: 'Un curseur qui clique tout seul comme un grand. Si vous êtes un tant soit peu ' +
                        'impressionnable ça vous fera peut-être quelque chose.',
                    slug: 'autoclicker',
                    price: {
                        current: 50,
                        base: 50,
                        multiplier: 1.1,
                    },
                    bps: {
                        current: 1,
                        base: 1,
                    },
                    unlocked: true,
                    numberBought: 0
                },
                {
                    name: 'Bananier',
                    article: 'un',
                    description: "Un bananier. Qui produit des bananes. Écoutez c'est un arbre, il n'y a pas non plus un " +
                        "million de choses à dire dessus. Si vous êtes plus impressionné.e par ça que par l'auto clicker, " +
                        "il faudrait peut-être songer à mettre fin à votre aventure dès maintenant.",
                    slug: 'bananier',
                    price: {
                        current: 500,
                        base: 500,
                        multiplier: 1.2,
                    },
                    bps: {
                        current: 5,
                        base: 5,
                    },
                    unlocked: false,
                    numberBought: 0
                },
                {
                    name: 'Macaque',
                    article: 'un',
                    description: 'Un macaque qui ramasse des bananes. Vous le payez la moitié du SMIC local et il vit très ' +
                        'en-dessous du seuil de pauvreté mais il ne semble pas s\'en plaindre. Niveau efficacité c\'est ' +
                        'pas exactement ça mais bon, vu le prix...',
                    slug: 'macaque',
                    price: {
                        current: 1000,
                        base: 1000,
                        multiplier: 1.2,
                    },
                    bps: {
                        current: 10,
                        base: 10,
                    },
                    unlocked: false,
                    numberBought: 0
                },
                {
                    name: 'Gorille',
                    article: 'un',
                    description: 'Un gorille qui fait à peu près la même chose que le macaque, mais de façon ' +
                        'remarquablement plus efficiente et pour une paie remarquablement peu supérieure à celle de son compère.',
                    slug: 'gorille',
                    price: {
                        current: 11000,
                        base: 11000,
                        multiplier: 1.2,
                    },
                    bps: {
                        current: 40,
                        base: 40,
                    },
                    unlocked: false,
                    numberBought: 0
                }
            ],
            bpcModules: [
                {
                    name: 'Meilleur curseur',
                    article: 'un',
                    description: 'Votre curseur mais en mieux. Il clique plus efficacement, sans aucune explication.',
                    slug: 'meilleur-curseur',
                    price: {
                        current: 200,
                        base: 200,
                        multiplier: 1.2,
                    },
                    bpc: 1,
                    unlocked: false,
                    numberBought: 0
                },
                {
                    name: 'Curseur encore plus fort',
                    article: 'un',
                    description: 'Votre curseur mais en vraiment, vraiment mieux. Y\'a pas à dire, ça fait toute la différence.',
                    slug: 'curseur-encore-plus-fort',
                    price: {
                        current: 2000,
                        base: 2000,
                        multiplier: 1.2,
                    },
                    bpc: 5,
                    unlocked: false,
                    numberBought: 0
                }
            ],
            bpsBuffsModules: [
                {
                    name: 'Sac d\'engrais Monsanto™',
                    article: 'un',
                    description: 'Du bon engrais Monsanto chargé de pesticides pour rendre vos bananiers plus grands, ' +
                        'plus forts, plus productifs et plus intelligents. Un outil idéal pour tout éleveur de bananes ' +
                        'en herbe – si le risque élevé de cancer de la gorge, des intestins ou du colon vous importe peu.',
                    slug: 'engrais-monsanto',
                    price: {
                        current: 6666,
                        base: 6666,
                        multiplier: 1.2,
                    },
                    moduleToModify: {
                        slug: 'bananier',
                        multiplier: 1.3
                    },
                    unlocked: false,
                    numberBought: 0,
                    max: 15
                }
            ],
            achievements: [
                {
                    name: 'Première banane',
                    condition: 1,
                    unlocked: false
                },
                {
                    name: 'Le million',
                    condition: 1000000,
                    unlocked: false
                },
            ]
        }
    },
    created() {
        this.load();

        this.startBPS();
        this.startAutomaticSaving();
    },
    methods: {
        useAnimateCss,
        clickBanana() {
            this.addBanana();

            this.useAnimateCss(this.$refs.banane, 'jello');
        },
        addBanana() {
            this.bananas += this.bpc;
            this.totalBananas += this.bpc;
            this.nbClicks++;
        },
        calcBPS() {
            let bps = 0;

            this.bpsModules.forEach(module => {
                bps += module.bps.current * module.numberBought;
            });

            return bps;
        },
        startBPS() {
            setInterval(() => {
                this.bananas += this.bps / 10;
                this.totalBananas += this.bps / 10;

                this.unlockAchievements();
            }, 100)
        },
        buyModule(module, type, index) {
            if (this.bananas >= module.price.current) {
                this.bananas -= module.price.current;

                module.numberBought++;

                if (type === 'bps') {
                    this.bps = this.calcBPS();

                    if (index < this.bpsModules.length - 1) {
                        this.bpsModules[index + 1].unlocked = true;
                    }

                    if (module.numberBought >= 10) {
                        let buffToUnlock = this.bpsBuffsModules.find(buff => buff.moduleToModify.slug === module.slug);

                        if (buffToUnlock !== undefined) {
                            buffToUnlock.unlocked = true;
                        }
                    }
                } else if (type === 'bpc') {
                    this.bpc += module.bpc;
                } else if (type === 'buff') {
                    let moduleToModify = this.bpsModules.find(bpsModule => bpsModule.slug === module.moduleToModify.slug);
                    moduleToModify.bps.current *= module.moduleToModify.multiplier;

                    this.bps = this.calcBPS();
                }

                module.price.current = module.price.current * module.price.multiplier;
            }
        },
        buyNTimes(module, type, n, index) {
            for (let i = 0; i < n; i++) {
                this.buyModule(module, type, index);
            }
        },
        unlockAchievements() {
            this.achievements.forEach(achievement => {
                if (this.totalBananas >= achievement.condition) {
                    achievement.unlocked = true;
                }
            });
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
                bpcModules: this.bpcModules
            };

            localStorage.setItem('saveFile', btoa(btoa(JSON.stringify(saveFile))));
        },
        load() {
            let saveFile = localStorage.getItem('saveFile');

            if (saveFile !== null) {
                saveFile = JSON.parse(atob(atob(saveFile)));

                this.bananas = saveFile.bananas;
                this.totalBananas = saveFile.totalBananas;
                this.bps = saveFile.bps;
                this.bpc = saveFile.bpc;
                this.nbClicks = saveFile.nbClicks;
                this.bpsModules = saveFile.bpsModules;
                this.bpcModules = saveFile.bpcModules;
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
        },
        superCheat() {
            this.bananas += 100000000;
            this.totalBananas += 100000000;
        },
        returnNiceNumber(number) {
            let formattedNumber;

            switch (true) {
                case number < 1000000:
                    formattedNumber = new Intl.NumberFormat('fr-FR').format(Math.floor(number));

                    break;
                case number < 1000000000:
                    formattedNumber = new Intl.NumberFormat('fr-FR', {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 3
                    }).format(Math.floor(number) / 1000000) + 'M';

                    break;
                case number < 1000000000000:
                    formattedNumber = new Intl.NumberFormat('fr-FR', {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 3
                    }).format(Math.floor(number) / 1000000000) + 'B';

                    break;
                case number < 1000000000000000:
                    formattedNumber = new Intl.NumberFormat('fr-FR', {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 3
                    }).format(Math.floor(number) / 1000000000000) + 'T';

                    break;
                case number < 1000000000000000000:
                    formattedNumber = new Intl.NumberFormat('fr-FR', {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 3
                    }).format(Math.floor(number) / 1000000000000000) + 'Q';

                    break;
                default:
                    formattedNumber = new Intl.NumberFormat('fr-FR').format(Math.floor(number));

                    break;
            }

            return formattedNumber;
        }
    },
    watch: {
        achievements: {
            handler() {
                this.$emit('achievements-updated', this.achievements);
            }, deep: true //connard
        }
    }
})
</script>

<style scoped>

</style>
