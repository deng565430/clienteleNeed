<template>
<div id="demandetail">
  <div class="title">
    <my-title :title="'详情页'"></my-title>
    <selectList @getSelectData="getSelectData"></selectList>
  </div>
  <div class="scrolls">
    <scroll
    ref="scroll"
    class="list"
    :data="scrolldata"
    :pullup="pullup"
    @scrollToEnd="scrollToEnd">
      <div>
        <div class="demand">
          <div class="titles"><span class="icon"></span>需求：</div>
          <div class="dcontent">
            <span class="tags" v-if="needs.prov">{{needs.prov}}</span>
            <span class="tags" v-if="needs.city">{{needs.city}}</span>
            <span class="tags" v-if="needs.district">{{needs.district}}</span>
            <span class="tags" v-if="needs.clientcount">客户数量{{needs.clientcount}}人</span>
            <span class="tags" v-if="needs.start_area">{{needs.start_area}}-{{needs.end_area}}㎡</span>
            <span class="tags" v-if="needs.price">总价{{needs.price}}万元</span>
            <span class="tags" v-if="needs.type">{{needs.type}}</span>
            <span class="tags" v-if="needs.scale">首付{{needs.scale}}万元</span>
            <span class="tags"> <span  v-if="needs.room">{{needs.room}}室</span><span v-if="needs.hall">{{needs.hall}}厅</span></span>
            <span class="tags" v-if="needs.census">{{needs.census}}</span>
            <span class="tags" v-if="needs.floor">楼层要求：{{needs.floor}}</span>
            <span class="tags" v-if="needs.ensure">{{needs.ensure}}</span>
            <span class="tags" v-if="needs.decoration">{{needs.decoration}}</span>
          </div>
        </div>
        <div class="demand bezhu">
          <div class="titles">备注信息：</div>
          <div class="dcontent">
            {{needs.msg}}
          </div>
        </div>
        <h2><span class="icon"></span>推荐楼盘</h2>
        <div  class="lists"  v-for="(item, index) in scrolldata" >
          <div class="listTitle">
            <div>{{item.title}}</div>
            <div v-if="estate != 1">
              <input type="checkbox" class="checkbos" ref="checkboxs" :disabled="item.belong" :id="item.id" v-model="item.state"  @change="alocked(item, index)"/>
            </div>
          </div>
          <img height="150" width="100%"  v-lazy="'http://sofmanager.fangsir007.com/image/' + item.img"  @click="details(item.id)"/>
          <div class="listfoot" v-if="!item.username">
            <div class="left">
              <div class="leftt lefttop">
                <span v-if="item.area">{{item.area}}</span>
                <span v-if="item.price">{{item.price}}万</span>
                <span v-if="item.type"> | {{item.type}}</span>
              </div>
              <div class="leftt">佣金{{item.yongjin}} (个人到手税前佣金)</div>
            </div>
            <div class="right">
              <div class="rightbtn" :id="item.id" @click="baobei(item.id)">快速报备</div>
            </div>
          </div>
          <div class="phone" v-if="item.username">
            <div class="pleft">推荐人：<span>{{item.username}}</span></div>
            <div class="pright">电话：<a :href="'tel:' + item.phone">{{item.phone}}</a></div>
          </div>
        </div>

       <div v-if="lodaingicon">
         <Loading></Loading>
       </div>
       <div v-if="results" class="bottoms">
         {{resultMsg}}
       </div>
      </div>
    </scroll>
     <div class="submit" v-if="estate != 1">
      <div class="submits"  @click="submit">提交</div>
    </div>
    <div >
      <Confirm :text="text" ref="confirm"></Confirm>
    </div>
  </div>

</div>
</template>

<script>
import {getlist, addResponse} from 'api/demandetail' /* , addResponse */
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Confirm from 'base/confirm/confirm'
import SelectList from 'base/selectList/selectList'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
export default {
  data () {
    return {
      scrolldata: [],
      ids: [],
      msg: '',
      needs: '',
      resultMsg: '暂无查询结果',
      stas: 0,
      id: this.$route.params.id,
      estate: this.$route.params.status,
      pullup: true,
      pagenum: 0,
      lodaingicon: true,
      bottoms: false,
      results: false,
      text: '',
      confirms: false,
      checkednum: [],
      needsData: {
        needsId: this.$route.params.id,
        status: this.$route.params.status,
        start: 0,
        length: 10
      }
    }
  },
  components: {
    MyTitle,
    Scroll,
    Loading,
    Confirm,
    SelectList
  },
  watch: {
    $route () {
      if (this.$route.params.status) {
        this.estate = this.$route.params.status
        this._getlist()
      }
    }
  },
  created () {
    this._getlist()
  },
  mounted () {
  },
  methods: {
    // 获取筛选条件
    getSelectData(data) {
      this.needsData.start = 0
      this.needsData = Object.assign(this.needsData, data)
      this.results = false
      this.scrolldata = []
      this._getlist(data)
    },
    _getlist () {
      var that = this
      getlist(this.needsData).then((res) => {
        if (res.data.code === 0) {
          that.lodaingicon = false
          if (res.data.data) {
            that.scrolldata = that.scrolldata.concat(res.data.data.list)
            that.needs = res.data.data.needs
          } else {
            if (that.needsData.start === 0) {
              that.resultMsg = '暂无查询结果'
            } else {
              that.resultMsg = '已经到底部啦~'
            }
            that.results = true
            that.pullup = false
          }
        } else {
          that.lodaingicon = false
          this.text = '用户未登录'
          this.$refs.confirm.showFlag = true
        }
      }).catch(() => {
        this.text = '服务出错'
        this.$refs.confirm.showFlag = true
      })
    },
    alocked (item, index) {
      console.log(item.state)
      if (item.state) {
        this.ids.push(item.id)
        this.checkednum.push(index)
      } else {
        this.ids.forEach((i, index) => {
          if (i === item.id) {
            this.ids.splice(index, 1)
            this.checkednum.splice(index, 1)
          }
        })
      }
      console.log(this.ids)
    },
    submit () {
      console.log(this.checkednum)
      console.log(this.$refs)
      this.checkednum.forEach((i) => {
        this.$refs.checkboxs[i].disabled = true
        console.log(this.$refs.checkboxs[i].disabled)
      })
      if (this.ids.length === 0) {
        this.text = '未选择项目'
        this.$refs.confirm.showFlag = true
      } else {
        addResponse(this.id, this.ids, this.estate).then((res) => {
          console.log(this.id, this.ids, this.estate)
          if (res.data.code === 0) {
            this.text = '添加成功'
            this.$refs.confirm.showFlag = true
            this.checkednum.forEach((i) => {
              console.log(i)
              this.scrolldata[i].belong = true
              // this.$refs.checkboxs[i].disabled = true
            })
          } else {
            this.text = '添加失败'
            this.$refs.confirm.showFlag = true
          }
        }).catch(() => {
          this.text = '服务出错'
          this.$refs.confirm.showFlag = true
        })
      }
    },
    baobei (val) {
      addLog(TYPE.TUIJIANXIANGQINGPAGE, '', TYPE.TUIJIANBTN, TYPE.BAOBEIPAGE, window.USERMSG)
      window.location.href = '/recommend?id=' + val
    },
    details (val) {
      window.location.href = '/detail?id=' + val
    },
    scrollToEnd () {
      if (this.results) {
        return
      }
      this.lodaingicon = true
      this.needsData.start++
      this._getlist()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #demandetail
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
    .submit
      display:flex
      justify-content: center
      position: fixed
      bottom: 0
      left: 0
      height: 60px
      width: 100%
      background: #eee
      z-index: 111
      display: flex
      align-items: center
      .submits
        width: 92%
        color: #fff
        height: 38px
        line-height: 38px
        background: #e5672c
        border-radius: 3px
        text-align: center
    .scrolls
      margin-top: 10px
      height: 50px
      line-height: 50px
      background: #fff
      font-size: 18px
      color: rgba(243,107,67,0.8)
      h2
        padding: 0 10px
        background: #fff
        .icon
          display:inline-block
          width:16px
          height:20px
          background: url('./../../common/image/bk_07.png')no-repeat center center
          background-size:100% 100%
          margin-right: 12px
          vertical-align: middle
      .list
        position: fixed
        top: 40px
        bottom: 105px
        width: 100%
        padding-top: 0
        .demand
          margin-top: 50px
          line-height:25px
          display: flex
          background: #fff
          padding: 10px 0
          border-bottom: 1px solid #d4d3d2
          .dcontent
            padding-right:12px
            flex: 2.7
            font-size: 16px
            color: rgba(243,107,67,0.8)
            align-items: center
            .tags
              margin-right: 5px
          .titles
            flex: 1
            display: flex
            justify-content: center
            align-items: center
            font-size: 16px
            color: rgba(243,107,67,0.8)
            .icon
              display:inline-block
              width:16px
              height:16px
              background: url('./../../common/image/bk_03.png')no-repeat center center
              background-size:100% 100%
              margin-right: 12px
              vertical-align: middle

        .bezhu
          margin-top: 0
          margin-bottom: 10px
          line-height:25px
          display: flex
          background: #fff
          padding: 10px 0
          border-bottom: 1px solid #d4d3d2
        .bottoms
          text-align:center
          line-height: 30px
          font-size: $font-size-small
          color: $color-text-l
        .lists
          background: #fff
          padding: 0 10px 10px 10px
          margin-bottom: 10px
          .listTitle
            display: flex
            color: #333333
            justify-content:space-between
            .checkbos
              display: inline-block
              width: 18px
              height: 18px
              border-radius: 3px
              border: 1px solid #aaaaaa
          .phone
            display: flex
            font-size: 16px
            justify-content:space-between
            a
             color:#ef7a00
          .listfoot
            display: flex
            font-size: 14px
            .left
              flex: 3.9
              overflow: hidden
              padding-right:12px
              .leftt
                line-height: 20px
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
              .lefttop
                color: #999999
            .right
              flex: 1
              display: flex
              align-items: center;
              .rightbtn
                height: 26px
                line-height: 26px
                text-align:center
                width: 100%
                background: #ef7a00
                border-radius: 3px
                color: #fff
</style>
