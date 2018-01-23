<template>
  <div class="look-project">
    <div class="title">
      <my-title :title="'客源详情'"></my-title>
    </div>
    <scroll ref="scroll" class="list" :beforeScroll="true" :data="msg">
      <div class="context">
        <div class="top">
          <p class="left">购买倾向:</p>
          <p class="center"><span>一手</span></p>
          <p class="right">{{needsid}}</p>
        </div>
        <div class="middle">
          <p class="needs-name" v-if="needName">
            {{needName}}
          </p>
          <div class="middle-t">
            <div>
              <p>区域</p>
              <p>{{`${city}${district ? '-' + district: ''}`}}</p>
            </div>
            <div>
              <p>总价</p>
              <p>{{price}}万</p>
            </div>
            <div>
              <p>面积</p>
              <p>{{startArea}}-{{endArea}}平</p>
            </div>
          </div>
          <div class="middle-m">
            <p>户型：<span>{{room}}</span></p>
            <p>用途：<span>{{type}}</span></p>
            <p>装修：<span>{{decoration}}</span></p>
          </div>
          <div class="middle-m">
            <p>楼层：<span>{{floor}}</span></p>
            <p>首付：<span>{{scale}}</span></p>
          </div>
          <div class="middle-m">
            <p>社保：<span>{{ensure}}</span></p>
            <p>户籍：<span>{{census}}</span></p>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-t">
            <p>备注</p>
            <p>{{msg}}</p>
          </div>
          <div class="bottom-b">
            <p>发布于：<span>{{createtime}}</span></p>
            <p></p>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import { getProject } from 'api/lookProjectDetail'
import { timeFormat } from 'common/js/util'
export default {
  data () {
    return {
      id: this.$route.params.id,
      province: '',
      city: '',
      district: '',
      startArea: '',
      endArea: '',
      price: '',
      type: '',
      scale: '',
      room: '',
      hall: '',
      census: '',
      floor: '',
      ensure: '',
      decoration: '',
      msg: '',
      createtime: '',
      username: '',
      needName: null,
      needsid: ''
    }
  },
  created () {
    this._getProject()
  },
  methods: {
    _getProject () {
      getProject(this.id).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          if (res.data.data == null) {
            this.confirmText = '参数错误'
            this.$refs.confirm.show()
            return
          }
          this.province = res.data.data.prov
          this.city = res.data.data.city ? res.data.data.city : ''
          this.district = res.data.data.district ? res.data.data.district : ''
          this.startArea = res.data.data.start_area
          this.endArea = res.data.data.end_area
          this.price = res.data.data.price
          this.type = res.data.data.type
          this.scale = res.data.data.scale || '(未填)'
          this.room = res.data.data.room || '(未填)'
          this.hall = res.data.data.hall || '(未填)'
          this.census = res.data.data.census || '(未填)'
          this.floor = res.data.data.floor || '(未填)'
          this.ensure = res.data.data.ensure || '(未填)'
          this.decoration = res.data.data.decoration || '(未填)'
          this.msg = res.data.data.msg
          this.needName = res.data.data.needs_name || null
          this.createtime = timeFormat('yyyy-MM-dd', new Date(res.data.data.createtime))
          this.username = res.data.data.username
          this.needsid = res.data.data.needsid.substring(15)
        }
      })
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
.look-project
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
    .context
      .top
        padding: 15px 10px 5px 10px
        display: flex
        margin-bottom: 10px
        color: #a7a7a7
        .left
          width: 20%
        .center
          width: 20%
          span
            background: #f77428
            color: #ffffff
            padding: 3px 15px
        .right
          width: 60%
          text-align: right
      .middle
        background: #fff
        p
          color: #a7a7a7
      .needs-name
        text-align: center
        line-height: 40px
      .middle-t
        display:flex
        padding: 10px 0
        border-top: 1px solid #ccc
        >div
          width: 33%
          border-right: 1px solid #ccc
          text-align: center
          line-height: 25px
          &:last-child
            border-right: none
          p
            color: #6c6c6c
            &:last-child
              color: #f77428
      .middle-m
        display:flex
        border-top: 1px solid #ccc
        padding: 0 10px
        p
          width: 33%
          line-height: 50px
          span
            color: #6c6c6c
      .bottom-t, .bottom-b
        margin: 10px 0
        padding: 10px 10px
        background: #fff
        p:first-child
          line-height: 35px
        p:last-child
          text-indent: 1em
          line-height: 17px
          color: #a7a7a7
      .bottom-b
        display: flex
        p
          width: 50%
          color: #a7a7a7
          &:last-child
            line-height: 35px
            text-align: right
          span
            color: #6c6c6c
</style>
