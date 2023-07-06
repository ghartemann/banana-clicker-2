<template>
    <div>
        <WelcomeToTheArena @start="startGame($event)" v-if="gameStarted === false"></WelcomeToTheArena>

        <Battleground v-else :heroName="heroName"></Battleground>

        <BattleLog :logs="logs"></BattleLog>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import Battleground from "@pages/game/components/exploration/components/battleground";
import WelcomeToTheArena from "@pages/game/components/exploration/components/WelcomeToTheArena.vue";
import BattleLog from "@pages/game/components/exploration/components/BattleLog.vue";

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
