import {Component} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {State} from './interface'
import {BaseProps} from '../BaseProps'
import Audio from "./Audio";
import './index.scss'

const audio = new Audio()
export default class AudioPlayer extends Component<BaseProps, State> {

  componentWillMount(): void {
    const {data} = this.props
    audio.create(data)
    audio.eventPlay = () => {
      this.setState({tips: {state: 'h2w__audio--play', text: 'Playing'}})
    }

    audio.eventCanplay = () => {
      this.setState({tips: {state: 'h2w__audio--readyed', text: 'Readyed'}})
    }

    audio.eventTimeUpdate = function (duration, currentTime) {
      this.setState({
        time: {
          currentTime: currentTime,
          duration: duration,
          schedule: Math.round(audio.currentTime) / Math.round(audio.duration) * 100 + '%'
        }
      })
    }

    audio.eventPause = () => {
      this.setState({tips: {state: 'h2w__audio--pause', text: 'Pause'}});
    }

    audio.eventStop = () => {
      this.setState({tips: {state: 'h2w__audio--end', text: 'End'}});
    }

  }

  componentWillUnmount(): void {
    audio.destroy()
  }

  playAndPause = () => {
    if (audio.status === 'update' || audio.status === 'play') {
      audio.pause();
    } else {
      audio.play();
    }
  }

  options={
    addGlobalClass: true
  }

  render() {
    const {data} = this.props
    const {tips, time} = this.state
    return (
      <View className="h2w__audio {{tips.state || 'h2w__audio--loading'}}" onClick={this.playAndPause}>
        <View className='h2w__audioIcon' />
        <View className='h2w__audioCover'>
          <Image className='h2w__audioLoading' src='loading.svg' />
          <Image className='h2w__audioCoverImg' src='{{data.attr.poster}}' />
        </View>
        <View className='h2w__audioInfo'>
          <View className='h2w__audioTips'>{tips.text || 'Error'}</View>
          <View className='h2w__audioSchedule' style='width:{{time.schedule}};' />
          <View className='h2w__audioTitle'>{data.attr.name}</View>
          <View className='h2w__audioAuthor'>{data.attr.author}</View>
          <View className='h2w__audioTime'>{time.currentTime || '00:00:00'} / {time.duration || '00:00:00'}</View>
        </View>
      </View>
    )
  }
}
