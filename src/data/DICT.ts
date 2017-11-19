/**
 * Created by ex_chenxw on 2017/7/5.
 */

/**********************************************
 *****************前端字典*********************
 ***********************************************/

export const GLOBAL = {
    events : {
        push:"push:page",
        user:{
            accessServer : {
                error : "user:accessServer:error",
                success : "user:accessServer:success"
            },
            login : {
                error : "user:login:error",
                success : "user:login:success"
            },
            logout : {
                error : "user:logout:error",
                success : "user:logout:success"
            }
        },
        order:{
            inter:"order:update"
        }
    },
    status: {//-1禁用  1启用 0删除 2拉黑
        unable: -1,
        delete: 0,
        enable: 1,
        defriend: 2
    },
    linePageType:{
         lineSuccess:0,
         lineError:1,
         playSuccess:2,
         playError:3
    },
    orderPlayStatus:{//支付状态
        ORDER_STATUS_UNPAY : 1, //未支付
    	BUS_ORDER_STATUS_PAY : 2, //已支付
    	BUS_ORDER_STATUS_CANCEL_PASSENGER : 3, //乘客主动取消
    	BUS_ORDER_STATUS_CANCEL_SYSTEM : 4, //超过系统设定时间未支付，由系统取消
    	BUS_ORDER_STATUS_REFUND : 5, //已退款
    }
}
export const DICT = {
    "status": [
        {
            "label": "禁用",
            "value": GLOBAL.status.unable
        },
        {
            "label": "启用",
            "value": GLOBAL.status.enable
        }
    ],
    "sex": [
        {
            "label": "男",
            "value": 0
        },
        {
            "label": "女",
            "value": 1
        }
    ],
    "orderStatus": [
        {
            "label": "订单填写",
            "value": 0
        },
        {
            "label": "待付款",
            "value": 1
        },
        {
            "label": "出票成功",
            "value": 2
        },
        {
            "label": "已取消",
            "value": 3
        },
        {
            "label": "订单已超时",
            "value": 4
        },
        {
            "label": "已退款",
            "value": 5
        }
    ],
    "serviceType": [
        {
            "label": "出租车",
            "value": 1
        },
        {
            "label": "专车",
            "value": 2
        },
         {
            "label": "巴士票",
            "value": 3
        }
    ],
     "couponStatus": [
        {
            "label": "已使用",
            "value": -1
        },
        {
            "label": "已失效",
            "value": -2
        },
         {
            "label": "有效的",
            "value": 1
        }
    ],
};
