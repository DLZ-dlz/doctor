<template>
  <div class="home"></div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

import { ref, reactive, computed, watch } from 'vue'

// 引入路由
const router = useRouter()
const route = useRoute()
</script>

<style lang="scss" scoped>
.home {
}
</style>
