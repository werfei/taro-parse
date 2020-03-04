import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import Parser from "../../components/Parser/Parser";
import markdown from "./markdown";

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  options = {
    addGlobalClass: true
  }

  imgClick = (src) => {
    Taro.previewImage({urls: [src]}).then(() => {
    })
  }

  linkClick = (href) => {
    Taro.setClipboardData({data: href}).then(() => {
      Taro.showToast({title: '链接已复制'}).then(() => {
      })
    })

  }

  render() {
    const content = markdown
    return (
      <View className='index'>
        <Parser
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
