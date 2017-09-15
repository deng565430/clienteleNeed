<template>
  <div>
    <div class="project-list" v-if="!!projectList.length">
        <ul class="item">
          <li v-for="(item, index) in projectList">
            <div class="title">
              <p>需求单编号：<span> {{item.needsid}} </span></p>
              <p>共有<span> {{item.user_count == null ? '0' : item.user_count}} </span>人响应<span> {{item.project_count == null ? '0' : item.project_count}} </span>个项目</p>
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
              <p>响应项目名：<span>{{item.projects}}</span></p>
            </div>
            <div class="middle">
              <p>发布时间：<span>{{item.createtime}}</span></p>
            </div>
            <div class="bottom">
              <div v-if="item.isstop === 0">
                <a class="btn add" v-if="addProject !== ''" @click="goUrlPath(item.needsid, index)">{{addProject}}</a>
              </div>
              <div v-else>
                <a>已停止</a>
              </div>
              <div v-if="item.isstop === 0"><a class="btn"  v-if="selectBtn !== ''" @click="showPath(item.needsid)">{{selectBtn}}</a></div>

            </div>
          </li>
        </ul>
      </div>
      <div v-else class="no-project-list">
        <p>暂无项目</p>
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
        default: '未响应'
      }
    },
    data () {
      return {
        addProject: '',
        selectBtn: '',
        addProjectUrl: 1,
        selectBtnUrl: 1
      }
    },
    created () {
      setTimeout(() => {
        this.addProject = this.userId === 1 ? '去响应' : (this.userId === 2 ? '停止' : (this.userId === 0 ? '去响应' : ''))
        this.addProjectUrl = this.userId === 1 ? 2 : (this.userId === 2 ? '' : (this.userId === 0 ? 2 : ''))
        this.selectBtn = this.userId === 1 ? '' : (this.userId === 2 ? '' : (this.userId === 0 ? '' : ''))
        this.selectBtnUrl = this.userId === 1 ? 2 : (this.userId === 2 ? '' : (this.userId === 0 ? '' : ''))
      }, 20)
    },
    watch: {
      userShowEvent (newVal) {
        if (this.userId === 1) { // 源泽
          if (newVal === '未响应') {
            this.addProject = '去响应'
            this.addProjectUrl = 2
            this.selectBtn = ''
          } else if (newVal === '我的响应') {
            this.addProject = '追加响应'
            this.addProjectUrl = 3
            this.selectBtn = '查看响应'
            this.selectBtnUrl = 1
          } else if (newVal === '所有响应') {
            this.addProject = '追加响应'
            this.addProjectUrl = 3
            this.selectBtn = '查看响应'
            this.selectBtnUrl = 1
          }
        } else if (this.userId === 2) { // 经纪人
          if (newVal === '未响应') {
            this.addProject = '停止'
            this.selectBtn = ''
          } else if (newVal === '已响应') {
            this.addProject = '停止'
            this.selectBtn = '查看响应'
            this.selectBtnUrl = 1
          } else if (newVal === '已停止') {
            this.addProject = ''
            this.selectBtn = ''
          }
        } else {
          if (newVal === '未响应') { // 案场
            this.addProject = '去响应'
            this.addProjectUrl = 2
            this.selectBtn = ''
          } else if (newVal === '我的响应') {
            this.addProject = '追加响应'
            this.addProjectUrl = 3
            this.selectBtn = '查看响应'
            this.selectBtnUrl = 1
          }
        }
      }
    },
    methods: {
      goUrlPath (path, index) {
        if (this.addProject === '停止') {
          this.projectList[index].isstop = 1
          this.$emit('stop', {path, index})
          return
        }
        this.$router.push(`/demandetail/${path}/${this.addProjectUrl}`)
      },
      showPath (path) {
        this.$router.push(`/demandetail/${path}/${this.selectBtnUrl}`)
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
      .bottom
        text-align: right
        padding: 0 10px 10px
        height: 30px
        display: flex
        justify-content: flex-end
        >div:last-child
          margin-left: 5px
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
</style>
