/**
 * Created by ex_chenxw on 2017-08-01.
 */
import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Platform, Loading } from 'ionic-angular';
import { Camera, AppVersion, Toast, ImagePicker } from 'ionic-native';

declare let cordova: any;
declare let window: any;
declare let LocationPlugin: any;
declare let AMapNavigation: any;

//cordova方法
const _MIDEA_COMMON = 'MideaCommon',
  _MIDEA_USER = 'MideaUser',
  _MIDEA_BARCODE = 'MideaBarcode',
  _MIDEA_MAP = 'MideaMap',
  _MIDEA_ANNTO = 'MideaAnnto',
  _MIDEA_SALE = 'MideaSale',
  _MIDEA_PDF = "MideaPdf";

@Injectable()
export class NativeService {
  private loading: Loading;
  private loadRunning: boolean = false;

  constructor(private platform: Platform,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid() {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos() {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast = (message: string = '操作完成', duration: number = 2000, position: string = "top") => {
    if (this.isMobile()) {
      Toast.show(message, String(duration), 'center').subscribe();
    } else {
      //  console.log(window.plugin.Cordova);
      //  console.log("***********************************");
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,
        showCloseButton: false
      }).present();
    }
  };

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = '') => {
    // console.log(cordova);
    // console.log("***********************************");
    if (!this.loadRunning) {
      this.loadRunning = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {//最长显示10秒
        this.loading.dismiss();
        this.loadRunning = false;
      }, 10000);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading = () => {
    if (this.loadRunning) {
      this.loading.dismiss();
      this.loadRunning = false;
    }
  };


  /**********在nativeService中封装底座方法，自定义cordova方法 typeScript语法declare let cordova:any;****
   * ************************************************************************************************/
  
  /**
   * 调用cordova的方法
   * @alias widgetFactory
   * @param name {string} 方法组、类别
   * @param method {string} 方法名称
   * @param params {Array} 参数
   * @return {promise}
   */
  callApi = (name: any, method: any, params: any) => {
    return new Promise(function (resolve, reject) {
      if (window.cordova) {
        try {
          window.cordova.exec(function (msg: any) {
            resolve(msg);
          }, function (msg: any) {
            reject(msg);
          }, name, method, params || []);
        } catch (e) {
          console.log('_error', 'widget error:', e);
          reject(e);
        }
      } else {
        console.log('_debug', 'Cordova is not exist');
        reject('Cordova is not exist');
      }
    });
  }

  /**
   * 显示菜单
   * @return {*|promise}
   */
  showMenu() {
    return this.callApi(_MIDEA_COMMON, 'showMenu', null);
  }
  /**
   * 显示导航
   * @return {*|promise}
   */
  showNav() {
    return this.callApi(_MIDEA_COMMON, 'showNav', null);
  }
  /**
   * 隐藏导航
   * @return {*|promise}
   */
  hideNav() {
    return this.callApi(_MIDEA_COMMON, 'hideNav', null);
  }
  /**
   * 退出应用
   * @return {*|promise}
   */
  exit() {
    return this.callApi(_MIDEA_COMMON, 'exit', null);
  }
  /**
   * 后退
   * @return {*|promise}
   */
  goBack() {
    return this.callApi(_MIDEA_COMMON, 'goBack', null);
  }
  /**
   * 开始监听手机摇动
   * @return {*|promise}
   */
  shake() {
    return this.callApi(_MIDEA_COMMON, 'shake', null);
  }
  /**
   * 停止监听手机摇动
   * @return {*|promise}
   */
  shakeStop() {
    return this.callApi(_MIDEA_COMMON, 'shakeStop', null);
  }
  /**
   * 显示悬浮菜单
   * @return {*|promise}
   */
  showFloat() {
    return this.callApi(_MIDEA_COMMON, 'showFloat', null);
  }
  /**
   * 隐藏悬浮菜单
   * @return {*|promise}
   */
  hideFloat() {
    return this.callApi(_MIDEA_COMMON, 'hideFloat', null);
  }
  /**
   * 获取当前语言
   * @return {*|promise}
   */
  language() {
    return this.callApi(_MIDEA_COMMON, 'language', null);
  }
  /**
   * 获取用户信息
   * @return {*|promise}
   */
  getUser() {
    return this.callApi(_MIDEA_USER, 'getUser', null);
  }
  /**
   * 获取用户信息-直通宝
   * @return {*|promise}
   */
  getUserMap() {
    return this.callApi(_MIDEA_USER, 'getUserMap', null);
  }
  /**
   * 启动扫码
   * @return {*|promise}
   */
  scan() {
    return this.callApi(_MIDEA_BARCODE, 'scan', null);
  }
  /**
   * 启动扫码
   * @return {*|promise}
   */
  scanNow() {
    return this.callApi(_MIDEA_BARCODE, 'scanNow', null);
  }

  /**
   * 获取扫码结果
   * @return {*|promise}
   */
  getScanExtra = () => {
    return this.callApi(_MIDEA_BARCODE, 'getScanExtra', null);
  };
  /**
   * 获取位置信息
   * @param arr {array} 参数
   * @return {*|promise}
   */
  location = (arr) => {
    return this.callApi(_MIDEA_MAP, 'location', arr);
  };
  /**
   * 开始更新位置信息
   * @param arr {array} 参数
   * @return {*|promise}
   */
  startUpdatingLocation = (arr) => {
    return this.callApi(_MIDEA_MAP, 'startUpdatingLocation', arr);
  };
  /**
   * 停止更新位置信息
   * @return {*|promise}
   */
  stopUpdatingLocation = () => {
    return this.callApi(_MIDEA_MAP, 'stopUpdatingLocation', null);
  }
  /**
   * 导航
   * @param arr {array} 参数
   * @return {*|promise}
   */
  // navigation =(arr) => {
  //     return this.callApi(_MIDEA_MAP, 'navTo', arr);
  // };
  /**
   * 获取通讯录
   * @param fields {string} 查找内容
   * @param options {array} 参数
   * @return {*}
   */
  // getContact: function(fields, options) {
  //     var defer = $q.defer();

  //     try {
  //         navigator.service.contacts.find(fields,
  //             function(msg) {
  //                 defer.resolve(msg);
  //             }, function(msg) {
  //                 defer.reject(msg);
  //             }, options);
  //     } catch (e) {
  //         $log.error(e);
  //         defer.reject(e);
  //     }

  //     return defer.promise;
  // };
  /**
   * 组织架构单选
   * @return {*|promise}
   */
  orgChoose = () => {
    return this.callApi(_MIDEA_USER, 'orgChoose', null);
  };
  /**
   * 组织架构多选
   * @param p {array} 参数
   * @return {*|promise}
   */
  orgMuChoose = (p) => {
    return this.callApi(_MIDEA_USER, 'orgMuChoose', p);
  };
  /**
   * 改变状态栏颜色-仅IOS
   * @param p {array} 参数 [r, g, b]
   * @return {*|promise}
   */
  changeColor = (p) => {
    return this.callApi(_MIDEA_COMMON, 'statusBarColor', p);
  };
  /**
   * 登出，注销用户
   * @return {*|promise}
   */
  logout = () => {
    return this.callApi(_MIDEA_COMMON, 'logout', null);
  };
  /**
   * 获取webview信息
   * @return {*|promise}
   */
  webview = () => {
    return this.callApi(_MIDEA_COMMON, 'webview', null);
  };
  /**
   * 获取屏幕信息
   * @return {*|promise}
   */
  screen = () => {
    return this.callApi(_MIDEA_COMMON, 'screen', null);
  };
  /**
   * 获取额外启动参数
   * @param params {array} 参数
   * @return {*|promise}
   */
  getExtra = (params) => {
    return this.callApi(_MIDEA_COMMON, 'getExtra', params);
  };
  /**
   * 获取设备信息
   * @return {*|promise}
   */
  getDeviceInfo = () => {
    return this.callApi(_MIDEA_COMMON, 'getDeviceInfo', null);
  };
  /**
   * 用外部浏览器打开链接
   * @param url {string} 链接地址url
   * @return {*|promise}
   */
  openUrl = (url) => {
    return this.callApi(_MIDEA_COMMON, 'openSysBrowser', [url]);
  };
  /**
   * h5事件监听
   * @param params {array} 参数
   * @return {*|promise}
   */
  statistics = (params) => {
    return this.callApi(_MIDEA_COMMON, 'onEvent', params);
  };
  /**
   * 分享
   * @param params {array} 参数
   * @return {*|promise}
   */
  share = (params) => {
    return this.callApi(_MIDEA_COMMON, 'share', params);
  };
  /**
   * 打开应用页面
   * @return {*|promise}
   */
  showAppView = () => {
    return this.callApi(_MIDEA_COMMON, 'showAppView', ['messageView']);
  };
  /**
   * 打开通讯录
   * @return {*|promise}
   */
  getPhoneMan = () => {
    return this.callApi(_MIDEA_USER, 'getContact', null);
  };
  /**
   * 打开个人设置页面
   * @return {*|promise}
   */
  goPersonalSet = () => {
    return this.callApi(_MIDEA_COMMON, 'showSetView', null);
  };
  /**
   * 打开“我的”页面
   * @return {*|promise}
   */
  goMyView = () => {
    return this.callApi(_MIDEA_COMMON, 'showMyView', null);
  };
  /**
   * 打开widget
   * @param params {array} 参数
   * @return {*|promise}
   */
  showWidget = (params) => {
    return this.callApi(_MIDEA_COMMON, 'showWidget', params);
  };
  /**
   * 显示键盘
   * @return {*|promise}
   */
  showInput = () => {
    return this.callApi(_MIDEA_COMMON, 'showInput', null);
  };
  /**
   * 隐藏键盘
   * @return {*|promise}
   */
  hideInput = () => {
    return this.callApi(_MIDEA_COMMON, 'hideInput', null);
  };
  /**
   * 打开消息页面
   * @return {*|promise}
   */
  showMessageView = () => {
    return this.callApi(_MIDEA_COMMON, 'showAppView', ['messageView']);
  };
  /**
   * 打开美的通导购的意见反馈
   * @return {*|promise}
   */
  showFeedback = () => {
    return this.callApi(_MIDEA_SALE, 'showFeedback', null);
  };
  /**
   * 批量将图片转换成base64码
   * @param pictureList {array} 图片列表
   * @return {*|promise}
   */
  getBase64CodeFromPictures = (pictureList) => {
    return this.callApi(_MIDEA_COMMON, 'getBase64s', pictureList);
  };
  /**
   * 跳转到系统设置页面，
   * @param arr arr[0]为要跳转的对应的设置页面，暂时支持  蜂窝网络：CellularNetWork，WIFI：WIFI
   * @returns {*}
   */
  gotoSystemSetting = (arr) => {
    return this.callApi(_MIDEA_COMMON, 'gotoSystemSetting', arr);
  };
  /**
   * 附件展示
   * @param param {array} 附件链接url列表
   * @return {Promise}
   */
  showPdf = (param) => {
    return this.callApi(_MIDEA_PDF, 'showPdf', param);
  };
  /**
   * 附件txt展示
   * @param param {array} 参数
   * @return {Promise}
   */
  showTxt = (param) => {
    return this.callApi(_MIDEA_PDF, 'showTxt', param);
  };
  /**
   * @description c4a对称加密
   * @param params {string} 字符串
   * @returns {Promise}
   */
  financeAesEncrypt = (params) => {
    return this.callApi('MideaFinancePlugin', 'AESEncrypt', [params]);
  };
  /**
   * @description c4a对称解密
   * @param params {string} 字符串
   * @returns {Promise}
   */
  financeAesDecrypt = (params) => {
    return this.callApi('MideaFinancePlugin', 'AESDecrypt', [params]);
  };
  /**
   * @description c4a非对称加密
   * @param params {string} 字符串
   * @returns {Promise}
   */
  financeRsaEncrypt = (params) => {
    return this.callApi('MideaFinancePlugin', 'RSAEncrypt', [params]);
  };
  /**
   * @description c4a非对称解密
   * @param params {string}
   * @returns {Promise}
   */
  financeRsaDecrypt = (params) => {
    return this.callApi('MideaFinancePlugin', 'RSADecrypt', [params]);
  };
  /**
   * @description 返回c4a获取密钥的url
   * @param params {object} 对象，{baseUrl，keygroup，keyversion}
   * @returns {Promise}
   */
  financeSecurityKey = (params) => {
    return this.callApi('MideaFinancePlugin', 'getSecurityKeyUrl', [params]);
  };
  /**
   * @description 获取底座密码
   * @returns {Promise}
   */
  financeUserPassWord = () => {
    return this.callApi(_MIDEA_USER, 'getUserPassword', []);
  };
  /**
   * @description 美的金融保存json
   * @param key {string}
   * @param value {string}
   * @returns {Promise}
   */
  financeSaveJson = (key, value) => {
    return this.callApi('MideaFinancePlugin', 'saveJson', [key, value]);
  };
  /**
   * @description 美的金融读取json
   * @param key {string}
   * @returns {Promise}
   */
  financeGetJson = (key) => {
    return this.callApi('MideaFinancePlugin', 'getJson', [key]);
  };
  /**
   * @description 打电话（底座有bug）
   * @param phoneNumber {string}
   * @returns {Promise}
   */
  financeCall = (phoneNumber) => {
    return this.callApi(_MIDEA_COMMON, 'callPhone', [phoneNumber]);
  };
  /**
   * @description 获取美的金融底座版本信息
   * @param params {string}
   * @returns {Promise}
   */
  financeGetVersionInfo = (params) => {
    return this.callApi('MideaFinancePlugin', 'getVersionInfo', [params]);
  };
  /**
   * @description 更新美的金融底座版本
   * @param params {string}
   * @returns {Promise}
   */
  financeUpdateApp = (params) => {
    return this.callApi('MideaFinancePlugin', 'updateApp', [params]);
  };

  /*********************************************************以下是ionic-native插件************************************************************************************ */
  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture = (options: any) => {
    return new Promise((resolve, reject) => {
      Camera.getPicture(Object.assign({
        sourceType: Camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: Camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
        quality: 90,//图像质量，范围为0 - 100
        allowEdit: true,//选择图片前是否允许编辑
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 800,//缩放图像的宽度（像素）
        targetHeight: 800,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
      }, options)).then((imgData: any) => {
        resolve(imgData);
      }, (err: any) => {
        console.log(err);
        err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: Camera.PictureSourceType.CAMERA
      }, options)).then(imgData => {
        resolve(imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }, options)).then(imgData => {
        resolve(imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 通过图库多选图片
   * @param options
   * @return {Promise<T>}
   */
  getMultiplePicture = (options = {}) => {
    let that = this;
    let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
    return new Promise((resolve) => {
      ImagePicker.getPictures(Object.assign({
        maximumImagesCount: 6,
        width: 800,//缩放图像的宽度（像素）
        height: 800,//缩放图像的高度（像素）
        quality: 90//图像质量，范围为0 - 100
      }, options)).then((files: any) => {
        if (destinationType === 1) {
          resolve(files);
        } else {
          let imgBase64s: any[];//base64字符串数组
          for (let fileUrl of files) {
            that.convertImgToBase64(fileUrl, (base64: any) => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                resolve(imgBase64s);
              }
            }, null);
          }
        }
      }).catch((err: any) => {
        console.error(err);
        this.showToast('获取照片失败');
      });
    });
  };

  // 根据图片绝对路径转化为base64字符串
  convertImgToBase64(url: any, callback: any, outputFormat: any) {
    let canvas = <HTMLCanvasElement>document.createElement('CANVAS'), ctx = canvas.getContext('2d'), img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let imgBase64 = canvas.toDataURL(outputFormat || 'image/png');//返回如'data:image/jpeg;base64,abcdsddsdfsdfasdsdfsdf'
      let base64 = imgBase64.substring(imgBase64.indexOf(';base64,') + 8);//返回如'abcdsddsdfsdfasdsdfsdf'
      callback.call(this, base64);
      canvas = null;
    };
    img.src = url;
  }

  /**
   * 获得用户当前坐标(即设备当前位置)
   * @return {Promise<T>}
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let lng = position.coords.longitude;
          let lat = position.coords.latitude;
          // console.log(lng,lat);
          resolve({ 'lng': lng, 'lat': lat });
        },
        PositionError => {
          // console.dir(PositionError);
          // console.log("无法获取地理位置");
          // console.log(PositionError.message);
          reject({ 'lng': 114.109429, 'lat': 22.555011 });//默认坐标:广东省深圳市罗湖区桂园街道西湖大厦
        },
        { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
      );
    });
  }

  /**
   * 地图导航
   * @param startPoint 开始坐标
   * @param endPoint 结束坐标
   * @param type 0实时导航,1模拟导航,默认为模拟导航
   * @return {Promise<T>}
   */
  navigation(startPoint: any, endPoint: any, type = 1) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        AMapNavigation.navigation({
          lng: startPoint.lng,
          lat: startPoint.lat
        }, {
            lng: endPoint.lng,
            lat: endPoint.lat
          }, type, function (message: any) {
            resolve(message);//非手机环境,即测试环境返回固定坐标
          }, function (message: any) {
            alert('导航失败:' + message);
            reject('导航失败');
          });
      } else {
        this.showToast('非手机环境不能导航');
      }
    });
  }

  /**
   *  @name 获取app版本信息demo
   */
  showAppVersion() {
    AppVersion.getAppName().then((value: any) => {
      console.log(value);//ionic2_tabs
    });
    AppVersion.getPackageName().then((value: any) => {
      console.log(value);//com.kit.platform
    });
    AppVersion.getVersionCode().then((value: any) => {
      console.log(value);//1
    });
    AppVersion.getVersionNumber().then((value: any) => {
      console.log(value);//0.0.1
    });
  }

  /**
   * @name 获取网络类型
   */
  getNetworkType() {
    if (!this.isMobile()) {
      return true;
    }
    return navigator['connection']['type'];// "none","wifi","4g","3g","2g"...
  }

  isConnecting() {
    return this.getNetworkType() != 'none';
  }
}
