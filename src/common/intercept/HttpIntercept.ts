
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, ConnectionBackend, RequestOptionsArgs} from '@angular/http';


import {Observable} from "rxjs";
import {HttpInterceptHandle} from "./HttpInterceptHandle";
/**
 * 拦截所有http请求
 */
@Injectable()
export class HttpIntercept extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, public _: HttpInterceptHandle) {
    super(backend, defaultOptions);
  }

  get(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.get(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.post(url, body, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.put(url, body, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  delete(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.delete(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.patch(url, body, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }


  head(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.head(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }


  options(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options);
    return Observable.create((observer:any) => {
      super.options(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

}
