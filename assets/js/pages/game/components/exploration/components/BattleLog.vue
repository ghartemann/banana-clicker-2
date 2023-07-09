<template>
    <div class="tw-bg-white tw-bg-opacity-20 tw-rounded-2xl tw-p-5 tw-text-white tw-w-full">
        <div>BattleLog</div>

        <div class="tw-h-72 tw-overflow-scroll">
            <div v-for="(log, index) in logs" :key="index">
                <div v-if="log.type === 'dmg'">
                    <span :class="log.niceGuy ? 'tw-text-green-dark' : 'tw-text-red-700'">{{ log.attacker }}</span>
                    attaque <span :class="log.niceGuy? 'tw-text-red-700':'tw-text-green-dark'">{{ log.defender }}</span>
                    et lui inflige <span class="tw-text-yellow-dark">{{ log.damage }}</span> points de dégats.
                </div>

                <div v-if="log.type === 'crit'">
                    COUP CRITIQUE ! <span :class="log.niceGuy ? 'tw-text-green-dark' : 'tw-text-red-700'">{{ log.attacker }}</span>
                    attaque <span :class="log.niceGuy? 'tw-text-red-700':'tw-text-green-dark'">{{ log.defender }}</span>
                    et lui inflige <span class="tw-text-yellow-dark">{{ log.damage * 2 }}</span> points de dégats.
                </div>

                <div v-if="log.type === 'kill'">
                    <span :class="log.niceGuy?'tw-text-red-700':'tw-text-green-dark'">{{ log.defender }}</span>
                    succombe à ses blessures.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "BattleLog",
    props: {
        logs: {
            type: Array,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
