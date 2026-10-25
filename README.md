# 爪迹 Pawprint

面向年轻养宠人群的宠物成长记录与同城交流静态 MVP。使用 HTML、CSS 与原生 JavaScript 实现，不需要安装依赖或执行构建。

## 本地启动

推荐使用 VS Code 的 Live Server：

1. 在 VS Code 中打开项目目录。
2. 右键 `index.html`，选择 **Open with Live Server**。

也可以直接双击打开 `index.html`。通过本地静态服务器访问时，图片和浏览器存储行为会更稳定。

## 已实现功能

- Dashboard：宠物概览、健康提醒、SVG 体重趋势、成长动态与附近宠友。
- 我的宠物：默认柯基犬「奶酪」、编辑资料、添加多只宠物与档案切换。
- 健康记录：新增体重、疫苗、驱虫记录，日期提醒与趋势同步更新。
- 成长时间线：倒序日记、类别标签、可选本地图片上传与预览。
- 同城社区：上海、北京、杭州、深圳、广州筛选，发布文字动态与本地点赞。
- 数据持久化：用户操作通过 `localStorage` 保存在当前浏览器。
- 响应式设计：桌面 Dashboard 优先，同时兼容平板与手机。

> 同城信息与动态为 Mock Data，仅用于静态产品演示，不包含真实 GPS、在线聊天、账号系统或跨用户同步。

## 重置演示数据

在浏览器开发者工具的 Console 中执行：

```js
localStorage.removeItem('pawprint-app-v1');
location.reload();
```

## GitHub Pages 部署

1. 将本目录内容提交并推送到 GitHub 仓库的默认分支。
2. 进入仓库 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 选择默认分支和根目录 `/ (root)`，保存。

项目使用相对资源路径，根目录的 `index.html` 可直接用于 GitHub Pages；`.nojekyll` 会让平台按纯静态站点处理。
