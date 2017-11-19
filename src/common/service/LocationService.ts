/**
 * Created by ex_chenxw on 2017/7/27.
 */

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { NativeService} from './NativeService';
import { CONFIG } from "../../data/CONFIG";

/**
 * @title 定位服务
 * @description 
 * @author ex_chenxw
 * @date 2017-03-10
 * @version V1.0
 */

@Injectable()
export class LocationService {
    private  locToCity: any;

    constructor(
        public http: Http,
        private nativeService: NativeService
    ){}

    /**
     * 调用高德地图逆地理编码API将NativeService.getUserLocation中获得的用户当前坐标(即设备当前位置坐标)转换为城市信息对象
     */
 	getLocation(success:any,error:any){
        let self = this;
        self.locToCity = function(position:any){
            let url = "https://restapi.amap.com/v3/geocode/regeo?output=json&location="
                +position['lng']+","+position['lat']+"&key=6d3844cf9bb096855b5d8a4810c32fbf";
            this.http.get(url).subscribe(//订阅监听
                (response:any) => {//成功处理
                    success(response);
                },
                (response:any) => {//失败处理 传回默认城市对象
                    error(CONFIG.defaultCityObj);
                }
            );
        }
        self.nativeService.getUserLocation().then(position => {
            self.locToCity(position);
        },
        position => {
            self.locToCity(position);
        });

    }
    
}