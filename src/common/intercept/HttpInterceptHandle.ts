
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { NativeService } from "../service/NativeService";


import { URLService } from "../service/URLService";
/**
 * 全局变量
 */
import { CONFIG } from "../../data/CONFIG";
// import { GLOBAL } from "../../data/DICT";
import { URL } from "../../data/URLA";
// import { LoginPage} from '../../pages/login/login';
/**
 * 全局处理http请求
 */
@Injectable()
export class HttpInterceptHandle {
  constructor(
    // public navCtrl: NavController,
    // public navParams: NavParams,
    public events: Events,
    public nativeService: NativeService) {
    events.subscribe('request:before', (url:any, options:any) => {
      // let isUnLoading = false;
      // let len = URL.unLoading.length;
      // for(let i=0; i<len; i++){
      //   let unLoadingUrl = URLService.getRequestUrl(URL.unLoading[i]);
      //     if(url == unLoadingUrl){//处理不显示loading的路由
      //       isUnLoading = true;
      //       continue;
      //     }      
      // }
      // if(!isUnLoading){
      //   nativeService.showLoading();
      // }
       nativeService.showLoading();
      console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
    });

    events.subscribe('request:success', (url:string, options:any, response:any) => {
      nativeService.hideLoading();
      console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', response);
      if (response) {
        let responseData = response.json();
        //全局处理后台返回的错误
        if (responseData.code != CONFIG.ok) {
          /**
           * 是否是登录信息错误
           */
          let isUnLogin = false;
          //判断是否是登录信息错误
          // for (let i = CONFIG.unLogin.length; (i-- && !isUnLogin);) {
          //   isUnLogin = (responseData.code == CONFIG.unLogin[i]);
          // }
          //重新登录
          if (isUnLogin) {
            sessionStorage.setItem("isBack", "true");
            //如果不是登录页就跳转
            // if (window.location.hash != URL.stateProvider.login.url) {
            //   window.location.href = window.location.origin + URL.stateProvider.login.url;
            // }
            // this.events.publish(GLOBAL.events.push, URL.stateProvider.login.url,LoginPage, {});
            return;
          }
        }

      }

    });

    events.subscribe('request:error', (url:string, options:any, error:any) => {
      nativeService.hideLoading();
      console.error('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'error', error);
      let status = error.status;
      if (status === 0) {
        nativeService.showToast('响应错误，请检查网络');
      } else if (status === 404) {
        nativeService.showToast('请求地址错误，请联系客服人员');
      } else if (status === 500) {
        nativeService.showToast('服务器异常，请稍后再试');
      } else {
        nativeService.showToast('未知错误，请联系客服人员');
      }
    });
  }

}
