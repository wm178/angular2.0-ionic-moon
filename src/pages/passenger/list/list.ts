import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, App } from 'ionic-angular';
import { Http } from "@angular/http";
import { ActionSheetController, AlertController } from 'ionic-angular';



import { FormPage } from '../form/form';
/**
 * 全局变量
 */
import { CONFIG } from "../../../data/CONFIG";
import { URL } from "../../../data/URLA";
import { CODE } from "../../../data/CODE";
/*
/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  /**
   * 跳转路由，页面
   */
  passengerFormPage = FormPage;
 

  /**
  * 乘客信息
  */
  public passengerListMent: Array<any> = [];//已选择乘客列表
  public passengerList: Array<any> = [];//乘客列表
  public pageType: any = "";//路由类型,1为home，2为订单详情
  public httpOver: boolean = false;//请求后的判断
  isCanGoBack: boolean = true;
  /**
  * passengerPage重构函数
  */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public http: Http,
    public viewCtrl: ViewController,
    public appCtrl: App
  ) {
    let self = this;
    self.navParams = navParams;
    // let a = self.navCtrl.getViews();
    // let b = self.navCtrl.getActive();
    // let c = self.navCtrl.indexOf(a[0]);
    // let d = self.viewCtrl;
  }

  /********************************** *添加乘客，最多选择10个，提示不能再新增--start****************************/
  toFormPage() {
    let self = this;
    self.navCtrl.push(self.passengerFormPage)
  }
  /********************************** *添加乘客，最多选择10个，提示不能再新增--end****************************/

  /************操作弹框 编辑、删除乘客--start**************************************************/
  //删除乘客
  deletePassenger(passenger) {
    let self = this;
    self.alertCtrl.create({
      title: '确定删除【' + passenger.name + '】吗？',
      // message:'确定删除【' + passenger.name + '】吗？',
      buttons: [
        {
          text: '确定',
          role: '确定',
          handler: () => {
            console.log('确定 clicked');
          }
        },
        {
          text: '取消',
          handler: () => {
             console.log('取消 clicked');

          }
        }
      ]
    }).present();
  }
  presentActionSheet() {//传入操作id乘客
    let self = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '',//操作
      buttons: [
        {
          text: '编辑该乘客',
          role: '编辑该乘客',
          cssClass: "action-sheet-md",
          handler: () => {//编辑操作
            this.navCtrl.push(self.passengerFormPage)//编辑该乘客，跳转form页面，
          }
        }, {
          text: '删除该乘客',
          cssClass: "action-sheet-delete",
          handler: () => {//删除操作
          }
        }
      ]
    });
    actionSheet.present();
  }
  /************操作弹框 编辑、删除乘客---end**************************************************/

  /********************************** *ionic页面处理函数，依执行顺序排序--start****************************/
  /**
   * 即将进入一个页面变成当前激活页面的时候执行的事件。
   */
  ionViewWillEnter() {
    let self = this;
  }
  ionViewDidLoad() {
  }
  /**
   * 进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。
   */
  ionViewDidEnter() {
    this.isCanGoBack = this.viewCtrl.enableBack();
  }
  /**
   * 页面返回，从视图栈中删除
   */
  goBack() {
    this.navCtrl.pop();
  }
  /********************************** *ionic页面处理函数--end****************************/
}
