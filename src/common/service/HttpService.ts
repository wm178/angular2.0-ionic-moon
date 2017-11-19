/**
 * Created by ex_chenxw on 2017/8/2.
 */


import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {
  Jsonp, Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import { Observable, TimeoutError } from "rxjs";

import { NativeService } from './NativeService';
import { CONFIG } from "../../data/CONFIG";
import { URL } from "../../data/URLA";

import { UtilService } from "../../common/utils/UtilService";

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    public jsonp: Jsonp,
    public nativeService: NativeService,
  ) {
  }
  public getURL(url: string, paramObj?: any) {

  }
  /**
   * 从底座获取用户信息，获取第一次之后会作缓存
   * @returns {*}
   */
  public getUserInfo() {
    // 检查是否存在缓存
    let user = this.nativeService.getUser();
    //  this.setLoginName(respond, params);
    //  this.setToken(respond, params);
    // PC端测试时候，从本地测试配置中获取测试用户信息
    let errResponse = CONFIG.serviceType === "debug" ? URL[CONFIG.serviceType].midea.userTest : {};
  }
  /**
   * 为参数对象添加token
   * 具体用法：
   * 在参数中，使参数值等于CONFIGURATION.com.midea.ssoTokenPlaceholder的值，该方法会自动替换正确的值
   * @param respond 获取用户的respond
   * @param params 参数对象
   * @returns {*}
   */
  public setToken(respond, params) {
    let token = respond.ssoToken || (CONFIG.serviceType === "debug" ? URL[CONFIG.serviceType].midea.userTest.ssoToken : '');

    HttpService.setHolderValue(params, URL[CONFIG.serviceType].midea.ssoTokenPlaceholder, token);

    return params;
  }
  /**
   * 为参数对象添加uid
   * 具体用法：
   * 在参数中，使参数值等于CONFIGURATION.com.midea.uidPlaceholder，该方法会自动替换正确的值
   * @param respond 获取用户的respond
   * @param params 参数对象
   * @returns {*}
   */
  public setLoginName(respond, params) {
    var uid = respond.uid || (CONFIG.serviceType === "debug" ? URL[CONFIG.serviceType].midea.userTest.uid : '');

    HttpService.setHolderValue(params, URL[CONFIG.serviceType].midea.uidPlaceholder, uid);

    return params;
  }
  /**
   * 递归object用value的值替换掉所有出现的placeholder的值
   * @param object 递归对象
   * @param placeholder 要替换的值
   * @param value 替换后的值
   */
  private static setHolderValue(object, placeholder, value) {
    object.forEach(function (item, key) {
      if (UtilService.isObject(item)) {
        HttpService.setHolderValue(item, placeholder, value);
      } else if (UtilService.isString(item) && item.indexOf(placeholder) !== -1) {
        // 创建正则RegExp对象
        var reg = new RegExp(placeholder, 'g');
        object[key] = item.replace(reg, value);
      }
    });
  }
  /**
 * request 请求
 * @param result
 * @return {any}
 */
  public request(url: string, options: RequestOptionsArgs): Observable<Response> {
    this.optionsAddToken(options);
    return Observable.create(observer => {
      this.nativeService.showLoading();
      console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
      let REQUEST_TIMEOUT = 10000 //请求超时时间 10000
      this.http.request(url, options).timeout(REQUEST_TIMEOUT).subscribe(res => {
        this.nativeService.hideLoading();
        console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
        observer.next(res);
      }, err => {
        //this.handleError(url, options, err);//处理请求失败
        this.handleError(err);
        observer.error(err);
      });
    });
  }
  /**
  * get
  * @param result
  * @return {any}
  */
  public get(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap)
    }));
  }
  // public get(url: string, paramObj?: any) {
  //   this.nativeService.showLoading();
  //   return this.http.get(url + this.toQueryString(paramObj))
  //     .toPromise()
  //     .then(res => this.handleSuccess(res.json()))
  //     .catch(error => this.handleError(error));
  // }

  /**
   * post
   * @param result
   * @return {any}
   */
  // public post(url: string, paramObj?: any) {
  //   this.nativeService.showLoading();
  //   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
  //   return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
  //     .toPromise()
  //     .then(res => this.handleSuccess(res.json()))
  //     .catch(error => this.handleError(error));
  // }

  /**
  * postJson
  * @param result
  * @return {any}
  */
  public postJson(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,//请求方式
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }
  /**
 * postFormData
 * @param result
 * @return {any}
 */
  public postFormData(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,//请求方式
      search: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({//请求头
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }

  /**
   * jsonp
   * @param result
   * @return {any}
   */
  public getJsonp (url: string, paramMap: any = null) {
      let params = new URLSearchParams();
      params.set('search', paramMap); // the user's search value
      params.set('action', 'opensearch');
      params.set('format', 'json');
      params.set('callback', 'JSONP_CALLBACK');
      // TODO: Add error handling
      return this.jsonp
                 .get(url, { search: params })
                 .map(request => <string[]> request.json()[1])
                 .subscribe((response) => {
                  console.log(response);
                  }, (error) => {
                    console.error(error);
                  });
    }


  public put(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }

  public head(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public options(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }


  /**
   * 请求成功处理函数
   * @param result
   * @return {any}
   */
  private handleSuccess(result: any) {
    this.nativeService.hideLoading();
    if (result && !result.success) {
      this.nativeService.showToast(result.msg);
    }
    return result;
  }
  /**
   * 请求失败处理函数
   * @param error
   * @return {{success: boolean, msg: string}}
   */
  private handleError(error: Response | any) {
    this.nativeService.hideLoading();
    let msg = '请求失败';
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    } else if (error.status == 404) {
      msg = '请求链接不存在，请联系管理员';
      console.error(msg + '，请检查路径是否正确');
    } else if (error.status == 500) {
      msg = '服务器出错，请稍后再试';
    } else if (error.status == 0) {
      msg = '请求地址错误或后台服务未启动';
    }
    if (!this.nativeService.isConnecting()) {
      msg = '没有网络,请求发送失败';
    }
    console.log(error);
    this.nativeService.showToast(msg);
    return { success: false, msg: msg };
  }

  /**
    * 将对象转为查询参数
    * @param paramMap
    * @returns {URLSearchParams}
    */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      // if (val instanceof Date) {
      //   val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      // }
      params.set(key, val);
    }
    return params;
  }

  /**
   * 把请求参数转化为参数字符串
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toQueryString(obj: any) {
    let ret: any[];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  /**
   *把请求参数转化为参数字符串
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'小军',age:23};
   *  调用:  toBodyString(obj);
   *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toBodyString(obj: any) {
    let ret: any[];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  private toQueryPair(key: any, value: any) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

  private optionsAddToken(options: RequestOptionsArgs): void {
    let token = "";
    if (options.headers) {
      options.headers.append('Authorization', 'Bearer ' + token);
    } else {
      options.headers = new Headers({
        'Authorization': 'Bearer ' + token
      });
    }
  }

}
