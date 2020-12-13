function setYoutubeAPI() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function loadYTVideoById(id, videoId, options, events) {
    console.log(options);

    return new YT.Player(id, {
        videoId: videoId,
        playerVars: {
            rel: 0,
            ...options,
        },
        events: events || {},
        // events: {
        //     onReady: function(event) {
        //         console.log(event);
        //     },
        //     onStateChange: function(event) {
        //         console.log(event);
        //     },
        // },
    });
}

// 플레이어 로딩이 완료되었을 때
function onPlayerReady(event) {
    event.target.playVideo(); //자동재생
    //로딩할때 실행될 동작을 작성한다.
}

// 플레이어 상태가 변경될때
function onPlayerStateChange() {
    if (event.data == YT.PlayerState.PLAYING) {
        //플레이어가 재생중일때 작성한 동작이 실행된다.
    }
}

export { setYoutubeAPI, loadYTVideoById };
