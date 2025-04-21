<script setup>
import { useExampleStore } from '@/store'
import { ref } from 'vue'

const exampleStore = useExampleStore()

const techStack = ref([
  'Vite',
  'Vue3',
  'Vitest',
  'Vuetify',
  'UnoCSS',
  'Eslint',
  'Pinia',
])

const techColors = {
  Vite: 'green',
  Vue3: 'cyan',
  Vitest: 'orange',
  Vuetify: 'blue',
  UnoCSS: 'purple',
  Eslint: 'red',
  Pinia: 'teal',
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Frontend Starter</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center" class="fill-height">
          <v-col cols="12" sm="8" md="6" class="text-center">
            <h1>
              Frontend Starter
              <v-btn
                v-debounce="() => console.log('clicked')"
                class="m-0"
                color="blue-lighten-2"
                icon="mdi-thumb-up"
                variant="text"
              />
            </h1>
            <v-row dense align="center" justify="center" class="mb-2">
              <v-col
                v-for="(tech, index) in techStack"
                :key="index"
                cols="auto"
                class="d-flex justify-center"
              >
                <v-chip :color="techColors[tech]" text-color="white" outlined>
                  {{ tech }}
                </v-chip>
              </v-col>
            </v-row>
            <span>{{ exampleStore }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-col class="text-center white--text" cols="12">
        &copy; 2025 Henry Ge
      </v-col>
    </v-footer>
  </v-app>
</template>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px - 64px);
}
</style>
