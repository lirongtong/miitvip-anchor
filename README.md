<p align="center">
    <a href="https://admin.makeit.vip/">
        <img width="200" src="https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png">
    </a>
</p>

<h1 align="center" color="green">
    <a href="https://admin.makeit.vip/components/anchor" target="_blank" style="color: #41b995">
        Makeit Anchor
    </a>
</h1>

<div align="center">

基于 Vue3.0 + Vite 开发的自动收集 H 标签，进而形成锚点，悬浮展示的组件

[![npm package](https://img.shields.io/npm/v/makeit-anchor.svg?style=flat-square)](https://www.npmjs.org/package/makeit-anchor)
[![npm_downloads](http://img.shields.io/npm/dm/makeit-anchor.svg?style=flat-square)](http://www.npmtrends.com/makeit-anchor)
![MIT](https://img.shields.io/badge/license-MIT-ff69b4.svg)
![webpack](https://img.shields.io/badge/webpack-5.17.0-orange.svg)
![vue](https://img.shields.io/badge/vue-3.0.5-green.svg)
![vite](https://img.shields.io/badge/vite-1.0.0-yellow.svg)
</div>

## 关于

> Makeit Anchor 锚点组件，基于 Vue3.0 + Vite + JSX 开发，自动收集页面内的 H 标题标签，使其形成锚点，悬浮展示并提供自动跳转功能。

## 安装

```bash
npm i makeit-anchor
```

## 使用
```ts
import { createApp } from 'vue'
import MakeitAnchor from 'makeit-anchor'
import 'makeit-anchor/dist/anchor.min.css'
import App from './app.vue'

const app = createApp(App)
app.use(MakeitAnchor)
app.mount('#app')
```

## 示例
```vue
<template>
    <mi-anchor></mi-anchor>
</template>
```

## 更多
> 更多定制化内容及使用请查看在线示例：[https://admin.makeit.vip/components/anchor](https://admin.makeit.vip/components/anchor)