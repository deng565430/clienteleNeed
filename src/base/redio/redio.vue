<template>
  <div class="redio">
    <span  @click="checked(item, index)" class="label" :class="item.isChecked ? 'checked-style' : 'no-checked-style'" :key="item" v-for="(item, index) in data">
      {{item.value}}
    </span>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: [
          {
            isChecked: false,
            key: '223',
            value: '223'
          },
          {
            isChecked: false,
            key: '333',
            value: '333'
          },
          {
            isChecked: false,
            key: '434',
            value: '434'
          },
          {
            isChecked: false,
            key: '563',
            value: '563'
          }
        ]
      },
      dataName: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dataList: this.data
      }
    },
    methods: {
      checked(item, index) {
        this.data.map((res, i) => {
          if (index !== i) {
            res.isChecked = false
          } else {
            res.isChecked = !res.isChecked
          }
        })
        this.$emit('checkedVal', {item, dataName: this.dataName})
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .redio
    .label
      display: inline-block;
      font-size: 12px
      width: 3.5rem
      line-height: 30px
      border-radius: 20px
      text-align: center
      margin: 3px 0
      margin-left: .3rem
      transition: all .3s
    .no-checked-style
      border: 1px solid #8c8c8c
      color: #8c8c8c
    .checked-style
      border: 1px solid #ff5d00
      background: #ff5d00
      color: #fff
</style>
