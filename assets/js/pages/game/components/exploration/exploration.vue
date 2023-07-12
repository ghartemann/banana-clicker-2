<template>
    <div class="tw-h-full tw-p-10">
        <WelcomeToTheArena v-if="gameStarted === false" @start="gameStarted = true" @hero-name="heroName = $event"></WelcomeToTheArena>

        <div v-if="gameStarted === true"
             class="tw-flex tw-flex-col tw-justify-center tw-gap-3 tw-h-full !tw-bg-center !tw-bg-cover tw-rounded-2xl"
             style="background: url('/assets/images/exploration/levels/arena.jpg');"
        >
            <div class="tw-flex tw-w-full">
                <HeroCard></HeroCard>

                <Battleground :hero-name="heroName" @log-event="logs = $event"></Battleground>
            </div>

<!--            <div class="tw-grid tw-grid-cols-4 tw-w-full">-->
<!--                <BattleLog :logs="logs" class="tw-col-span-2"></BattleLog>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import Battleground from "@pages/game/components/exploration/components/battleground";
import WelcomeToTheArena from "@pages/game/components/exploration/components/WelcomeToTheArena";
import BattleLog from "@pages/game/components/exploration/components/BattleLog";
import HeroCard from "@pages/game/components/exploration/components/heroCard";

export default defineComponent({
    name: "exploration",
    components: {HeroCard, BattleLog, WelcomeToTheArena, Battleground},
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
