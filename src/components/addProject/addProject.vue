<template>
<div id="addProject">
  <div class="title">
    <my-title :title="'客户需求'"></my-title>
  </div>
  <div>
    <scroll ref="scroll" class="list" :beforeScroll="true" @beforeScroll="beforeScroll">
      <div>
        <div class="select-list">
          <div class="sof-hint" v-if="!isDisable">
            <p>温馨提示： 带 <span> * </span> 号是必填项</p>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <div>
                <label>省:
                  <span> * </span><br/>
                  <select name="" class="select" v-model="province" @change="selectProvince" v-if="!isDisable">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" v-for="item in provinceList">{{item}}</option>
                  </select>
                  <input v-else type="text" name="" v-model="province" :disabled="isDisable">
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <label>市:
                  <span> * </span><br/>
                  <select name="" class="select" v-model="city" @change="selectCity" v-if="!isDisable">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" v-for="item in cityList">{{item}}</option>
                  </select>
                  <input v-else type="text" name="" v-model="city" :disabled="isDisable">
                </label>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <div>
                <label>区:
                  <span>  </span><br/>
                  <select name="" class="select" v-model="district" @change="selectDistrict" v-if="!isDisable">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" v-for="item in districtList">{{item}}</option>
                  </select>
                  <input v-else type="text" name="" v-model="district" :disabled="isDisable">
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <label>客户数量:
                  <span>  </span><br/>
                  <input type="text" name="" v-model="clientcount"  placeholder="填写人数" :disabled="isDisable"> 人
                </label>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <div>
                <label class="needName">需求单名称:
                  <span>  </span><br/>
                  <input type="text" name="" v-model="needName"  placeholder="此条需求的简称！（限5个字）"  :disabled="isDisable"/>
                </label>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <div>
                <div class="item-area">总面积:
                  <span> * </span>
                  <div class="item-input">
                    <input type="text" name="startArea" v-model="startArea"  placeholder="输入数字" :disabled="isDisable">  平方米 ~
                    <input type="text" name="startArea" v-model="endArea" placeholder="输入数字" :disabled="isDisable">  平方米
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <div>
                <label>最高预算:
                  <span> * </span><br/>
                  <input type="text" ref="userInput5" name="" v-model="theHeightBudget"  placeholder="金额" :disabled="isDisable">  万元
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <label>物业类型:
                  <span> * </span><br/>
                  <select name="" class="select" v-model="tenementType" :disabled="isDisable">
                    <option value="全部">全部</option>
                    <option :value="item" v-for="item in tenementTypeList">{{item}}</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <div>
                <label>首付比例:
                  <span> </span><br/>
                  <select name="" class="select" v-model="proportion" :disabled="isDisable">
                    <option :value ="item.value" v-for="(item, index) in ratio" :key="index">{{item.value}} %</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <div class="item-houseHome">户型:
                  <span>  </span><br/>
                  <select name="" class="select-50" v-model="houseHome" :disabled="isDisable">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select> 室 &nbsp;
                  <select name="" class="select-50" v-model="houseHall" :disabled="isDisable">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select> 厅
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <div>
                <p>户籍:</p>
                <div class="radio">
                  <label><span class="pay_list_c1 on"><input name="Fruit1" type="radio" value="1" class="radioclass"  :disabled="isDisable" v-model="register"/></span>&nbsp; 本地 </label>
                  <label><input name="Fruit1" type="radio" value="2"  v-model="register"  :disabled="isDisable"/>&nbsp; 外地 </label>
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <div>
                <p>楼层:</p>
                <div class="radio">
                  <label><input name="Fruit" type="radio" value="10001"  v-model="floor" :disabled="isDisable"/>&nbsp; 无要求 </label>
                  <label><input name="Fruit" type="radio" value="10002"  v-model="floor" :disabled="isDisable"/>&nbsp; 低层 </label>
                  <label><input name="Fruit" type="radio" value="10003"  v-model="floor" :disabled="isDisable"/>&nbsp; 中层 </label>
                  <label><input name="Fruit" type="radio" value="10004" v-model="floor" :disabled="isDisable"/>&nbsp; 高层 </label>
                </div>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <div>
                <label>社保:
                  <span> </span><br/>
                  <select name="" class="select" v-model="social" :disabled="isDisable">
                    <option value="0">无</option>
                    <option value="1">1年</option>
                    <option value="2">2年</option>
                    <option value="3">3年</option>
                    <option value="4">4年</option>
                    <option value="5">5年</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="item-50">
              <div>
                <label>装修:
                  <span>  </span><br/>
                  <select name="" class="select" v-model="fitment" :disabled="isDisable">
                    <option value="1">毛坯</option>
                    <option value="2">简装</option>
                    <option value="3">精装</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="item-100">
              <div>
                <label>备注:
                  <span>  </span><br/>
                  <textarea name="" v-model="textarea" class="textarea" placeholder="备注信息" rows = "3" :disabled="isDisable"></textarea>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="user-send" v-if="!isDisable">
          <button type="button" class="btn send"  :disabled="!disabled" :class="disabled === true ? 'btn' : 'disabled'" @click.stop.prevent="send">提交</button>
        </div>
      </div>
    </scroll>
  </div>
  <div>
    <confirm ref="confirm" :text="confirmText" :refresh="refresh" @confirm="confirm"></confirm>
  </div>
</div>
</template>

<script>
import { getProvincelist, getDistirctlist, getCitylist, getTypeList, sendProject, getProject } from 'api/addProject'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
export default {
  name: 'addProject',
  data () {
    return {
      confirmText: '请填写完整',
      id: this.$route.params.id,
      isDisable: false,
      ratio: [{
        label: '10',
        value: '10'
      }, {
        label: '20',
        value: '20'
      }, {
        label: '30',
        value: '30'
      }, {
        label: '40',
        value: '40'
      }, {
        label: '50',
        value: '50'
      }, {
        label: '60',
        value: '60'
      }, {
        label: '70',
        value: '70'
      }, {
        label: '80',
        value: '80'
      }, {
        label: '90',
        value: '90'
      }, {
        label: '100',
        value: '100'
      }],
      disabled: true,
      refresh: false,
      province: '全部',
      provinceList: [],
      city: '全部',
      cityList: [],
      district: '全部',
      districtList: [],
      needName: '',
      clientcount: '',
      startArea: '',
      endArea: '',
      theHeightBudget: '',
      tenementType: '',
      tenementTypeList: [],
      proportion: '',
      houseHome: '',
      houseHall: '',
      register: '',
      floor: '',
      social: '',
      fitment: '',
      textarea: ''
    }
  },
  created () {
    this._getProvincelist()
    this._getTypeList()
    this._getProject()
  },
  methods: {
    send (e) {
      if (this.province === '全部') {
        this.confirmText = '请选择 省'
        this.$refs.confirm.show()
        return
      }
      if (this.city === '全部') {
        this.confirmText = '请选择 市'
        this.$refs.confirm.show()
        return
      }
      if (this._trim(this.startArea) === '') {
        this.confirmText = '请输入总面积范围'
        this.$refs.confirm.show()
        return
      }
      if (this._trim(this.endArea) === '') {
        this.confirmText = '请输入总面积范围'
        this.$refs.confirm.show()
        return
      }
      if (this.theHeightBudget === '') {
        this.confirmText = '输入最高预算'
        this.$refs.confirm.show()
        return
      }
      if (this.needName.length > 5) {
        this.confirmText = '需求单名称已超过长度！'
        this.$refs.confirm.show()
        return
      }
      this.disabled = false
      const data = {
        prov: this.province,
        city: this.city,
        district: this.district ? this.district : null,
        clientcount: this.clientcount ? this.clientcount : null,
        start_area: this._trim(this.startArea) ? this._trim(this.startArea) : null,
        end_area: this._trim(this.endArea) ? this._trim(this.endArea) : null,
        price: this.theHeightBudget ? this.theHeightBudget : null,
        type: this.tenementType ? this.tenementType : null,
        scale: this.proportion ? this.proportion : null,
        room: this.houseHome ? this.houseHome : null,
        hall: this.houseHall ? this.houseHall : null,
        census: this.register ? this.register : null,
        floor: this.floor ? this.floor : null,
        ensure: this.social ? this.social : null,
        decoration: this.fitment ? this.fitment : null,
        msg: this.textarea ? this.textarea : null,
        needs_name: this.needName ? this.needName : null
      }
      sendProject(data).then(res => {
        if (res.data.code === 0) {
          this.refresh = true
          this.confirmText = '添加成功'
          this.$refs.confirm.show()
        } else {
          this.confirmText = res.data.msg ? res.data.msg : '服务器内部错误！'
          this.$refs.confirm.show()
        }
      })
    },
    confirm (data) {
      console.log(data)
      if (data) {
        this.refresh = false
        this.$router.push('/')
        /* setTimeout(() => {
          window.location.reload()
        }, 20) */
      }
    },
    confirmClear() {},
    confirmBtnText() {},
    selectProvince() {
      console.log(this.province)
      this.city = '全部'
      this.district = '全部'
      this.cityList = []
      getCitylist(this.province).then(res => {
        this.cityList = res.data.data
      })
    },
    selectCity () {
      this.district = '全部'
      if (this.city === '全部') {
        return
      }
      this.districtList = []
      getDistirctlist(this.province, this.city).then(res => {
        this.districtList = res.data.data
      })
    },
    selectDistrict () {},
    beforeScroll () {},
    _getProvincelist () {
      getProvincelist().then(res => {
        this.provinceList = res.data.data
      })
    },
    _getTypeList () {
      getTypeList().then(res => {
        this.tenementTypeList = res.data.data
      })
    },
    _getProject () {
      if (!/^[SOF]/.test(this.id)) {
        return
      }
      getProject(this.id).then(res => {
        this.isDisable = true
        if (res.data.code === 0) {
          if (res.data.data == null) {
            this.confirmText = '参数错误'
            this.$refs.confirm.show()
            return
          }
          this.province = res.data.data.prov
          this.city = res.data.data.city ? res.data.data.city : '全部'
          this.district = res.data.data.district ? res.data.data.district : '全部'
          this.clientcount = res.data.data.clientcount
          this.startArea = res.data.data.start_area
          this.endArea = res.data.data.end_area
          this.theHeightBudget = res.data.data.price
          this.tenementType = res.data.data.type
          this.proportion = res.data.data.scale
          this.houseHome = res.data.data.room
          this.houseHall = res.data.data.hall
          this.register = res.data.data.census
          this.floor = res.data.data.floor
          this.social = res.data.data.ensure
          this.fitment = res.data.data.decoration
          this.textarea = res.data.data.msg
          this.needName = res.data.data.needs_name
        }
      })
    },
    _trim(str) {
      return str.replace(/(^\s+)|(\s+$)/g, '')
    }
  },
  components: {
    MyTitle,
    Scroll,
    Confirm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #addProject
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
      line-height: 40px
      font-size: $font-size-large-x
      color: white
      top: 0
    .sof-hint
      span
        color: red
    .list
      position: fixed
      top: 0
      bottom: 55px
      width: 100%
      padding-top: 50px
      .select-list
        box-sizing: border-box
        margin: 10px
        .item-bg
          background: #fff
          margin-bottom: 5px
        .item-50
          display: inline-block
          width: 48%
          box-sizing: border-box
          padding: 10px
          >div
            width: 100%
            border-radius: 3px
            box-sizing: border-box
            >label
              color: #333
              line-height: 30px
              span
                color: red
              .select
                width: 100%
                height: 30px
                border-radius: 4px
                border: 1px solid #ccc
                color: #666
              .select-50
                width: 30%
                height: 30px
                border-radius: 4px
                border: 1px solid #ccc
                color: #666
              >input
                border: 1px solid #ccc
                width:70%
                height: 30px
                border-radius: 4px
                &::placeholder
                  padding-left: 10px
                  font-size: $font-size-small
            .item-houseHome
              color: #333
              line-height: 30px
              span
                color: red
              .select
                width: 100%
                height: 30px
                border-radius: 4px
                border: 1px solid #ccc
                color: #666
              .select-50
                width: 30%
                height: 30px
                border-radius: 4px
                border: 1px solid #ccc
                color: #666
              >input
                border: 1px solid #ccc
                width:70%
                height: 30px
                border-radius: 4px
                &::placeholder
                  padding-left: 10px
                  font-size: $font-size-small
        .item-100
          display: inline-block
          width: 100%
          box-sizing: border-box
          padding: 10px
          .needName
            input
              width: 97%
              margin-top: 10px
              border: 1px solid #ccc
              height: 30px
              border-radius: 4px
              &::placeholder
                padding-left: 10px
                font-size: $font-size-small
          .textarea
            width: 95%
            margin-top: 10px
          >div
            width: 100%
            border-radius: 3px
            box-sizing: border-box
            >p
              line-height: 30px
            .radio
              label
                vertical-align:middle
                margin-right: 5px
                box-sizing: border-box
                color: #666
                input[type=radio]
                  display: inline-block
                  vertical-align: middle
                  width: 20px
                  height: 20px
                  appearance: none
                  background-color: transparent
                  border: 0
                  outline: 0 !important
                  line-height: 20px
                  color: #d8d8d8
                  &:after
                    content: ""
                    display:block
                    width: 20px
                    height: 20px
                    border-radius: 50%
                    text-align: center
                    line-height: 14px
                    font-size: 16px
                    color: #fff
                    border: 2px solid #ddd
                    background-color: #fff
                    box-sizing:border-box
                  &:checked:after
                    content: "L"
                    transform:matrix(-0.766044,-0.642788,-0.642788,0.766044,0,0)
                    border-color: #37AF6E
                    background-color: #37AF6E
            .item-area
              line-height: 40px
              span
                color: red
              .item-input
                input
                  width: 30%
                  border: 1px solid #ccc
                  height: 30px
                  border-radius: 4px
                  &::placeholder
                    padding-left: 10px
                    font-size: $font-size-small
      .user-send
        padding: 15px
        text-align: right
        margin: 10px
        .btn
          display: inline-block
          text-align: center
          line-height: 35px
          width: 100%
          border: none
          height: 35px
          border-radius: 4px
          color: #fff
        .send
          background: #e5672c
        .default
          background: #fff
          border: 1px solid #ccc
          color: #e5672c
        .disabled
          background: #FF4949
          border: none
          border-color: #FF4949
          border-radius: 4px
          color: white
          font-size: $font-size-medium
</style>