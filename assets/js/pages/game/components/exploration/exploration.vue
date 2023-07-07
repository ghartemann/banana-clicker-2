<template>
    <div>
        <WelcomeToTheArena v-if="gameStarted === false" @start="startGame($event)"></WelcomeToTheArena>

        <div v-if="gameStarted === true" class="tw-w-4/5">
            <Battleground :heroName="heroName" @log-event="logs = $event"></Battleground>

            <BattleLog :logs="logs" class="tw-w-full"></BattleLog>
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
    },
    methods: {
        startGame(heroName) {
            this.gameStarted = true;
            this.heroName = heroName;
        }
    }
})
</script>

<style scoped>

</style>
