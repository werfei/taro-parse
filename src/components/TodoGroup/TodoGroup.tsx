import {Checkbox, CheckboxGroup, Label} from "@tarojs/components"
import {Component} from '@tarojs/taro'
import {BaseProps} from "types/BaseProps"
import Decode from "../Decode/decode";

export default class TodoGroup extends Component<BaseProps, {}> {

  options={
    addGlobalClass: true
  }

  buildText(val) {
    return (val.child || []).map(item => <Decode nodes={item} />)
  }

  buildCheckbox(val) {
    return val.child.filter(o => o.tag === 'checkbox').map(item => <Checkbox value={item.attr.value}
      className={'~'+item.attr.class}
      checked={item.attr.checked}
      disabled={item.attr.disable}
    />)
  }

  render() {
    const {data} = this.props
    const children = (data && data.child ? data.child : []).filter(o => o.tag).map(item => {
      const checkbox = this.buildCheckbox(item)
      const text = this.buildText(item)
      return <Label className={'~'+item.attr.class}>
        {checkbox}
        {text}
      </Label>
    })
    return (
      data &&
      <CheckboxGroup className={'~'+data.attr.class}>
        {children}
      </CheckboxGroup>
    )
  }
}
