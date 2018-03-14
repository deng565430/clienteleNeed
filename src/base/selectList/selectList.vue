<template>
  <div class="select-list">
    <div class="item">
      <ul>
        <li :key="index" v-for="(item, index) in itemSelectType" :class="itemSelectTypeActive === index ? 'active' : ''" @click="selectTypeList(item, index)"><span>{{item.type}}</span> <i :class="[itemSelectTypeActive === index ? 'icon-back-up': 'icon-back-down']"></i></li>
      </ul>
    </div>
    <div class="pop-box">
    <div>
      <select-box :posTop="posTop.selectBox" v-if="showCitysList" @hideSelectBox="hidePopBox" @showCitysListEvent="showCitysListEvent"></select-box>
    </div>
    <pop-box @selectTypeConfirm="selectTypeConfirm" :posTop="posTop.popBox" v-if="showTypeList" @hidePopBox="hidePopBox" :typeList="typeList" @showPopBox="showPopBox">
      <div>
        <div class="pop-list">
          <ul class="pop-list-child" v-if="typeList.length">
            <li :key="item" v-for="(item, index) in typeList" :class="[index === selectTypeIndex ? 'select-type-index' : '']" @click.stop.prevent="selectType(item, index)">
              {{item.value}}
            </li>
          </ul>
        </div>
      </div>
    </pop-box>
  </div>
  </div>
</template>
<script>
import PopBox from 'base/pop-box/pop-box-select'
import SelectBox from 'base/select-box/select-box'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { getTypeList } from 'api/getCity'
export default {
  props: {
    posTop: {
      type: Object,
      default: {
        selectBox: 91,
        popBox: 91
      }
    }
  },
  data() {
    return {
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
      typeList: [],
      typeListWuye: [{
        key: null,
        value: '全部'
      }],
      selectPrice: [{
        value: '全部',
        key: {
          maxPrice: null,
          minPrice: null
        }
      }, {
        value: '100万以下',
        key: {
          maxPrice: '100',
          minPrice: '全部'
        }
      }, {
        value: '100万-300万',
        key: {
          maxPrice: '300',
          minPrice: '100'
        }
      }, {
        value: '300万-500万',
        key: {
          maxPrice: '500',
          minPrice: '300'
        }
      }, {
        value: '500万以上',
        key: {
          maxPrice: '全部',
          minPrice: '500'
        }
      }],
      selectTypeIndex: -1,
      sendData: {
        /* 省 */
        prov: null,
        /* 市 */
        city: null,
        /* 区 */
        district: null,
        /* 价格 */
        minPrice: null,
        maxPrice: null,
        /* 物业类型 */
        type: null
      }
    }
  },
  created () {
    // 获取过滤条件
    getTypeList().then(res => {
      if (res.data.code === 0) {
        this.typeListWuye = this.typeListWuye.concat(res.data.data)
        console.log(this.typeListWuye)
      }
    })
  },
  methods: {
    // 区域条件筛选
    selectTypeList (item, index) {
      this.selectTypeIndexRoom = -1
      this.itemSelectTypeActive = index
      if (index === 0) {
        this.showCitysList = true
        this.showTypeList = false
      } else if (index === 1) {
        this.typeList = this.selectPrice
        this.showTypeList = true
        this.showCitysList = false
      } else {
        this.typeList = this.typeListWuye
        this.showTypeList = true
        this.showCitysList = false
      }
    },
    hidePopBox () {
      this.showTypeList = false
      this.showCitysList = false
    },
    // 选择的省市区
    showCitysListEvent (data) {
      // 保存省市区
      this.sendData.prov = data.prov.code
      this.sendData.city = data.city.code
      this.sendData.district = data.district.code

      if (data.district.value !== '' && data.district.value !== '全部') {
        this.itemSelectType[this.itemSelectTypeActive].type = data.district.value
      } else if (data.city.value !== '' && data.city.value !== '全部') {
        this.itemSelectType[this.itemSelectTypeActive].type = data.city.value
      } else if (data.prov.value !== '' && data.prov.value !== '全部') {
        this.itemSelectType[this.itemSelectTypeActive].type = data.prov.value
      } else {
        this.itemSelectType[this.itemSelectTypeActive].type = '区域'
      }
      this.showCitysList = false
      this.$emit('getSelectData', this.sendData)
    },
    selectType (item, index) {
      this.selectTypeIndex = index
      this.room = item.type
      this.saveDataType = item
    },
    // 确定选择
    selectTypeConfirm () {
      if (!this.saveDataType) {
        if (this.itemSelectTypeActive === 1) {
          this.sendData.type = null
        } else {
          this.sendData.minPrice = null
          this.sendData.maxPrice = null
        }
        this.itemSelectType[this.itemSelectTypeActive].type = this.itemSelectType[this.itemSelectTypeActive].type
      } else {
        if (this.itemSelectTypeActive === 1) {
          this.sendData.maxPrice = this.saveDataType.key.maxPrice
          this.sendData.minPrice = this.saveDataType.key.minPrice
        } else {
          this.sendData.type = this.saveDataType.key
        }
        this.itemSelectType[this.itemSelectTypeActive].type = this.saveDataType.value
      }
      this.selectTypeIndex = -1
      this.saveDataType = null
      this.showTypeList = false
      this.$emit('getSelectData', this.sendData)
    }
  },
  components: {
    PopBox,
    Loading,
    Scroll,
    SelectBox
  }
}
</script>
<style  scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.select-list
  .item
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
  .pop-box
    position: relative
    .pop-list
      background: #fff
      .pop-list-child
        background: white
        text-align: left
        display: flex
        flex-wrap: wrap
        li
          text-align: center
          line-height: 35px
          color: #7b7b7b
          width: 33.33%
          box-sizing: border-box
          display: inline-block
          font-size: $font-size-small
        .select-type-index
          background: #f9742a
          color: white
</style>


