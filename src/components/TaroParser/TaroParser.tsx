import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {Props, State} from "types/Parser";
import {Data} from "types/Data";
import Decode from "../Decode/decode";
import convert from '../../utils/parser'
import config from '../../utils/config'

export default class TaroParser extends Component<Props, State> {

  static options = {
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

  render() {
    const {content, type, latexApi, yumlApi, theme} = this.props
    const nodes = convert(content || '', type || 'markdown') as unknown as Data
    const className = `${config.classPrefix}h2w ${config.classPrefix}h2w-` + (theme ? theme : 'light')
    return (
      <View className={className}>
        <View className={config.classPrefix + 'h2w__main'}>
          {nodes &&
          <Decode latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={nodes}
          />}
        </View>
      </View>
    )
  }
}
