import debounce from 'lodash.debounce'

// 用法：<button v-debounce="handler" /> 或 <button v-debounce="[handler,300]" />
export default {
  mounted(el, binding) {
    let handler
    let wait

    // 支持两种写法：v-debounce="fn" 或 v-debounce="[fn, wait]"
    if (Array.isArray(binding.value)) {
      [handler, wait] = binding.value
    }
    else {
      handler = binding.value
      wait = 300
    }

    const debounced = debounce(e => handler(e), wait)
    // 暴露给 unmounted 时移除
    el.__vueDebounce__ = debounced
    el.addEventListener('click', debounced)
  },

  unmounted(el) {
    el.removeEventListener('click', el.__vueDebounce__)
    delete el.__vueDebounce__
  },
}
