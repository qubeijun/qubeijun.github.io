var demo_str = `
<el-main class="bordermain">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-slider v-model="value1" class="top" @input="handleTop(value1)" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-slider v-model="value2" class="left" vertical @input="handleLeft(value2)" />
      </el-col>
      <el-col :span="8">
        <div
          ref="middle"
          :style="{ 'border-top-left-radius': borderTopLeftRadius,
                    'border-top-right-radius': borderTopRightRadius,
                    'border-bottom-right-radius': borderBottomRightRadius,
                    'border-bottom-left-radius': borderBottomLeftRadius}"
          class="middle"
        ></div>
        <!-- <div
          ref="middle"
          :style="{ 'border-radius': borderRadius}"
          class="middle"
        /> -->
      </el-col>
      <el-col :span="8">
        <el-slider v-model="value3" class="right" vertical @input="handleRight(value3)" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-slider v-model="value4" class="bottom" @input="handleBottom(value4)" />
      </el-col>
    </el-row>
  </el-main>
`
var demoComponent = Vue.extend({
  template:demo_str ,
  data:function(){
    return {
      borderTopLeftRadius: '30% 30%',
      borderTopRightRadius: '70% 30%',
      borderBottomRightRadius: '70% 70%',
      borderBottomLeftRadius: '30% 70%',
      value1: 30,
      value2: 70,
      value3: 70,
      value4: 30
    }
  },
  method:{
    
    handleTop(value) {
      var _borderTopLeftRadius = this.$refs.middle.style.borderTopLeftRadius.split(' ')
      var _borderTopRightRadius = this.$refs.middle.style.borderTopRightRadius.split(' ')
      _borderTopLeftRadius[0] = value.toString() + '%'
      _borderTopRightRadius[0] = (100 - value).toString() + '%'
      this.borderTopLeftRadius = _borderTopLeftRadius.join(' ')
      this.borderTopRightRadius = _borderTopRightRadius.join(' ')
    },
    handleLeft(value) {
      var _borderTopLeftRadius = this.$refs.middle.style.borderTopLeftRadius.split(' ')
      var _borderBottomLeftRadius = this.$refs.middle.style.borderBottomLeftRadius.split(' ')
      _borderTopLeftRadius[1] = (100 - value).toString() + '%'
      _borderBottomLeftRadius[1] = value.toString() + '%'
      this.borderTopLeftRadius = _borderTopLeftRadius.join(' ')
      this.borderBottomLeftRadius = _borderBottomLeftRadius.join(' ')
    },
    handleRight(value) {
      var _borderTopRightRadius = this.$refs.middle.style.borderTopRightRadius.split(' ')
      var _borderBottomRightRadius = this.$refs.middle.style.borderBottomRightRadius.split(' ')
      _borderTopRightRadius[1] = (100 - value).toString() + '%'
      _borderBottomRightRadius[1] = value.toString() + '%'
      this.borderTopRightRadius = _borderTopRightRadius.join(' ')
      this.borderBottomRightRadius = _borderBottomRightRadius.join(' ')
    },
    handleBottom(value) {
      var _borderBottomRightRadius = this.$refs.middle.style.borderBottomRightRadius.split(' ')
      var _borderBottomLeftRadius = this.$refs.middle.style.borderBottomLeftRadius.split(' ')
      _borderBottomLeftRadius[0] = value.toString() + '%'
      _borderBottomRightRadius[0] = (100 - value).toString() + '%'
      this.borderBottomRightRadius = _borderBottomRightRadius.join(' ')
      this.borderBottomLeftRadius = _borderBottomLeftRadius.join(' ')
    }
  },
  mounted(){}
})

Vue.component('border',demoComponent )  //注：此处my-demo就是html中组件的名字
