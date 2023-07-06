<template>
    <div class="tw-text-white">
        <div>Battlelog</div>

        <div>
            <div v-for="(log, index) in logs" :key="index">
                <div>{{ log.attacker }} attaque {{ log.defender }} et lui inflige {{ log.damage }} points de dégats.</div>
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
