// src/directive/index.js
import defaultImg from "@/assets/images/load.png";
//异步加载图片
let imageAsync = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      resolve();
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
};

export const lazyPlugin = {
  install(app) {
    app.directive("lazy", {
      mounted(el, binding) {
        el.src = defaultImg;
        const io = new IntersectionObserver((entries) => {
          entries.forEach((item) => {
            if (item.isIntersecting) {
              //使用异步加载图片
              imageAsync(binding.value)
              .then(() => {
                el.src = binding.value;//成功后再替换 img 标签的 src
              })
              .catch((error) => {
                console.log(error);
              });
              io.unobserve(item.target);
            }
          });
        });
        io.observe(el);
      },
    });
  },
};


export const numChange = {
  install(app) {
    app.directive("change", {
      updated(el, {value, oldValue}) {
        if(oldValue==undefined && value==undefined) return;
        // 最终要显示的数字
        let finalNum = value
        // 动画间隔
        let rate = 30;
        // 总时长
        let time = 2000;
        // 步长,数据增加间隔
        let step = finalNum / (time / rate);
        // 初始值
        let count = oldValue || 0;
        // 要保留的小数
        let timer = setInterval(() => {
          count = count + step;
          el.innerText = count.toFixed(0);
          if (count > finalNum) {
            //  避免count大于finalNum最终数字显示不对
            count = finalNum;
            el.innerText = count;
            // 清空定时器
            clearInterval(timer);
            timer = null;
          }
        }, rate);
      }
    });
  }
}