<template>
  <div @click.once="play" class="video-box" @mouseleave="pause">
    <video ref="videoPlayer" class="video-js" @play="onlyPlay"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import zh from "video.js/dist/lang/zh-CN.json";
import "videojs-flvjs-es6";
import defaultCover from '@/assets/images/home/video-empty.png'
// import poster from '@/assets/images/poster.png'

export default {
  name: "VideoPlayer",
  props: {
    url: {
      type: String
    },
    cover: {
      type: String
    }
  },
  data() {
    return {
      timer: null,
      player: null,
      options: {
        language: "zh-CN",
        techOrder: ["html5", "flvjs"],
        flvjs: {
          mediaDataSource: {
            isLive: false,
            cors: true,
            withCredentials: false
          }
        },
        loop: true,
        controls: true,
        // poster,
        preload: 'none',
        controlBar : {
          remainingTimeDisplay: false,//是否显示剩余时间功能
          fullscreenToggle: false,
          playbackRateMenuButton: false,
          PictureInPictureToggle: false,
          AudioTrackButton: false,
          volumePanel: false //全屏按钮
        },
      }
    }
  },
  watch: {
    cover: {
      handler(n, o) {
        this.player.reset()
        this.player.poster(n)
      },
    }
  },
  mounted() {
    videojs.addLanguage("zh-CN", zh);
    if (this.cover) this.options.poster = this.cover
    this.player = videojs(this.$refs.videoPlayer, this.options)
    document.addEventListener('visibilitychange', this.dom)
    window.addEventListener('error', this.setDefaultCover, true)
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
    document.removeEventListener('visibilitychange', this.dom)
    window.removeEventListener('error', this.setDefaultCover, true)
  },
  methods: {
    onlyPlay() {
      this.$emit('video-play', this.$refs.videoPlayer);
    },
    setDefaultCover (event) {
      const target = event.target
      var imgs = document.getElementsByClassName("vjs-poster")
      var picImg = ''
      if(imgs.length > 0){
        picImg = imgs[imgs.length-1].getElementsByTagName("img")
      }
      if (target instanceof HTMLImageElement && picImg) {
        target.src = defaultCover
        console.log('图片加载异常', target, target.className)
      }
    },
    play() {
      this.timer = setTimeout(() => {
        let sources = [{
          src: this.url,
        }]
        this.player.poster('')
        if (this.player.currentSrc()) {
          this.player.play()
        } else {
          this.player.src(sources)
          this.player.autoplay(true)
        }
      }, 0)
    },
    pause() {
      clearTimeout(this.timer)
      this.player.pause()
    },
    dom() {
      if (document.visibilityState === 'hidden') {
        this.player.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  width: 100%;
  height: 100%;
}

.video-js {
  border-radius: 6px 6px 0 0;
  height: 100%;
  width: 100%;
  object-fit: fill;
}

:deep(.vjs-big-play-button) {
  width: 52px;
  height: 52px;
  background-image: url(@/assets/images/play-icon.png);
  background-size: 100% 100%;
  border: 0;
  margin-left: -25px;
  margin-top: -25px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  background-color: transparent;

  .vjs-icon-placeholder:before {
    content: none;
  }
}

:deep(.vjs-control-bar) {
  height: 4rem;
  background: none !important;

  .vjs-button {
    display: none;
  }

  .vjs-paused,
  .vjs-playing {
    display: block;
    margin-top: -1rem;
  }

  .vjs-progress-control {
    width: 60%;
    left: 20%;
    position: absolute;
    overflow: hidden;
  }

  .vjs-time-tooltip {
    z-index: 600;
    // right: -45px !important;
  }

  .vjs-time-divider,
  .vjs-duration,
  .vjs-remaining-time {
    padding: 0;
    display: none;
  }

  .vjs-icon-next-item {
    font-size: 2em;
    line-height: 106px;
    position: relative;
    text-align: center;
    margin: 0;
    padding: 0;
    height: 100%;
    cursor: pointer;
  }

  .play-right {
    position: absolute;
    text-align: center;
    right: 20px;
    margin: 0;
    padding: 0;
    height: 100%;
    padding-top: 30px;
  }

  /*开关的大小*/
  .switch-container {
    height: 15px;
    width: 30px;
    margin-left: 4px;
  }

  /*设置checkbox不显示*/
  .switch {
    display: none;
  }

  /*设置label标签为椭圆状*/
  label {
    display: block;
    background-color: #EEEEEE;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 25px;
  }

  /*在label标签内容之前添加如下样式，形成一个未选中状态*/
  label:before {
    content: '';
    display: block;
    border-radius: 25px;
    height: 100%;
    width: 15px;
    background-color: white;
    opacity: 1;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -webkit-transition: all 0.2s ease;
  }

  /*在label标签内容之后添加如下样式，形成一个选中状态*/
  label:after {
    position: relative;
    top: -15px;
    left: 15px;
    content: '';
    display: block;
    border-radius: 25px;
    height: 100%;
    width: 15px;
    background-color: white;
    opacity: 0;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -webkit-transition: all 0.2s ease;
  }


  /* ~ 兄弟选择符。
    p~ul ：位于 p 元素之后的所有 ul 元素
  */

  /*选中后，选中样式显示*/
  #switch:checked~label:after {
    opacity: 1;
  }

  /*选中后，未选中样式消失*/
  #switch:checked~label:before {
    opacity: 0;
  }

  /*选中后label的背景色改变*/
  #switch:checked~label {
    background-color: #FF6000;
  }

}
</style>