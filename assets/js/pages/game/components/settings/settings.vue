<template>
    <div>
        <div class="tw-text-white tw-mb-10">
            <div class="tw-text-5xl">Paramètres</div>

            <div>Sauvegarde</div>

            <div>
                <button @click="saveExport"
                        style="--animate-duration:0.1s;"
                        class="tw-flex tw-w-full tw-text-xl tw-rounded-2xl tw-relative tw-p-3 tw-cursor-pointer tw-shadow-lg disabled:tw-bg-opacity-50 hover:tw-brightness-110 disabled:tw-cursor-not-allowed tw-bg-green-dark"
                >
                    Exporter
                </button>
            </div>

            <div>
                <v-text-field label="Save file" :model-value="save"></v-text-field>

                <button @click="saveImport"
                        style="--animate-duration:0.1s;"
                        class="tw-flex tw-w-full tw-text-xl tw-rounded-2xl tw-relative tw-p-3 tw-cursor-pointer tw-shadow-lg disabled:tw-bg-opacity-50 hover:tw-brightness-110 disabled:tw-cursor-not-allowed tw-bg-green-dark"
                >
                    Importer
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "settings",
    data: () => ({
        save: ''
    }),
    methods: {
        saveExport() {
            const data = localStorage.getItem('saveFile');

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "data.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        saveImport() {
            const data = JSON.parse(this.save);

            localStorage.setItem('saveFile', data);
        }
    }
})
</script>

<style scoped>

</style>
