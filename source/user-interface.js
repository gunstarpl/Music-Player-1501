module.exports = new function()
{
    var self = this;
    
    this.initialize = function()
    {
        window.nwDispatcher.requireNwGui();
    
        // Get interface element instances.
        self.volumePanel = require("./volume-panel.js");
        self.tracklistPanel = require("./tracklist-panel.js");
        self.playbackPanel = require("./playback-panel.js");
        
        // Initialize interface elements.
        self.volumePanel.initialize();
        self.tracklistPanel.initialize();
        self.playbackPanel.initialize();
        
        // Set minimum window size.
        var controlHeight = $('#control-panel').outerHeight();
        var playbackHeight = $('#playback-panel').outerHeight();
        
        nw.gui.Window.get().setMinimumSize(500, controlHeight + playbackHeight - 1);
        
        // Window events.
        window.ondragover = function(event)
        {
            event.preventDefault();
        };
        
        window.ondrop = function(event)
        {
            event.preventDefault();
        };
        
        window.onresize = function()
        {
            // Resize middle panel to fill the remaining space.
            var windowHeight = $('#window').outerHeight();
            var controlHeight = $('#control-panel').outerHeight();
            var playbackHeight = $('#playback-panel').outerHeight();
            var middleHeight = windowHeight - controlHeight - playbackHeight;
            
            $('#middle-panel').css('height', middleHeight);
        };
        
        // Call resize handler once.
        window.onresize();
        
        // Page events.
        $(window.document).mousemove(function(event)
        {
            self.volumePanel.onMouseMove(event);
            self.playbackPanel.onMouseMove(event);
        });
        
        $(window.document).mousedown(function(event)
        {
            self.volumePanel.onMouseDown(event);
        });
        
        $(window.document).mouseup(function(event)
        {
            self.volumePanel.onMouseUp(event);
            self.playbackPanel.onMouseUp(event);
        });
        
        // Playback control.
        $('#playback-stop').click(function()
        {
            audio.stop();
        });
        
        $('#playback-pause').click(function()
        {
            audio.pause();
        });
        
        $('#playback-play').click(function()
        {
            audio.play();
        });

        // Application control.
        $('#application-volume').click(function()
        {
            if(!$(this).hasClass('active'))
            {
                $(this).addClass('active');
                self.volumePanel.show();
            }
            else
            {
                $(this).removeClass('active');
                self.volumePanel.hide();
            }
        });
    };
};
