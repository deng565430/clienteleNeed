<template>
  <div>
    <div class="project-list">
        <ul class="item">
          <li v-for="item in projectList">
            <div class="title">
              <p>需求单编号：<span> 001 </span></p>
              <p>共有<span> 5 </span>人响应<span> 8 </span>个项目</p>
            </div>
            <div class="top">
              <div>
                <p>地区</p>
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
            </div>
          </li>
        </ul>
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
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .project-list
    .item
      margin-top: 10px
      >li
        background: #fff
        margin: 0 10px
        border-radius: 4px
        margin-bottom: 10px
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
