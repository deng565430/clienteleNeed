<template>
  <transition name="modal-fade">
    <div class="modal" v-show="showFlag" @click.stop>
      <div class="modal-wrapper">
        <div class="modal-content">
          <div class="title">
            <span class="cancel"  @click="cancel">X</span>
            <p>{{title}}</p>
          </div>
          <p class="text">
            <slot></slot>
          </p>
          <div class="operate">
            <div @click="modal" class="operate-btn">{{modalBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      text: {
        type: String,
        default: ''
      },
      flag: {
        type: Boolean,
        default: true
      },
      modalBtnText: {
        type: String,
        default: '确认'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      refresh: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      modal() {
        this.$emit('modal')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .modal
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 999999
    background-color: $color-background-d
    &.modal-fade-enter-active
      animation: modal-fadein 0.3s
      .modal-content
        animation: modal-zoom 0.3s
    .modal-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .modal-content
        width: 350px
        border-radius: 13px
        background: $color-highlight-background
        .title
          text-align: center
          font-size: $font-size-title
          color: #fe813b
          line-height: 2
          border-bottom: 1px solid #ccc
          .cancel
            position: absolute
            right: 10px
            color: #979797
        .text
          padding: 19px 5px
          line-height: 22px
          text-align: center
          font-size: $font-size-large
          color: $color-text-l
        .operate
          overflow: hidden
          text-align: center
          font-size: $font-size-large
          padding: 25px
          .operate-btn
            float: right
            line-height: 22px
            padding: 10px 0
            width: 100px
            background: #fe5c00
            border-radius: 4px
            color: white
            &.left
              border-right: 1px solid $color-background-d

  @keyframes modal-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes modal-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
