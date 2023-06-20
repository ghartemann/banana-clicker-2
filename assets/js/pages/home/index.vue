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

        <div class="tw-w-1/2 tw-text-white tw-text-center tw-flex tw-flex-col tw-items-center tw-gap-5 tw-p-5 tw-rounded-2xl animate__animated animate__bounceIn" id="content">
            <div>
                Après vos déboires dans la jungle et la faillite de votre entreprise capitaliste de production bananière
                porteuse de valeurs fortes telles que l'exploitation arboricole, minière, animale et humaine, vous
                décidez qu'après tout, zut, vous êtes loin d'avoir dit votre dernier mot. Ce qui demeure de votre
                petit coeur se flétrit sous le fardeau immense de votre avidité, avidité dont les limites sont d'évidence
                à peu près aussi matérielles que la morale au sein du système capitaliste ultralibéral que vous chérissez.
            </div>

            <div>
                Il vous faut du capital. Beaucoup, tout de suite et sans effort.
            </div>

            <div>
                Lancé·e que vous êtes dans la quête existencielle qu'est l'accumulation irréfléchie et infinie de richesse
                et peu aidé·e des enseignements que vous auriez pu tirer de vos erreurs passées (vous n'avez visiblement
                pas appris grand chose), vous décidez de vous lancer dans une nouvelle aventure : celle de la banane.
                Encore.
            </div>

            <div class="">
                Dans l'optique de le dire, ce dernier mot, vous faites l'acquisition d'une petite parcelle forestière en
                Amazonie équatorienne pour une bouchée de pain auprès du gouvernement local, en faites expulser les
                populations autochtones et entamez, lentement mais sûrement, votre capitalisation fruitière.
            </div>

            <div class="">
                Telles sont les prémices de votre aventure dans Banana Clicker 2, un univers relativement inoffensif,
                profondément inégalitaire et hautement rémunérateur. Soyez la ou le bienvenu·e au pays de la valeur, du
                capital et de la banane ; votre prodigieuse odyssée ne fait que commencer...
            </div>

<!--            <v-btn class="tw-text-lg tw-bg-yellow-dark tw-rounded-full tw-text-green-darker tw-w-fit" :to="{name: 'loading'}">-->
<!--                Assez lu, je veux des bananes-->
<!--            </v-btn>-->

            <div class="tw-text-2xl">{{timerValue}}</div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import moment from "moment";

export default defineComponent({
    name: "index",
    data: () => ({
        timerValue: 'Calcul du temps restant...',
        timerInterval: null,
    }),
    created() {
        this.startCountDown();
    },
    methods: {
        startCountDown() {
            clearInterval(this.timerInterval);

            let endAt = moment('2023-07-14 11:30:00');

            this.timerInterval = setInterval(() => {
                let timeLeft = moment.duration(endAt.diff(moment()));

                if (timeLeft.asSeconds() < 0) {
                    this.timerValue = "0:00:00";

                    return;
                }

                let string = '';

                if (timeLeft.asDays() >= 1) {
                    string += moment(timeLeft.asDays()) + ' jours, ';
                }

                if (timeLeft.asHours() >= 1) {
                    string += moment(timeLeft.hours()) + ' heures, ';
                }

                if (timeLeft.asMinutes() >= 1) {
                    string += moment(timeLeft.minutes()) + ' minutes, ';
                }

                string += moment(timeLeft.seconds()) + ' secondes';

                this.timerValue = string;
            }, 500);
        },
    }
})
</script>

<style lang="scss" scoped>
#content {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}
</style>
