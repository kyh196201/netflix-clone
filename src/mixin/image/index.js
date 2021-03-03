import defaultImage from "@/assets/images/default_background.png";

const imageMixin = {
  data() {
    return {
      defaultImage: defaultImage,
    };
  },
  methods: {
    onErrorImage(event, src) {
      // this는 이 믹스인을 사용한 뷰 컴포넌트 객체!
      event.target.src = src || this.defaultImage;
    },
  },
};

export default imageMixin;
