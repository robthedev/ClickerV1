//version 3  

$(function () {
    var model = {
       
        playerObjs: [{
            name: "Michael Jordan",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Jordan_Lipofsky.jpg/170px-Jordan_Lipofsky.jpg",
            clicks: 0,
            showOnLoad: true
        },{
            name: "Larry bird",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Larrybird.jpg/220px-Larrybird.jpg",
            clicks: 0,
            showOnLoad: false
        }, {
            name: "Tim Duncan",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tim_Duncan.jpg/220px-Tim_Duncan.jpg",
            clicks: 0,
            showOnLoad: false
        }, {
            name: "Shaq Oneal",
            imgsrc: "http://ll-media.tmz.com/2015/12/08/shaq-200x250.jpg",
            clicks: 0,
            showOnLoad: false
        }, {
            name: "Magic Johnson",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Magic_Lipofsky.jpg/220px-Magic_Lipofsky.jpg",
            clicks: 0,
            showOnLoad: false
        }],

        getAllPlayers: function () {
            return this.playerObjs;
        },
       
    };

    var controller = {

        getPlayers: function () {
            return model.getAllPlayers();
        },

        getDefaultPlayer: function () {
            var players = controller.getPlayers();
            players.forEach(function (player) {
                if (player.showOnLoad === true) {
                    playersView.render(player);
                }

            });
        },

        trackImgClick: function (playername) {
            var players = controller.getPlayers();
            players.forEach(function (player) {
                if (playername == player.name) {
                    player.clicks++
                    playersView.render(player);
                }
                
            });
        },

        trackNameClick: function (playername) {
            var players = controller.getPlayers();
            players.forEach(function (player) {
                if (playername == player.name) {
                    playersView.render(player);
                }
            });
        },

        init: function () {
            playersNameView.init();
            playersView.init();
        }
    };

    var playersView = {

        init: function () {
            controller.getDefaultPlayer();
        },

        render: function (obj) {
            playersView.container = $('.container');
            var playerhtml = '';
            playerhtml += '<div class="player-box">'
            playerhtml += '<h1>' + obj.name + '</h1>'
            playerhtml += '<img class="player-img" src=" ' + obj.imgsrc + '"/>'
            playerhtml += '<div>' + obj.clicks + '</div>'
            playerhtml += '</div>';
                
            playersView.container.html(playerhtml);
            playersView.bindImgs(obj.name);
        },

        bindImgs: function (playername) {
            $('img.player-img').each(function (i, img) {
                $(this).click(function () {
                    controller.trackImgClick(playername);
                });
            });
        },
    };

    var playersNameView = {

        init: function () {
            this.namesList = $('.namesList');

            playersNameView.render();
            playersNameView.bindBtns();
        },

        render: function () {
            var playerNames = '';
            controller.getPlayers().forEach(function (player) {
                playerNames += '<button class="player-name">' + player.name + '</button>';
            });
            playersNameView.namesList.html(playerNames);
        },

        bindBtns: function () {
            $('button.player-name').each(function(i, button){
                var playername = $(this).html();
                $(this).click(function () {
                    controller.trackNameClick(playername);
                });
            });
        },
    };

    
    controller.init();
});