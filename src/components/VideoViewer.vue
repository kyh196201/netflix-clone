<template>
  <div class="videoViewer">
    <div class="videoViewer__video--wrapper">
      <div id="player" class="videoViewer__video"></div>
    </div>
  </div>
</template>
<script>
import { loadYTVideoById } from "@/utils/youtube.js";

export default {
  name: "VideoViewer",
  props: ["videoId"],
  data() {
    return {
      player: null,
      playerOption: {
        autoplay: 1,
        controls: 0,
        mute: 1,
        fs: 0
      }
    };
  },
  computed: {},
  mounted() {
    this.fetchVideo();
  },
  methods: {
    fetchVideo() {
      if (!window.YT) return;

      this.player = loadYTVideoById("player", this.videoId, this.playerOption);
    }
  }
};
</script>

<style>
.videoViewer {
  width: 100%;
  height: 100%;
}

.videoViewer__video--wrapper {
  min-width: 200px;
  min-height: 200px;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 0.5rem;
  font-size: 0;
}

.videoViewer__video {
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 0.5rem;
}
</style>