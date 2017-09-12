<template>
  <div id="app" @touchmove.prevent>
  	<transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.router-fade-enter-active, .router-fade-leave-active
	transition: opacity .3s
.router-fade-enter, .router-fade-leave-active
	opacity: 0
</style>
