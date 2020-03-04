import {Component} from '@tarojs/taro'
import {Image} from '@tarojs/components'
import {State} from './interface'
import './index.scss'
import {BaseProps} from "../BaseProps";
import config from '../config'

export default class Latex extends Component<BaseProps, State> {

  state = {
    size: {
      w: 0,
      h: 0
    },
    attr: {
      className: '',
      src: ''
    }
  }

  componentWillMount(): void {
    const {data} = this.props

    // 设置公式图片
    this.setState({
      attr: {
        src: `${config.latex.api}=${data.attr.value}&theme=${config.theme}`,
        className: `${data.attr.class} ${data.attr.class}--${data.attr.type}`
      }
    });
  }

  load = (e) => {
    // 公式图片加载完成则根据其图片大小、类型计算其显示的合适大小
    const scale = 20,
      w = e.detail.width / scale,
      h = e.detail.height / scale;

    this.setState({
      size: {
        w: w || 0,
        h: h || 0
      }
    })
  }
  options={
    addGlobalClass: true
  }
  render() {
    const {attr, size} = this.state
    return (
      <Image
        className={attr.className}
        lazy-load='true'
        src={attr.src}
        style={{width: size.w + "em", height: size.h + "em"}}
        onLoad={this.load}
      />
    )
  }
}
