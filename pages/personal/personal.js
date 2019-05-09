// pages/personal/personal.js
// 引入城市json
import { regionData } from "../../city/city.js"
Page({
  /**
   * 页面的初始数据
   * show 显示隐藏
   * pageList 城市数据
   * selected 已经选择的
   * quantity 有多少层0 1 2 
   * page 第几层
   * value 取到输入框的值
   */
  data: {
    // 城市
    city: {
      show: false,
      pageList: regionData,
      data: regionData,
      name: 'city',
      title: '选择地区',
      value: '',
      selected: [],
      index: 0,
      page: 0,
      quantity: 2,
      multipleChoice: false
    },
    publicObj: {}
  },
  // 点击输入框弹出地址选择框
  cityFocus() {
    this.setData({
      'city.show': true
    })
  },
  //通过事件接收子组件传过来的参数
  city: function (event) {
    let list = []
    let selected = event.detail;
    for (let i = 0; i < selected.length; i++) {
      if (i == selected.length - 1) {
        list += selected[i].select
      } else {
        // 选择之后加一个-
        list += selected[i].select + "-"
      }
    }
    this.setData({
      "city.selected": selected,
      "city.value": list,
    })
  },
})
