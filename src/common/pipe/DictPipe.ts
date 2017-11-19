import { PipeTransform, Pipe } from "@angular/core";
import { DICT } from "../../data/DICT";

@Pipe({
  name: "dict"
})
export class DictPipe implements PipeTransform {

  /**
   * 管道，过滤字典内容，例如："sex": [ { "label": "男", "value": 1 },]
   * value | dict:"sex"
   * @param input 
   * @param type1 
   */
  transform(input: any, type1: any): any {
    try {
      if (!input && input !== 0) {
        return '';
      }
      if (!type1) {
        return '';
      }
      let resultStr = "";
      let prefix = "";
      let arr = [];
      if (isNaN(input)) {
        arr = input.split(",");
      } else {
        arr.push(input + "");
      }
      for (let k = 0; k < arr.length; k++) {
        if (arr[k] || arr[k] === 0) {
          for (let temp in DICT) {
            if (temp == type1) {
              let _array = DICT[temp];// 到此，是一个数组
              for (var j = 0; j < _array.length; j++) {
                var label_value = _array[j]; // 此对象必须是{"label":"_label","value":"_value"}
                var tmpArr = arr[k].split("-");
                if (!tmpArr[0] && tmpArr[0] !== 0) {
                  tmpArr[0] = arr[k];
                }
                if (tmpArr[0] == label_value.value &&
                  label_value.label) {
                  resultStr += prefix + label_value.label;
                  if (prefix == "")
                    prefix = ",";
                }
              }
            }
          }
        }
      }
      return resultStr;
    }
    catch (e) {
      console.warn("获取 label:" + type1 + " 失败...");
      console.error(e);
    }
    return '';
  }

}
