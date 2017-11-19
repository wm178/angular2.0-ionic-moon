/**
 * Created by ex_chenxw on 2017/7/5.
 */

/**********************************************
 ******************接口地址配置*****************
 ***********************************************/

import { CONFIG } from "./CONFIG";
export const URL = {
    //本地开发的路径配置
    deBug: {
        baseUrl: 'http://127.0.0.1:8080',     
    },
      //测试服务器环境的路径配置
    serviceTest: {
        baseUrl: 'http://127.0.0.1:8080',
    },
    //服务器环境的路径配置
    service: {
        baseUrl: 'http://127.0.0.1:8080',      
    },
    //http请求方式
    httpRequestMethod: {
        post: "post",
        get: "get",
    },
    requestUrl: {
        common: {//基础请求
            heartbeat: "heartbeat",//无需登录
            accessServer: "getAccessServer",
            login: "/login", //登录
            logout: "login",//退出登录
            smsVerify: "verifyCode/smsVerify",    //短信验证码
            voiceVerify: "verifyCode/voiceVerify",    //语言验证码
            getOpenid: "scanQrCode/getOpenid"
        },
        webchat: {
            access_token: "https://api.weixin.qq.com/sns/oauth2/access_token"
        },
    },      
    resourceUrl: {
        playSuccess: "assets/images/scan-play/ico_zfcg.png",
        playError: "assets/images/scan-play/ico_zfsb.png",
        downloadUserAvatar: "appUser/downLoadHeadPicture"
    },
   
}
