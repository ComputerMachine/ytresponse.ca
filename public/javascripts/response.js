$(function() {
    var getPlayerVars = function() {
        var playerVars = {
            autoplay: $("#autoplay").is(":checked") ? 1 : 0,
            start:    $("#start").val(),
            end:      $("#end").val()
        };  
        return playerVars;
    }; 
    
    var onPlayerStateChange = e => {
        switch (e.data) {
            case 5:
                console.log("cued & playing");
                var start = parseInt($("#start").val());
                player.seekTo(start);
        }
    };

    var player;
    var handlers = {};
    
    TazGHelpers.addYTPlayer("player", {
        videoId: 'oNFC0YzCSWc',
        playerVars: {
            start: 154,
            end: 192,
            controls: 1
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    },
    function(p) {
        player = p;
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
        video = {
            start: $("#start").val(),
            end: $("#end").val(),
            id: $(this).val()
        };
        
        if (video.id == "") return;
        else { updatePlayer(); }
    });
    
    var updatePlayer = () => {
        var startVal = parseInt($("#start").val());
        var endVal = parseInt($("#end").val());
        var start = isNaN(startVal) ? 0 : startVal;
        var end = isNaN(endVal) ? 700 : endVal;
        
        console.log("start&end: ",start, end);
        
        player.cueVideoById({
            videoId: $("#video-id").val(),
            startSeconds: start,
            endSeconds: end
        });
    };    
    
    $("#start, #end").change(() => {
        //console.log("start and end times modified");
        //var start = parseInt($("#start").val());
        //player.seekTo(start);
        updatePlayer();
        //console.log("updating playe.r..");
    });
    
    $("#start").change(function() {
        //var time = parseInt($(this).val(), 10);
        //player.seekTo(time);
    });
    
    $("#end").change(function() {
        //var start = parseInt($("#start").val());
        //var end = parseInt($(this).val());
        //player.seekTo(start);
        
    });

})