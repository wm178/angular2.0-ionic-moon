/**
 * Created by ex_chenxw on 2017/7/27.
 */

import { Injectable } from "@angular/core";

/**
 * @title 浏览器服务
 * @description 浏览器信息
 * @author ex_chenxw
 * @date 2017-02-22
 * @version V1.0
 */

@Injectable()
export class BrowserService {
	
	/**
	 * 浏览器类型判断
	 */
     isChrome(){
        return navigator.userAgent.indexOf("Chrome") > -1 && !this.isWeChat(); 
    };
     isOpera(){
        return navigator.userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    };
     isIE(){
        return navigator.userAgent.indexOf("compatible") > -1
            && navigator.userAgent.indexOf("MSIE") > -1 && !this.isOpera(); //判断是否IE浏览器
    };
     isFirefox(){
        return navigator.userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    };
     isSafari(){
        console.log(navigator.userAgent.indexOf("Safari") > -1);
        return navigator.userAgent.indexOf("Safari") > -1  && !this.isChrome(); //判断是否Safari浏览器
    };
     isWeChat(){
        console.log(navigator.userAgent.indexOf("MicroMessenger") > -1);
        return navigator.userAgent.indexOf("MicroMessenger") > -1; //判断是否WeChat浏览器
    };
     isAlipay(){
        return navigator.userAgent.indexOf("AlipayClient") > -1; //判断是否Alipay浏览器
    };
     isUC(){
        return navigator.userAgent.indexOf("UCBrowser") > -1; //判断是否Alipay浏览器
    };
     isOther(){
        return 
    };
    /**
	 * 浏览器名称
     * bug:只有微信的浏览器判断测试确认正确过
	 */
    //  get name(): string {
    //     if (BrowserService.isChrome()) {
    //         return "Chrome";
    //     }
    //     if (BrowserService.isWeChat()) {
    //         return "WeChat";
    //     }
    //     if (BrowserService.isOpera()) {
    //         return "Opera";
    //     }
    //     if (BrowserService.isIE()) {
    //         return "IE";
    //     }
    //     if (BrowserService.isFirefox()) {
    //         return "Firefox";
    //     }
    //     if (BrowserService.isSafari()) {
    //         return "Safari";
    //     }
    //     if (BrowserService.isAlipay()) {
    //         return "Alipay";
    //     }
    //     if (BrowserService.isUC()) {
    //         return "UC";
    //     }
    //     return undefined;
    // }

}