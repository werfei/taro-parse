import {Component} from '@tarojs/taro'
import {Image} from '@tarojs/components'
import {BaseProps} from "../BaseProps"
import {State} from './interface'
import {styleToObj} from "../../utils/dom";
import './index.scss'

export default class Img extends Component<BaseProps, State> {

  state = {
    size: {
      w: 0,
      h: 0
    },
    attr: {
      className: '',
      src: '',
      style: ''
    }
  }

  componentWillMount(): void {
    const {data} = this.props
    if (!data) {
      return
    }
    const style = styleToObj(data.attr && data.attr.style ? data.attr.style : '')
    const size = {
      w: 0,
      h: 0
    }
    if (style.width) {
      size.w = parseInt(style.width)
      size.h = parseInt(style.height)
      this.setState({
        size: size
      })
    }
    // 设置公式图片
    this.setState({
      attr: {
        src: data.attr.src,
        className: data.attr.class
      }
    });
  }
  options={
    addGlobalClass: true
  }
  render() {
    const {attr, size} = this.state
    const {data} = this.props
    let style
    if (data) {
      style = styleToObj(data.attr && data.attr.style ? data.attr.style : '')
      if (size.w > 0 && size.h > 0) {
        style.width = size.w + 'em'
        style.height = size.h + 'em'
      }
      style.fontSize='inherit'
    }
    return (
      data && <Image
        className={attr.className}
        lazy-load='true'
        src={attr.src}
        style={style}
      />
    )
  }
}
