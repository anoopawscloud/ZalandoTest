// This shows how to include the Amazon IVS Player with a script tag from our CDN
// If self hosting, you may not be able to use the create() method since it requires
// that file names do not change and are all hosted from the same directory.

(function (IVSPlayerPackage) {
  const PlayerState = IVSPlayerPackage.PlayerState;
  const PlayerEventType = IVSPlayerPackage.PlayerEventType;

  // Initialize player
  const player = IVSPlayerPackage.create();
  player.attachHTMLVideoElement(document.getElementById("video-player"));

  // Attach event listeners
  player.addEventListener(PlayerState.PLAYING, function () {
    console.log("Player State - PLAYING");
  });
  player.addEventListener(PlayerState.ENDED, function () {
    console.log("Player State - ENDED");
  });
  player.addEventListener(PlayerState.READY, function () {
    console.log("Player State - READY");
  });
  player.addEventListener(PlayerEventType.ERROR, function (err) {
    console.warn("Player Event - ERROR:", err);
  });
  player.addEventListener(PlayerEventType.METADATA, (metadata) => {
    if (metadata.type === "text/plain") {
      const metadataText = metadata.data;
      const position = player.getPosition().toFixed(2);
      console.log(
        `PlayerEvent - METADATA: "${metadataText}". Observed ${position}s after playback started.`
      );
      cleanUp();
      $("#quiz").removeClass("drop").show();
      $("#waiting").hide();
      triggerQuiz(metadataText);
    }
  });

  // Setup stream and play
  player.setAutoplay(true);
  player.load(  "https://d7b6438397fc.us-west-2.playback.live-video.net/api/video/v1/aws.ivs.us-west-2.592423023374.channel.BYrTZEq4UiqS.m3u8"
  );

  // Mute the stream
  player.setVolume(0.85);

  // Cleanup
  function cleanUp() {
    $("#quiz").addClass("drop");
    $(".answer").unbind("click").removeClass("correct").removeClass("wrong");
  }

  // Trigger quiz
  function triggerQuiz(metadataText) {
    let obj = JSON.parse(metadataText);

    $(".card-inner").fadeOut("fast");
    $("#question").text(obj.question);
    $("#A").text(obj.answers[0]);
    $("#B").text(obj.answers[1]);
    $("#C").text(obj.answers[2]);
    $("#D").text(obj.answers[3]);
    $(".card-inner").fadeIn("fast");

    $(".answer").click(function () {
      if (this.text === obj.answers[obj.correctIndex]) {
        $(this).addClass("correct");
      } else {
        $(this).addClass("wrong");
      }
      setTimeout(function () {
        cleanUp();
        $("#waiting").show();
      }, 1050);
      return false;
    });
  }

  $("#quiz").hide();
  $("#waiting").show();
})(window.IVSPlayer);