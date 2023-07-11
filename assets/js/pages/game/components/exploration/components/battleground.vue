<template>
    <div class="tw-grid tw-grid-cols-4 tw-gap-3">
        <div class="tw-col-span-1 tw-rounded-2xl tw-bg-white tw-p-5 tw-bg-cover tw-shadow-xl">
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
                <div class="tw-flex tw-gap-1">
                    <div>PV max</div>

                    <button v-if="hero.xp.points > 0" rounded @click="addPoint('pv')">+</button>
                </div>

                <div>{{ hero.life.max }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div class="tw-flex tw-gap-1">
                    <div>DMG</div>

                    <button v-if="hero.xp.points > 0" rounded @click="addPoint('dmg')">+</button>
                </div>

                <div>{{ hero.attack }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div class="tw-flex tw-gap-1">
                    <div>DEF</div>

                    <button v-if="hero.xp.points > 0" rounded @click="addPoint('def')">+</button>
                </div>

                <div>{{ hero.defense }}</div>
            </div>

            <div class="tw-flex tw-justify-between">
                <div class="tw-flex tw-gap-1">
                    <div>Chances de DMG crit.</div>
                    <button v-if="hero.xp.points > 0" rounded @click="addPoint('crit')">+</button>
                </div>

                <div>{{ hero.crit * 100 }}%</div>
            </div>

            <div v-if="hero.xp.points > 0" class="tw-flex tw-justify-between">
                <div>Points de compétence</div>

                <div>{{ hero.xp.points }}</div>
            </div>
        </div>

        <div class="tw-col-span-2 tw-w-full tw-rounded-2xl tw-flex tw-justify-center">
            <div class="tw-text-white tw-p-10 !tw-bg-center !tw-bg-cover tw-rounded-2xl tw-shadow-2xl tw-w-full tw-relative" style="background: url('/assets/images/exploration/levels/arena.jpg'); ">
                <div v-if="hero.life.current > 0" class="tw-flex tw-flex-col tw-items-center ">
                    <div class="tw-grid tw-grid-cols-12 tw-pt-16">
                        <Hero :hero="hero" :hero-name="heroName" class="tw-col-span-3 tw-flex tw-justify-center"></Hero>

                        <Enemy :enemy="monsters[zoneIndex][monsterIndex]" class="tw-col-span-3 tw-col-start-10 tw-flex tw-justify-center"></Enemy>
                    </div>

                    <div class="tw-w-1/3 tw-border-2 tw-border-white tw-rounded-lg tw-p-1 tw-absolute tw-bottom-3">
                        <v-btn v-for="(power, index) in powers" elevation="0" @click="activatePower(power.action)" :disabled="power.cooldown.available === false">
                            <img :src="'/assets/images/exploration/' + power.picture + '.png'" class="tw-w-9" :alt="power.picture">
                        </v-btn>
                    </div>
                </div>

                <div v-else class="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
                    <div class="tw-bg-white tw-p-5 tw-rounded-2xl tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-2 tw-shadow-2xl">
                        <div class="tw-text-red-600 tw-text-5xl">VOUS ÊTES MORT·E</div>
                        <v-btn rounded elevation="0" color="red">Recommencer</v-btn>
                    </div>
                </div>
            </div>
        </div>

        <div class="tw-col-span-1 tw-rounded-2xl tw-bg-white tw-p-5 tw-bg-cover tw-shadow-2xl">
            <h2 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-5 tw-text">
                {{ monsters[zoneIndex][monsterIndex].name }}
            </h2>

            <div>PV max : {{ monsters[zoneIndex][monsterIndex].life.max }}</div>
            <div>DMG : {{ monsters[zoneIndex][monsterIndex].attack }}</div>
            <div>DEF : {{ monsters[zoneIndex][monsterIndex].defense }}</div>
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
                crit: 0.03,
                defense: 0,
                xp: {
                    current: 0,
                    max: 100,
                    level: 1,
                    points: 0
                }
            },
            monsters: [
                [
                    {
                        name: 'Singe agressif',
                        picture: 'singe.png',
                        life: {
                            current: 10,
                            max: 10
                        },
                        attack: 1,
                        defense: 0,
                        xp: 5
                    },
                    {
                        name: 'Tapir sanguinaire',
                        picture: 'tapir.png',
                        life: {
                            current: 15,
                            max: 15
                        },
                        attack: 1,
                        defense: 0,
                        xp: 10
                    }
                ]
            ],
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
            zoneIndex: 0,
            battleTimeout: null,
            heroAttackInterval: null,
            enemyAttackInterval: null,
            logs: []
        }
    },
    mounted() {
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

                this.monsters[this.zoneIndex][this.monsterIndex].life.current -= nextDamage - this.monsters[this.zoneIndex][this.monsterIndex].defense;

                this.logEvent(nextDamage === this.hero.attack ? 'dmg' : 'crit', this.hero, this.monsters[this.zoneIndex][this.monsterIndex]);

                if (this.monsters[this.zoneIndex][this.monsterIndex].life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);
                    clearInterval(this.battleTimeout);

                    this.logEvent('kill', this.hero, this.monsters[this.zoneIndex][this.monsterIndex]);

                    this.hero.xp.current += this.monsters[this.zoneIndex][this.monsterIndex].xp;

                    if (this.monsterIndex < this.monsters[this.zoneIndex].length - 1) {
                        this.monsters[this.zoneIndex][this.monsterIndex].life.current = this.monsters[this.zoneIndex][this.monsterIndex].life.max;
                        this.monsterIndex = Math.floor(Math.random() * (this.monsters[this.zoneIndex].length));
                    } else {
                        this.monsterIndex = 0;

                        this.monsters[this.zoneIndex].forEach(monster => {
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

                this.hero.life.current -= this.monsters[this.zoneIndex][this.monsterIndex].attack - this.hero.defense;

                this.logEvent('dmg', this.monsters[this.zoneIndex][this.monsterIndex], this.hero);

                if (this.hero.life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);
                    clearInterval(this.battleTimeout);

                    this.logEvent('kill', this.monsters[this.zoneIndex][this.monsterIndex], this.hero);
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

            if (this.logs.length > 12) {
                this.logs.pop();
            }

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
        },
        lvlUp() {
            this.hero.xp.current -= this.hero.xp.max;
            this.hero.xp.max = Math.floor(this.hero.xp.max * 1.5);
            this.hero.xp.level++;
            this.hero.life.current = this.hero.life.max;
            this.hero.xp.points += 2;
        },
        addPoint(type) {
            this.hero.xp.points--;

            switch (type) {
                case 'pv':
                    this.hero.life.max += 5;
                    this.hero.life.current += Math.min(this.hero.life.current + 5, this.hero.life.max);
                    break;
                case 'dmg':
                    this.hero.attack += 1;
                    break;
                case 'def':
                    this.hero.defense += 1;
                    break;
                case 'crit':
                    this.hero.crit += 0.001;
                    break;
            }
        }
    },
    watch: {
        hero: {
            handler() {
                if (this.hero.xp.current >= this.hero.xp.max) {
                    this.lvlUp();
                }
            },
            deep: true
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
