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
    }
  },
  method:{},
  mounted(){}
})

Vue.component('border',demoComponent )  //注：此处my-demo就是html中组件的名字
