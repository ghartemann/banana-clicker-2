<template>
    <div class="tw-max-w-full tw-m-auto tw-flex tw-flex-col tw-justify-center tw-items-center">
        <div class="tw-flex tw-justify-center tw-gap-5">
            <h1 class="tw-text-6xl tw-text-center tw-py-10 tw-text-green-dark tw-font-medium">
                Banana Clicker
            </h1>

            <h1 class="tw-text-6xl tw-text-center tw-py-10 tw-text-yellow-dark tw-font-bold animate__animated tw-animate-wiggle-more animate__infinite">
                2
            </h1>
        </div>

        <div class="tw-w-1/2 tw-text-white tw-text-center tw-flex tw-flex-col tw-items-center tw-gap-5 tw-p-5 tw-rounded-2xl"
            id="test">
            <v-progress-linear v-model="progress" color="tw-green-darker" height="10" rounded></v-progress-linear>
            <div>Chargement...</div>

            <div>
                <div class="tw-font-bold">
                    Fun facts :
                </div>

                <div v-if="progress < 25" class="">
                    Le mot « banane » est dérivé du portugais, lui-même emprunté au bantou de Guinée, dans l’expression
                    en portugais rapportée en 1602 « Figueira Banana » (« figuier portant bananes »). Elle est appelée «
                    figue », en créole, à La Réunion et aux Antilles.

                    Les formes sauvages Musa acuminata et Musa balbisiana qui donnent les bananes actuelles se
                    rencontrent encore aujourd’hui dans une grande partie du Sud-Est asiatique, de l’Inde à la
                    Papouasie-Nouvelle-Guinée. On retrouve dans ces régions des bananiers sauvages riches en graines et
                    pauvres en pulpe dans les milieux ouverts (clairières, lisières des forêts)6.

                    Le centre de domestication primaire semble être les hautes terres de Papouasie-Nouvelle-Guinée, il y
                    a 6 950 à 6 440 ans avec M. acuminata. Des traces de production bananière pour une consommation
                    humaine datant d'environ de cette époque7 en Nouvelle-Guinée. Leur diffusion s'est rapidement
                    étendue dans une zone qui va de l'Inde au sud de la Chine via la Birmanie, de Taïwan jusqu'au nord
                    de l'Australie et la Polynésie via les Philippines, l'Indonésie et la Nouvelle-Guinée. Des preuves
                    archéologiques de la culture du bananier se trouvent en Malaisie en 3 000 avant notre ère, au
                    Pakistan en 2 500 avant notre ère, dans le centre de l’Inde 600 ans avant notre ère et au Laos 500
                    ans avant notre ère. La diffusion en Afrique des plantains AAB daterait de 4 500 ans avant notre ère
                    en Ouganda et de 2 750 à 2 300 au Cameroun. À l'Île de Pâques son introduction daterait de 1 200 de
                    notre ère. La première apparition au Moyen-Orient date de 300 de notre ère.
                </div>

                <div v-if="progress >= 25 && progress < 50" class="animate__animated animate__slideInRight">
                    Pas le temps de lire les fun facts ? Rechargez cette page jusqu'à arriver au bout !
                </div>

                <div v-if="progress >= 50" class="animate__animated animate__slideInRight">
                    Ce chargement n'a aucune raison d'être, l'appli n'utilise ni API ni BDD et ne récupère aucune donnée
                    d'aucune sorte d'aucun endroit. Il n'est là que pour créer une sorte d'effet dramatique à deux
                    balles mais, vous en conviendrez peut-être, <span class="tw-text-yellow-dark">ça fait pro</span>.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: "index",
    data: () => ({
        progress: 0
    }),
    created() {
        this.load()
    },
    methods: {
        load() {
            setInterval(() => {
                if (this.progress < 100) {
                    this.progress += 1
                }
                }, 150);
        }
    },
    watch: {
        progress() {
            if (this.progress === 100) {
                this.$router.push({name: 'game'});
            }
        }
    }
})
</script>

<style lang="scss" scoped>
#test {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}
</style>
