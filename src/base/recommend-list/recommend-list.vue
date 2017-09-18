<template>
  <div>
<<<<<<< Updated upstream
    <div>
      <div class="project-list" v-if="!!projectList.length">
        <ul class="item">
          <li v-for="(item, index) in projectList">
            <div class="title">
              <p>需求单编号：<span> {{item.needsid}} </span></p>
              <p>共有<span> {{item.user_count == null ? '0' : item.user_count}} </span>人响应<span> {{item.project_count == null ? '0' : item.project_count}} </span>个项目</p>
=======
    <div class="project-list">
        <ul class="item">
          <li v-for="item in projectList">
            <div class="title">
              <p>需求单编号：<span> 001 </span></p>
              <p>共有<span> 5 </span>人响应<span> 8 </span>个项目</p>
>>>>>>> Stashed changes
            </div>
            <div class="top">
              <div>
                <p>地区</p>
<<<<<<< Updated upstream
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
              <a class="btn add" v-if="item.isstop === 0" @click="goUrlPath(item.needsid, index, item.addProjectUrl, item.addProject)" :class="item.addProject === '' ? 'noshow' : (item.isstop === 0 ? '' : 'noshow')">{{item.addProject}}</a>
              <a v-else class="stop">已停止</a>
              <a class="btn"  v-if="item.isstop === 0" @click="showPath(item.needsid, item.selectBtnUrl)" :class="item.selectBtn === '' ? 'noshow' : ''">{{item.selectBtn}}</a>
=======
                <p class="color">浦东新区</p>
              </div>
              <div>
                <p>面积</p>
                <p class="color">350平米</p>
              </div>
              <div>
                <p>预算</p>
                <p class="color">3-5万/平米</p>
              </div>
              <div>
                <p>物业类型</p>
                <p class="color">别墅</p>
              </div>
            </div>
            <div class="middle">
              <p>响应项目名：<span>东鼎名人府邸</span><span>东鼎名人府邸</span><span>东鼎名人府邸</span></p>
            </div>
            <div class="middle">
              <p>发布时间：<span>12/11 10:23</span></p>
            </div>
            <div class="bottom">
              <router-link tag="li" :to="`/demandetail/1/${addProjectUrl}`" class="btn add" :class="addProject === '' ? 'noshow' : ''">{{addProject}}</router-link>
              <router-link tag="li" :to="`/demandetail/1/${selectBtnUrl}`" class="btn"  :class="selectBtn === '' ? 'noshow' : ''">{{selectBtn}}</router-link>
>>>>>>> Stashed changes
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
        default: '未响应'
      }
    },
    data () {
      return {
<<<<<<< Updated upstream
        addProject: '',
        selectBtn: '',
        addProjectUrl: 1,
        selectBtnUrl: 1
=======
        addProject: this.userId === 1 ? '' : (this.userId === 2 ? '停止' : (this.userId === 3 ? '响应' : '')),
        selectBtn: this.userId === 1 ? '匹配项目' : (this.userId === 2 ? '' : (this.userId === 3 ? '' : '')),
        addProjectUrl: 1,
        selectBtnUrl: 1
      }
    },
    watch: {
      userShowEvent (newVal) {
        if (this.userId === 1) { // 源泽
          if (newVal === '未响应') {
            this.addProject = ''
            this.selectBtn = '去响应'
            this.selectBtnUrl = 2
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
>>>>>>> Stashed changes
      }
    },
    created () {},
    watch: {},
    methods: {
      goUrlPath (path, index, url, type) {
        if (type === '停止') {
          this.projectList[index].isstop = 1
          this.$emit('stop', {path, index})
          return
        }
        this.$router.push(`/demandetail/${path}/${url}`)
      },
      showPath (path, url) {
        this.$router.push(`/demandetail/${path}/${url}`)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
<<<<<<< Updated upstream
  .no-project-list
    p
      line-height: 40px
      text-align: center
=======
>>>>>>> Stashed changes
  .project-list
    .item
      margin-top: 10px
      >li
        background: #fff
        margin: 0 10px
        border-radius: 4px
        margin-bottom: 10px
<<<<<<< Updated upstream
        overflow: hidden
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        height: 30px
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        .stop
          line-height: 30px
          color: red
=======
>>>>>>> Stashed changes
</style>
