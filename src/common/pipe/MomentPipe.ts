import { PipeTransform, Pipe } from "@angular/core";
import { DateService } from '../service/DateService';

@Pipe({
  name: "moment"
})
export class MomentPipe implements PipeTransform {


  constructor(dateService: DateService) {
  }
  //将方法写在DateService里面，此处只调用  <!--转换格式：2月18日 后天（周三）-->
  transform(dateAny: any, format: any): any {
    let dateService = new DateService();
    if (!dateAny) {//判断空
      return dateAny;
    }
    /*******测试时间 */
    //  let a = "2017-08-08 09:09:01";
    //  let b = "2017-08-08 00:09:01"
    // console.log("测试时间"+dateService.getTimeFormat(a,b));
  
    // console.log(dateService.getTimeFormat(a,b));
    /*******测试时间 */
    // return dateService.ymdTimeDate(dateAny,format);
    // // return dateService.getCurDate(dateAny)
    switch (format) {
      case "mm-dd-day-week"://转换格式：2月18日 后天（周三）
        return dateService.getCurDate(dateAny, format);
      case "yyyy-mm-dd-week"://转换格式：2018年2月18日 （周三）
        return dateService.getCurDate(dateAny, format);
      case "mm-dd-week"://转换格式：2月18日 （周三）
        return dateService.getCurDate(dateAny, format);
      case "yyyy-mm-dd hh:mm:ss"://转换格式：2018-2-18 08:08
        return dateService.getCurDate(dateAny, format);
      case "yyyy-mm-dd"://转换格式：2018年2月18日
        return dateService.getCurDate(dateAny, format);
      case "mm-dd HH:mm"://转换格式：2月18日 08:08
        return dateService.getCurDate(dateAny, format);
      case "yyyy-mm-dd 00:00:00"://转换格式：2018-2-18 00:00:00
        return dateService.appendTime(dateAny);
      case "HH:mm"://转换格式：2018-2-18 00:00:00
        return dateService.formatDate(dateAny,format);
      case "countDownTime"://倒计时
        return dateService.countDownTime(dateAny);
      //  case"yyyy-mm-dd 00:00:00":
      // 		 return dateService.(dateAny,format);
      //  case"yyyy-mm-dd":
      // 		 return dateService.appendTime(dateAny,format);
      default:
        return dateAny;
    }
  }

}
