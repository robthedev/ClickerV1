//version 4

$(function () {
    var model = {
       
        currentPlayer: null,

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

        init: function () {

            this.setDefaultPlayer();
            playersNameView.init();
            playersView.init();
        },

        getCurrentPlayer: function () {
            return model.currentPlayer;
        },

        setCurrentPlayer: function (player) {
            model.currentPlayer = player;
        },

        getPlayers: function () {
            return model.getAllPlayers();
        },

        setDefaultPlayer: function () {
            model.currentPlayer = model.playerObjs[0];
        },

        incrementClicks: function () {
            var currentPlayer = model.currentPlayer;
            currentPlayer.clicks++;
            playersView.render();
        }
    };

    var playersView = {

        init: function () {
          
            this.render();
        },

        render: function () {
            playersView.container = $('.container');
            var playerhtml = '';
            var currentPlayer = controller.getCurrentPlayer();

            playerhtml += '<div class="player-box">'
            playerhtml += '<h1>' + currentPlayer.name + '</h1>'
            playerhtml += '<img class="player-img" src=" ' + currentPlayer.imgsrc + '"/>'
            playerhtml += '<div>' + currentPlayer.clicks + '</div>'
            playerhtml += '</div>';
                
            playersView.container.html(playerhtml);
            playersView.bindImgs(currentPlayer);
        },

        bindImgs: function (player) {
            $('img.player-img').each(function (i, img) {
                $(this).click(function () {
                    controller.incrementClicks();
                });
            });
        },
    };

    var playersNameView = {

        init: function () {

            this.namesList = $('.namesList');
            this.render();
        },

        render: function () {
            var players = controller.getPlayers();
            players.forEach(function (player) {
                btn = document.createElement('button');
                btn.textContent = player.name;
                btn.addEventListener('click', (function (playername) {
                    return function () {
                        controller.setCurrentPlayer(playername);
                        playersView.render();
                    };
                })(player));
                playersNameView.namesList.append(btn);
            });
        },
    };

    
    controller.init();
});
