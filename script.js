(function (IVSPlayerPackage) {
  const PlayerState = IVSPlayerPackage.PlayerState;
  const PlayerEventType = IVSPlayerPackage.PlayerEventType;

  // Initialize player
  const player = IVSPlayerPackage.create();
  player.attachHTMLVideoElement(document.getElementById("video-player"));

  // Attach event listeners
  // player.addEventListener(PlayerState.PLAYING, function () {
  //   console.log("Player State - PLAYING");
  // });
  // player.addEventListener(PlayerState.ENDED, function () {
  //   console.log("Player State - ENDED");
  // });
  // player.addEventListener(PlayerState.READY, function () {
  //   console.log("Player State - READY");
  // });
  
  player.addEventListener(PlayerEventType.ERROR, function (err) {
    console.warn("Player Event - ERROR:", err);
  });
  
  player.addEventListener(PlayerEventType.METADATA, (metadata) => {
    if (metadata.type === "text/plain") {
      const metadataText = metadata.data;
      const position = player.getPosition().toFixed(2);
      console.log(
        `PlayerEvent - METADATA: "${metadataText}". Observed at ${position}s.`
      );
    }
  });

  // Setup stream and play
  player.setAutoplay(true);
  
  player.load(
    "https://d7b6438397fc.us-west-2.playback.live-video.net/api/video/v1/aws.ivs.us-west-2.592423023374.channel.BhYpNiqtxalR.m3u8"
  );
  
  // Mute player
  // player.setVolume(0);
})(window.IVSPlayer);