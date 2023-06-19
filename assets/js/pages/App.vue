<template>
    <div class="tw-container tw-m-auto">
        <app-bar @change-page="(value) => page = value"></app-bar>

        <router-view :page="page"></router-view>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppBar from "./components/app-bar.vue";

export default defineComponent({
    name: "App",
    components: {AppBar},
    data: () => ({
        page: 'click'
    })
})
</script>

<style scoped>

</style>
