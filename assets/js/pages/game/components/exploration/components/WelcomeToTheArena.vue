<template>
    <div class="tw-w-full tw-flex tw-justify-center">
        <div class="tw-p-10 tw-w-1/2 !tw-bg-cover tw-rounded-2xl tw-shadow-2xl tw-bg-white">
            <div v-if="step === 1">
                <h1 class="tw-text-4xl tw-text-center">Bienvenue dans l'arène, champion.</h1>

                <div>
                    "Champion" est à prendre au sens paternaliste et condescendant. Vous n'avez pour l'instant rien
                    accompli, le véritable défi commence ici.
                </div>

                <div>
                    Alors calmons-nous tout de suite car ce n'est pas Elden Ring 2 ; le combat est ici 100 % automatisé
                    et
                    vous n'aurez pour ainsi dire pas grand chose à faire. Que voulez-vous, c'est aussi ça le jeu vidéo
                    en
                    2023.
                </div>

                <div>
                    Les règles sont simples : vous combattez les monstres un à un, chacun son tour. Le premier qui
                    atteint 0
                    PV a perdu. À cela se rajoutent plusieurs petites subtilités inspirées des plus grands jeux de rôle
                    telles que l'attaque (ATK), la défense (DEF) eet c'est pour l'instant à peu près tout.
                </div>

                <div>
                    Votre seule arme est une banane.
                </div>

                <div>
                    Bon chance.
                </div>

                <button @click="step++">Commencer</button>
            </div>

            <div v-else>
                <v-text-field label="Choisissez le nom de votre personnage (c'est parfaitement inutile)" v-model="heroName"></v-text-field>

                <button @click="$emit('start', heroName)">Commencer (mais cette fois pour de vrai)</button>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "WelcomeToTheArena",
    data: () => ({
        step: 1,
        heroName: null
    }),
})
</script>

<style lang="scss" scoped>

</style>
