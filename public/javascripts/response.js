$(function() {
    var getPlayerVars = () => {
        var playerVars = {
            autoplay: $("#autoplay").is(":checked") ? 1 : 0,
            start:    $("#start").val(),
            end:      $("#end").val()
        };  
        return playerVars;
    }; 

    var newCuedVideo = false;
    var init;
    
    var onPlayerStateChange = e => {
        switch (e.data) {
            case 1:
                if (newCuedVideo) {
                    player.seekTo(parseFloat($("start").val())).toFixed(1);
                    newCuedVideo = false;
                }
                break;
            case 5:
                if (player.getVideoData().video_id == "oNFC0YzCSWc") return; // do nothing if the video cued is a 'loading video'
                player.playVideo();
                break;
        }
    };

    var player;
    var handlers = {};
    
    TazGHelpers.addYTPlayer("player", {
        videoId: 'oNFC0YzCSWc',
        playerVars: {
            start: 154,
            end: 193,
            controls: 1
        },
        events: {
            'onStateChange': onPlayerStateChange,
        }
    }, p => player = p);
    
    $("#preview").click(e => {
        e.preventDefault();
        var start = parseFloat($("#start").val(), 10).toFixed(1);
        player.seekTo(start);
        player.playVideo();
    });
    
    $("#video-id").change(function() {
        if ($(this).val() == "") return;
        updatePlayer();
    });
    
    var updatePlayer = () => {
        var startVal = parseFloat($("#start").val()).toFixed(1), 
            endVal = parseFloat($("#end").val()).toFixed(1),
            start = isNaN(startVal) ? 0 : startVal,
            end = isNaN(endVal) ? undefined : endVal,
            options = {};

        options.videoId = $("#video-id").val();
        options.startSeconds = start;        

        if (typeof end != "undefined") {
            options.endSeconds = end;
        }

        player.cueVideoById(options);
    };

    $("#start, #end").change(updatePlayer);
    
    setInterval(() => {
        $("#time").text(player.getCurrentTime().toFixed(1));
    }, 100);

})