!(function ($, window, pluginName){

  var defaults = {
    padding: 40,
    triggerClass: pluginName,
    topClass: pluginName+'-top',
    bottomClass: pluginName+'-bottom',
    speed: 3,
  };


  function setTimer(data, func) {
    if (data.timer > 0) {
      clearTimeout(data.timer);
      data.timer = 0;
    }
    if (func) {
      data.timer = setInterval(func, $.fx.interval);
    }
  }

  function stopScrolling() {
      var data = $(this).data(pluginName);
      $(data.triggers).remove();
      setTimer(data, null);
      $(this).removeData(pluginName);
      return this;
  }

  $.fn[pluginName] = function(opts) {
    if (opts === 'stop') return this.map(stopScrolling);
    var options = $.extend({}, defaults, opts);
    return this.map(function() {
      var $this = $(this);
      var top = $('<div>').addClass(options.topClass)[0],
        bottom = $('<div>').addClass(options.bottomClass)[0],
        triggers = [top, bottom];

      var data = {
        options: options,
        timer: 0,
        top: top,
        bottom: bottom,
        triggers: triggers
      };
      $this.data('edgescroll', data)

      $(triggers).addClass(options.triggerClass).css({
        height: options.padding,
        position: this==window?'fixed':'absolute'
      });

      $(this==window?document.body:this).append(triggers);

      $(triggers).hover(function(e) {
        var that = this;
        setTimer(data, function() {
          var delta = (that==top?-1:1) * options.speed;
          $this.scrollTop($this.scrollTop() + delta);
        });
      }, function(e) {
        setTimer(data, null);
      });

      return this;
    });
  };
})(jQuery, window, 'edgescroll');