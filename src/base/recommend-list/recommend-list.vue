<template>
  <div>
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
              <a class="btn add" v-if="item.isstop === 0" @click="goUrlPath(item.needsid, index, item.addProjectUrl, item.addProject)" :class="item.addProject === '' ? 'noshow' : (item.isstop === 0 ? '' : 'noshow')">{{item.addProject}}</a>
              <a v-else class="stop">已停止</a>
              <a class="btn"  v-if="item.isstop === 0" @click="showPath(item.needsid, item.selectBtnUrl)" :class="item.selectBtn === '' ? 'noshow' : ''">{{item.selectBtn}}</a>
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
        addProject: '',
        selectBtn: '',
        addProjectUrl: 1,
        selectBtnUrl: 1
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
