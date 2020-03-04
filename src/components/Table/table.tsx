import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {BaseProps} from '../BaseProps'
import {styleToObj} from "../../utils/dom"
import './index.scss'
import Decode from '../Decode/decode'

export default class Table extends Component<BaseProps, {}> {

  options={
    addGlobalClass: true
  }

  buildTr(items) {

    return items.filter(o => o.tag).map((item, index) => {
      const child = this.buildTd(item.child)
      return (<View key={index} className={item.attr.class}>
        {child}
      </View>)
    })
  }

  buildTd(items) {

    return items.filter(o => o.tag).map((item, index) => {
      const style = styleToObj(item.attr.style)
      style.width = item.attr.width || 'auto'
      return (
        <View key={index} className={item.attr.class} style={style}>
          {item.child && <Decode nodes={item.child} />}
        </View>
      )
    })
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

      child = (data.child || []).filter(o => o.tag).map((item, index) => {
        const c = this.buildTr(item.child)
        return (<View key={index} className={item.attr.class}>
          {c}
        </View>)
      })

    }
    return (
      data && data.tag === 'table' && (
        <View className='h2w__tableParent'>
          <View className={data.attr.class} style={style}>
            {child}
          </View>
        </View>
      )
    )
  }
}
