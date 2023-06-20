<template>
    <v-card class="tw-z-50">
        <v-layout>
            <v-navigation-drawer
                expand-on-hover
                rail
                class="tw-z-50 !tw-bg-[#0e1c17]"
            >
                <v-list class="!tw-text-white">
                    <v-list-item
                        prepend-avatar="/assets/images/banane.png"
                        title="Banana Clicker 2"
                        subtitle="Le jeu des bananes"
                    ></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <div class="tw-flex tw-flex-col tw-justify-between tw-text-white">
                    <v-list density="compact" nav>
                        <v-list-item prepend-icon="mdi-cursor-default-click" title="Clique" value="click" rounded="xl" @click="value = 'click'"></v-list-item>
                        <v-list-item prepend-icon="mdi-compass" title="Exploration" value="exploration" rounded="xl" @click="value = 'exploration'"></v-list-item>

                        <v-list-item title="Succès" value="achievements" rounded="xl" @click="value = 'achievements'">
                            <template v-slot:prepend>
                                <v-badge color="#d54b4b" :content="achievements" :model-value="achievements > 0" style="margin-inline-end:32px;">
                                    <v-icon style="grid-area: prepend;">mdi-trophy</v-icon>
                                </v-badge>
                            </template>
                        </v-list-item>

                        <v-list-item prepend-icon="mdi-cog" title="Paramètres" value="settings" rounded="xl" @click="value = 'settings'"></v-list-item>
                    </v-list>
                </div>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "app-bar",
    data: () => ({
        value: 'click'
    }),
    props: {
        achievements: {
            type: Number,
            required: true
        }
    },
    watch: {
        value() {
            this.$emit('change-page', this.value);
        }
    }
})
</script>

<style scoped>

</style>
