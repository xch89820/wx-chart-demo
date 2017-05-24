// Bar.js
// wxChart 柱状图
let app = getApp()

let WxChart = require("../../utils/wx-chart.js");
let Utils = require("../../utils/util.js");

const labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];

// Base line chart
let baseBar = windowWidth => {
    let wxBar = new WxChart.WxBar('baseBar', {
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

    wxBar.update(Utils.dataGenerator(labels));
    return {
        chart: wxBar,
        redraw: () => {
            wxBar.update(Utils.dataGenerator(labels));
        }
    };
};

let multiBar = windowWidth => {
    let wxBar = new WxChart.WxBar('multiBar', {
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

    wxBar.update(Utils.dataGenerator(labels, ['chocolate', 'fruit']));
    return {
        chart: wxBar,
        redraw: () => {
            wxBar.update(Utils.dataGenerator(labels, ['chocolate', 'fruit']));
        }
    };
};

let multiNegBar = windowWidth => {
    let wxBar = new WxChart.WxBar('multiNegBar', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        yScaleOptions: {
            position: 'left',
            title: '万元'
        },
        legends: [{
            text: '日用品',
            key: 'dailyNecessities',
            fillStyle: '#3385ff',
            strokeStyle: '#3385ff'
        }, {
            text: '水果',
            key: 'fruit',
            fillStyle: '#238456',
            strokeStyle: '#238456'
        }, {
            text: '家电',
            key: 'appliances'
        }]
    });

    wxBar.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances'], -20, 60));
    return {
        chart: wxBar,
        redraw: () => {
            wxBar.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances'], -20, 60));
        }
    };
}

let multiStackBar = windowWidth => {
    let wxBar = new WxChart.WxBar('multiStackBar', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        yScaleOptions: {
            position: 'left',
            title: '万元'
        },
        stacked: true,
        legends: [{
            text: '日用品',
            key: 'dailyNecessities',
            fillStyle: '#3385ff',
            strokeStyle: '#3385ff'
        }, {
            text: '水果',
            key: 'fruit',
            fillStyle: '#238456',
            strokeStyle: '#238456'
        }, {
            text: '家电',
            key: 'appliances'
        }]
    });

    wxBar.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances']));
    return {
        chart: wxBar,
        redraw: () => {
            wxBar.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances']));
        }
    };
}

let multiStackNegBar = windowWidth => {
    let wxBar = new WxChart.WxBar('multiStackNegBar', {
        width: windowWidth,
        height: 350,
        title: '销售额',
        yScaleOptions: {
            position: 'left',
            title: '万元'
        },
        stacked: true,
        legends: [{
            text: '日用品',
            key: 'dailyNecessities',
            fillStyle: '#3385ff',
            strokeStyle: '#3385ff'
        }, {
            text: '水果',
            key: 'fruit',
            fillStyle: '#238456',
            strokeStyle: '#238456'
        }, {
            text: '家电',
            key: 'appliances'
        }]
    });

    wxBar.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances'], -20, 60));
    return {
        chart: wxBar,
        redraw: () => {
            wxBar.update(Utils.dataGenerator(labels, ['dailyNecessities', 'fruit', 'appliances'], -20, 60));
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
        let windowWidth = 320;
        try {
            let res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            // do something when get system info failed
        }

        let baseBarChart = baseBar(windowWidth);
        let multiBarChart = multiBar(windowWidth);
        let multiNegBarChart = multiNegBar(windowWidth);
        let multiStackBarChart = multiStackBar(windowWidth);
        let multiStackNegBarChart = multiStackNegBar(windowWidth);

        this.setData({
            windowWidth: windowWidth,
            baseBarChart: baseBarChart,
            multiBarChart: multiBarChart,
            multiNegBarChart: multiNegBarChart,
            multiStackBarChart: multiStackBarChart,
            multiStackNegBarChart: multiStackNegBarChart
        });
    }
})