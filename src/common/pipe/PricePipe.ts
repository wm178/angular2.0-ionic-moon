import { PipeTransform, Pipe } from "@angular/core";
import { PriceService } from '../service/PriceService';

@Pipe({
  name: "price"
})
export class PricePipe implements PipeTransform {

  transform(price: any,type:any): any {

    if (!price) {//判断空
      return price; 
    }

     let priceService: PriceService = new PriceService();
     return priceService.elementFilter(price,type);
  }
}
