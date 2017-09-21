<template>
<div id="componentList">
<div>
    <confirm ref="confirm" :text="confirmText"></confirm>
  </div>
  <div class="title">
    <my-title :title="'需求列表'" class="title-top"></my-title>
    <div ref="itemSelectTitle" class="title-all-sclect">
      <ul class="item-list-show xiangying-top">
        <li v-for="(item, index) in itemTop" :key="index" :class="itemTopActive === index ? 'top-active' : ''" @click="selectTop(item, index)">{{item}}</li>
      </ul>
      <ul class="item-list-show xiangying-center">
        <li v-for="(item,index) in itemTopText" :key="index">
          <p>{{item.name}}</p>
          <p>{{item.count}}</p>
        </li>
      </ul>
      <div class="item-center">
        <ul>
          <li :class="itemCenterActive === index ? 'active': ''" @click="itemActive(i, index)" v-for="(i, index) in itemCenter">{{i.type}}</li>
        </ul>
        <span ref="itemCenterActiveSpan"></span>
      </div>
      <div class="item-bottom">
          <ul>
            <li v-for="(item, index) in itemSelectType" :class="itemSelectTypeActive === index ? 'active' : ''" @click="selectTypeList(item, index)"><span>{{item.type}}</span> <i :class="[itemSelectTypeActive === index ? 'icon-back-down': 'icon-back-up']"></i></li>
          </ul>
      </div>
    </div>
  </div>
  <div class="top">
    <pop-box class="provincelist" ref="provincelists" v-if="showCitysList" :typeList="provincelist" @showPopBox="showCityList">
          <div class="pop-city-list" ref="cityList">
             <div  @click.stop.prevent>
               <div class="pop-city-child">
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" v-if="provincelist.length" :data="provincelist">
                        <ul>
                          <li v-for="(item, index) in provincelist" :class="[provinceActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectProvince(item, index)">{{item.name}}</li>
                        </ul>
                      </scroll>
                    </div>
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" v-if="childCitylist.length" :data="childCitylist">
                        <ul ref="citys">
                          <li v-for="(item, index) in childCitylist" :class="[cityActive === item ? 'cityActive': '']" @touchstart.prevent="selectCity(item, index)">{{item}}</li>
                        </ul>
                      </scroll>
                      <div v-else>
                        <loading v-show="childCitylistHasMore" title=""></loading>
                        <div v-show="!childCitylistHasMore" class="no-result-wrapper">
                          <p style="color: #999;line-height: 30px; text-align: center;">{{childCitylistHasMoreTxt}}</p>
                        </div>
                      </div>
                    </div>
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" ref="scrollCity" v-if="districtList.length" :data="districtList">
                        <ul ref="district">
                          <li ref="districtList" v-for="(item, index) in districtList" :class="[districtlistActive === item ? 'cityActive': '']" @touchstart.prevent="selectdistrictlist(item, index)">{{item}}</li>
                        </ul>
                      </scroll>
                      <div v-else>
                        <loading v-show="districtListHasMore" title=""></loading>
                        <div v-show="!districtListHasMore" class="no-result-wrapper">
                          <p style="color: #999;line-height: 30px; text-align: center;">{{districtListHasMoreTxt}}</p>
                        </div>
                      </div>
                    </div>
               </div>
               <div class="pop-city-btn">
                 <a @touchstart.prevent="selectProvinceList">确定选择</a>
               </div>
             </div>
          </div>
        </pop-box>
    <pop-box v-if="showTypeList" :typeList="typeList" @showPopBox="showPopBox">
          <div>
            <ul class="pop-list-child" v-if="typeList.length">
              <li v-for="(item, index) in typeList" :class="[index === selectTypeIndex ? 'select-type-index' : '']" @click.stop.prevent="selectType(item, index)">
                {{item.name}}
              </li>
            </ul>
            <div v-else class="show-loading">
              <loading title=""></loading>
            </div>
          </div>
        </pop-box>
  </div>
  <div>
    <scroll
      ref="scroll"
      :listenScroll="true"
      @scroll="recommendScroll"
      class="list"
      :pullup="true"
      :data="showProjectList"
      @scrollToEnd="searchMore">
      <div>
        <RecommendList :projectList="showProjectList" :userId="userId" :userShowEvent="userShowEvent" @stop="stop" :btnDefault="btnDefault"></RecommendList>
        <loading v-show="hasMore" title=""></loading>
        <div v-show="!hasMore" class="no-result-wrapper">
          <p>{{noResultWrapper}}</p>
        </div>
      </div>
    </scroll>
  </div>
  <div class="add-needs" v-if="userId === 2">
    <router-link to="/addProject" class="add">添加需求</router-link>
  </div>
</div>
</template>

<script>
import { getProvincelist, getDistirctlist, getCitylist, getJurisdictiont, getTypeList, getUserbyid, getTimeData, setNeedsItem, stopNeeds } from 'api/recommendList'
import Loading from 'base/loading/loading'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import PopBox from 'base/pop-box/pop-box'
import RecommendList from 'base/recommend-list/recommend-list'
import Confirm from 'base/confirm/confirm'
export default {
  data () {
    return {
      userId: -1,
      hasMore: false,
      btnDefault: '',
      noResultWrapper: '',
      confirmText: '',
      userShowEvent: '未响应',
      itemCenter: ['我的响应', '已响应', '未响应'],
      itemTop: ['今日响应', '本周响应', '本月响应'],
      itemTopIndex: 1,
      itemTopText: [],
      itemTopActive: 0,
      itemCenterActive: 0,
      itemSelectType: [{
        type: '区域'
      }, {
        type: '总价'
      }, {
        type: '物业类型'
      }],
      itemSelectTypeActive: -1,
      showCitysList: false,
      showTypeList: false,
      provincelist: [{
        name: '全部',
        provinceType: 'all'
      }],
      childCitylist: [],
      districtList: [],
      provinceActive: '',
      cityActive: '',
      districtlistActive: '',
      childCitylistHasMore: false,
      districtListHasMore: false,
      projectMsg: true,
      districtListHasMoreTxt: '',
      childCitylistHasMoreTxt: '',
      typeList: [],
      typeListWuye: [],
      selectPrice: [{
        name: '全部',
        allPricemax: '全部',
        allPricemin: '全部'
      }, {
        name: '100万以下',
        allPricemax: '100',
        allPricemin: '全部'
      }, {
        name: '100万-300万',
        allPricemax: '300',
        allPricemin: '100'
      }, {
        name: '300万-500万',
        allPricemax: '500',
        allPricemin: '300'
      }, {
        name: '500万以上',
        allPricemax: '全部',
        allPricemin: '500'
      }],
      selectTypeIndex: -1,
      jurisdictiont: -1,
      needsName: 2,
      start: 0,
      length: 10,
      showProjectList: []
    }
  },
  created () {
    this._getUserbyid()
    this._getJurisdictiont()
    this._getProvincelist()
    this._getTypeList()/*
    if (window.localStorage) {
      console.log(window.localStorage.getItem('isRefresh'))
    }
    console.log(this.$route) */
  },
  methods: {
    recommendScroll (pos) {
      // console.log(pos)
    },
    searchMore () {
      this.start++
      this._getAllSelectNeedsItem(this.start)
    },
    stop (data) {
      console.log(data)
      stopNeeds(data.path).then(res => {
        if (res.code === 0) {
          this.confirmText = res.msg
          this.$refs.confirm.show()
        }
      })
    },
    itemActive (val, index) {
      this.itemSelectType = [{
        type: '区域'
      }, {
        type: '总价'
      }, {
        type: '物业类型'
      }]
      this.allPricemin = ''
      this.allPricemax = ''
      this.type = ''
      this.provinceActive = ''
      this.cityActive = ''
      this.districtlistActive = ''
      this.childCitylist = []
      this.districtList = []
      this.selectTypeIndex = -1
      this.needsName = val.code
      this.userShowEvent = val.type
      this.showCitysList = false
      this.showTypeList = false
      this.start = 0
      this.itemCenterActive = index
      const data = {
        timecode: this.itemTopIndex,
        start: 0,
        length: this.length,
        replycode: this.needsName
      }
      this._setNeedsItem(data)
    },
    selectTop (val, index) {
      this.itemTopIndex = index + 1
      this._getTimeData(this.itemTopIndex)
      this.itemTopActive = index
      this.start = 0
      const data = {
        timecode: this.itemTopIndex,
        start: 0,
        length: this.length,
        replycode: this.needsName
      }
      this.itemSelectType = [{
        type: '区域'
      }, {
        type: '总价'
      }, {
        type: '物业类型'
      }]
      this._setNeedsItem(data)
    },
    selectTypeList (val, index) {
      this.itemSelectTypeActive = index
      if (index === 0) {
        this.showTypeList = false
        setTimeout(() => {
          this.showCitysList = true
        }, 20)
        return
      } else if (index === 1) {
        this.typeList = this.selectPrice
      } else {
        this.typeList = this.typeListWuye
      }
      this.showCitysList = false
      setTimeout(() => {
        this.showTypeList = true
      }, 20)
    },
    showCityList () {},
    showPopBox () {},
    selectProvince(item, index) {
      if (this.provinceActive === item.name) {
        return
      }
      if (item.name === '全部') {
        this.childCitylistHasMore = false
        this.childCitylistHasMoreTxt = ''
      }
      this.districtListHasMore = false
      this.districtListHasMoreTxt = ''
      this.provinceActive = item.name
      this.province = item.provinceType
      this.childCitylist = []
      this.districtList = []
      this.cityActive = ''
      this.districtlistActive = ''
      this.district = 'all'
      this.city = 'all'
      this._getCitylist()
    },
    selectCity (item, index) {
      if (this.cityActive === item) {
        return
      }
      if (item === '全部') {
        this.districtListHasMore = false
        this.districtListHasMoreTxt = ''
      }
      this.cityActive = item
      this.city = item === '全部' ? 'all' : item
      this.districtList = []
      this.district = 'all'
      this.districtlistActive = ''
      this._getdistrictlist()
    },
    selectdistrictlist (item, index) {
      this.districtlistActive = item
      this.district = item === '全部' ? 'all' : item
    },
    selectProvinceList () {
      console.log(this.provinceActive)
      console.log(this.cityActive)
      console.log(this.districtlistActive)
      if (this.districtlistActive !== '') {
        if (this.districtlistActive === '全部') {
          this.itemSelectType[this.itemSelectTypeActive].type = this.cityActive
        } else {
          this.itemSelectType[this.itemSelectTypeActive].type = this.districtlistActive
        }
      } else if (this.cityActive !== '') {
        if (this.cityActive === '全部') {
          this.itemSelectType[this.itemSelectTypeActive].type = this.provinceActive
        } else {
          this.itemSelectType[this.itemSelectTypeActive].type = this.cityActive
        }
      } else if (this.provinceActive !== '') {
        if (this.provinceActive === '全部') {
          this.itemSelectType[this.itemSelectTypeActive].type = '区域'
        } else {
          this.itemSelectType[this.itemSelectTypeActive].type = this.provinceActive
        }
      } else {
        this.itemSelectType[this.itemSelectTypeActive].type = '区域'
      }
      this.districtListHasMore = false
      this.childCitylistHasMore = false
      this.districtListHasMoreTxt = ''
      this.childCitylistHasMoreTxt = ''
      this.$refs.scroll.enable()
      this.start = 0
      this.query = ''
      this.districtListHasMoreTxt = ''
      this.projectList = []
      this.projectName = 'all'
      this._getProjectList()
      this.showCitysList = false
      this.projectMsg = false
      this._setNeedsItem()
    },
    selectType (item, index) {
      console.log(this.itemSelectTypeActive)
      if (item.name === '全部') {
        if (this.itemSelectTypeActive === 1) {
          this.itemSelectType[this.itemSelectTypeActive].type = '总价'
        } else if (this.itemSelectTypeActive === 2) {
          this.itemSelectType[this.itemSelectTypeActive].type = '物业类型'
        }
      } else {
        this.itemSelectType[this.itemSelectTypeActive].type = item.name
      }
      this.selectTypeIndex = index
      if (item.allPricemax) {
        this.allPricemin = item.allPricemin
        this.allPricemax = item.allPricemax
      }
      if (item.pricemax) {
        this.pricemin = item.pricemin
        this.pricemax = item.pricemax
      }
      if (item.type) {
        this.type = item.type
      }
      console.log(this.allPricemin)
      console.log(this.allPricemax)
      console.log(this.type)
      this.projectList = []
      this.start = 0
      this.query = ''
      this.projectName = 'all'
      this.projectMsg = false
      this.showProjectList = []
      this._setNeedsItem()
      setTimeout(() => {
        this.showTypeList = false
        this.selectTypeIndex = -1
        this.$refs.scroll.enable()
      }, 20)
    },
    _getJurisdictiont () {
      getJurisdictiont().then(res => {
        if (res.code === 0) {
          this.jurisdictiont = res.data.user.roleid
        }
      })
    },
    _getTypeList () {
      getTypeList().then(res => {
        res.data.forEach((item, i) => {
          this.typeListWuye.push({
            name: item,
            type: item
          })
        })
      })
      this.typeListWuye.unshift({
        name: '全部',
        type: '全部'
      })
    },
    _getProvincelist () {
      if (this.provincelist.length > 1) {
        return
      }
      getProvincelist().then(res => {
        for (let i in res.data) {
          this.provincelist.push({
            name: res.data[i],
            provinceType: res.data[i]
          })
        }
      })
      getDistirctlist()
    },
    _getCitylist () {
      if (this.provinceActive === '全部') {
        return
      }
      getCitylist(this.province).then(res => {
        this.childCitylist = res.data
        this.childCitylist.unshift('全部')
      })
    },
    _getdistrictlist () {
      if (this.cityActive === '全部') {
        return
      }
      getDistirctlist(this.province, this.city).then(res => {
        this.districtList = res.data
        this.districtList.unshift('全部')
      })
    },
    _getProjectList () {},
    async _getUserbyid () {
      await getUserbyid().then(res => {
        this.userId = res.data.user.roleid
        if (this.userId === 1) { // 源泽
          this.btnDefault = '未响应'
          this.itemCenter = [{
            type: '未响应',
            code: 2
          }, {
            type: '我的响应',
            code: 4
          }, {
            type: '所有响应',
            code: 5
          }]
        } else if (this.userId === 2) { // 经纪人
          this.btnDefault = '未响应'
          this.itemCenter = [{
            type: '未响应',
            code: 2
          }, {
            type: '已响应',
            code: 1
          }, {
            type: '已停止',
            code: 3
          }]
        } else { // 0 案场
          this.btnDefault = '去响应'
          this.itemCenter = [{
            type: '未响应',
            code: 2
          }, {
            type: '我的响应',
            code: 4
          }]
        }
      })
      const data = {
        timecode: this.itemTopIndex,
        start: this.start,
        length: this.length,
        replycode: 2
      }
      this._setNeedsItem(data)
      this._getTimeData(this.itemTopIndex)
    },
    _getTimeData (index) {
      getTimeData(index).then(res => {
        this.itemTopText = res.data
      })
    },
    _setNeedsItem (data) {
      this.noResultWrapper = ''
      this.showProjectList = []
      if (!data) {
        data = {
          timecode: this.itemTopIndex,
          replycode: this.needsName,
          prov: this.provinceActive === '全部' ? '' : this.provinceActive,
          city: this.cityActive === '全部' ? '' : this.cityActive,
          district: this.districtlistActive === '全部' ? '' : this.districtlistActive,
          minprice: this.allPricemin === '全部' ? '' : this.allPricemin,
          maxprice: this.allPricemax === '全部' ? '' : this.allPricemax,
          type: this.type === '全部' ? '' : this.type,
          start: this.start,
          length: this.length
        }
      }
      setNeedsItem(data).then(res => {
        if (res.code === 0) {
          const userEvent = this._setUserEvent()
          res.data.forEach((item, index) => {
            res.data[index].addProject = userEvent.addProject
            res.data[index].addProjectUrl = userEvent.addProjectUrl
            res.data[index].selectBtn = userEvent.selectBtn
            res.data[index].selectBtnUrl = userEvent.selectBtnUrl
          })
          this.showProjectList = res.data
        }
      })
    },
    _getAllSelectNeedsItem (start) {
      this.noResultWrapper = ''
      if (!this.showProjectList.length) {
        return
      }
      this.hasMore = true
      const data = {
        timecode: this.itemTopIndex,
        replycode: this.needsName,
        prov: this.provinceActive === '全部' ? '' : this.provinceActive,
        city: this.cityActive === '全部' ? '' : this.cityActive,
        district: this.districtlistActive === '全部' ? '' : this.districtlistActive,
        minprice: this.allPricemin === '全部' ? '' : this.allPricemin,
        maxprice: this.allPricemax === '全部' ? '' : this.allPricemax,
        type: this.type === '全部' ? '' : this.type,
        start: start,
        length: this.length
      }
      setNeedsItem(data).then(res => {
        if (res.code === 0) {
          this.hasMore = false
          if (res.data.length < 10) {
            this.noResultWrapper = '没有更多了'
          }
          if (res.data.length === 0) {
            return
          }
          const userEvent = this._setUserEvent()
          res.data.forEach((item, index) => {
            res.data[index].addProject = userEvent.addProject
            res.data[index].addProjectUrl = userEvent.addProjectUrl
            res.data[index].selectBtn = userEvent.selectBtn
            res.data[index].selectBtnUrl = userEvent.selectBtnUrl
          })
          this.showProjectList = this.showProjectList.concat(res.data)
        }
      })
    },
    _setUserEvent () {
      let addProject = ''
      let addProjectUrl = 0
      let selectBtn = ''
      let selectBtnUrl = 0
      if (this.userId === 1) { // 源泽
        if (this.needsName === 2) { // 未响应
          addProject = '去响应'
          addProjectUrl = 2
          selectBtn = ''
        } else if (this.needsName === 4) { // 我的响应
          addProject = '追加响应'
          addProjectUrl = 3
          selectBtn = '查看响应'
          selectBtnUrl = 1
        } else if (this.needsName === 5) { // 所有响应
          addProject = '追加响应'
          addProjectUrl = 3
          selectBtn = '查看响应'
          selectBtnUrl = 1
        }
      } else if (this.userId === 2) { // 经纪人
        if (this.needsName === 2) {
          addProject = '停止'
          selectBtn = ''
        } else if (this.needsName === 1) {
          addProject = '停止'
          selectBtn = '查看响应'
          selectBtnUrl = 1
        } else if (this.needsName === 3) {
          addProject = ''
          selectBtn = ''
        }
      } else {
        if (this.needsName === 2) { // 案场
          addProject = '去响应'
          addProjectUrl = 2
          selectBtn = ''
        } else if (this.needsName === 4) {
          addProject = '追加响应'
          addProjectUrl = 3
          selectBtn = '查看响应'
          selectBtnUrl = 1
        }
      }
      return {
        addProject,
        addProjectUrl,
        selectBtn,
        selectBtnUrl
      }
    }
  },
  components: {
    MyTitle,
    Scroll,
    PopBox,
    Loading,
    RecommendList,
    Confirm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #componentList
    font-size: $font-size-large
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    background: #eee
    font-size: $font-size-medium
    .add-needs
      z-index: 99
      position:fixed
      bottom: 0
      width: 100%
      .add
        display: inline-block
        text-align: center
        line-height: 35px
        width: 96%
        margin: 0 2%
        box-sizing: border-box
        border: none
        height: 35px
        border-radius: 4px
        background: #e5672c
        color: #fff
    .title
      position: fixed
      z-index: 800
      width: 100%
      text-align: center
      font-size: $font-size-large-x
      color: white
      top: 0
      background: #eee
      .title-top
        height: 50px
      .title-all-sclect
        position: relative
      .item-list-show
        display: flex
        background: #fff
        height: 37px
        li
          color: black
          font-size: $font-size-medium
          border-right: 1px solid #e56e37
          width: 33%
          p
            line-height:15px
            color: #666
            &:last-child
              font-weight: 600
              color: black
          &:last-child
            border-right: none
      .xiangying-top
        background: #f28666
        padding:0 5px 5px 5px
        margin-top: -7px
        li
          line-height: 35px
          border: 1px solid #fff
          box-sizing: border-box
          color: #fff
          font-size: $font-size-medium-x
          &:first-child
            border-radius: 4px 0 0 4px
          &:nth-child(2)
            border-left: none
            border-right: none
          &:last-child
            border-right: 1px solid #fff
            border-radius: 0 4px 4px 0
        .top-active
          background: #fff
          color: #f28666
      .xiangying-center
        display: flex
        justify-content: space-around
        li
          border: none
          height: 25px
          p
            height: 17px
      .item-center
        position: relative
        ul
          display: flex
          margin-top: 5px
          background: #fff
          color: black
          border-bottom:1px solid #eee
          li
            width: 50%
            line-height: 35px
            font-size: $font-size-medium
            color: #333
          .active
            box-sizing: border-box
            color: #e5672c
            border-bottom: 2px solid #e5672c
      .item-bottom
        ul
          display: flex
          background: #fff
          color: black
          justify-content: space-around
          border-bottom: 1px solid #eee
          li
            color: #333
            width: 33.33%
            font-size: $font-size-medium
            transition: all .3s
            line-height: 40px
            text-align: center
            i
              font-size: $font-size-medium
          .active
            color: #e5672c
    .provincelist
      position: fixed
      top: 0
      width:100%
    .pop-city-list
      text-align: center
      position: absolute
      width: 100%
      height: 100%
      z-index: 999
      height: 100%
      background: white
      .pop-city-btn
        height: 50px
        background: $color-highlight-background
        a
          display: inline-block
          background #13CE66
          color: white
          padding: 10px 20px
          border-radius: 6px
      .pop-city-child
        background: $color-highlight-background
        padding: 0 2px
        width: 100%
        box-sizing: border-box
        display: flex
        justify-content: space-around
        align-items: flex-start
        height: 160px
        overflow: hidden
        margin: 10px 0
        .pop-city-height
          width: 33%
          box-sizing: border-box
          .pop-city-scroll
            top: 0
            bottom: 0
            width: 100%
            height: 160px
            overflow: hidden
        li
          line-height: 35px
      .cityActive
        background : #EA8910
        color: white
    .pop-list-child
      background: white
      padding: 10px
      li
        text-align: center
        line-height: 30px
        color: #7b7b7b
        width: 33%
        margin-bottom: 20px
        box-sizing: border-box
        display: inline-block
        font-size: $font-size-small
      .select-type-index
        background: #f9742a
        color: white
    .list
      position: fixed
      top: 155px
      bottom: 130px
      width: 100%
      padding-top: 50px
      .no-result-wrapper
        text-align: center
        z-index: 800
        p
          line-height: 30px
</style>