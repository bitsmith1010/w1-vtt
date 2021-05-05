const config = {
  "key": "9042ce90-9b8f-43f2-bf1a-5bb20bf30655",
  logs: {
      level: "debug"
  },
  "playback": {
//    "preferredTech": [{"player":"html5","streaming":"hls"}]
  },
  network: {
    preprocessHttpResponse: function(type, response) {
      if (type == "media/subtitles") {
        let data = new DataView(response.body);
        let decoder = new TextDecoder("utf-8");
        console.log("***** ON SUBTITLE REQUEST ****");
        let vttProcessed = decoder
          .decode(data)
          .split(/\n([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3} --> [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}[^\n]*)\n/)
          .map(
            (el) =>
              el.replaceAll( /(.)\n(.)/g, "$1<br/>$2" )
          )
          .join("\n");
        let textEncoder = new TextEncoder("utf-8");
        let dataProcessed = textEncoder.encode(vttProcessed);
        response.body = dataProcessed.buffer;
        return response;
      }
    }
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
const container = document.getElementById('player-test1');
const player = new bitmovin.player.Player(container, config);

const source = {
    "hls": "https://bitmovin-amer-public.s3.amazonaws.com/internal/dani/Wed_Apr_21_17%3A48%3A00_EDT_2021/w1-test1.m3u8"
  };
player.load(source).then(
  function()
  {
    for (ii of player.subtitles.list()) console.log(ii);
    console.log('[info] player.load() resolved - success');
  },
  function (reason)
  {
    console.log('[!] player.load() resolved - fail');
  }
);
