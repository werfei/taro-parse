import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {BaseProps} from '../BaseProps'
import {styleToObj} from "../../utils/dom"
import Decode from '../Decode/decode'

export default class Td extends Component<BaseProps, {}> {

  options = {
    addGlobalClass: true
  }

  render() {
    const {data} = this.props
    let child
    if (data) {
      const style = styleToObj(data.attr && data.attr.style ? data.attr.style : '')
      if (data.attr && data.attr.width) {
        style.width = data.attr && data.attr.width
      }
      child = (data.child || []).filter(o => o.tag).map((item, index) => (
        <View key={index} className={"~" + item.attr.class} style={style}>
          {item.child && <Decode nodes={item} />}
        </View>))
    }
    return (
      child
    )
  }
}
