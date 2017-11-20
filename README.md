## 技术栈：

angular2.0 + ionic2.0 + rxjs  + sass + ES6/7 + webpack + typescript + tslint


>angular2.0-ionic-moon

>ionic2 moon app

>node的版本要求大于6

## Build Setup

```  
# 安装依赖：
npm install或cnpm install
# 如果npm安装依赖报错，改cnpm(淘宝镜像)安装

# 启动项目：
ionic serve

#打包项目
npm run build //测试
npm run ionic:build --prod//生产

npm install -g cordova ionic
cordova platform remove android
cordova platform add android
#Deploying to a Device
ionic cordova run android --prod --release
# or
ionic cordova build android --prod --release
#生成签名
keytool -genkey -v -keystore my-release-key.keystore -alias moon(应用名) -keyalg RSA -keysize 2048 -validity 10000
建议使用 "keytool -importkeystore -srckeystore my-release-key.keystore -destkeystore my-release-key.keystore -deststoretype pkcs12" 迁移到行业标准格式 PKCS12。
#签名应用文件
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore demo.keystore test.apk moon(应用名)

# 文件结构
 
├── config
│   ├── helpers.js              ────── 配置入口文件
│   ├── webpack.common.js       ────── 公共的配置文件
├── src
│   ├── app    
│   │   │── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts        ────── 根组件
│   │   ├── app.module.ts     ────── 根模块  为Angular描述如何组装应用
│   │ 
├── |—— component ———————— 组件
├── |—— common ———————— 公共用件
│   │   ├── interface       ────── 定义接口
│   │   │   └── interface.ts
│   │   ├── service     ──────  服务
│   │   │    └── service.ts
│   │   ├── pipe     ────── 管道（过滤器）
│   │   │    └── pipe.ts
├── |—— data ———————— 数据，全局变量，常量
├── |—— theme ———————— 主题化，框架样式
│   ├── index.html      ────── 主页面
|   |————service-worker.js   ────── 项目的入口文件
|       ├── main.ts        
|       ├── polyfills.ts    ────── 在大多数现代浏览器中运行Angular程序时需要的标准填充物。
|       └── vendor.ts       ────── 我们需要的提供商文件：Angular、Lodash、bootstrap.css……
├── package.json        ────── 项目所有相关依赖信
├── CubeModule.json       ────── 配置了项目的信息，版本等
├── README.md   
|——config.xml  ———————— cordova的配置文件
├── tslint.json       ────── 配置了TypeScript代码检查配置
├── tsconfig.json       ────── 配置了TypeScript编译器的编译参数
└── webpack.config.js   ──────  webpack配置文件

# 遵循typeScript的语法
# 类名必须大写
```


