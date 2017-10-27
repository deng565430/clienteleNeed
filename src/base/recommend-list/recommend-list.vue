<template>
  <div>
    <div>
      <div class="project-list" v-if="!!projectList.length">
        <ul class="item">
          <li v-for="(item, index) in projectList" @click="checkNeed(item.needsid)" :style="item.flag ? bgImg : ''">
            <div class="title">
              <p v-if="!item.needs_name">编号：<span> {{item.needsid}} </span></p>
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
                <p class="color">{{item.area}}平米</p>
              </div>
              <div>
                <p>预算</p>
                <p class="color">{{item.price}}万元</p>
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
              <p>发布时间：<span>{{item.createtime}}</span></p>
            </div>
            <div class="middle-cent" v-if="userId === 1">
              <p>发布人：<span>{{item.username}}</span></p>
              <p @click.stop="callPhone(item.phone)">电话：<a>{{item.phone}}</a></p>
            </div>
            <div class="bottom">
              <a class="btn add" v-if="item.isstop === 0" @click.stop="goUrlPath(item.needsid, index, item.addProjectUrl, item.addProject)" :class="item.addProject === '' ? 'noshow' : (item.isstop === 0 ? '' : 'noshow')">{{item.addProject}}</a>
              <a v-else class="stop">已停止推荐</a>
              <a class="btn"  v-if="item.isstop === 0" @click.stop="showPath(item.needsid, item.selectBtnUrl)" :class="item.selectBtn === '' ? 'noshow' : ''">{{item.selectBtn}}</a>
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

<script type="text/ecmascript-6">
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
        addProject: '',
        selectBtn: '',
        addProjectUrl: 1,
        selectBtnUrl: 1,
        bgImg: {
          background: `#fff url(${require('common/image/yituijian.png')}) no-repeat 90% 54%`,
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
        this.$router.push(`/demandetail/${path}/${url}`)
      },
      callPhone (phone) {
        window.location.href = `tel:${phone}`
      },
      checkNeed (id) {
        this.$router.push(`/addProject/${id}`)
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
        box-shadow: 3px 3px 10px #999
      .title
        padding: 0 10px
        background: #dcdcdc
        line-height: 30px
        height: 30px
        box-sizing: border-box
        display: flex
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
        text-align: right
        padding: 0 10px 10px
        height: 30px
        .btn
          display: inline-block
          text-align: center
          line-height: 36px
          width: 80px
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
