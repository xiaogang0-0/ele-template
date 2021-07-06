
## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git
git clone git@github.com:YXKJ-web/YXKJ_pc.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

生产环境 http://ttwx.vip

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


## 基础架构pc 仓库地址
  github.com:xiaogang0-0/ele-template.git

###  方法
  sessionStorage.getItem('')
  sessionStorage.removeItem('')
  sessionStorage.setItem('name',JSON.stringify(data))
  localStorage.setItem('name',JSON.stringify(data))

## 公用组件
```bash
  # 阿里云单张上传图片
  "@/components/uploadImg/index"
  # 分页 
  "@/components/pages/pagination.vue"
    # 地址三级联动 
```
### 用到的插件安装包
  cnpm isntall html2canvas

## 本地存储搜索信息
```bash
  # 用户信息
  'YXKJ_userInfo'
  # 权限信息
  'YXKJ_menuList'
  # token
  'YXKJ_Token'

  #内容区域的公用className
   'app-container'

```

## 账号
```bash
  # 客户login端 # 测试服
   账号： 18801012566     密码：  K1111111 
    
  # 客户login端 # 正式服
   账号：      密码：   

  # 后台管理home端 #
   账号：      密码：   
```

## 总结常用功能（工具页）
  企业客户端登录路由为： login
  平台管理端登录路由为： home
## git开发者
  # justforwork.zhuhh@gmail.com
  # carrie8909@126.com

## 本地路由权限配置

   # src/api/menuList.json 文件中的配置 在login数组中添加以下代码
   # login: [] // push 企业客户端登录路由
   # home: [] // push 平台管理端登录路由
  
  ## **** 注意：*****
   #  1. router/modules/components.js 中  路由配置 必须要统一添加 hidden: true属性 实现本地隐藏
   # 2. 更改menuList.json文件后 需要退出重新登录  达到刷新 权限请求的目的

## 待完成
  # 公用多张上传 


  async await





introduction
vux
参数默认值