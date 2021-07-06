<template>
  <div style="width: 250px;">
    <!-- iview组件 -->
    <Cascader
      v-if="reset"
      v-model="address"
      :disabled="disabled"
      :data="options"
      :load-data="loadData"
      @change="handleChage"
    />
  </div>
</template>

<script>
import * as Api from '@/api/addressList'
export default {
  props: ['baseInfo', 'disabled'],
  data() {
    return {
      reset: true,
      address: [],
      // regionHiera: {
      //   lazy: true,
      //   value: "id",
      //   label: "name",
      //   children: "children"
      // },
      options: []
    }
  },
  watch: {
    address(a, b) {
      // console.log(a, 'watch')
      this.baseInfo.provinceId = a[0]
      this.baseInfo.cityId = a[1]
      // this.baseInfo.townId = a[2];
      // if (a.length) {
      //   let itemProvince = this.options.filter(
      //     item => item.id == this.baseInfo.provinceId
      //   )[0]
      //   // 第一次默认赋值不进行绑定name
      //   if (!itemProvince.children.length) {
      //     return
      //   }
      //   this.baseInfo.provinceName = itemProvince ? itemProvince.name : ''
      //   let itemCity = itemProvince.children.filter(
      //     item => item.id == this.baseInfo.cityId
      //   )[0];
      //   this.baseInfo.cityName = itemCity ? itemCity.name : ''
      //   let itemTown = itemCity.children.filter(
      //     item => item.id == this.baseInfo.townId
      //   )[0];
      //   this.baseInfo.townName = itemTown ? itemTown.name : ''
      // } else {
      //   this.baseInfo.provinceName = ''
      //   this.baseInfo.cityName = ''
      //   this.baseInfo.townName = ''
      // }
      // 获取市级 city
      this.$emit('update:baseInfo', this.baseInfo)
    }
  },
  created() {
    // console.log(this.baseInfo,'2')
    this.init()
  },
  methods: {
    init() {
      Api.addressList(0).then(res => {
        const { code, data, msg } = res
        if (code == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].children = []
            data[i].loading = false
            data[i].value = data[i].id
            data[i].label = data[i].name
          }
          this.options = data
          this.loadaddr()
        }
      })
    },

    handleChage() {},
    loadaddr() {
      const provinceId = this.baseInfo.provinceId
      const cityId = this.baseInfo.cityId
      // console.log(provinceId, cityId,'provinceId, cityId')
      // const townId = this.baseInfo.townId
      const options = this.options
      if (!provinceId) {
        return
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i].id == provinceId) {
          this.loadData(options[i], e => {
            options[i].children = e
            // console.log(cityId,'cityId')
            if (!cityId) {
              return
            }
            // for (let j = 0; j < options[i].children.length; j++) {
            //   if (options[i].children[j].id == cityId) {
            //     this.loadData(options[i].children[j], e => {
            //       options[i].children[j].children = e;
            //       this.options = options;
            //       this.reset = false;
            //       this.address = [provinceId, cityId ];
            //       // this.address = [provinceId, cityId, townId];
            //       this.$nextTick(e => {
            //         this.reset = true;
            //       });
            //     });
            //   }
            // }
          })
        }
      }
      // this.address = [provinceId, cityId, townId];
      this.address = [provinceId, cityId]
    },
    loadData(item, callback) {
      item.loading = true
      Api.addressNextList(item.id).then(res => {
        const { code, data, msg } = res
        if (code == 200) {
          for (let i = 0; i < data.length; i++) {
            if (item.level < 1) {
              data[i].children = []
              data[i].loading = false
            }
            data[i].value = data[i].id
            data[i].label = data[i].name
          }

          item.children = data
          item.loading = false
          callback(data)
        }
      })
    },
    handleItemChange(val) {
      this.getLevf(val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
