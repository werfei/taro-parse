import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {BaseProps} from '../BaseProps'
import {styleToObj} from "../../utils/dom"
import Td from './Td'

export default class Tr extends Component<BaseProps, {}> {

  options = {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }

  render() {
    const {data} = this.props
    let child
    let style
    if (data) {
      style = styleToObj(data.attr && data.attr.style ? data.attr.style : '')
      if (data.attr && data.attr.width) {
        style.width = data.attr && data.attr.width
      }

      child = (data.child || []).filter(o => o.tag).map((item, index) => (<View key={index} className={'~'+item.attr.class}>
          <Td data={item} />
        </View>))

    }
    return (
      child
    )
  }
}
