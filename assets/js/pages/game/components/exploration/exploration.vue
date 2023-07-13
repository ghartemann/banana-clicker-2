<template>
    <div class="tw-h-full tw-p-10">
        <WelcomeToTheArena v-if="gameStarted === false" @start="gameStarted = true" @hero-name="heroName = $event"></WelcomeToTheArena>

        <div v-if="gameStarted === true"
             class="tw-flex tw-flex-col tw-justify-center tw-gap-3 tw-h-full !tw-bg-center !tw-bg-cover tw-rounded-2xl"
             style="background: url('/assets/images/exploration/levels/arena.jpg');"
        >
            <div class="tw-w-full tw-h-full tw-justify-center tw-grid tw-grid-rows-3">
                <h2 class="tw-text-center tw-text-white tw-text-2xl tw-font-bold tw-row-span-1">Zone {{ zone[0] }}-{{ zone[1] }}</h2>

                <div class="tw-flex tw-w-full tw-row-span-2">
                    <HeroCard></HeroCard>

                    <Battleground :hero-name="heroName" @log-event="logs = $event" @zone="zone = $event"></Battleground>
                </div>
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
            logs: [],
            zone: [1, 1]
        }
    }
})
</script>

<style scoped>

</style>
