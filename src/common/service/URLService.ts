
/**
 * 全局变量
 */
import { CONFIG } from "../../data/CONFIG";
import { URL } from "../../data/URLA";
// import { CODE } from "../../data/CODE";
//  import { UserService } from '../../common/service/UserService';

import { Injectable } from '@angular/core';
declare var unescape:any;
@Injectable()
export class URLService {

  constructor() {

  }
  /**
   * 返回请求路径
   * @author ex_chennxw
   * @param urlTailStr 
   * 注：此处不处理未登录问题,该问题交给路由控制，未登录用户一定不能进入需要登录的页面
   */
  static getRequestUrl(urlTailStr:string){
    var self = this;
    let isLogin = false;
    let urlStr = "";
    let userId = "";
    let token = "";
    let accessServerUrl = "";
    if (userId && token && accessServerUrl) {
      //未登录则没有accessServerUrl
      urlStr = (accessServerUrl || URL[CONFIG.serviceType].baseUrl) + urlTailStr + "?userId=" + userId + "&token=" + token;
    }else{
      urlStr = URL[CONFIG.serviceType].baseUrl + urlTailStr;
    }
    return urlStr;
  }
  static getParams(name: string, search?: string) {
    if (!name) {
      return;
    }
    if (!search) {
      search = window.location.search;
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = search.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
    return null;
  }
}
