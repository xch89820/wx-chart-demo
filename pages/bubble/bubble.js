// Bubble.js
// wxChart 柱状图
let app = getApp()

let WxChart = require("../../utils/wx-chart.js");
let Utils = require("../../utils/util.js");

const labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];

// Base line chart
let baseBubble = windowWidth => {
  let wxBubble = new WxChart.WxBubble('baseBubble', {
    width: windowWidth,
    height: 350,
    title: '数据量/覆盖度统计',
    yScaleOptions: {
      position: 'left',
      title: '覆盖率（%）'
    },
    // 去掉边框
    point: {
      pointBorderWidth: 0
    },
    legends: [{
      text: '北京'
    }]
  });

  wxBubble.update(Utils.dataGenerator(labels, ['value', 'z']));
  return {
    chart: wxBubble,
    redraw: () => {
      wxBubble.update(Utils.dataGenerator(labels, ['value','z']));
    }
  };
};

let multiBubble = windowWidth => {
  let wxBubble = new WxChart.WxBubble('multiBubble', {
    width: windowWidth,
    height: 350,
    title: '数据量/覆盖度统计',
    yScaleOptions: {
      position: 'left',
      title: '覆盖率（%）'
    },
    legends: [{
      text: '北京',
      key: 'bj',
      rKey: 'bjz',
      fillStyle: '#3385ff',
      strokeStyle: '#3385ff'
    }, {
      text: '上海',
      key: 'sh',
      rKey: 'shz'
    }],
    tooltip: {
      model: 'axis'
    }
  });

  wxBubble.update(Utils.dataGenerator(labels, ['bj', 'bjz', 'sh', 'shz']));
  return {
    chart: wxBubble,
    redraw: () => {
      wxBubble.update(Utils.dataGenerator(labels, ['bj', 'bjz', 'sh', 'shz']));
    }
  };
};

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  changeChart: function (e) {
    let canvasName = e.target.dataset.canvasName;
    let chart = this[canvasName + 'Chart'];
    chart.redraw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let me = this;
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      // do something when get system info failed
    }

    me.baseBubbleChart = baseBubble(windowWidth);
    me.multiBubbleChart = multiBubble(windowWidth);

    me.baseBubbleChart.chart.once('draw', function (views) {
      me.baseBubbleChartTapHandler = this.mouseoverTooltip(views);
    }, me.baseBubbleChart.chart);

    me.multiBubbleChart.chart.once('draw', function (views) {
      me.multiBubbleChartTapHandler = this.mouseoverTooltip(views);
    }, me.multiBubbleChart.chart);
  }
})