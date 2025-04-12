import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExampleStore = defineStore('useExampleStore', () => {
  const example = ref(1)

  return { example }
}, { persist: true })
