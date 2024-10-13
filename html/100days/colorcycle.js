var demo_str = `
  <el-main class="colorcycle"></el-main>
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

Vue.component('colorcycle',demoComponent )  //注：此处my-demo就是html中组件的名字
