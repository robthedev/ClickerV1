//revised using objs and mvc

$(function () {

    var $imgs = $('.main-img');
    var $clickDisplay = $('.click-display');
    var $name = $('.name');
    var $containers = $('.container');
    var $namelist = $('.nameList');
    var $displayArea = $('.display-area');

    var model = {

        createListItems: function (containers) {
            containers.each(function (i, el) {
                var name = $(this).find('.name').html();
                var newitem = document.createElement("LI");
                var nametext = document.createTextNode(name);
                newitem.appendChild(nametext);
                model.bindClick(newitem);
                model.addItemToList($namelist, newitem);
            });
        },

        trackImgClicks: function (imgs) {
            imgs.each(function (i, el) {
                var clickDisplay = $(this).next($clickDisplay);
                var val = clickDisplay.html();
                $(this).click(function () {
                    val++;
                    model.changeHtml(clickDisplay, val);
                });
            });
        },

        addItemToList: function (list, item) {
            list.append(item);
        },

        bindClick: function (item) {
            item.addEventListener("click", model.showBlock);
        },

        showBlock: function () {
            var txt = $(this).text();
            $containers.each(function (i, el) {
                var name = $(this).find('.name').html();
                if (txt == name) {
                    $containers.hide();
                    $displayArea.append($(this).clone());
                    $(this).show();
                }
            });
        },

        hideContainers: function (containers) {
            containers.hide();
        },

        changeHtml: function (el, newval) {
            el.html(newval);
        },

        setDisplayNum: function (el, int) {
            el.html(int);
        },
    };

    var controller = {

        init: function () {
            //model.init();
            view.init();
        },

        getItems: function (containers) {
            return model.createListItems(containers);
        },

        clearDom: function (containers) {
            model.hideContainers(containers);
        },

        bindImgClicks: function (imgs) {
            model.trackImgClicks(imgs);
        },

        setClickDisplay: function (el, int) {
            model.setDisplayNum(el, int);
        },
        
    };

    var view = {
        init : function () {
            view.render();
        },

        render: function () {
            controller.clearDom($containers);
            controller.setClickDisplay($clickDisplay, 0);
            controller.getItems($containers);
            controller.bindImgClicks($imgs);
        },
    };

    controller.init();
});