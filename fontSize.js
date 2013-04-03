/*
 * Copyright (c) 2011 The Wonderfactory, http://www.thewonderfactory.com

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileOverview File overview goes here.
 * @version 0.1
 * @author Your Name <technology@thewonderfactory.com> 
 */

/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This documents
 * the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name jQuery.fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This documents
 * the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */

(function($) {
    var methods = {
        init: function(options) {
            options = $.extend({}, $.fn.fontSize.defaults, options);
            
            return this.each(function() {
              var $self = $(this);
				
      				$self.data('fontSize', {
      					options: options,
      					decreaseButton: $(options.decreaseButton),
      					increaseButton: $(options.increaseButton)
      				});				
      				functions.setup.call($self);	
            });
        }
    };
      
    var functions = {
  		setup: function(){
  			var $self = $(this);			
  			var data = $self.data('fontSize');
  			
  			data.increaseButton.click(function(){
  				functions.increaseText.call($self);
  				return false;
  			});
  			
  			data.decreaseButton.click(function(){
  				functions.decreaseText.call($self);
  				return false;
  			});
  			
  			var fontSize = functions.getLocalItem($self.attr('id'));
  			if (fontSize) {
  				$self.css('font-size', fontSize);
  			}
  		},
  		
  		increaseText: function(){
  			var $self = $(this);									
  			var data = $self.data('fontSize');			
  			var curSize = parseInt($self.css('fontSize'));
  			
  			if (curSize <= data.options.sizeMax){
  				var newSize = (curSize + 1) + "px";
  				
  				$self.css('font-size', newSize);	

  				functions.setLocalItem($self.attr('id'), newSize);
  			}				
  		},
  		
  		decreaseText: function(){
  			var $self = $(this);	
  			var data = $self.data('fontSize');			
  			var curSize = parseInt($self.css('fontSize'));
  			
  			if (curSize >= data.options.sizeMin){
  				var newSize = (curSize - 1) + "px";
  				
  				$self.css('font-size', newSize);
  				
  				functions.setLocalItem($self.attr('id'), newSize);					
  			}			
  		},
  		
  		setLocalItem: function(id, val){
  			if (functions.hasLocalStorage()){
  				localStorage.setItem(id,val);
  			} else if (jQuery.cookies) {
  				$.cookie(id, val);
  			}			
  		},		
  		
  		getLocalItem: function(id){
  			if (functions.hasLocalStorage()) {
  				return localStorage.getItem(id);
  			} else {
  				if (jQuery.cookies) {
  					return $.cookie(id);
  				}
  			}
  			return null;
  		},
  		
  		hasLocalStorage: function() {
  			try {
  				return 'localStorage' in window && window['localStorage'] !== null;
  			} catch (e) {
  				return false;
  			}
  		}
    };
    
    /**
     * <p>Increase and decrease font size of specific elements.</p>
     *
     * @example Example goes here.
     *
     * @param options An optional options object.
     * @param options.decreaseButton Decrease object.
     * @param options.increaseButton Increase object.
     * @param options.sizeMax Maximum font size.
     * @param options.sizeMin Minimum font size.
     *
     */
    jQuery.fn.fontSize = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist');
        }
    };
    
    jQuery.fn.fontSize.defaults = {
   		decreaseButton: $(),
  		increaseButton: $(),
  		sizeMax: 20,
  		sizeMin: 10
  	};
})(jQuery);