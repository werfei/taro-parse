import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {BaseProps} from 'types/BaseProps'
import {styleToObj} from "../../utils/dom"
import Decode from '../Decode/decode'
import config from '../../utils/config'

export default class Table extends Component<BaseProps, {}> {

  options = {
    addGlobalClass: true
  }

  buildTr(trList) {
    return trList.filter(o => o.tag).map((trs, trIndex) => {
      let child
      if (trs.child) {
        child = trs.child.filter(o => o.tag)
      } else {
        child = []
      }
      const children = child.map((item, index) => {
        let style

        if (item.attr && item.attr.style) {
          style = styleToObj(item.attr.style)
          if (item.attr && item.attr.width) {
            style.width = item.attr.width
          }
        }
        return (
          <View key={index} className={config.classPrefix + item.attr.class} style={style}>
            {item.child && <Decode nodes={item} />}
          </View>
        )
      })
      return (<View key={trIndex} className={config.classPrefix + trs.attr.class}>
        {children}
      </View>)
    })
  }

  render() {
    const {data} = this.props
    let child
    let style
    if (data) {
      style = styleToObj(data.attr && data.attr.style ? data.attr.style : '')
      if (data.attr && data.attr.width) {
        style.width = data.attr.width
      }

      child = (data.child || []).filter(o => o.tag).map((item, index) => {
        const c = this.buildTr(item.child)
        return (<View key={index} className={config.classPrefix + item.attr.class}>
          {c}
        </View>)
      })

    }
    return (
      data && data.tag === 'table' && (
        <View className={config.classPrefix + 'h2w__tableParent'}>
          <View className={config.classPrefix + data.attr.class} style={style}>
            {child}
          </View>
        </View>
      )
    )
  }
}
