<template>
  <transition name="pop-list">
    <div class="pop" v-if="showCitysList" @click="hideSelectBox">
    <div class="show-type-list" ref="showType">
        <scroll :pullup="true" class="list" :data="provincelist">
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
                          <li v-for="(item, index) in childCitylist" :class="[cityActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectCity(item, index)">{{item.name}}</li>
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
                          <li ref="districtList" v-for="(item, index) in districtList" :class="[districtlistActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectdistrictlist(item, index)">{{item.name}}</li>
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
        </scroll>
    </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { getProvincelist, getDistirctlist, getCitylist } from 'api/getCity'
import PopBox from 'base/pop-box/pop-box'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  props: {},
  data() {
    return {
      showCitysList: true,
      provincelist: [{
        name: '全部',
        provinceType: 'all'
      }],
      province: null,
      district: null,
      city: null,
      childCitylist: [],
      districtList: [],
      provinceActive: '',
      cityActive: '',
      districtlistActive: '',
      childCitylistHasMore: false,
      districtListHasMore: false,
      projectMsg: true,
      districtListHasMoreTxt: '',
      childCitylistHasMoreTxt: ''
    }
  },
  created() {
    this._getProvincelist()
  },
  mounted() {},
  methods: {
    showCityList () {},
    hideSelectBox () {
      this.$emit('hideSelectBox')
    },
    showPopBox() {},
    // 选择省 市 区
    selectProvince(item, index) {
      if (this.provinceActive === item.name) {
        return
      }
      if (item.name === '全部') {
        this.childCitylistHasMore = false
        this.childCitylistHasMoreTxt = ''
        this.province = null
      } else {
        this.province = item.provinceType
      }
      this.districtListHasMore = false
      this.districtListHasMoreTxt = ''
      this.provinceActive = item.name
      this.childCitylist = []
      this.districtList = []
      this.cityActive = ''
      this.districtlistActive = ''
      this.district = null
      this.city = null
      this._getCitylist()
    },
    selectCity (item, index) {
      if (this.cityActive === item.name) {
        return
      }
      if (item.name === '全部') {
        this.districtListHasMore = false
        this.districtListHasMoreTxt = ''
        this.city = null
      } else {
        this.city = item.provinceType
      }
      console.log(this.city)
      this.cityActive = item.name
      this.districtList = []
      this.district = null
      this.districtlistActive = ''
      this._getdistrictlist()
    },
    selectdistrictlist (item, index) {
      this.districtlistActive = item.name
      console.log(item)
      this.district = item.name === '全部' ? null : item.provinceType
    },
    selectProvinceList () {
      this.districtListHasMore = false
      this.childCitylistHasMore = false
      this.districtListHasMoreTxt = ''
      this.childCitylistHasMoreTxt = ''
      this.districtListHasMoreTxt = ''
      this.projectList = []
      this.projectName = 'all'
      this.showCitysList = false
      this.projectMsg = false
      this.$emit('showCitysListEvent', {provinceActive: this.provinceActive, cityActive: this.cityActive, districtlistActive: this.districtlistActive})
    },
    _getProvincelist() {
      if (this.provincelist.length > 1) {
        return
      }
      getProvincelist().then(res => {
        for (let i in res.data.data) {
          this.provincelist.push({
            name: res.data.data[i].value,
            provinceType: res.data.data[i].key
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
        this.childCitylist = [{
          name: '全部',
          provinceType: 'all'
        }]
        for (let i in res.data.data) {
          this.childCitylist.push({
            name: res.data.data[i].value,
            provinceType: res.data.data[i].key
          })
        }
      })
    },
    _getdistrictlist () {
      if (this.cityActive === '全部') {
        return
      }
      getDistirctlist(this.province, this.city).then(res => {
        this.districtList = [{
          name: '全部',
          provinceType: 'all'
        }]
        for (let i in res.data.data) {
          this.districtList.push({
            name: res.data.data[i].value,
            provinceType: res.data.data[i].key
          })
        }
      })
    }
  },
  components: {
    Scroll,
    PopBox,
    Loading
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .pop
    position: fixed
    top: 131px
    bottom: 0
    right: 0
    left: 0
    background: rgba(0, 0, 0, 0.3)
    .show-type-list
      .list
        position: fixed
        width: 100%
        height: 230px
        overflow: hidden
        color: black
        font-size: $font-size-medium
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
  .pop-list-enter-active, .pop-list-leave-active
    transition: all 0.3s
  .pop-list-enter, .pop-list-leave-to
    transform: translate3d(100%, 0, 0)
</style>
