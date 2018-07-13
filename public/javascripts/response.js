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
                    player.seekTo(parseInt($("start").val()));
                    newCuedVideo = false;
                }
                break;
            case 5:
                if (player.getVideoData().video_id == "oNFC0YzCSWc") return;
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
        var start = parseInt($("#start").val(), 10);
        player.seekTo(start);
        player.playVideo();
    });
    
    /*
    $("#preview").click(function(e) {
        e.preventDefault();
        TazGHelpers.whenYoutubeApiReady(function() {
            var start = parseInt($("#start").val(), 10);
            player.seekTo(start);
            player.playVideo();
        });
    });
    */
    $("#video-id").change(function() {
        if ($(this).val() == "") return;
        updatePlayer();
    });
    
    var updatePlayer = () => {
        var startVal = parseInt($("#start").val()), 
            endVal = parseInt($("#end").val()),
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
    
    $("#start, #end").change(() => {
        updatePlayer();
        console.log(player);
    });
})