// Line.js
// wxChart 线形图
let app = getApp()

let WxChart = require("../../utils/wx-chart.js");
let Utils = require("../../utils/util.js");

const labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];

// Base line chart
let baseLine = windowWidth => {
    let wxLiner = new WxChart.WxLiner('baseLine', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        yScaleOptions: {
            position: 'left',
            title: '万元'
        },
        legends: [{
            text: '巧克力'
        }]
    });

    wxLiner.update(Utils.dataGenerator(labels));
    return {
        chart: wxLiner,
        redraw: () => {
            wxLiner.update(Utils.dataGenerator(labels));
        }
    };
};

let multiLine = windowWidth => {
    let wxLiner = new WxChart.WxLiner('multiLine', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        yScaleOptions: {
            position: 'left',
            title: '万元'
        },
        legends: [{
            text: '巧克力',
            key: 'chocolate'
        }, {
            text: '水果',
            key: 'fruit'
        }]
    });

    wxLiner.update(Utils.dataGenerator(labels, ['chocolate', 'fruit']));
    return {
        chart: wxLiner,
        redraw: () => {
            wxLiner.update(Utils.dataGenerator(labels, ['chocolate', 'fruit']));
        }
    };
};

let multiFillLine = windowWidth => {
    let wxLiner = new WxChart.WxLiner('multiFillLine', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        yScaleOptions: {
            position: 'left',
            title: '万元'
        },
        crossScaleOptions: {
            xFirstPointSpace: 0
        },
        legends: [{
            text: '日用品',
            key: 'dailyNecessities',
            fillArea: true,
            fillStyle: '#3385ff',
            strokeStyle: '#3385ff'
        }, {
            text: '水果',
            key: 'fruit',
            fillArea: true,
            fillStyle: '#238456',
            strokeStyle: '#238456'
        }, {
            text: '家电',
            key: 'appliances'
        }]
    });

    wxLiner.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances']));
    return {
        chart: wxLiner,
        redraw: () => {
            wxLiner.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances']));
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
        let chart = this.data[canvasName + 'Chart'];
        chart.redraw();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let windowWidth = 320
        try {
            let res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            // do something when get system info failed
        }

        let baseLineChart = baseLine(windowWidth);
        let multiLineChart = multiLine(windowWidth);
        let multiFillLineChart = multiFillLine(windowWidth);

        this.setData({
            windowWidth: windowWidth,
            baseLineChart: baseLineChart,
            multiLineChart: multiLineChart,
            multiFillLineChart: multiFillLineChart
        });
    }
});