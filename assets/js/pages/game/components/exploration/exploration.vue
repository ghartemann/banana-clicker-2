<template>
    <div>
        <WelcomeToTheArena v-if="gameStarted === false" @start="startGame($event)" ></WelcomeToTheArena>

        <Battleground v-if="gameStarted === true" :heroName="heroName" @log-event="logs = $event"></Battleground>

        <BattleLog v-if="gameStarted === true" :logs="logs"></BattleLog>
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
