// Pie.js
// wxChart 柱状图
let app = getApp()

let WxChart = require("../../utils/wx-chart.js");
let getChartInstances = WxChart.getChartInstances;
let Utils = require("../../utils/util.js");
const labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];

let formatLabel = function (label, value, totalValue) {
    return label + ' (' + value + '万元)';
};
let percentageFormatLabel = function (label, value, index, totalValue) {
    return label + ' (' + (value / totalValue * 100).toFixed(2) + '%)';
};

let tapHandlers = {};

let basePie = windowWidth => {

    let wxPie = new WxChart.WxDoughnut('basePie', {
        width: windowWidth,
        height: 350,
        title: '销售量',
        cutoutPercentage: 0
    });

    wxPie.update(Utils.dataGenerator(labels));
    
    return {
        chart: wxPie,
        redraw: () => {
            wxPie.update(Utils.dataGenerator(labels));
        }
    };
};

let baseDoughnut = windowWidth => {
    let wxPie = new WxChart.WxDoughnut('baseDoughnut', {
        width: windowWidth,
        height: 350,
        title: '销售量',
        point: {
          format: percentageFormatLabel
        }
    });

    wxPie.update(Utils.dataGenerator(labels));

    return {
      chart: wxPie,
      redraw: () => {
        wxPie.update(Utils.dataGenerator(labels));
      }
    };
};

let percentageDoughnut = windowWidth => {
    let wxPie = new WxChart.WxDoughnut('percentageDoughnut', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        cutoutPercentage: 20,
        point: {
          format: percentageFormatLabel
        }
    });

    let initPercentage = 40,
        datas = Utils.dataGenerator(labels);
    datas.forEach(x => {
        x.format = formatLabel;
        x.percentage = initPercentage;
        initPercentage += 8;
    });
    wxPie.update(datas);


    return {
        chart: wxPie,
        redraw: () => {
            let initPercentage = 40,
                datas = Utils.dataGenerator(labels);
            datas.forEach(x => {
                x.format = formatLabel;
                x.percentage = initPercentage;
                initPercentage += 8;
            });
            wxPie.update(datas);
        }
    };
};


Page({
    data: {},
    changeChart: function (e) {
        let canvasName = e.target.dataset.canvasName;
        let chart = this[canvasName + 'Chart'];
        chart.redraw();
    }, 
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        let me = this;
        let windowWidth = 320
        try {
            let res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            // do something when get system info failed
        }

        me.basePieChart = basePie(windowWidth);
        me.baseDoughnutChart = baseDoughnut(windowWidth);
        me.percentageDoughnutChart = percentageDoughnut(windowWidth);

        // 绑定点击事件
        me.basePieChart.chart.once('draw', function(views) {
          me.basePieTapHandler = this.mouseoverTooltip(views);
        }, me.basePieChart.chart);

        me.baseDoughnutChart.chart.once('draw', function (views) {
          me.baseDoughnutTapHandler = this.mouseoverTooltip(views);
        }, me.baseDoughnutChart.chart);

        me.percentageDoughnutChart.chart.once('draw', function (views) {
          me.percentageDoughnutTapHandler = this.mouseoverTooltip(views);
        }, me.percentageDoughnutChart.chart);
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})