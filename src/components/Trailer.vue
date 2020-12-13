<template>
  <MyModal class="trailer">
    <header class="trailer__header" slot="header">
      <button type="button" class="close-icon tailer__closeBtn" @click="onClose">
        <font-awesome-icon icon="times" />
      </button>
    </header>
    <div class="trailer__body" slot="body">
      <div v-if="loading">Loading Video...</div>
      <template v-else>
        <VideoViewer v-if="youtubeTrailer" :video-id="youtubeTrailer.key"></VideoViewer>
        <p v-else class="noVid-message">{{ noVidMessage }}</p>
      </template>
    </div>
  </MyModal>
</template>

<script>
// Componets
import MyModal from "@/components/MyModal.vue";
import VideoViewer from "@/components/VideoViewer.vue";

// functions
import { movies } from "@/api";

export default {
  name: "Trailer",
  props: ["movieId"],
  components: {
    MyModal,
    VideoViewer
  },
  data() {
    return {
      loading: false,
      video: null,
      site: "YouTube",
      types: ["Trailer", "Teaser"],
      noVidMessage: "예고편이 없습니다.😢"
    };
  },
  computed: {
    youtubeTrailer() {
      if (!this.video) return null;

      return this.video.find(v => {
        return v.site === this.site && this.types.includes(v.type);
      });
    }
  },
  created() {
    this.fetchVideo();
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    async fetchVideo() {
      try {
        this.loading = true;
        this.video = await movies.fetchVideo(this.movieId);
      } catch (err) {
        this.video = null;
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.trailer .myModal-container {
  position: absolute;
  width: 70%;
  height: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #181818;
}

.trailer .myModal__content {
  padding: 1rem;
  height: 100%;
}

.trailer__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.tailer__closeBtn {
  font-size: 1.5rem;
}

.trailer__body {
  height: 100%;
}

.browseHome button.tailer__closeBtn svg {
  margin: 0;
}

.noVid-message {
  padding: 2rem 0;
  text-align: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}
</style>