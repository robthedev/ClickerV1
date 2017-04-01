var Clicker = (function () {
    var $img = $('.main-img');
    var $clickDisplay = $('.click-display');
    var $name = $('.name');
    var $blocks = $('.container');
    var $namelist = $('.nameList');
    var $displayArea = $('.display-area');
    var clicks = 0;

    var init = function () {
        addListItems();
        hideBlocks();
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

    var createListItem = function (name, callback) {
        var newitem = document.createElement("LI");
        var nametext = document.createTextNode(name);
        newitem.appendChild(nametext);
        $namelist.append(newitem);
        callback(newitem);
        return newitem;
    };

    var hideBlocks = function () {
        $blocks.each(function (i, el) {
            $(this).hide();
        });
    }

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

    var bindClick = function (el) {
        el.addEventListener("click", showBlock);
    };
 
    var addListItems = function () {
        $blocks.each(function (i, el) {
            var name = $(this).find('.name').html();
            createListItem(name, bindClick);
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
