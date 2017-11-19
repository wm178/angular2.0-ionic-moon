import { Injectable } from '@angular/core';
// import { BrowserService } from '../../angular2Common/service/BrowserService';

// import moment from 'moment';
/**
 * by chenxingwu
 * 此处时间的处理代码，还需再优化，不要着急
 * 分析参数类型，容错判断
 */
@Injectable()
export class DateService {

	//  public browserService:BrowserService =new BrowserService();

	/**
	* 日期的加减，只是天数的加减
	* 
	* @param date,num
	* @return date
	*/
	addDate(date:any, num:any) {
		if (!date) {
			date = new Date();//如果没有传入，默认为当前时间
		}
		if (!num) {
			num = 0;//如果没有传入，默认为0
		}
		if (typeof (date) == "number") {//考虑纯秒数传入情况
			date = new Date(date);
		}
		if (typeof (date) == "string") {
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);//转date对象
		} else {
			date = date.toString();
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);
		}
		date = date.valueOf();
		date = date + num * 24 * 60 * 60 * 1000
		date = new Date(date);
		return date;
	}
    /**
     * 返回一个七天的数组
     * [{01月01....},{01月02...}....]
     */
	getSevenDay() {

		let Arr = new Array();
		let date = new Date()
		let dayAdd;
		for (let i = 0; i < 7; i++) {//测试版的日期，后期优化
			dayAdd = this.addDate(date, i);
			let obj = { mDd: '', label: '', date: '' };
			obj.mDd = this.add_zero(dayAdd.getMonth() + 1) + "月" + this.add_zero(dayAdd.getDate()) + "日";
			obj.date = dayAdd.getFullYear() + "-" + this.add_zero(dayAdd.getMonth() + 1) + "-" + this.add_zero(dayAdd.getDate());//字符串类型日期
			switch (i) {//此switch,暂时留着
				case 0:
					obj.label = '今天';
					break;
				case 1:
					obj.label = '明天';
					break;
				case 2:
					obj.label = '后天';
					break;
				default:
					break;
			}
			Arr.push(obj);
		}
		return Arr;
	}
	/************************moment.js******************************** */
	// moment("20111031", "YYYYMMDD").fromNow(); // 5 年前
	// moment("20120620", "YYYYMMDD").fromNow(); // 5 年前
	// moment().startOf('day').fromNow();        // 16 小时前
	// moment().endOf('day').fromNow();          // 8 小时内

	// moment().subtract(10, 'days').calendar(); // 2017年2月28日
	// moment().subtract(6, 'days').calendar();  // 上周六下午3点37
	// moment().subtract(3, 'days').calendar();  // 本周二下午3点37
	// moment().subtract(1, 'days').calendar();  // 昨天下午3点37分
	// moment().calendar();                      // 今天下午3点37分
	// moment().add(1, 'days').calendar();       // 明天下午3点37分
	// moment().add(3, 'days').calendar();       // 下周一下午3点37

	// moment().subtract(10, 'days').calendar(); // 2017年2月28日
	// moment().subtract(6, 'days').calendar();  // 上周六下午3点36
	// moment().subtract(3, 'days').calendar();  // 本周二下午3点36
	// moment().subtract(1, 'days').calendar();  // 昨天下午3点36分
	// moment().calendar();                      // 今天下午3点36分
	// moment().add(1, 'days').calendar();       // 明天下午3点36分
	// moment().add(3, 'days').calendar();       // 下周一下午3点36
	// moment().add(10, 'days').calendar();    if(typeof(date) == "string"){ date =  new Date(date);}  
	/************************moment.js******************************** */
	/**
  * by chenxingwu
  * 转换时间,时间格式为约多少时间，但参考时间为传入值的endTime-startTime 例如：约1小时32分8秒
  *如果没有传endTime,则endTime默认当前时间
  * @param startTime endTime
  */
	countTime(startTime:any, endTime?: any) {
		if (!startTime) {
			return ""
		}
		if (!endTime) {
			endTime = new Date();//如果没有传endTime，则endtime默认当前时间
		}
		if (typeof (startTime) == "string") {
			let dateArr = startTime.replace(/-/g, "/");
			startTime = new Date(dateArr);//转date对象
		} else {
			startTime = startTime.toString();
			let dateArr = startTime.replace(/-/g, "/");
			startTime = new Date(dateArr);
		}
		if (typeof (endTime) == "string") {
			let dateArr = endTime.replace(/-/g, "/");
			endTime = new Date(dateArr);//转date对象
		} else {
			endTime = endTime.toString();
			let dateArr = endTime.replace(/-/g, "/");
			endTime = new Date(dateArr);
		}
		let t = endTime.getTime() - startTime.getTime();
		if (t >= 0) {
			// let seconds = Math.floor((t / 1000) % 60);
			let minutes = Math.floor((t / 1000 / 60) % 60);
			let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			let days = Math.floor(t / (1000 * 60 * 60 * 24));

			// return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
			return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分';
		} else if (t < 0) {
			t = t * (-1);
			let minutes = Math.floor((t / 1000 / 60) % 60);
			let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			let days = Math.floor(t / (1000 * 60 * 60 * 24));

			// return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
			return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分';
		} else {
			return "";
		}
	}
	/**
* by chenxingwu
* 32分8秒
* 倒计时
* @param Time 必须以毫秒数秒或纯数字传进
*/
	countDownTime(time:number) {
		// if (typeof (time) != "number") {//考虑不是纯秒数传入情况
		// 	return "";
		// }
		if (!time) {
			time = 0;//如果没有传time，则默认为0；
		}
		if (time > 0) {
			let seconds = Math.floor((time) % 60);
			let minutes = Math.floor((time / 60) % 60);
			// let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
			// let days = Math.floor(time / (1000 * 60 * 60 * 24));

			//return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
			return minutes + '分' + seconds + '秒';;
		} else {
			return time;
		}
	}


	/**
	  * by chenxingwu
	  * 转换时间,时间格式为约多少时间，但参考时间为传入值的endTime-startTime 例如：约1小时32分8秒
	  *如果没有传endTime,则endTime默认当前时间
	  * @param startTime endTime
	  */
	getTimeFormat(startTime:any, endTime?: any) {
		if (!startTime) {
			return ""
		}
		if (!endTime) {
			endTime = new Date();//如果没有传endTime，则endtime默认当前时间
		}
		if (typeof (startTime) == "string") {
			let dateArr = startTime.replace(/-/g, "/");
			startTime = new Date(dateArr);//转date对象
		} else {
			startTime = startTime.toString();
			let dateArr = startTime.replace(/-/g, "/");
			startTime = new Date(dateArr);
		}
		if (typeof (endTime) == "string") {
			let dateArr = endTime.replace(/-/g, "/");
			endTime = new Date(dateArr);//转date对象
		} else {
			endTime = endTime.toString();
			let dateArr = endTime.replace(/-/g, "/");
			endTime = new Date(dateArr);
		}
		let startTimeNum = startTime.getTime();
		let endTimeNum = endTime.getTime();
		let diff: number = <number>((endTimeNum - startTimeNum) / 1000);//<int>((endTimeMills - startTimeMills) / 1000);//秒
		let day_diff: number = <number>(Math.floor(diff / 86400));//天
		let buffer = new Array();
		if (day_diff < 0) {
			return "";//如果时间，返回空
		} else {
			if (day_diff == 0 && diff < 60) {
				if (diff <= 0)
					diff = 1;
				buffer.push(diff + "秒");//1秒
			} else if (day_diff == 0 && diff < 3600) {//1分1秒
				buffer.push(Math.round(Math.floor(diff / 60)) + "分钟" + Math.round(Math.floor((diff % 60) / 60)) + "秒");//1分1秒
			} else if (day_diff == 0 && diff < 86400) {//1小时1分1秒
				buffer.push(Math.round(Math.floor(diff / 3600)) + "小时" + Math.round(Math.floor((diff % 3600) / 60)) + "分钟");//1小时1分1秒
			} else if (day_diff < 7) {//1天1小时1分1秒
				buffer.push(day_diff + "天" + Math.round(Math.floor((diff % 86400) / 3600)) + "小时" + Math.round(Math.floor((diff % 5184000) / 86400)) + "分钟");
			} else if (day_diff < 30) {
				buffer.push(Math.round(Math.floor(day_diff / 7)) + " 星期");//1星期1天1小时1分1秒
			} else if (day_diff >= 30 && day_diff <= 179) {
				buffer.push(Math.round(Math.floor(day_diff / 30)) + "月");//1月1天1小时1分1秒//多少月
			} else if (day_diff >= 180 && day_diff < 365) {
				buffer.push("半年");
			} else if (day_diff >= 365) {
				buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + "年");//多少年
			}
		}
		return buffer.toString();
	};
	/**
	  * by chenxingwu
	  * 转换日期，格式 <!--2月18日 后天（周三）---start
	  * @param date format
	  */
	getCurDate(date:any, format:any) {
		let nowDate = new Date();
		let week;
		if (!date) {
			date = nowDate;
		}
		if (typeof (date) == "string") {
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);//转换对象
		} else {
			date = date.toString();
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);
		}
		if (!format) {
			return date;
		}


		switch (date.getDay()) {
			case 1:
				week = "星期一";
				break;
			case 2:
				week = "星期二";
				break;
			case 3:
				week = "星期三";
				break;
			case 4:
				week = "星期四";
				break;
			case 5:
				week = "星期五";
				break;
			case 6:
				week = "星期六";
				break;
			default:
				week = "星期日";
		}

		let toDate = date.getDay() - nowDate.getDay();//判断几天后，例如：今天或明天或后天,其他返回空
		let intervalDate;
		let currentDate;

		let years = date.getFullYear();//获取年月日时分秒
		let month = this.add_zero(date.getMonth() + 1);
		let days = this.add_zero(date.getDate());
		let hours = this.add_zero(date.getHours());
		let minutes = this.add_zero(date.getMinutes());
		let seconds = this.add_zero(date.getSeconds());
		if (format == "mm-dd-day-week") {////2月18日 今天 星期一
			switch (toDate) {
				case 0:
					intervalDate = "今天";
					break;
				case 1:
					intervalDate = "明天";
					break;
				case 2:
					intervalDate = "后天";
					break;
				default:
					intervalDate = "";
			}
			let currentDate = month + "月" + days + "日" + " " + intervalDate + " " + week
			return currentDate;
		} else {
			switch (format) {
				case "mm-dd-week":
					currentDate = month + "月" + days + "日" + " " + week
					break;
				case "yyyy-mm-dd-week":
					currentDate = years + "年" + month + "月" + days + "日" + " " + week
					break;
				case "yyyy-mm-dd HH:mm:ss":
					currentDate = years + "-" + month + "-" + days + "-" + hours + ":" + minutes + ":" + seconds
					break;
				case "mm-dd HH:mm":
					currentDate = month + "月" + days + "日" + " " + hours + ":" + minutes;
					break;
				case "yyyy-mm-dd":
					currentDate = years + "年" + month + "月" + days + "日"
					break;
			}
			return currentDate;
		}

	};

	add_zero(temp:any) {
		if (temp < 10)
			return "0" + temp;
		else
			return temp;
	};
	/************ 转换日期，格式 <!--2月18日 后天（周三）***********---end*//************ 转换日期，//2017-03-10 10:31:12//2月18日 08:08//2018年2月18日***********---end*/


	/**
	  * by chenxingwu
	  *为年月日添加时分秒 字符串类型
	  * 转换日期，格式 "2008-08-08 00:00:00"---start
	  * @param dateStr 
	  */
	appendTime(dateStr:any) {
		if (dateStr && dateStr.indexOf(" 00:00:00") == -1) {
			return dateStr + " 00:00:00";
		} else {
			return dateStr;
		}
	}
	/************ 转换日期，格式 "2008-08-08 00:00:00"***********---end*/

	/**
	  * by chenxingwu
	  * 转换日期格式 ios时间处理，格式 "2008-08-08"ios,safari不支持"需要格式是："2008/08/08";
	  * @param date, format
	  */
	formatDate(date:any, format:any) {
		if (!date) return;
		if (!format) format = "yyyy-MM-dd";
		switch (typeof date) {
			case "string":
				date = new Date(date.replace(/-/g, "/"));
				break;
			case "number"://考虑了纯秒数传入情况
				date = new Date(date);
				break;
		}
		if (!(date instanceof Date)) return;
		let dict = {
			"yyyy": date.getFullYear(),
			"M": date.getMonth() + 1,
			"d": date.getDate(),
			"H": date.getHours(),
			"m": date.getMinutes(),
			"s": date.getSeconds(),
			"MM": ("" + (date.getMonth() + 101)).substr(1),
			"dd": ("" + (date.getDate() + 100)).substr(1),
			"HH": ("" + (date.getHours() + 100)).substr(1),
			"mm": ("" + (date.getMinutes() + 100)).substr(1),
			"ss": ("" + (date.getSeconds() + 100)).substr(1)
		};
		return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
			return dict[arguments[0]];
		});
	}
}