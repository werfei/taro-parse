# <p align="center">TaroParse taro版本富文本解析组件</p>
## <p align="center">支持Html及markdown可视化</p>
##### <p align="center"><code>版本号:1.1.4</code></p>
## 特色
- 支持LaTex数学公式
- 支持yuml流程图
- 支持代码语法高亮、代码块行号显示
- 支持emoji表情😉
- 支持上标、下标、下划线、删除线、表格、视频、图片
- 支持typographer字符替换
- 支持多主题切换
- 支持Markdown TodoList
- 目前只支持h5和微信小程序，别的小程序平台现在样式问题暂未解决(<b>小程序没太深入研究过，各位大佬如果有方案，欢迎指导</b>)
## 使用方式
#### 1、安装 ` taro-parse `
##### npm 安装
` npm install taro-parse `
##### yarn 安装
` yarn add taro-parse`
#### 2、引入组件
``` 
import '~taro-parse/dist/style/main'
import TaroParser from 'taro-parse'
```
#### 3、组件参数

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

```
import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import '~taro-parse/dist/style/main.scss'
import TaroParser from 'taro-parse'

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  options = {
    addGlobalClass: true
  }

  imgClick = (src, imgList) => {
     Taro.previewImage({urls: imgList, current: src}).then(() => {
    })
  }

  linkClick = (href) => {
    Taro.setClipboardData({data: href}).then(() => {
      Taro.showToast({title: '链接已复制'}).then(() => {
      })
    })

  }

  render() {
    const content = '### HelloWorld'
    return (
      <View className='index'>
        <TaroParser
          type='markdown'
          theme='light'
          onImgClick={this.imgClick}
          onLinkClick={this.linkClick}
          yumlApi='https://md.werfei.com/?yuml'
          latexApi='https://md.werfei.com/?tex'
          content={content}
        />
      </View>
    )
  }
}

```

### 流程图和数学公式云解析参考[@markdown-server](https://github.com/sbfkcel/markdown-server) 
### ps:组件内置一个默认地址，由于是自建服务器，存在不稳定性，建议自行搭建解析服务
## 感谢
该项目是基于 [@towxml](https://github.com/sbfkcel/towxml) 做的taro版本
