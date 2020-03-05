# <p align="center">TaroParse taro版本富文本解析组件</p>
## <p align="center">支持Html及markdown转wxml可视化</p>
##### <p align="center"><code>版本号:1.0.0</code></p>
## 特色
## 特色
- 支持LaTex数学公式
- 支持yuml流程图
- 支持代码语法高亮、代码块行号显示
- 支持emoji表情😉
- 支持上标、下标、下划线、删除线、表格、视频、图片
- 支持typographer字符替换
- 支持多主题切换
- 支持Markdown TodoList
## 使用方式
| 参数名 | 类型   |描述 |
| :---:  | :----: | :----: |
| type| String | markdown \| html|
| theme| String | 主题 'light' \| 'dark'|
| content| String | 要解析的内容 |
| onImgClick| Function|  图片点击回调|
| onLinkClick| Function| 链接点击回调 |
| yumlApi| String| 否 | yuml流程图云解析地址 |
| latexApi| String| 否 | latex数学公式云解析地址 |
### 示例
```react
 <Parser
          type='markdown'
          theme='light'
          onImgClick={this.imgClick}
          onLinkClick={this.linkClick}
          yumlApi='https://md.werfei.com/?yuml'
          latexApi='https://md.werfei.com/?tex'
          content={content}
        />
```
流程图和数学公式云解析参考[@markdown-server](https://github.com/sbfkcel/markdown-server) 组件内置一个默认地址，由于是自建服务器，存在不稳定性，建议自行搭建解析服务
## 感谢
该项目是基于 [@towxml](https://github.com/sbfkcel/towxml) 做的taro版本
