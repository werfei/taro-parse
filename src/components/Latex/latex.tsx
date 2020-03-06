import {Component} from '@tarojs/taro'
import {Image} from '@tarojs/components'
import {Props, State} from 'types/Latex'
import config from '../../utils/config'


export default class Latex extends Component<Props, State> {

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
    const {data, api} = this.props
    const apiPath = api || config.latex.api

    // 设置公式图片
    this.setState({
      attr: {
        src: `${apiPath}=${data.attr.value}&theme=${config.theme}`,
        className: `${config.classPrefix}${data.attr.class} ${config.classPrefix}${data.attr.class}--${data.attr.type}`
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
  options = {
    addGlobalClass: true
  }

  imgClick = (src) => {
    if (this.props.onImgClick) {
      this.props.onImgClick(src)
    }
  }

  render() {
    const {attr, size} = this.state
    return (
      <Image
        className={config.classPrefix + attr.className}
        lazy-load='true'
        onClick={() => {
          this.imgClick(attr.src)
        }}
        src={attr.src}
        style={{width: size.w + "em", height: size.h + "em"}}
        onLoad={this.load}
      />
    )
  }
}
