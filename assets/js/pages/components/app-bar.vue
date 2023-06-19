<template>
    <v-card class="tw-z-50">
        <v-layout>
            <v-navigation-drawer
                expand-on-hover
                rail
                class="tw-z-50 !tw-bg-[#0e1c17]"
            >
                <v-list>
                    <v-list-item
                        prepend-avatar="/images/banana.png"
                        title="Sandra Adams"
                        subtitle="sandra_a88@gmailcom"
                    ></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <div class="tw-flex tw-flex-col tw-justify-between tw-text-white">
                    <v-list density="compact" nav>
                        <v-list-item prepend-icon="mdi-cursor-default-click" title="Clique" value="click" rounded="xl" @click="value = 'click'"></v-list-item>
                        <v-list-item prepend-icon="mdi-compass" title="Exploration" value="exploration" rounded="xl" @click="value = 'exploration'"></v-list-item>
                        <v-list-item prepend-icon="mdi-trophy" title="Succès" value="achievements" rounded="xl" @click="value = 'achievements'"></v-list-item>
                        <v-list-item prepend-icon="mdi-cog" title="Paramètres" value="settings" rounded="xl" @click="value = 'settings'"></v-list-item>
                    </v-list>
                </div>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "app-bar",
    data: () => ({
        value: 'click'
    }),
    watch: {
        value() {
            this.$emit('change-page', this.value);
        }
    }
})
</script>

<style scoped>

</style>
