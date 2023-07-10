<template>
    <div>
        <WelcomeToTheArena v-if="gameStarted === false" @start="gameStarted = true" @hero-name="heroName = $event"></WelcomeToTheArena>

        <div v-if="gameStarted === true" class="tw-flex tw-flex-col tw-gap-3">
            <Battleground :hero-name="heroName" @log-event="logs = $event" class="tw-h-96"></Battleground>

            <div class="tw-grid tw-grid-cols-4 tw-w-full">
                <BattleLog :logs="logs" class="tw-col-span-2"></BattleLog>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import Battleground from "@pages/game/components/exploration/components/battleground";
import WelcomeToTheArena from "@pages/game/components/exploration/components/WelcomeToTheArena";
import BattleLog from "@pages/game/components/exploration/components/BattleLog";

export default defineComponent({
    name: "exploration",
    components: {BattleLog, WelcomeToTheArena, Battleground},
    data: () => {
        return {
            gameStarted: false,
            heroName: null,
            logs: []
        }
    }
})
</script>

<style scoped>

</style>
