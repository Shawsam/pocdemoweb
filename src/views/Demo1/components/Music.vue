<template>
  <div class="topic-box">
    <div class="title-box">Music</div>
    <div class="topic-list">
      <div class="topic-item flex-left" v-for="(item, index) in list" :key="index" @click="handlePlay(index, item)">
        <div class="topic-img">
          <img :src="'data:image/png;base64,' + item.pic_base64" />
          <img class="play-btn" v-if="selectIndex == index && isPlay" src="@/assets/images/pasue.png" />
          <img class="play-btn" v-else src="@/assets/images/play-btn.png" />
        </div>
        <div class="topic-right">
          <div class="topic-text multiple-ellipsis">
            {{ item.name }}
          </div>
          <div class="sub-text">{{ parseFloat(item.rate).toFixed(2) }}%（{{ Math.round(item.total) }}）</div>
        </div>
      </div>
    </div>
    <audio ref="audioPlay" preload="none" :src="selectItem.playUrl" style="display: none" controls></audio>
  </div>
</template>

<script setup>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps(['list'])
  const audioPlay = ref(null)
  const selectIndex = ref(-1)
  const selectItem = ref({})
  const isPlay = ref(false)
  const handlePlay = (index, item) => {
    if (selectIndex.value == index) {
      nextTick(() => {
        audioPlay.value.pause()
        isPlay.value = false
        selectIndex.value = -1
      })
    } else {
      selectIndex.value = index
      selectItem.value = item
      nextTick(() => {
        audioPlay.value.play()
        isPlay.value = true
      })
    }

    // Array.from(videoElement).forEach((item) => {
    //   // console.log("bbbb", item.dataset.id);
    //   if (item.dataset.id == id) {
    //     playOrPause(item, index, type)
    //     // item.play();
    //   } else {
    //     var images = document.querySelectorAll('#audio-left-img')
    //     for (var i = 0; i < images.length; i++) {
    //       // console.log(images[i]);
    //       if (images[i].className != `audio3_gpt_${index}`) {
    //         images[i].src = require('@/assets/play.png')
    //       }
    //     }
    //     var rightImages = document.querySelectorAll('#audio-right-img')
    //     // console.log(rightImages);
    //     for (var j = 0; j < rightImages.length; j++) {
    //       if (rightImages[j].className != `audio3_user_${index}`) {
    //         rightImages[j].src = require('@/assets/play.png')
    //       }
    //     }
    //     item.pause()
    //   }
    // })
  }
</script>

<style scoped lang="scss">
  .topic-box {
    width: 25%;
    height: 100%;
    background: #5f6c7a;
    border-radius: 10px;
    box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
    height: calc(100vh - 494px);
    color: #fff;
    .title-box {
      height: 42px;
      line-height: 42px;
      background: #3a424a;
      text-align: center;
      color: #fff;
      font-size: 16px;
      border-radius: 10px;
    }
    .topic-list {
      height: calc(100% - 42px);
      overflow: auto;
      padding-bottom: 15px;
      padding-top: 8px;
      .topic-item {
        padding: 8px 10px;
        padding-right: 5px;
        &:hover {
          background: #728292;
        }
        .topic-img {
          width: 60px;
          height: 60px;
          background: #46474b;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
          .play-btn {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -10px;
            margin-left: -10px;
          }
        }
        .topic-right {
          flex: 1;
          margin-left: 8px;
          .topic-text {
            font-size: 15px;
            word-break: break-all;
            -webkit-line-clamp: 1;
          }
          .sub-text {
            margin-top: 2px;
            font-size: 12px;
            color: #c0bfbf;
          }
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  @media screen and (min-width: 768px) and (max-width: 1380px) {
    .topic-box {
      width: calc(50% - 8px);
      margin-right: 0;
      margin-top: 16px;
      height: 60vh;
    }
  }
</style>
