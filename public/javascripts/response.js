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
            var end = $("#end").val();
            var check = function() {
                setTimeout(function() {
                    var now = Math.floor(player.getCurrentTime());
                    if (now == end) {
                        player.pauseVideo();
                        return;
                    }
                    $("#time").text(now);
                    check();
                }, 1000);
            };
            check();
        };
        TazGHelpers.addYTPlayerStateHandlers(player, handlers);
        console.log(player);
    }); 

    $("#preview").click(function(e) {
        e.preventDefault();
        TazGHelpers.whenYoutubeApiReady(function() {
            var start = parseInt($("#start").val(), 10);
            player.seekTo(start);
            player.playVideo();
        });
    });
    
    $("#video-id").change(function() {        
        var videoStart = $("#start").val();
        var videoEnd = $("#end").val();
        var videoId = $(this).val();
        
        if (videoId == "") return;
        if (videoStart == "" && videoEnd == "") player.cueVideoById(videoId);
        else {
            player.cueVideoById(videoId, videoStart, videoEnd);
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