import { Component, OnInit, Output } from '@angular/core';//EventEmitter
import { App, NavController, NavParams, ModalController, ToastController, ViewController } from 'ionic-angular';
import { Http } from "@angular/http";


/**
 * 全局变量
 */
import { CONFIG } from "../../data/CONFIG";
// import { GLOBAL } from "../../data/DICT";
import { URL } from "../../data/URLA";
import { CODE } from "../../data/CODE";

/*
  Generated class for the Coupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html'
})
export class CouponPage {

  @Output()


  public ischecked: boolean = false;//测试
  public isUseShow: boolean = true;
  public couponList: Array<any> = [];//优惠券列表
  public discountCoupon: Array<any> = [];//折扣优惠券列表
  public fixedCoupon: Array<any> = [];//固额优惠券列表
  public checkedCoupon: Array<any> = [];//已选择优惠券列表
  public httpOver: boolean;//是否显示
  public isShowList: boolean = false;//是否显示
  public totalPrice: any;//订单总额
  public isUselyCoupon: boolean = true;//判断有没有可用的优惠券
  isCanGoBack: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public http: Http,
    public appCtrl: App,
  ) { }

  
  checkCoupon(coupon) {
    let self = this;
    if (!sessionStorage.getItem("orderDetailPage")) {
      return;
    }
    console.log("************************优惠券" + JSON.stringify(coupon));
    sessionStorage.setItem("couponList", JSON.stringify(coupon));
    self.viewCtrl.dismiss(coupon); //选择后关闭视图，并传达已选择优惠券
  }

  /************************************ionic页面处理函数--start */
  goBack() {
    let self = this;
    let data;
    if (sessionStorage.getItem("couponList")) {
      data = JSON.parse(sessionStorage.getItem("couponList"));
    } else {
      data = [];
    }
    self.viewCtrl.dismiss(data);
  }
  ionViewWillEnter() {
    let self = this;
  }
  ionViewDidLoad() {
    let self = this;
    if (sessionStorage.getItem("orderDetailPage")) {//测试
      self.isUseShow = false;
    }
    console.log('ionViewDidLoad CouponPage');
  }
  // 页面被加载完成后调用的函数，切换页面时并不会进行重新加载，因为有cache的存在  
  onPageLoaded() {
    console.log('page 1: page loaded.');
  }

  // 页面即将进入的时候  
  onPageWillEnter() {
    // 在这里可以做页面初始化的一些事情  
    console.log('page 1: page will enter.');
  }

  // 页面已经进入的时候  
  onPageDidEnter() {
    console.log('page 1: page did enter.');
  }

  // 页面即将离开的时候  
  onPageWillLeave() {
    console.log('page 1: page will leave.');
  }

  // 页面已经离开的时候  
  onPageDidLeave() {
    console.log('page 1: page did leave.');
  }

  // 从 DOM 中移除的时候执行的生命周期  
  onPageWillUnload() {

  }

  // 从 DOM 中移除执行完成的时候  
  onPageDidUnload() {

  }
  /************************************ionic页面处理函数--end*/

}
