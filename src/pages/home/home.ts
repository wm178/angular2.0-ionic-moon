import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { App, NavParams, NavController, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLService } from '../../common/service/URLService';

import { HttpService } from "../../common/service/HttpService";

/**
 * 全局变量
 */
import { CONFIG } from "../../data/CONFIG";
import { URL } from "../../data/URLA";
import { CODE } from "../../data/CODE";
import { Packet } from '../../common/interface/Packet';


import { FormPage } from '../passenger/form/form';
import { CouponPage } from '../coupon/coupon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   testdata:any;

  public  passenger = FormPage;
  public  couponPage = CouponPage;
  private userInfo:any;
  constructor(
    public navCtrl: NavController,
    public http:Http,
    public toastCtrl:ToastController,
    public httpService:HttpService
  ) {
     let url = URLService.getRequestUrl(URL.requestUrl.common.login);
    console.log(url);
    this.testdata = "我是父组件";
    // httpService.getJsonp(url, this.testdata)
  }
getEvent(data){
    console.log(data);
    console.log("子组件的传播数据***************");
  }
toFormPage() {
    let self = this;
    // self.myEvent.emit(data);
    self.navCtrl.push(self.passenger);
  }
  toCouponPage() {
    let self = this;
    // self.myEvent.emit(data);
    self.navCtrl.push(self.couponPage);
  }
  /**
   * 请求用户基本信息
   */
   requestUser() {
    let self = this;
    let url = URLService.getRequestUrl(URL.requestUrl.common.login);
    let reqData = {
      op: ""
    };
    let reqDataStr = JSON.stringify(reqData);
    let packet: Packet = new Packet(reqDataStr);
    let success = function (response: any, packet?: Packet) {//成功处理方法
      if (packet.data) {
        self.userInfo = JSON.parse(packet.data);
      }
    }
    let error = function (response: any, exception?: any) {//失败处理方法

    }
    this.http.post(url, packet)
      .subscribe(//订阅监听
      response => {
        try {
          let packet: Packet = response.json();
          //如果返回正常
          if (packet.code == CONFIG.ok) {
            success(response, packet);
          } else {//后台返回异常
            self.toastCtrl.create({
              message: CODE[packet.code],
              duration: 3000
            }).present();
          }
        } catch (exception) {
          error(response, exception);
        }
      },
      response => {
        error(response);
      }
      );
  } //requestUser -end

  /************************************ionic页面处理函数 --start**********************************/
  ionViewWillEnter() {
    let self = this;
    let url = URLService.getRequestUrl(URL.requestUrl.common.login);
    console.log(url);
    self.requestUser();
    console.log('ionViewWillEnter HomePage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  /************************************ionic页面处理函数 --end**********************************/
}
