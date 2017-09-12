<template>
<div id="componentList">
  <div class="title">
    <my-title :title="'需求列表'"></my-title>
    <ul>
      <li>共有<span> 18 </span>个需求</li>
      <li>已响应<span> 9 </span>个</li>
      <li>未响应<span> 9 </span>个</li>
    </ul>
    <div class="item-center">
      <ul>
        <li :class="itemCenterActive === index ? 'active': ''" @click="itemActive(i, index)" v-for="(i, index) in itemCenter">{{i}}</li>
      </ul>
      <span ref="itemCenterActiveSpan"></span>
    </div>
    <div class="item-bottom">
        <ul>
          <li v-for="(item, index) in itemSelectType" :class="itemSelectTypeActive === index ? 'active' : ''" @click="selectTypeList(item, index)"><span>{{item.type}}</span> <i :class="[itemSelectTypeActive === index ? 'icon-back-down': 'icon-back-up']"></i></li>
        </ul>
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
    <scroll ref="scroll" class="list">
      <div>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
      </div>
    </scroll>
  </div>
</div>
</template>

<script>
import { getProvincelist, getDistirctlist, getCitylist } from 'api/recommendList'
import Loading from 'base/loading/loading'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import PopBox from 'base/pop-box/pop-box'
export default {
  data () {
    return {
      itemCenter: ['已响应', '未响应'],
      itemCenterActive: 0,
      itemSelectType: [{
        type: '区域'
      }, {
        type: '价格'
      }, {
        type: '时间'
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
      provinceActive: 0,
      cityActive: 0,
      districtlistActive: 0,
      childCitylistHasMore: false,
      districtListHasMore: false,
      projectMsg: true,
      districtListHasMoreTxt: '',
      childCitylistHasMoreTxt: '',
      typeList: [],
      selectPrice: [{
        name: '全部',
        allPricemax: 'all',
        allPricemin: 'all'
      }, {
        name: '100万以下',
        allPricemax: '100万元',
        allPricemin: 'all'
      }, {
        name: '100万-300万',
        allPricemax: '300万元',
        allPricemin: '100万'
      }, {
        name: '300万-500万',
        allPricemax: '500万元',
        allPricemin: '300万元'
      }, {
        name: '500万以上',
        allPricemax: 'all',
        allPricemin: '500万元'
      }],
      selectTime: [{
        name: '全部',
        pricemax: 'all',
        pricemin: 'all'
      }, {
        name: '一天前',
        pricemax: '10000元',
        pricemin: 'all'
      }, {
        name: '两天前',
        pricemax: '30000元',
        pricemin: '10000元'
      }, {
        name: '三天前',
        pricemax: '50000元',
        pricemin: '30000元'
      }, {
        name: '一周前',
        pricemax: '80000元',
        pricemin: '50000元'
      }, {
        name: '一个月前',
        pricemax: 'all',
        pricemin: '80000元'
      }],
      selectTypeIndex: 0
    }
  },
  created () {
    this._getProvincelist()
  },
  methods: {
    itemActive (val, index) {
      this.showCitysList = false
      this.showTypeList = false
      this.itemCenterActive = index
      this.$refs.itemCenterActiveSpan.style.left = index * 50 + '%'
    },
    selectTypeList (val, index) {
      if (index === 0) {
        this.showTypeList = false
        this.itemSelectTypeActive = index
        setTimeout(() => {
          this.showCitysList = true
        }, 20)
      } else {
        console.log(val.type)
        if (val.type === '价格') {
          this.typeList = this.selectPrice
        } else {
          this.typeList = this.selectTime
        }
        this.showCitysList = false
        setTimeout(() => {
          this.showTypeList = true
        }, 20)
      }
      console.log(this.provincelist)
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
    },
    selectType (item, index) {
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
      this.projectList = []
      this.start = 0
      this.query = ''
      this.projectName = 'all'
      this.projectMsg = false
      this.selectTypeIndex = index
      setTimeout(() => {
        this.showTypeList = false
        this.$refs.scroll.enable()
      }, 20)
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
    _getProjectList () {}
  },
  components: {
    MyTitle,
    Scroll,
    PopBox,
    Loading
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
    z-index: 10000
    background: #eee
    font-size: $font-size-medium
    .title
      position: fixed
      z-index: 10002
      width: 100%
      text-align: center
      font-size: $font-size-large-x
      color: white
      top: 0
      background: #eee
      >ul
        display: flex
        background: #fff
        padding: 20px 0
        li
          color: black
          font-size: $font-size-medium
          border-right: 1px solid #e56e37
          width: 33%
          span
            color: #e56e37
          &:last-child
            border-right: none
      .item-center
        position: relative
        ul
          display: flex
          margin: 10px 0
          background: #fff
          color: black
          li
            width: 50%
            line-height: 50px
            font-size: $font-size-medium-x
            color: #333
            transition: all .3s
          .active
            color: #e5672c
        >span
          width: 50%
          position: absolute
          top: 48px
          transition: all .3s
          left: 0
          border: 1px solid #e5672c
      .item-bottom
        ul
          display: flex
          margin: 10px 20px
          background: #fff
          color: black
          justify-content: space-around
          border: 1px solid #ccc
          border-radius: 4px
          li
            color: #333
            font-size: $font-size-medium-x
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
      top: 177px
      bottom: 55px
      width: 100%
      padding-top: 50px
</style>