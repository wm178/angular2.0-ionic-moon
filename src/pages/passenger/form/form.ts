import { Component,Input,Output,EventEmitter} from '@angular/core';
import { NavController, NavParams, ToastController,ViewController } from 'ionic-angular';

import { Http } from "@angular/http";

import { ListPage } from '../list/list';

/**
 * 全局变量
 */
import { URL } from "../../../data/URLA";
import { CODE } from "../../../data/CODE";
import { CONFIG } from "../../../data/CONFIG";

import{Validators} from "../../../common/directive/Validators"


/*
  Generated class for the Form page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {

   //声明一个输入属性，并且绑定到模板，譬如： <my-cmp [my-property]="someExpression">
  @Input() myProperty;
    //声明一个输出口属性，绑定到某个可以绑定的事件： <my-cmp (my-event)="doSomething()">
  @Output() myEvent = new EventEmitter<any>();

  public name: any;
  public phone: any;
  public idCardNo: any;
  public title: string;//页面标题
  public IDCARD_REGEXP: any;//身份证正则
  public PHONE_NUMBER: any;//电话号码正则
  public NAME_REGEXP: any;//姓名正则
   public isShow: boolean;//是否显示
  // public passengerId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public http: Http,
    public viewCtrl: ViewController,
  ) {
    let self = this;
    self.navCtrl = navCtrl;
    // Validators.email
    // let a = self.navCtrl.getViews();
    // let b = self.navCtrl.getActive();
    // let c = self.navCtrl.indexOf(a[0]);
    // let d = self.viewCtrl;
    self.IDCARD_REGEXP = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/i;//身份证正则
    //this.PHONE_NUMBER = /^((13[0-9])|(14[5|7])|(15([0-9]))|(18[0,3,5-9]))\d{8}$/i;//电话号码正则
    self.PHONE_NUMBER = /^1[3|5|7|8][0-9]\d{8,8}$/;//电话号码正则
    self.NAME_REGEXP = /(^[\u4e00-\u9fa5 ]{2,10}$)|(^[a-zA-Z\/ ]{2,10}$)/i;//姓名正则
    // let validdation: ValidationService = new ValidationService();
    // console.log(validdation.validator("name", self.name))
  }
   
  sendEvent(){
    this.myEvent.emit(this.NAME_REGEXP);
  }
  

  /**************************************** 编辑乘客--start*****************************/
  updatePassenger() {
    let self = this;
    /**
    *  //检查输入数据--start
    */
    if (!self.name) {
      self.toastCtrl.create({
        message: CODE.nameNull,//提示弹窗
        duration: 3000 //时间周期
      }).present();
      return;
    } 
     if (!self.NAME_REGEXP.test(self.name)) {
      self.toastCtrl.create({
        message: CODE.nameError,//提示弹窗
        duration: 3000 //时间周期
      }).present();
      return;
    }
    if (!self.phone) {
      self.toastCtrl.create({
        message: CODE.phoneNull,//提示弹窗
        duration: 3000 //时间周期
      }).present();
      return;
    } 
     if (!self.PHONE_NUMBER.test(self.phone)) {
      self.toastCtrl.create({
        message: CODE.phoneError,//提示弹窗
        duration: 3000 //时间周期
      }).present();
      return;
    }
    if (!self.idCardNo) {
      self.toastCtrl.create({
        message: CODE.idCarNoNull,//提示弹窗
        duration: 3000 //时间周期
      }).present();
      return;
    }  
    if (!self.IDCARD_REGEXP.test(self.idCardNo)) {
      self.toastCtrl.create({
        message: CODE.idCarNoError,//提示弹窗
        duration: 3000 //时间周期
      }).present();
      return;
    }
    /**
   *  //检查输入数据--end
   */
   
   
    let success = function () {//成功处理方法
      self.toastCtrl.create({
        message: CODE.updateSuccess,//提示弹窗
        duration: 3000 //时间周期,毫秒
      }).present();
    
      self.navCtrl.pop();
    }
    let error = function (response: any, exception?: any) {//失败处理方法

    }
  }
  /**************************************** 编辑乘客--end**************************/

  /********************************** *ionic页面处理函数--start****************************/
  /**
   * 页面加载时被触发
   */
  ionViewDidLoad() {
    let self = this
    
     self.title = "新增乘客"
      self.isShow = false;
      // self.name = "田野";
      // self.phone = "18888888888";
      // self.idCardNo = "440921200808088888";
    
  }
  ionViewWillEnter() {
   
  }
  /********************************** *ionic页面处理函数--end****************************/
}