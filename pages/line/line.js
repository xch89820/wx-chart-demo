// Line.js
// wxChart 线形图
var app = getApp()

var WxChart = require("../../utils/wx-chart.js");

// Base line chart
var baseLine = function(windowWidth) {
  let wxLiner = new WxChart.WxLiner('baseLine', {
    'width': windowWidth,
    'height': 350,
    'title': '销售量',
    'legends': [{
      'text': '巧克力'
    }]
  });

  wxLiner.update([{
    value: 1,
    label: '一月'
  }, {
    value: 40,
    label: '二月'
  }, {
    value: 35,
    label: '三月'
  }, {
    value: 56,
    label: '四月'
  }, {
    value: 71,
    label: '五月'
  }]);
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      // do something when get system info failed
    }

    baseLine(windowWidth);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})