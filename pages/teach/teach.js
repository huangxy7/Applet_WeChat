// pages/teach/teach.js
Page({
// 页面的初始数据
  data: {
    multiIndex: [0, 0, 0],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    sentence: '输入句子:',
    recording: '录音:',
    temlu:''
  },
  onLoad: function (options) {
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        src: res.tempFilePath
      })
      that.tip("录音完成！")
    });
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
  },
  //提交数据到服务器
tijiao:function(){
  var src = this.data.src;
  var teachins = this.data.teachin;
  console.log('src:', src)
  console.log('teachin:', teachins)
  if (src == null || teachins == null) {
      this.tip("请先录音或填写句子！")
    }else{
    
     
    }
},
 //用户点击右上角分享
  onShareAppMessage: function () {

  },

   // 录制mp3音频
  startRecordMp3: function () {
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    this.recorderManager.start({
      format: 'mp3'
    });
  }
 // 停止录音
  , stopRecord: function () {
    this.setData({
      isSpeaking: false,
    })
    this.recorderManager.stop()
  }
   // 播放录音
  , playRecord: function () {
    var that = this;
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1300
    })  
  },
 
 /*选择地区器*/ 
 bindRegionChange: function (e) {
    console.log('教方言区域为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },  // 提示

  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
 /*获取句子中的值*/
 teachfut: function (e) {
   this.setData({
     teachin: e.detail.value
   })
 },

})
//话筒帧动画
function speaking() {
  var _this = this; 
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}  