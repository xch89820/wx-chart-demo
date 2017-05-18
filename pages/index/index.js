//index.js
//获取应用实例
var app = getApp()

var wxChart = require("../../utils/wx-chart.js");
Page({
  // data: {
  //   motto: 'Hello World',
  //   userInfo: {}
  // },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      // do something when get system info failed
    }

    let wxDoughnut = new wxChart.WxDoughnut('myCanvas', {
      'width': windowWidth,
      'height': 350,
      'cutoutPercentage': 0,
      'title': '测试饼图',
      'legendOptions': {
        'position': 'bottom'
      }
    });

    wxDoughnut.update([{
      label: '测试',
      value: 100,
      percentage: 50
    }, {
      label: '测试2',
      value: 100,
      percentage: 60
    }, {
      label: '测试3',
      value: 50,
      percentage: 70
    }, {
      label: '测试4',
      value: 30,
      percentage: 80
    }, {
      label: '测试5',
      value: 30,
      percentage: 100
    }]);


    let wxLiner = new wxChart.WxLiner('myCanvas1', {
      'width': windowWidth,
      'height': 350,
      'title': '测试线状图',
      'fillArea': true,
      'crossScaleOptions': {
        'xFirstPointSpace': 0
      },
      'legends': [{
        'text': '测试图1',
        'key': 'test1',
        'fillStyle': '#3385ff',
        'strokeStyle': '#3385ff'
      }, {
        'text': '测试图2',
        'key': 'test2',
      }]
    });

    wxLiner.update([{
      test1: 10,
      test2: 20,
      label: '一月'
    }, {
      test1: 40,
      test2: 115,
      label: '二月'
    }, {
      test1: 35,
      test2: 34.5,
      label: '三月'
    }, {
      test1: 56,
      test2: 22,
      label: '四月'
    }, {
      test1: 71,
      test2: 56,
      label: '五月'
    }]);


    let wxBar = new wxChart.WxBar('myCanvas2', {
      'width': windowWidth,
      'height': 350,
      'title': '测试柱状图',
      'stacked': true,
      'legends': [{
        'text': '测试图1',
        //'borderWidth': 0,
        'key': 'test1'
      }, {
        'text': '测试图2',
        'key': 'test2',
        //'borderWidth': 0
      }]
    });

    wxBar.update([{
      test1: 10,
      test2: 20,
      label: '一月'
    }, {
      test1: 42,
      test2: 115,
      label: '二月'
    }, {
      test1: 38,
      test2: 34.5,
      label: '三月'
    }, {
      test1: 56,
      test2: 22,
      label: '四月'
    }, {
      test1: 71,
      test2: 56,
      label: '五月'
    }]);
  }
})
