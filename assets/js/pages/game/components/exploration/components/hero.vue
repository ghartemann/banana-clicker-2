<template>
    <div class="tw-flex-col tw-flex tw-items-center">
        <div class="tw-font-bold tw-h-12">
            {{ heroName }}
        </div>

        <v-progress-linear
            :model-value="hero.life.current"
            :max="hero.life.max"
            :bg-color="lifeBarColor"
            :color="lifeBarColor"
            rounded
            height="20">
            <span class="tw-text-black">
                {{ hero.life.current }} / {{ hero.life.max }}
            </span>
        </v-progress-linear>

        <img src="/assets/images/exploration/hero.png"
             alt="Hero"
             class="tw-w-20 tw-h-20 tw-mx-auto tw-mb-5 healing"
             id="hero"
             style="--animate-duration: 0.2s;"
        >
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "hero",
    props: {
        hero: {
            type: Object,
            required: true
        },
        heroName: {
            type: String,
            required: true
        }
    },
    computed: {
        lifeBarColor() {
            if (this.hero.life.current > this.hero.life.max / 3) {
                return 'success';
            } else if (this.hero.life.current > this.hero.life.max / 10) {
                return 'warning';
            } else {
                return 'error';
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.healing {
    filter: drop-shadow(0px 0px 30px #2EE921);
}
</style>
