import { Component }  from 'react'
import {Image, View} from '@tarojs/components'
import {BaseProps} from 'types/BaseProps'
import Audio from "../../utils/Audio"
import Loading from './loading.svg'
import config from '../../utils/config'

interface State {
  tips: {
    text: string,
    state: string
  },
  time: {
    currentTime: number,
    duration: number,
    schedule: number
  }
}

const audio = new Audio()
export default class AudioPlayer extends Component<BaseProps, State> {
  state = {
    tips: {
      text: 'Loading',
      state: 'h2w__audio--loading'
    },
    time: {
      currentTime: 0,
      duration: 1,
      schedule: 0
    }
  }

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

  options = {
    addGlobalClass: true
  }

  render() {
    const {data} = this.props
    const {tips, time} = this.state
    const className = config.classPrefix + 'h2w__audio ' + (tips && tips.state ? (config.classPrefix + tips.state) : (config.classPrefix + 'h2w__audio--loading'))
    return (
      <View className={className} onClick={this.playAndPause}>
        <View className={config.classPrefix + 'h2w__audioIcon'} />
        <View className={config.classPrefix + 'h2w__audioCover'}>
          <Image className={config.classPrefix + 'h2w__audioLoading'} src={Loading} />
          <Image className={config.classPrefix + 'h2w__audioCoverImg'} src={data.attr.poster} />
        </View>
        <View className={config.classPrefix + 'h2w__audioInfo'}>
          <View className={config.classPrefix + 'h2w__audioTips'}>{tips.text || 'Error'}</View>
          <View className={config.classPrefix + 'h2w__audioSchedule'} style={{width: time.schedule}} />
          <View className={config.classPrefix + 'h2w__audioTitle'}>{data.attr.name}</View>
          <View className={config.classPrefix + 'h2w__audioAuthor'}>{data.attr.author}</View>
          <View
            className={config.classPrefix + 'h2w__audioTime'}
          >{time.currentTime || '00:00:00'} / {time.duration || '00:00:00'}</View>
        </View>
      </View>
    )
  }
}
