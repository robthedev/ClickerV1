var Clicker = (function () {
    var $img = $('.main-img');
    var $clickDisplay = $('.click-display');
    var $name = $('.name');
    var $blocks = $('.container');
    var $namelist = $('.nameList');
    var $displayArea = $('.display-area');
    var clicks = 0;

    var init = function () {
        $blocks.hide();
        createListItems();
        $clickDisplay.html(0);
        trackClicks();
    };

    var trackClicks = function () {
        $img.each(function (i, el) {
            var clickDisplay = $(this).next($clickDisplay);
            var val = clickDisplay.html();
            $(this).click(function () {
                val++;
                changeHtml(clickDisplay, val);
            });
        }); 
    };

    var addItemToList = function (item) {
        $namelist.append(item);
    };

    var showBlock = function () {
        var txt = $(this).text();
        $blocks.each(function (i, el) {
            var name = $(this).find('.name').html();
            if (txt == name) {
                $blocks.hide();
                $displayArea.append($(this).clone());
                $(this).show();
            }
        });
    };

    var bindClick = function (item) {
        item.addEventListener("click", showBlock);
    };
 
    var createListItems = function () {
        $blocks.each(function (i, el) {
            var name = $(this).find('.name').html();
            var newitem = document.createElement("LI");
            var nametext = document.createTextNode(name);
            newitem.appendChild(nametext);
            bindClick(newitem);
            addItemToList(newitem);
        });
    };

    var changeHtml = function (el, newval) {
        el.html(newval);
    };

    return {
        init: init
    }
   
}());

Clicker.init();
