import Taro from "@tarojs/taro";
import {Component} from 'react'
import {View} from '@tarojs/components'
import './index.scss'
import TaroParser from "../../index";
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
    Taro.showLoading({title: '加载中...'}).then(() => {
    })
    const content = markdown
    return (
      <View className='index'>
        <TaroParser
          type='markdown'
          theme='light'
          onImgClick={this.imgClick}
          onLinkClick={this.linkClick}
          onLoaded={() => {
            Taro.hideLoading()
          }}
          yumlApi='https://md.werfei.com/?yuml'
          latexApi='https://md.werfei.com/?tex'
          content={content}
        />
      </View>
    )
  }
}
