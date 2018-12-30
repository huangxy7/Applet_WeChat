Page({
 //页面的初始数据
  data: {
    j: 1,//帧动画初始图片  
    isSpeaking: false,//是否正在说话  
    multiIndex: [0, 0, 0],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    sentence: '句子:',
    voice: '语音:',
    recording: '录音:',
    similarity: '匹配度：',
    ax: '获取的数据',
    upvoice:'获取语音数据',
    simlary:'获取匹配度',
    studyin:''
  },

  // 生命周期函数--监听页面加载

  onLoad: function (options) {
  
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function(){
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function(res){
      that.setData({
        src: res.tempFilePath 
      })
      console.log(res.tempFilePath )
      that.tip("录音完成！")
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })

  },
//用户点击右上角分享
  onShareAppMessage: function () {
  
  }
//提示
  , tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  }


  //录制mp3音频

  , startRecordMp3: function () {
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
  ,stopRecord: function(){
    this.setData({
      isSpeaking: false,
    })
    this.recorderManager.stop()
  }
  //播放录音
  , playRecord: function(){
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
  upfile: function () {
    var src = this.data.src;
    console.log(src)
    if (src == null) {
      this.tip("请先录音！")
    } else {
      console.log('1')
      wx.uploadFile({
        url: 'http://ubuntu.huangdf.com/~jsj16117/php/bookmark/bm2/', //仅为示例，非真实的接口地址
        filePath: src,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {//成功后服务器返回的函数
          console.log('3')
          var data = res.data
        }
      })
      console.log('4')
    }
  },
  /*选择地区器*/ 
 bindRegionChange: function (e) {
    console.log('学方言区域', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})
/*话筒帧动画 */
function speaking() {
  var _this = this;
  //话筒帧动画  
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}  