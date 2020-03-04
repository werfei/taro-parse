import {Component} from '@tarojs/taro'
import {Block, Button, Image, Navigator, Swiper, SwiperItem, Video, View} from '@tarojs/components'
import {Props} from './interface'
import {styleToObj} from "../../utils/dom"
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Latex from "../Latex/latex";
import Yuml from "../Yuml/Yuml";
import Table from "../Table/table";
import Img from "../Img/Img";
import DecodeA from "./decodeA";
import TodoGroup from "../TodoGroup/TodoGroup";
import './index.scss'

export default class DecodeB extends Component<Props, {}> {
  options={
    addGlobalClass: true
  }

  imgClick = (src) => {
    console.log(src)
  }

  linkClick = (href) => {
    console.log(href)
  }

  buildChildView() {
    const {nodes} = this.props
    if (nodes && nodes.child) {
      return nodes.child.map((item, index) => {
        const tag = item.tag || 'undefined'
        const style = styleToObj(item.attr && item.attr.style ? item.attr.style : '')
        if (item.attr && item.attr.width) {
          style.width = item.attr.width
        }
        let childView;
        console.log("tag:", tag)
        if (tag === 'undefined') {
          childView = <Block key={index}>{item.text}</Block>
        } else if (tag === 'view') {
          childView = <View key={index} className={item.attr.class} style={style}>
            {item.child && <DecodeA nodes={item} />}
          </View>
        } else if (tag === 'video') {
          console.log(item)
          childView = (<Video key={index} src={item.attr.src} poster={item.attr.poster} style={style}>{item.child &&
          <DecodeA nodes={item} />}</Video>)
        } else if (tag === 'text') {
          childView = <View key={index} className={item.attr.class} style={style}>
            {item.child ? <DecodeA nodes={item} /> : item.text}
          </View>
        } else if (tag === 'image') {
          childView = <Image key={index}
            className={item.attr.class}
            style={style}
            src={item.attr.src}
            onClick={() => {
                               this.imgClick(item.attr.src)
                             }}
            mode={item.attr.mode || 'widthFix'}
            lazyLoad={item.attr['lazy-load']}
          >
            {item.child && <DecodeA nodes={item} />}
          </Image>
        } else if (tag === 'navigator') {
          childView = <Navigator key={index}
            className={item.attr.class}
            style={style}
            url={item.attr.href}
            onClick={() => {
                                   this.linkClick(item.attr.href)
                                 }}
          >{item.child && <DecodeA nodes={item} />}</Navigator>
        } else if (tag === 'swiper') {
          childView = <Swiper key={index}
            className={item.attr.class}
            style={style}
          >{item.child && <DecodeA nodes={item} />}</Swiper>
        } else if (tag === 'swiper-item') {
          childView = <SwiperItem key={index}
            className={item.attr.class}
            style={style}
          >{item.child && <DecodeA nodes={item} />}</SwiperItem>
        } else if (tag === 'block') {
          childView = <Block key={index}>{item.child && <DecodeA nodes={item} />}</Block>
        } else if (tag === 'button') {
          childView =
            <Button key={index} className={item.attr.class} style={style}>{item.child &&
            <DecodeA nodes={item} />}</Button>
        } else if (tag === 'audio-player') {
          childView = <AudioPlayer key={index} data={item} />
        } else if (tag === 'latex') {
          childView = <Latex key={index} data={item} />
        } else if (tag === 'table') {
          childView = <Table key={index} data={item} />
        } else if (tag === 'yuml') {
          childView = <Yuml key={index} data={item} />
        } else if (tag === 'img') {
          childView = <Img key={index} data={item} />
        } else if (tag === 'todogroup') {
          childView = <TodoGroup key={index} data={item} />
        }
        console.log('child', childView === null)
        return childView
      })
    }
    return <Block />
  }

  render() {
    const node = this.buildChildView()
    return (
      <Block>{node}</Block>
    )
  }
}
