<script setup lang="ts">
import moduleObj from '@/stores'
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
  <van-tabbar route>
    <van-tabbar-item replace to="/home">
      <template #icon>
        <SvgIcon
          name="shouye"
          color="#e5eeed"
          width="50px"
          height="50px"
        ></SvgIcon>
        <p>首页</p>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">
      <template #icon>
        <SvgIcon
          name="baike"
          color="#e5eeed"
          width="50px"
          height="50px"
        ></SvgIcon>
        <p>健康百科</p>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">
      <template #icon>
        <SvgIcon
          name="xiaoxi"
          color="#e5eeed"
          width="50px"
          height="50px"
        ></SvgIcon>
        <p>消息通知</p>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">
      <template #icon>
        <SvgIcon
          name="shouye"
          color="#e5eeed"
          width="50px"
          height="50px"
        ></SvgIcon>
        <p>我的</p>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.van-tabbar {
  .van-tabbar-item {
    text-align: center;
    p {
      font-size: 0.4rem;
    }
  }
}
</style>
