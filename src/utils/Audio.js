import Taro from '@tarojs/taro'

const fillIn = val => `${val < 10 ? '0' : ''}${val}`,
  formatTime = time => {
    const second = Math.round(time % 60),
      minute = Math.round(time / 60 % 60),
      hour = Math.round(time / 60 / 60);
    return `${fillIn(hour)}:${fillIn(minute)}:${fillIn(second)}`;
  };

class Audio {
  duration = 0
  currentTime = 0

  create(obj) {
    const option = this.option = obj.attr;
    this.loop = option.loop === 'true'
    this.autoplay = option.autoplay === 'true'
    this.index = 0
    const audio = this.audio = Taro.createInnerAudioContext();
    audio.src = option.src;

    // 说明可以播放了
    audio.onCanplay(() => {
      if (this.autoplay && !this.index) {
        this.play();
      }

      if (!this.autoplay && !this.index) {
        this.eventCanplay();
      }

    });

    // 更新时间
    audio.onTimeUpdate(() => {
      //that.status = 'update';
      this.duration = audio.duration;
      this.currentTime = audio.currentTime;

      // 定义播放结束
      if (this.duration - this.currentTime < 0.5) {
        this.index++;
        if (this.loop) {
          this.stop();
        } else {
          this.stop();
        }

        audio.seek(0);
      }

      this.eventTimeUpdate(formatTime(this.duration), formatTime(this.currentTime));
    });

    //
    audio.onSeeked(() => {
      if (this.loop) {
        this.play();
      }

    })


  }

  // 播放
  play() {
    this.status = 'play';
    this.audio.play();
    this.eventPlay();
  }

  // 暂停
  pause() {
    this.status = 'pause';
    this.audio.pause();
    this.eventPause();
  }

  // 停止
  stop() {
    this.status = 'stop';
    this.audio.stop();
    this.eventStop();
  }

  // 销毁
  destroy() {
    this.stop();
    this.audio.destroy();
  }

  eventCanplay() {
  }

  eventTimeUpdate = (duration, currentTime) => {
    console.log(duration, currentTime)
  }

  eventEnded() {
  }

  eventError() {
  }

  eventPause() {
  }

  eventPlay() {
  }

  eventSeeked() {
  }

  eventSeeking() {
  }

  eventStop() {
  }

  eventWaiting() {
  }
}

export default Audio
