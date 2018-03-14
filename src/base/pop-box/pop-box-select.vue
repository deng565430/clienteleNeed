<template>
  <transition name="type-list">
    <div class="show-type-list" ref="showType" @click="hideEvent">
      <div class="container">
        <scroll :pullup="pullup" class="list" :data="typeList">
          <slot></slot>
        </scroll>
        <div class="pop-city-btn">
          <a @touchstart.prevent="selectTypeConfirm">确定选择</a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  export default {
    props: {
      pullup: {
        type: Boolean,
        default: true
      },
      showTypeList: {
        type: Boolean,
        default: true
      },
      typeList: {
        type: Array,
        default: []
      },
      posTop: {
        type: Number,
        default: 20
      }
    },
    created() {
      this.touch = {}
    },
    mounted() {
      this.$refs.showType.style.top = this.posTop + 'px'
    },
    components: {
      Scroll
    },
    methods: {
      hideEvent () {
        this.$emit('hidePopBox')
      },
      isShow() {
        this.$emit('showPopBox', this.showTypeList)
      },
      onShortcutTouchStart(e) {
        let firstTouch = e.touches[0]
        // 获取手指的位置
        this.touch.x1 = firstTouch.pageX
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.x2 = firstTouch.pageX
        if (Math.abs(this.touch.x1 - this.touch.x2) > 100) {
          this.$emit('showPopBox', this.showTypeList)
        }
        this.touch = {}
      },
      selectTypeConfirm() {
        this.$emit('selectTypeConfirm')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .show-type-list
    position: fixed
    bottom: 0
    top: 92px
    left: 0
    right: 0
    background: rgba(0, 0, 0, 0.3)
    z-index: 10000
    .container
      height: 200px
      background: #fff
      position: relative
      text-align: center
    .list
      position: fixed
      width: 100%
      height: 160px
      overflow: hidden
    .pop-city-btn
      position: absolute
      bottom: -15px
      left: 50%
      transform: translate(-50%, -50%)
      text-align: center
      background: $color-highlight-background
      a
        line-height: 35px
        display: inline-block
        background #13CE66
        color: white
        padding: 0 20px
        font-size: $font-size-medium
        border-radius: 6px
  .type-list-enter-active, .type-list-leave-active
    transition: all 0.3s
  .type-list-enter, .type-list-leave-to
    transform: translate3d(100%, 0, 0)
</style>
