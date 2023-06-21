<template>
    <div class="tw-max-w-full tw-max-h-full tw-m-auto tw-flex tw-justify-center tw-flex-col tw-items-center tw-text-center">
        <h1 class="tw-text-9xl tw-text-white">404</h1>
        <div class="tw-text-6xl tw-text-white">Pas de bananes par ici snif</div>
        <div class="tw-text-3xl tw-text-white">
            Vous devriez sûrement songer à vous rendre sur une page où il y en a, ce
            sera probablement plus fun qu'ici (si c'est pas le cas vous pouvez m'en faire part et me rendre très triste)
        </div>

        <router-link class="tw-text-white tw-text-xlgsave" :to="{name: 'homepage'}">Let's go on retourne à l'accueil par ici</router-link>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "index"
})
</script>

<style scoped>

</style>
