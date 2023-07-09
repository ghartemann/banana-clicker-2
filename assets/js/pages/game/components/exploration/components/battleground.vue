<template>
    <div class="tw-grid tw-grid-cols-4 tw-gap-3">
        <div class="tw-col-span-1 tw-rounded-2xl tw-p-5 tw-bg-cover" style="background: url('/assets/images/exploration/parchment.jpg');">
            <h2 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-5 tw-text">{{ hero.name }}</h2>

            <div>
                <div>Niveau {{ hero.xp.level }}</div>

                <v-progress-linear
                    :model-value="hero.xp.current"
                    :max="hero.xp.max"
                    bg-color="yellow"
                    color="yellow"
                    rounded
                    height="10">
                </v-progress-linear>

                <div>{{ hero.xp.current }} / {{ hero.xp.max }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div>PV max</div>
                <div>{{ hero.life.max }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div>DMG</div>
                <div>{{ hero.attack }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div>DEF</div>
                <div>{{ hero.defense }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div>Chances de DMG crit.</div>
                <div>{{ hero.crit * 100 }}%</div>
            </div>
        </div>

        <div class="tw-col-span-2 tw-w-full tw-rounded-2xl tw-flex tw-justify-center">
            <div class="tw-text-white tw-p-10 !tw-bg-cover tw-bg-center tw-rounded-2xl tw-shadow-2xl tw-w-full tw-relative" style="background: url('/assets/images/exploration/arena.jpg');">
                <div v-if="hero.life.current > 0" class="tw-flex tw-flex-col tw-items-center ">
                    <div class="tw-grid tw-grid-cols-12 tw-pt-16">
                        <Hero :hero="hero" :hero-name="heroName" class="tw-col-span-3"></Hero>

                        <img src="/assets/images/exploration/epees.png" alt="épées" class="tw-col-span-6 tw-w-20 tw-h-20 tw-mx-auto tw-mb-5">

                        <Enemy :enemy="monsters[monsterIndex]" class="tw-col-span-3"></Enemy>
                    </div>

                    <div class="tw-w-1/3 tw-border-2 tw-border-white tw-rounded-lg tw-p-1 tw-absolute tw-bottom-3">
                        <v-btn v-for="(power, index) in powers" elevation="0" @click="activatePower(power.action)" :disabled="power.cooldown.available === false">
                            <img :src="'/assets/images/exploration/' + power.picture + '.png'" class="tw-w-9" :alt="power.picture">
                        </v-btn>
                    </div>
                </div>

                <div v-else class="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
                    <div class="tw-bg-white tw-p-5 tw-rounded-2xl tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-2">
                        <div class="tw-text-red-600 tw-text-5xl">VOUS ÊTES MORT·E</div>
                        <v-btn rounded elevation="0" color="red">Recommencer</v-btn>
                    </div>
                </div>
            </div>
        </div>

        <div class="tw-col-span-1 tw-rounded-2xl tw-p-5 tw-bg-cover" style="background: url('/assets/images/exploration/parchment.jpg');">
            <h2 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-5 tw-text">{{ monsters[monsterIndex].name }}</h2>

            <div>PV max : {{ monsters[monsterIndex].life.max }}</div>
            <div>DMG : {{ monsters[monsterIndex].attack }}</div>
            <div>DEF : {{ monsters[monsterIndex].defense }}</div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import Hero from "@pages/game/components/exploration/components/hero";
import Enemy from "@pages/game/components/exploration/components/enemy";
import {useAnimateCss} from "../../../../../composables/animateCssComposable";

export default defineComponent({
    name: "battleground",
    components: {Enemy, Hero},
    props: {
        heroName: {
            type: String,
            required: true,
            logs: []
        }
    },
    data: () => {
        return {
            hero: {
                name: '',
                life: {
                    current: 20,
                    max: 20
                },
                attack: 1,
                crit: 0.04,
                defense: 0,
                xp: {
                    current: 15,
                    max: 100,
                    level: 1
                }
            },
            monsters: {
                'zone1': [
                    {
                        name: 'Singe agressif',
                        picture: 'singe-agressif.png',
                        life: {
                            current: 10,
                            max: 10
                        },
                        attack: 1,
                        defense: 0,
                        xp: 10
                    },
                    {
                        name: 'Tapir sanguinaire',
                        picture: 'tapir-sanguinaire.png',
                        life: {
                            current: 15,
                            max: 15
                        },
                        attack: 1,
                        defense: 0,
                        xp: 15
                    }
                ]
            },
            powers: {
                heal: {
                    action: 'heal',
                    picture: 'potion',
                    description: 'Soigne 25% des PV max',
                    cooldown: {
                        duration: 30,
                        available: true
                    },
                    unlocked: true,
                }
            },
            powersTimeouts: {
                heal: 0
            },
            monsterIndex: 0,
            battleTimeout: null,
            heroAttackInterval: null,
            enemyAttackInterval: null,
            logs: []
        }
    },
    created() {
        this.startBattle();

        this.hero.name = this.heroName;
    },
    methods: {
        useAnimateCss,
        startBattle() {
            this.startHeroAttack();

            this.battleTimeout = setTimeout(() => {
                this.startEnemyAttack();
            }, 1000);
        },
        startHeroAttack() {
            this.heroAttackInterval = setInterval(() => {
                this.useAnimateCss(document.getElementById('enemy'), 'wobble');

                const nextDamage = Math.random() < this.hero.crit ? this.hero.attack * 2 : this.hero.attack;

                this.monsters[this.monsterIndex].life.current -= nextDamage - this.monsters[this.monsterIndex].defense;

                this.logEvent(nextDamage === this.hero.attack ? 'dmg' : 'crit', this.hero, this.monsters[this.monsterIndex]);

                if (this.monsters[this.monsterIndex].life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);

                    this.logEvent('kill', this.hero, this.monsters[this.monsterIndex]);

                    this.hero.xp.current += this.monsters[this.monsterIndex].xp;

                    if (this.monsterIndex < this.monsters.length - 1) {
                        this.monsterIndex++;
                    } else {
                        this.monsterIndex = 0;

                        this.monsters.forEach(monster => {
                            monster.life.current = monster.life.max;
                        });
                    }

                    this.startBattle();
                }
            }, 2000);
        },
        startEnemyAttack() {
            this.enemyAttackInterval = setInterval(() => {
                this.useAnimateCss(document.getElementById('hero'), 'wobble');

                this.hero.life.current -= this.monsters[this.monsterIndex].attack - this.hero.defense;

                this.logEvent('dmg', this.monsters[this.monsterIndex], this.hero);

                if (this.hero.life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);
                    clearInterval(this.battleTimeout);

                    this.logEvent('kill', this.monsters[this.monsterIndex], this.hero);
                }
            }, 2000);
        },
        logEvent(type, attacker, defender) {
            const log = {
                type: type,
                attacker: attacker.name,
                defender: defender.name,
                damage: attacker.attack - defender.defense,
                niceGuy: attacker.name === this.hero.name
            };

            this.logs.unshift(log);

            this.$emit('log-event', this.logs);
        },
        activatePower(action) {
            switch (action) {
                case 'heal':
                    if (this.powers.heal.cooldown.available) {
                        this.hero.life.current = Math.min(this.hero.life.current + Math.floor(this.hero.life.max / 4), this.hero.life.max);

                        this.powers.heal.cooldown.available = false;

                        this.powersTimeouts.heal = setTimeout(() => {
                            this.powers.heal.cooldown.available = true;
                        }, this.powers.heal.cooldown.duration * 1000);
                    }

                    break;
            }
        }
    },
    watch: {
        heroName() {
            this.hero.name = this.heroName;
        },
        monsterIndex() {
            if (this.monsterIndex === 9) {
                // Boss fight
            }

            if (this.monsterIndex === 10) {
                // Zone 2
            }
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
