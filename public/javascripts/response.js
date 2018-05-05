$(function() {
    var getPlayerVars = function() {
        var playerVars = {
            autoplay: $("#autoplay").is(":checked") ? 1 : 0,
            start:    $("#start").val(),
            end:      $("#end").val()
        };  
        return playerVars;
    }; 

    var player;
    var handlers = {};
    
    TazGHelpers.addYTPlayer("player", {
        videoId: 'oNFC0YzCSWc',
        playerVars: {
            start: 154,
            end: 192,
            controls: 1
        }
    },
    function(p) {
        player = p;
        handlers[YT.PlayerState.PLAYING] = function() {
            setInterval(function() {
                if (Math.floor(player.getCurrentTime()) == $("#end").val()) {
                    player.pauseVideo();
                    return;
                }
            }, 1000);
        };
        TazGHelpers.addYTPlayerStateHandlers(player, handlers);
        console.log(player);
    }); 

    $("#preview").click(function(e) {
        e.preventDefault();
        TazGHelpers.whenYoutubeApiReady(function() {
            player.playVideo();
        });
    });
    
    $("#video-id").change(function() {
        var videoId = $(this).val();
        var videoStart = $("#start").val();
        var videoEnd = $("#end").val();
        
        if (videoId == "") return;
        if (videoStart && videoEnd == "")
            player.cueVideoById(videoId);
        else {
            player.cueVideoById(
                videoId,
                videoStart,
                videoEnd
            );
        }
    });
    
    $("#start").change(function() {
        var time = parseInt($(this).val(), 10);
        player.seekTo(time);
    });
    
    $("#end").change(function() {
        var start = parseInt($("#start").val());
        var end = parseInt($(this).val());
        player.seekTo(start);
        
    });
    
    /* add yt player handlers */
    
    /*
    $("#yturl").change(function() {
        var videoId = $(this).val();
        console.log(videoId);
        
        TazGHelpers.whenYoutubeApiReady(function() {
            //var handlers = {};
            //var player;

            TazGHelpers.addYTPlayer("player", {
                videoId: videoId,
                controls: 1,
                playerVars: getPlayerVars('#{videoId}')
            });
            
            function(p) {
                player = p;
                TazGHelpers.addYTPlayerStateHandlers(player, handlers);
                console.log(player);
            });*/
})