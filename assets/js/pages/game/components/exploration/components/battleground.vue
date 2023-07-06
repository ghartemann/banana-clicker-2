<template>
    <div class="tw-w-full tw-flex tw-justify-center">
        <div class="tw-text-white tw-p-10 tw-w-1/2 !tw-bg-cover tw-rounded-2xl tw-shadow-2xl" style="background: url('/assets/images/exploration/arena.jpg');">
            <div v-if="hero.life.current > 0" class="tw-grid tw-grid-cols-12">
                <Hero :hero="hero" :hero-name="heroName" class="tw-col-span-3"></Hero>

                <img src="/assets/images/exploration/epees.png" alt="épées" class="tw-col-span-6 tw-w-20 tw-h-20 tw-mx-auto tw-mb-5">

                <Enemy :enemy="monsters[0]" class="tw-col-span-3"></Enemy>
            </div>

            <div v-else>VOUS ÊTES MORT·E</div>
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
                name: this.heroName,
                life: {
                    current: 100,
                    max: 100
                },
                attack: 1,
                defense: 0
            },
            monsters: [
                {
                    name: 'Singe agressif',
                    picture: 'singe-agressif.png',
                    life: {
                        current: 100,
                        max: 100
                    },
                    attack: 2,
                    defense: 0
                }
            ],
            heroAttackInterval: null,
            enemyAttackInterval: null,
            logs: []
        }
    },
    created() {
        this.startHeroAttack();

        setTimeout(() => {
            this.startEnemyAttack();
        }, 1000);
    },
    methods: {
        useAnimateCss,
        startHeroAttack() {
            this.monsterIndex = 0;

            this.heroAttackInterval = setInterval(() => {
                this.useAnimateCss(document.getElementById('enemy'), 'wobble');

                this.monsters[this.monsterIndex].life.current -= this.hero.attack - this.monsters[this.monsterIndex].defense;

                this.logEvent(this.hero, this.monsters[this.monsterIndex]);

                if (this.monsters[this.monsterIndex].life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);
                    console.log('You won');

                    if (this.monsterIndex === this.monsters.length - 1) {
                        console.log('restarting');
                    } else {
                        this.monsterIndex++;
                    }
                }
            }, 2000);
        },
        startEnemyAttack() {
            this.enemyAttackInterval = setInterval(() => {
                this.useAnimateCss(document.getElementById('hero'), 'wobble');

                this.hero.life.current -= this.monsters[this.monsterIndex].attack - this.hero.defense;

                this.logEvent(this.monsters[this.monsterIndex], this.hero);

                if (this.hero.life.current <= 0) {
                    clearInterval(this.heroAttackInterval);
                    clearInterval(this.enemyAttackInterval);
                    console.log('You died');
                }
            }, 2000);
        },
        logEvent(attacker, defender) {
            const log = {
                attacker: attacker.name,
                defender: defender.name,
                damage: attacker.attack - defender.defense
            };

            this.logs.push(log);

            this.$emit('log', this.logs);
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
