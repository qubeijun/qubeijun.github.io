let vm = new Vue({
  el: '#app',
  data() {
    var inputvalidatePass = (rule, value, callback) => {
      var list = value.split('').map(Number)
      for (var i = 0; i < list.length; i++) {
        if (list[i] === 1 || list[i] === 0) {
          if (i !== list.length - 1) {
            continue
          } else {
            callback()
          }
        } else if (list[i] !== 1 && list[i] !== 0) {
          callback(new Error('Enter either 0 or 1'))
        }
      }
    }
    return {
      formItem: {
        input: '',
        output: 0
      },
      rules: { input: [{ validator: inputvalidatePass, trigger: 'blur' }] },
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
  mounted: function () { },
  methods: {
    b2d(value) {
      var list = value.split('').map(Number)
      for (var i = 0; i < list.length; i++) {
        if (list[i] !== 0) {
          var num = Math.pow(2, list.length - i - 1)
          this.formItem.output += num
        }
      }
    },
    submitForm(formName) {
      this.formItem.output = 0
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.b2d(this.formItem.input)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
  }
})