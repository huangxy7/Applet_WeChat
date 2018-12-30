const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    routers: [
      {
        text: '我的地域',
        icon: '../image/location.png',
        url: '../myAccount/myAccount',
      },
      {
        text: '我的方言',
        icon: '../image/mine.png',
        url: '../myAccount/myAccount',
      },
      {
        text: '学习次数',
        icon: '../image/learn.png',
        url: '../myAccount/myAccount',
      },
      {
        text: '教学次数',
        icon: '../image/teach.png',
        url: '../myAccount/myAccount',
      }
    ]
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    console.log(app.globalData.codes)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        console.log('已注册')
      } else {
        console.log('开始注册')
        wx.request({
          url: 'http://192.168.123.236:8000/api/gettoken/',
          data: {
            code: app.globalData.codes,
            encryptdata: e.detail.encryptedData,
            iv: e.detail.iv
          },
          method: 'GET',
          success: t => {
            console.log('登录状态：', t.data.state)
            console.log(t.data.token)
            wx.setStorage({
              key: "key",
              data: t.data.token
            })
          }
        })
      }
    } catch (e) {
      console.log('失败')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    
  }
})