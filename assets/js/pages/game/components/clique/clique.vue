<template>
    <div class="tw-grid tw-grid-cols-3 tw-gap-10">
<!--        TODO: regarder si ça update bien bpsModules d'ici quand on update dans le coposant-->
<!--        <shop :bps-modules="bpsModules" :bananas="bananas"></shop>-->

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

        <div class="tw-col-span-1 tw-flex tw-flex-col tw-items-center tw-text-center">
            <button class="tw-rounded-full tw-w-fit tw-p-8 tw-shadow tw-m-5" id="content" @click="clickBanana">
                <img ref="banane"
                     src="/assets/images/banane.png" alt="Banana"
                     class="tw-w-36 tw-h-36 animate__faster"
                     style="--animate-duration: 0.2s;">
            </button>

            <div class="tw-w-full tw-flex tw-flex-col tw-gap-5 tw-items-center">
                <div class="tw-text-white">
                    <div class="tw-font-bold tw-text-6xl tw-text-white">
                        {{ useReturnNicerNumber(bananas) }}
                    </div>

                    <v-tooltip right content-class='custom-tooltip'>
                        <template v-slot:activator="{ props }">
                            <div v-bind="props">
                                BPS :
                                <span class="tw-font-bold">
                                    {{ useReturnNicerNumber(bps) }}
                                </span>
                            </div>
                        </template>

                        <span>Bananes Par Seconde</span>
                    </v-tooltip>

                    <v-tooltip right content-class='custom-tooltip'>
                        <template v-slot:activator="{ props }">
                            <div v-bind="props">
                                BPC :
                                <span class="tw-font-bold">
                                    {{ useReturnNicerNumber(bpc) }}
                                </span>
                            </div>
                        </template>

                        <span>Bananes Par Clic</span>
                    </v-tooltip>

                    <div>
                        BPS dû aux clics :
                        <span class="tw-font-bold">
                            {{ useReturnNicerNumber(bpsFromClicks) }}
                        </span>
                    </div>

                    <div>
                        Total :
                        <span class="tw-font-bold">
                            {{ useReturnNicerNumber(totalBananas) }}
                        </span>
                    </div>

                    <div>
                        Nombre de clics :
                        <span class="tw-font-bold">
                            {{ useReturnNicerNumber(nbClicks) }}
                        </span>
                    </div>
                </div>

                <div class="tw-flex tw-flex-col tw-gap-1 tw-w-1/2">
                    <div>DEBUG</div>
                    <button @click="save" class="tw-bg-blue-100 tw-rounded-md">Save</button>
                    <button @click="load" class="tw-bg-blue-100 tw-rounded-md">Load</button>
                    <button @click="reset" class="tw-bg-red-100 tw-rounded-md">Reset</button>
                    <button @click="cheat(1000000)" class="tw-bg-green-100 tw-rounded-md">Cheat</button>
                    <button @click="cheat(1000000000)" class="tw-bg-green-100 tw-rounded-md">Super cheat</button>
                </div>
            </div>
        </div>

        <div class="tw-col-span-1 tw-flex tw-flex-col tw-gap-5">
            <h2 class="tw-text-4xl tw-text-white tw-font-bold">
                Améliorations
            </h2>

            <div v-if="bpcModules[0].unlocked === true || bpsBuffsModules[0].unlocked === true"
                 class="tw-flex tw-flex-col tw-gap-4">
                <template v-for="(bpcModule, index) in bpcModules" :key="index">
                    <module-button
                        v-if="bpcModule.unlocked === true"
                        :bananas="bananas"
                        :module="bpcModule"
                        type="bpc"
                        @buy-n-times="(module, type, n) => buyNTimes(module, type, n, index)">
                    </module-button>
                </template>

                <template v-for="(bpsBuffsModule, index) in bpsBuffsModules" :key="index">
                    <module-button
                        v-if="bpsBuffsModule.unlocked === true"
                        :bananas="bananas"
                        :module="bpsBuffsModule"
                        type="buff"
                        @buy-n-times="(module, type, n) => buyNTimes(module, type, n, index)">
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
import {useReturnNicerNumber} from "../../../../composables/numbersComposable";
// import Shop from "@pages/game/components/clique/components/shop.vue";

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
            bpsInterval: null,
            savingInterval: null,
            BPSFromClicksInterval: null,
            nbClicksClickrate: 0,
            bpsFromClicks: 0,
            bpsModules: [
                {
                    name: 'Auto Clicker',
                    article: 'un',
                    description: 'Un curseur qui clique tout seul comme un grand. Si vous êtes un tant soit peu ' +
                        'impressionnable ça vous fera peut-être quelque chose.',
                    slug: 'autoclicker',
                    price: {
                        base: 50,
                        multiplier: 1.09,
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
                        base: 500,
                        multiplier: 1.11,
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
                        base: 5000,
                        multiplier: 1.15,
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
                        base: 29000,
                        multiplier: 1.18,
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
                        base: 200,
                        multiplier: 1.2,
                    },
                    bpc: 1,
                    nbClicksCondition: 100,
                    unlocked: false,
                    numberBought: 0
                },
                {
                    name: 'Curseur encore plus fort',
                    article: 'un',
                    description: 'Votre curseur mais en vraiment, vraiment mieux. Y\'a pas à dire, ça fait toute la différence.',
                    slug: 'curseur-encore-plus-fort',
                    price: {
                        base: 2000,
                        multiplier: 1.2,
                    },
                    bpc: 5,
                    nbClicksCondition: 1000,
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
                    text: '1',
                    description: 'Ouah. Une banane. Très impressionnant, vraiment.',
                    bonus: {
                        value: 1,
                        text: 'Aucun. Vous vous attendiez à quoi ?'
                    },
                    conditionType: 'totalBananas',
                    picture: 'banane',
                    condition: 1,
                    unlocked: false,
                    seen: false
                },
                {
                    name: 'Cent bananes !',
                    text: '100',
                    description: 'Votre colin, avec ou sans bananes ?',
                    bonus: {
                        value: null,
                        text: 'Toujours rien. On croit pas trop à la redistribution collective ici.'
                    },
                    conditionType: 'totalBananas',
                    picture: 'banane',
                    condition: 100,
                    unlocked: false,
                    seen: false
                },
                {
                    name: 'Mille bananes',
                    text: '1K',
                    description: 'Mille bananes. Là, on commence à parler sérieusement.',
                    bonus: {
                        value: 1,
                        text: '+1 bps',
                        type: 'bps'
                    },
                    conditionType: 'totalBananas',
                    picture: 'banane',
                    condition: 1000,
                    unlocked: false,
                    seen: false
                },
                {
                    name: 'UN MILLION',
                    text: '1M',
                    description: 'LE MILLION. LE MILLION DE BANANES.',
                    bonus: {
                        value: 10,
                        text: '+10 bps',
                        type: 'bps'
                    },
                    conditionType: 'totalBananas',
                    picture: 'banane',
                    condition: 1000000,
                    unlocked: false,
                    seen: false
                },
                {
                    name: '1%',
                    text: '1B',
                    description: 'Avec ça vous allez probablement bientôt songer à créer un paradis fiscal sur Mars.',
                    bonus: {
                        value: 100,
                        text: '+100 bps',
                        type: 'bps'
                    },
                    conditionType: 'totalBananas',
                    picture: 'banane',
                    condition: 1000000000,
                    unlocked: false,
                    seen: false
                },
                {
                    name: 'Clic clic, banane, clic clic.',
                    text: '100',
                    description: 'Ça commence à faire quelques clics.',
                    bonus: {
                        value: null,
                        text: 'Que dalle.'
                    },
                    conditionType: 'nbClicks',
                    picture: 'modules/bpc/clicker',
                    condition: 100,
                    unlocked: false,
                    seen: false
                },
                {
                    name: 'Attention la tendinite',
                    text: '1K',
                    description: 'Ce serait dommage de se retrouver en accident de travail...',
                    bonus: {
                        value: 1,
                        text: '+1 bpc',
                        type: 'bpc',
                        applied: false
                    },
                    conditionType: 'nbClicks',
                    picture: 'modules/bpc/clicker',
                    condition: 1000,
                    unlocked: false,
                    seen: false
                },
                {
                    name: 'Tant pis pour vous',
                    text: '10K',
                    description: 'J\'aurai prévenu perso je suis à l\'abri',
                    bonus: {
                        value: 10,
                        text: '+10 bpc',
                        type: 'bpc',
                        applied: false
                    },
                    conditionType: 'nbClicks',
                    picture: 'modules/bpc/clicker',
                    condition: 10000,
                    unlocked: false,
                    seen: false
                },
            ]
        }
    },
    created() {
        this.load();

        this.startBPS();
        this.startBPSFromClicks();
        this.startAutomaticSaving();
    },
    methods: {
        useAnimateCss,
        useReturnNicerNumber,
        clickBanana() {
            this.addBanana();

            this.unlockBpcModules();

            this.useAnimateCss(this.$refs.banane, 'jello');
        },
        addBanana() {
            this.bananas += this.bpc;
            this.totalBananas += this.bpc;
            this.nbClicks++;
            this.nbClicksClickrate++;
        },
        startBPS() {
            this.bpsInterval = setInterval(() => {
                this.calcBPS();

                this.bananas += this.bps / 10;
                this.totalBananas += this.bps / 10;

                this.unlockAchievements();
            }, 100)
        },
        startBPSFromClicks() {
            this.BPSFromClicksInterval = setInterval(() => {
                const clickRate = this.nbClicksClickrate;
                this.nbClicksClickrate = 0;

                this.bpsFromClicks = this.bpc * clickRate;
            }, 1000);
        },
        calcBPS() {
            let bps = 0;

            this.bpsModules.forEach(module => {
                bps += module.bps.current * module.numberBought;
            });

            this.achievements.forEach(achievement => {
                if (achievement.unlocked === true && achievement.bonus.type === 'bps') {
                    bps += achievement.bonus.value;
                }
            });

            return bps;
        },
        buyModule(module, type, index) {
            let currentPrice = Math.floor(module.price.base * (Math.pow(module.price.multiplier, module.numberBought + 1) - 1) / (module.price.multiplier - 1));

            if (this.bananas >= currentPrice) {
                this.bananas -= currentPrice;

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
            }
        },
        buyNTimes(module, type, n, index) {
            for (let i = 0; i < n; i++) {
                this.buyModule(module, type, index);
            }
        },
        unlockBpcModules() {
            this.bpcModules.forEach(module => {
                if (this.nbClicks >= module.nbClicksCondition) {
                    module.unlocked = true;
                }
            });
        },
        unlockAchievements() {
            this.achievements.forEach(achievement => {
                if (achievement.conditionType === 'totalBananas' && this.totalBananas >= achievement.condition) {
                    achievement.unlocked = true;
                }

                if (achievement.conditionType === 'nbClicks' && this.nbClicks >= achievement.condition) {
                    achievement.unlocked = true;
                }

                if (achievement.conditionType === 'bps' && this.bps >= achievement.condition) {
                    achievement.unlocked = true;
                }

                if (achievement.conditionType === 'bpc' && this.bpc >= achievement.condition) {
                    achievement.unlocked = true;

                    if (achievement.bonus.applied === false) {
                        this.bpc += achievement.bonus;
                        // TODO: sauvegarder ça
                        achievement.bonus.applied = true;
                    }
                }
            });
        },
        startAutomaticSaving() {
            this.savingInterval = setInterval(() => {
                this.save();
            }, 5000)
        },
        save() {
            let saveFile = {
                bananas: this.bananas,
                totalBananas: this.totalBananas,
                bps: this.bps,
                bpc: this.bpc,
                nbClicks: this.nbClicks
            };

            saveFile.bpsModules = this.bpsModules.map(module => {
                return {
                    slug: module.slug,
                    numberBought: module.numberBought
                }
            });

            saveFile.bpcModules = this.bpcModules.map(module => {
                return {
                    slug: module.slug,
                    numberBought: module.numberBought
                }
            });

            saveFile.bpsBuffsModules = this.bpsBuffsModules.map(module => {
                return {
                    slug: module.slug,
                    numberBought: module.numberBought
                }
            });

            saveFile.achievements = this.achievements.map(achievement => {
                return {
                    name: achievement.name,
                    unlocked: achievement.unlocked,
                    seen: achievement.seen
                }
            });

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

                this.bpsModules.forEach((module, index) => {
                    if (saveFile.bpsModules) {
                        let saveModule = saveFile.bpsModules.find(saveModule => saveModule.slug === module.slug);

                        if (saveModule !== undefined) {
                            module.numberBought = saveModule.numberBought;

                            if (module.numberBought > 0 && index < this.bpsModules.length - 1) {
                                this.bpsModules[index + 1].unlocked = true;
                            }
                        }
                    }
                });

                this.bpcModules.forEach((module, index) => {
                    if (saveFile.bpcModules) {
                        let saveModule = saveFile.bpcModules.find(saveModule => saveModule.slug === module.slug);

                        if (saveModule !== undefined) {
                            module.numberBought = saveModule.numberBought;

                            if (module.numberBought > 0 && index < this.bpcModules.length - 1) {
                                this.bpcModules[index + 1].unlocked = true;
                            }
                        }
                    }
                });

                this.bpsBuffsModules.forEach(module => {
                    if (saveFile.bpsBuffsModules) {
                        let saveModule = saveFile.bpsBuffsModules.find(saveModule => saveModule.slug === module.slug);

                        if (saveModule !== undefined) {
                            module.numberBought = saveModule.numberBought;
                        }
                    }
                });

                this.achievements.forEach(achievement => {
                    if (saveFile.achievements) {
                        let saveAchievement = saveFile.achievements.find(saveAchievement => saveAchievement.name === achievement.name);

                        if (saveAchievement !== undefined) {
                            achievement.unlocked = saveAchievement.unlocked;
                            achievement.seen = saveAchievement.seen;
                        }
                    }
                });
            }
        },
        reset() {
            clearInterval(this.bpsInterval);
            clearInterval(this.savingInterval);

            localStorage.removeItem('saveFile');

            this.bananas = 0;
            this.totalBananas = 0;
            this.bps = 0;
            this.bpc = 1;
            this.nbClicks = 0;

            this.bpsModules.forEach(module => {
                module.bps.current = module.bps.base;
                module.numberBought = 0;
            });

            this.achievements.forEach(achievement => {
                achievement.unlocked = false;
                achievement.seen = false;
            });

            this.startBPS();
            this.startAutomaticSaving();
        },
        cheat(n) {
            this.bananas += n;
            this.totalBananas += n;
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

<style lang="scss" scoped>
#content {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}
</style>
