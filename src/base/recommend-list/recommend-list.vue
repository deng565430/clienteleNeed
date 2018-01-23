<template>
  <div>
    <div>
      <div class="project-list" v-if="!!projectList.length">
        <ul class="item">
          <li :key="index" v-for="(item, index) in projectList" @click="checkNeed(item.needsid, item.ismy)" :style="item.flag ? bgImg : ''">
            <div class="title">
              <img v-if="item.ismy" :src="isMy" class="is-my-img" alt="">
              <p v-if="!item.needs_name">编号：<span> {{item.needsid.substring(15)}} </span></p>
              <p v-else>需求名称：<span> {{item.needs_name}} </span></p>
              <p>共有<span> {{item.user_count == null ? '0' : item.user_count}} </span>人推荐<span> {{item.project_count == null ? '0' : item.project_count}} </span>个项目</p>
            </div>
            <div class="top">
              <div>
                <p>地区</p>
                <p class="color">{{item.city}}</p>
              </div>
              <div>
                <p>面积</p>
                <p class="color">{{item.area}}平</p>
              </div>
              <div>
                <p>预算</p>
                <p class="color">{{item.price}}万</p>
              </div>
              <div>
                <p>物业类型</p>
                <p class="color">{{item.type}}</p>
              </div>
            </div>
            <div class="middle" v-if="item.projects">
              <p>推荐项目名：<span>{{item.projects}}</span></p>
            </div>
            <div class="middle">
              <p>发布时间：<span>{{timeFormat(new Date(item.createtime))}}</span></p>
            </div>
            <div class="middle-cent" v-if="userId === 1">
              <p>发布人：<span>{{item.username}}</span> <span> {{ item.manager}}</span></p>
              <p @click.stop="callPhone(item.phone)">电话：<a>{{item.phone}}</a></p>
            </div>
            <div class='bottom'>
              <div class="bottom-left">
                <p v-if="item.isstop===0&&!item.projects">努力推荐中...</p>
              </div>
              <div class="bottom-right">

                <a class="btn add" v-if="item.isstop === 0" @click.stop="goUrlPath(item.needsid, index, item.addProjectUrl, item.addProject)" :class="item.addProject === '' ? 'noshow' : (item.isstop === 0 ? '' : 'noshow')">{{item.addProject}}</a>
                <a v-else class="stop">已停止推荐</a>
                <a class="btn"  v-if="item.isstop === 0" @click.stop="showPath(item.needsid, item.selectBtnUrl)" :class="item.selectBtn === '' ? 'noshow' : ''">{{item.selectBtn}}</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="no-project-list">
        <p>暂无项目</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { timeFormat } from 'common/js/util.js'
  import TYPE from 'common/js/buryingpointType'
  import { addLog } from 'api/buryingpoint'
  export default {
    props: {
      projectList: {
        type: Array,
        default: []
      },
      userId: {
        type: Number,
        default: 2
      },
      userShowEvent: {
        type: String,
        default: '未推荐'
      }
    },
    data () {
      return {
        timeFormat: timeFormat,
        addProject: '',
        selectBtn: '',
        addProjectUrl: 1,
        selectBtnUrl: 1,
        isMy: require('common/image/ismy.png'),
        bgImg: {
          background: `url(${require('common/image/yituijian.png')}) no-repeat 90% 54%`,
          backgroundSize: '85px'
        }
      }
    },
    created () {},
    watch: {},
    methods: {
      goUrlPath (path, index, url, type) {
        if (type === '停止推荐') {
          this.$emit('stop', {path, index})
          return
        }
        this.$router.push(`/demandetail/${path}/${url}`)
      },
      showPath (path, url) {
        addLog(TYPE.BACKPAGE, '', TYPE.CHAKANTUIJIANBTN, TYPE.XIANGQINGPAGE, window.USERMSG)
        this.$router.push(`/demandetail/${path}/${url}`)
      },
      callPhone (phone) {
        window.location.href = `tel:${phone}`
      },
      checkNeed (id, ismy) {
        // 判断是不是我的项目
        /* if (this.userId === 2) {
          if (!ismy) {
            this.$emit('notMy')
            return
          }
        } */
        addLog(TYPE.BACKPAGE, '', TYPE.XIANGQINGBTN, TYPE.TUIJIANLISTPAGE, window.USERMSG)
        this.$router.push(`/lookProject/${id}`)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .no-project-list
    p
      line-height: 40px
      text-align: center
  .project-list
    .item
      margin-top: 10px
      >li
        background: #fff
        margin: 0 10px
        border-radius: 4px
        margin-bottom: 10px
        overflow: hidden
      .title
        padding: 0 15px
        background: #d7d7d7
        line-height: 40px
        height: 40px
        box-sizing: border-box
        display: flex
        .is-my-img
          position: absolute
          left: 8px
          width: 40px
        p
          text-align: left
          width: 50%
          no-wrap()
          &:last-child
            width: 50%
            text-align: right
          span
            color: #e5672c
      .top
        display: flex
        >div
          width: 25%
          text-align: center
          padding: 10px 0
          border-bottom: 1px solid #eee
          p
            line-height: 30px
            no-wrap()
          .color
            color: #e5672c
      .middle
        margin: 10px 0
        border-bottom: 1px solid #f4f1f4
        p
          padding: 0 10px
          box-sizing: border-box
          height: 25px
          no-wrap()
          span
            color: #acacac
            box-sizing: border-box
            margin-right: 5px
            text-decoration:underline
      .middle-cent
        margin: 10px 0
        border-bottom: 1px solid #f4f1f4
        display: flex
        p
          width: 50%
          padding: 0 10px
          box-sizing: border-box
          height: 25px
          no-wrap()
          extend-click()
          span
            color: #acacac
            box-sizing: border-box
            margin-right: 5px
            text-decoration:underline
      .bottom
        display:flex
        div
          width: 50%
      .bottom-left
        line-height: 35px
        padding-left: 10px
        p
          color: red
      .bottom-right
        text-align: right
        padding: 0 10px 10px
        .btn
          display: inline-block
          text-align: center
          line-height: 36px
          width: 74px
          height: 35px
          border-radius: 4px
          color: #e5672c
          border: 1px solid #e5672c
        .add
          background: #e5672c
          color: #fff
        .noshow
          display: none
        .stop
          line-height: 30px
          color: red
</style>
