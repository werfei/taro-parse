import {Component} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {Props, State} from 'types/Yuml'
import config from '../../utils/config'

export default class Yuml extends Component<Props, State> {

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
    const apiPath = api || config.yuml.api
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

  imgClick = (src) => {
    if (this.props.onImgClick) {
      this.props.onImgClick(src)
    }
  }

  options = {
    addGlobalClass: true
  }

  render() {
    const {attr, size} = this.state
    return (
      <View className={config.classPrefix + 'h2w__yumlBox'}>
        <View style={{width: size.w + "em"}} className={config.classPrefix + 'h2w__yumlView'}>
          <Image
            className={config.classPrefix + attr.className}
            lazy-load='true'
            src={attr.src}
            onClick={() => {
              this.imgClick(attr.src)
            }}
            style={{width: size.w + "em", height: size.h + "em"}}
            onLoad={this.load}
          />
        </View>
      </View>
    )
  }
}
