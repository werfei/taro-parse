import Taro, {Component} from '@tarojs/taro'
import {Block, Button, Image, Navigator, Swiper, SwiperItem, Video, View} from '@tarojs/components'
import {Props} from 'types/Decode'
import {styleToObj} from "../../utils/dom"
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Latex from "../Latex/latex";
import Yuml from "../Yuml/Yuml";
import Table from "../Table/table";
import Img from "../Img/Img";
import TodoGroup from "../TodoGroup/TodoGroup";
import DecodeB from "./decode"

export default class DecodeA extends Component<Props, {}> {

  options = {
    addGlobalClass: true
  }

  imgClick = (src) => {
    if (this.props.onImgClick) {
      this.props.onImgClick(src)
    }
  }

  linkClick = (href) => {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(href)
    }
  }


  buildChildView() {
    const {nodes, latexApi, yumlApi} = this.props
    if (nodes && nodes.child) {
      return nodes.child.map((item, index) => {
        const tag = item.tag || 'undefined'
        const style = styleToObj(item.attr && item.attr.style ? item.attr.style : '')
        if (item.attr && item.attr.width) {
          style.width = item.attr.width
        }
        let childView;
        if (tag === 'undefined') {
          childView = <Block key={index}>{item.text}</Block>
        } else if (tag === 'view') {
          childView = <View key={index} className={'~' + item.attr.class} style={style}>
            {item.child &&
            <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
              nodes={item}
            />}
          </View>
        } else if (tag === 'video') {
          childView = (<Video key={index} src={item.attr.src} poster={item.attr.poster} style={style}>{item.child &&
          <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={item}
          />}</Video>)
        } else if (tag === 'text') {
          childView = <View key={index} className={'~' + item.attr.class} style={style}>
            {item.child ?
              <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
                nodes={item}
              /> : item.text}
          </View>
        } else if (tag === 'image') {
          childView = <Image key={index}
            className={'~' + item.attr.class}
            style={style}
            src={item.attr.src}
            onClick={() => {
                               this.imgClick(item.attr.src)
                             }}
            mode={item.attr.mode || 'widthFix'}
            lazyLoad={item.attr['lazy-load']}
          >
            {item.child &&
            <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
              nodes={item}
            />}
          </Image>
        } else if (tag === 'navigator') {
          childView = <Navigator key={index}
            className={'~' + item.attr.class}
            style={style}
            url={item.attr.href}
            onClick={() => {
                                   this.linkClick(item.attr.href)
                                 }}
          >{item.child &&
          <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={item}
          />}</Navigator>
        } else if (tag === 'swiper') {
          childView = <Swiper key={index}
            className={'~' + item.attr.class}
            style={style}
          >{item.child &&
          <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={item}
          />}</Swiper>
        } else if (tag === 'swiper-item') {
          childView = <SwiperItem key={index}
            className={'~' + item.attr.class}
            style={style}
          >{item.child &&
          <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={item}
          />}</SwiperItem>
        } else if (tag === 'block') {
          childView = <Block key={index}>{item.child &&
          <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={item}
          />}</Block>
        } else if (tag === 'button') {
          childView =
            <Button key={index} className={'~' + item.attr.class} style={style}>{item.child &&
            <DecodeB latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
              nodes={item}
            />}</Button>
        } else if (tag === 'audio-player') {
          childView = <AudioPlayer key={index} data={item} />
        } else if (tag === 'latex') {
          childView = <Latex api={latexApi} onImgClick={this.imgClick} key={index} data={item} />
        } else if (tag === 'table') {
          childView = <Table key={index} data={item} />
        } else if (tag === 'yuml') {
          childView = <Yuml api={yumlApi} onImgClick={this.imgClick} key={index} data={item} />
        } else if (tag === 'img') {
          childView = <Img onImgClick={this.imgClick} key={index} data={item} />
        } else if (tag === 'todogroup') {
          childView = <TodoGroup key={index} data={item} />
        }
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
