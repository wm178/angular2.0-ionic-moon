
import { CONFIG } from "../../data/CONFIG";
// import { CookieService } from 'angular2-cookie/services/cookies.service';

/**
 * 请求数据容器
 * @author   ex_chenxw
 * @version  1.0
 * @since    
 * @see 	 
 */
export class Packet {
	/**
	 * 请求来源
	 * 1.易打车app，前海行，3西湖中南行（微信）
	 */
	public channel :number;
	/**
	 * 消息唯一标识符，长链接处理有用
	 */
	public messageId :number;
	
	/**
	 * 版本号，如果系统中存在多个版本，可以依据版本号进行区分处理，对于过老的版本可以禁止访问
	 */
	public version : number;
	
	/**
	 * 平台号   1安卓 ，2 ios，3 微信
	 */
	public platform : number; 
	
	/**
	 * 操作唯一标识符   服务器和客户端收到数据依据op进行业务逻辑处理
	 */
	public op:string;
	
	/**
	 * "app与服务器通信"和"服务器和服务器间通信"使用   
	 * app_token:生成规则  base32( base32(精确到毫秒的时间yyyymmddHHMMssSSS) + base32(userIdentify + appkey) + base32(hostname) )
	 * server_token: hostname
	 * token是和对应的服务器主机名绑定的，如果因为某种原因服务器宕机了，则对应的用户需要重新登陆
	 * token存在数据库中   token可以当做用户一段时间内的唯一标识符
	 */
	/**
	 * 已登录用户身份标识符
	 */
	 public token : string;
	 /**
	  * 返回码
	  */
	 public code : number;
	
		/**
		 * 业务数据，存储json字符串类型的请求数据
		 */
	 public data: string;
	
	/**
	 *
	 * @param data 必填
	 * @param platform 
	 * @param channel 
	 * @param op 
	 * @param token 
	 * @param version 
	 * @param messageId 
	 * @param code 
	 */
	constructor(
		data: string,
		// op?:string,
		// version? : number,
		// messageId? : number,
		// code? : number,
		platform?: number,
		channel?:number,
		 token?:string){
		// let cookieService = new CookieService();
		this.data = data;
		// this.op = op? op : this.op;
		// this.version = version;
		// this.messageId = messageId;
		// this.code = code;
		this.platform = platform ? channel : CONFIG.platform;
		this.channel = channel ? channel : CONFIG.channel;
		// this.token = token ? token : cookieService.get("token");
	}
	public setData(data:any){
			this.data = data;
		}
	public getData():any{
			return this.data || "";
		}
}

