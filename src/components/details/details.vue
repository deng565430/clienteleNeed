<template>
<div id="addProject">
  <div class="title">
    <my-title :title="'详情列表'"></my-title>
  </div>
  <div>
    <scroll ref="scroll" class="list">
      <div>
        <div>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
        </div>
      </div>
    </scroll>
  </div>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {

    }
  },
  components: {
    MyTitle,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #addProject
    font-size: $font-size-large
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 10000
    background: #eee
    font-size: $font-size-medium
    .title
      position: fixed
      z-index: 10002
      width: 100%
      text-align: center
      line-height: 40px
      font-size: $font-size-large-x
      color: white
      top: 0
    .list
      position: fixed
      top: 0
      bottom: 55px
      width: 100%
      padding-top: 50px
</style>