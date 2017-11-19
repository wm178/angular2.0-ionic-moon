/**
 * Created by ex_chenxw on 2017/7/27.
 */
/**
 * 常用工具类
 * @export
 * @class UtilService
 */
import { Injectable } from "@angular/core";
@Injectable()
export class UtilService {

    /**
     * 是否对象
     * @static
     * @param {*} value 值
     * @returns {boolean} 
     * 
     * @memberof UtilService
     */
    public static isObject(value: any): boolean {
        return value !== null && typeof value === 'object';
    }

    /**
     * 是否数组
     * @static
     * @param {*} value 值
     * @returns {boolean} 
     * 
     * @memberof UtilService
     */
    public static isArray(value: any): boolean {
        return Array.isArray(value);
        //return Object.prototype.toString.call(obj) === '[object Array]'; 
    }

    /**
     * 是否未定义
     * @static
     * @param {*} value 值
     * @returns {boolean} 
     * 
     * @memberof UtilService
     */
    public static isUndefined(value: any): boolean {
        return typeof value === 'undefined';
    }

    /**
     * 是否字符串
     * @static
     * @param {*} value 
     * @returns {boolean} 
     * 
     * @memberof UtilService
     */
    public static isString(value: any): boolean {
        return typeof value === 'string';
    }

    /**
     * 是否数字
     * @static
     * @param {*} value 
     * @returns {boolean} 
     * 
     * @memberof UtilService
     */
    public static isNumber(value: any): boolean {
        return typeof value === 'number';
    }

    /**
     * 是否布尔类型
     * @static
     * @param {*} value 值
     * @returns {boolean} 
     * 
     * @memberof UtilService
     */
    public static isBoolean(value: any): boolean {
        return typeof value === 'boolean';
    }

    /**
     * 去除字符串两端的空白字符
     *  @static
     *  @returns {str}
     * 
     * @memberof UtilService
     */
    public static trim(str: any) {
        return str == null ?
            "" :
            (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    /**
     * 判断变量是否声明,是否有数据
     * int 0 也会判断为有数据true
     * object是否有数据应通过isNotData判断
     * 空返回true
     * @static
     * @author ex_chenxw
     * @param val 不接受obj对象
     * @returns {Boolean}
     * 
     * @memberof UtilService
     */
    public static isEmpty(val: any) {
        val = this.trim(val);
        if (val == null)
            return !0;
        if (val == undefined || val == 'undefined')
            return !0;
        if (val == "")
            return !0;
        if (val.length == 0)
            return !0;
        if (!/[^(^\s*)|(\s*$)]/.test(val))
            return true;
        return !1;
    }
    /**
     * 判断obj对象是否没有属性
     * 空返回true
     * @static
     * @param obj 只接收obj
     * @returns {boolean}
     * 
     * @memberof UtilService
     */
    public static isNotProperty(obj: any) {
        var p;
        for (p in obj)
            return !1;//false
        return !0;//true
    }

    public static add_zero(temp: any) {//数位控制
        if (temp < 10)
            return "0" + temp;
        else
            return temp;
    }

    /**
     * 调用方式:
     * uppercase(str)  //小写转大写
     * lowercase(str)  //大写转小写
     *  @static
     *  @returns {str}
     * 
     * @memberof UtilService
     */
    //转换大写
    public static uppercase(string: any) {
        return this.isString(string) ? string.toUpperCase() : string;
    };
    //转换小写
    public static lowercase(string: any) {
        return this.isString(string) ? string.toLowerCase() : string;
    };

    public static is_array = function (value: any) {
        return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            typeof value.splice === 'function' &&
            !(value.propertyIsEnumerable('length'));
    };

    // 将xml数据转化为json数据格式
    //TODO
   

}