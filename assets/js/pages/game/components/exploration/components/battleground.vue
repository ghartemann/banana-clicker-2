<template>
    <div class="tw-grid tw-grid-cols-4">
        <div class="tw-col-span-1 tw-rounded-tl-2xl tw-p-5 tw-bg-cover" style="background: url('/assets/images/exploration/parchment.jpg');">
            <h2>{{ hero.name }}</h2>

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

        <div class="tw-col-span-2 tw-w-full tw-flex tw-justify-center tw-h-80">
            <div class="tw-text-white tw-p-10 !tw-bg-cover tw-shadow-2xl tw-w-full" style="background: url('/assets/images/exploration/arena.jpg');">
                <div v-if="hero.life.current > 0" class="tw-grid tw-grid-cols-12 tw-pt-16">
                    <Hero :hero="hero" :hero-name="heroName" class="tw-col-span-3"></Hero>

                    <img src="/assets/images/exploration/epees.png" alt="épées" class="tw-col-span-6 tw-w-20 tw-h-20 tw-mx-auto tw-mb-5">

                    <Enemy :enemy="monsters[monsterIndex]" class="tw-col-span-3"></Enemy>
                </div>

                <div v-else class="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
                    <div class="tw-bg-white tw-p-5 tw-rounded-2xl tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-2">
                        <div class="tw-text-red-600 tw-text-5xl">VOUS ÊTES MORT·E</div>
                        <v-btn rounded elevation="0" color="red">Recommencer</v-btn>
                    </div>
                </div>
            </div>
        </div>

        <div class="tw-col-span-1 tw-rounded-tr-2xl tw-p-5 tw-bg-cover" style="background: url('/assets/images/exploration/parchment.jpg');">
            <h2>{{ monsters[monsterIndex].name }}</h2>

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
                    current: 1,
                    max: 20
                },
                attack: 1,
                crit: 0.04,
                defense: 0,
                xp: 0
            },
            monsters: [
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
                }
            ],
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
            this.monsterIndex = 0;

            this.heroAttackInterval = setInterval(() => {
                this.useAnimateCss(document.getElementById('enemy'), 'wobble');

                const nextDamage = Math.random() < this.hero.crit ? this.hero.attack * 2 : this.hero.attack;

                this.monsters[this.monsterIndex].life.current -= nextDamage - this.monsters[this.monsterIndex].defense;

                this.logEvent(nextDamage === this.hero.attack ? 'dmg' : 'crit', this.hero, this.monsters[this.monsterIndex]);

                if (this.monsters[this.monsterIndex].life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);

                    this.logEvent('kill', this.hero, this.monsters[this.monsterIndex]);

                    this.hero.xp += this.monsters[this.monsterIndex].xp;

                    if (this.monsterIndex === this.monsters.length - 1) {
                        console.log('restarting');
                        this.monsterIndex = 0;

                        this.monsters.forEach(monster => {
                            monster.life.current = monster.life.max;
                        });
                    } else {
                        this.monsterIndex++;
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
        }
    },
    watch: {
        heroName() {
            this.hero.name = this.heroName;
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
