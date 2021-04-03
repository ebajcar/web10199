/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  var POPUP_FEATURES = 'status=yes,resizable=yes,scrollbars=yes,' + 
    'width=800,height=500,left=100,top=100';
  
  function hookPopupLink(e) {
    var trigger = e.findElement('a.popup');
    if (!trigger) return;
    e.stop(); trigger.blur();
    var wndName = trigger.readAttribute('target') ||
      ('wnd' + trigger.identify());
    window.open(trigger.href, wndName, POPUP_FEATURES).focus();
  }
  
  document.observe('click', hookPopupLink);
})();