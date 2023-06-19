import { ref, onMounted, onUnmounted } from "vue";

export function useReturnNicerNumber(number) {
    let formattedNumber;

    switch (true) {
        case number < 1000000:
            formattedNumber = new Intl.NumberFormat('fr-FR').format(Math.floor(number));

            break;
        case number < 1000000000:
            formattedNumber = new Intl.NumberFormat('fr-FR', {
                maximumFractionDigits: 3,
                minimumFractionDigits: 3
            }).format(Math.floor(number) / 1000000) + 'M';

            break;
        case number < 1000000000000:
            formattedNumber = new Intl.NumberFormat('fr-FR', {
                maximumFractionDigits: 3,
                minimumFractionDigits: 3
            }).format(Math.floor(number) / 1000000000) + 'B';

            break;
        case number < 1000000000000000:
            formattedNumber = new Intl.NumberFormat('fr-FR', {
                maximumFractionDigits: 3,
                minimumFractionDigits: 3
            }).format(Math.floor(number) / 1000000000000) + 'T';

            break;
        case number < 1000000000000000000:
            formattedNumber = new Intl.NumberFormat('fr-FR', {
                maximumFractionDigits: 3,
                minimumFractionDigits: 3
            }).format(Math.floor(number) / 1000000000000000) + 'Q';

            break;
        default:
            formattedNumber = new Intl.NumberFormat('fr-FR').format(Math.floor(number));

            break;
    }

    return formattedNumber;
}
