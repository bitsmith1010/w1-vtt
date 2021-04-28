const config = {
  "key": "9042ce90-9b8f-43f2-bf1a-5bb20bf30655",
  logs: {
      level: "debug"
  },
  "playback": {
    "preferredTech":
      [{"player": "native", "streaming": "hls"}]
  },
  analytics: {
    key: 'ec4c99e5-1874-4f23-bfae-19fb4ef9a0e8',
    videoId: 'my-video-id',
    title: 'A descriptive video title',
    userId: 'usuario-1',
    cdnProvider: 'CDN provider',
    customData1: 'custom data',
    customData2: 'custom data',
    customData3: 'custom data',
    customData4: 'custom data',
    customData5: 'custom data'
  }
};
const container = document.getElementById('my-player');
const player = new bitmovin.player.Player(container, config);


const source = {
  "hls": "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  subtitleTracks: [{
    "url": "https://bitmovin-amer-public.s3.amazonaws.com/internal/dani/pw-3335/pw-3335-positioning-1.vtt",
    id: "id1",
    label: "css-positioning-1",
    lang: "en",
    enabled: false,
  }, {
    "url": "https://bitmovin-amer-public.s3.amazonaws.com/internal/dani/pw-3335/pw-3335-spacing-1.vtt",
    id: "id2",
    label: "css-spacing-1",
    lang: "en",
    enabled: false,
  }],
  };
player.load(source).then(
  function () {
    for (ii of player.subtitles.list()) console.log(ii);
    console.log('[info] player.load() resolved - success');
  },
  function (reason) {
    console.log('[!] player.load() resolved - fail');
  }
);
