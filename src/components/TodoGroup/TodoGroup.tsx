import {Checkbox, CheckboxGroup, Label} from "@tarojs/components"
import { Component }  from 'react'
import {BaseProps} from "types/BaseProps"
import Decode from "../Decode/decode";
import config from '../../utils/config'

export default class TodoGroup extends Component<BaseProps, {}> {

  options = {
    addGlobalClass: true
  }

  buildText(val) {
    return (val.child || []).map(item => <Decode key={item.index} nodes={item} />)
  }

  buildCheckbox(val) {
    return val.child.filter(o => o.tag === 'checkbox').map(item => <Checkbox value={item.attr.value}
      className={config.classPrefix + item.attr.class}
      key={item.index}
      checked={item.attr.checked}
      disabled={item.attr.disable}
    />)
  }

  render() {
    const {data} = this.props
    const children = (data && data.child ? data.child : []).filter(o => o.tag).map(item => {
      const checkbox = this.buildCheckbox(item)
      const text = this.buildText(item)
      return <Label key={item.index} className={config.classPrefix + item.attr.class}>
        {checkbox}
        {text}
      </Label>
    })
    return (
      data &&
      <CheckboxGroup className={config.classPrefix + data.attr.class}>
        {children}
      </CheckboxGroup>
    )
  }
}
