if (typeof TazGHelpers == "undefined") {
    var TazGHelpers = (function() {
        var youtubeApiSrc = "https://www.youtube.com/iframe_api";

        var defaultYTPlayerOptions = {
            width: 640,
            height: 390,
            playerVars: {
                showinfo: 0,
                controls: 0,
                rel: 0,
                iv_load_policy: 3
            }
        };

        var self = {
            getViewportWidth: function() {
                if (typeof window.innerWidth != "undefined") {
                    return window.innerWidth;
                }
                return $(window).width();
            },
            
            getViewportHeight: function() {
                if (typeof window.innerHeight != "undefined") {
                    return window.innerHeight;
                }
                return $(window).height();
            },
            
            ensureYoutubeApiLoaded: function() {
                var scripts = $("script");
                if (scripts.toArray().some(function(script) { return $(script).prop("src") === youtubeApiSrc; })) return;
                scripts.first().before($("<script/>", {type: "text/javascript", src: youtubeApiSrc}));
            },

            whenYoutubeApiReady: function(callback) {
                if (typeof YT != "undefined" && typeof YT.Player != "undefined") {
                    callback();
                    return;
                }
    
                var oldReady = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = function() {
                    if (typeof oldReady != "undefined") oldReady();
                    callback();
                }
                self.ensureYoutubeApiLoaded();
            },

            addYTPlayer: function(elementOrId, options, callback) {
                var finalOptions = $.extend(true, {}, defaultYTPlayerOptions);
                if (options != null) {
                    $.extend(true, finalOptions, options);
                }
    
                self.whenYoutubeApiReady(function() {
                    var player = new YT.Player(elementOrId, finalOptions);
                    if (options != null && options.loop) {
                        var handlers = {};
                        handlers[YT.PlayerState.ENDED] = function(event) {
                            event.target.playVideo();
                        };
                        self.addYTPlayerStateHandlers(player, handlers);
                    }
                    if (callback != null) callback(player);
                });
            },

            addYTPlayerStateHandlers: function(player, handlers) {
                $.each(handlers, function(state, handler) {
                    player.addEventListener("onStateChange", function(event) {
                         if (event.data == state) handler(event);
                    });
                });
            },
            
        };
        
/* show full-screen youtube video,
after it finishes playing, scroll down to show who made it, how many views, etc*/
        
        return self;
    })();
};