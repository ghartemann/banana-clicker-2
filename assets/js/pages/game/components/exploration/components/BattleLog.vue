<template>
    <div class="tw-bg-white tw-bg-opacity-50 tw-rounded-2xl tw-p-5 tw-text-white tw-w-full">
        <div>BattleLog</div>

        <div class="tw-h-72" style="mask-image: linear-gradient(rgba(255, 255, 255, 1), transparent);">
            <div v-for="(log, index) in logs">
                <div v-if="log.type === 'dmg'" :class="index === 0 ? 'test' : ''">
                {{index}}
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
.test {
    animation: typing 0.5s steps(40);
    overflow: hidden;
    white-space: nowrap;
}

@keyframes typing {
    from {
        width: 0
    }
    to {
        width: 100%
    }
}
</style>
