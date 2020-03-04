import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import Decode from "../Decode/decode";
import {Props, State} from "./interface";
import convert from './index'
import {Data} from "../data"
import './index.scss'

export default class Parser extends Component<Props, State> {

  componentWillMount() {
    const {content, type} = this.props
    const nodes = convert(content || '', type) as unknown as Data
    console.log("mount:", nodes)
    this.setState({
      nodes: nodes
    })
  }

  options={
    addGlobalClass: true
  }

  render() {
    const {nodes} = this.state
    console.log("nodes:", nodes)
    const className = 'h2w hw2-' + (nodes && nodes.theme ? nodes.theme : 'light')
    return (
      <View className={className}>
        <View className='h2w__main'>
          {nodes && <Decode nodes={nodes} />}
        </View>
      </View>
    )
  }
}
