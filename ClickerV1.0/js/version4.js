//version 4

$(function () {
    var model = {
       
        currentPlayer: null,
        adminFormVisible: null,

        playerObjs: [{
            name: "Michael Jordan",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Jordan_Lipofsky.jpg/170px-Jordan_Lipofsky.jpg",
            clicks: 0
        },{
            name: "Larry bird",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Larrybird.jpg/220px-Larrybird.jpg",
            clicks: 0
        }, {
            name: "Tim Duncan",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tim_Duncan.jpg/220px-Tim_Duncan.jpg",
            clicks: 0
        }, {
            name: "Shaq Oneal",
            imgsrc: "http://ll-media.tmz.com/2015/12/08/shaq-200x250.jpg",
            clicks: 0
        }, {
            name: "Magic Johnson",
            imgsrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Magic_Lipofsky.jpg/220px-Magic_Lipofsky.jpg",
            clicks: 0
        }],

        getAllPlayers: function () {
            return this.playerObjs;
        },
       
    };

    var controller = {

        init: function () {
            
            this.setFormNotVisible();
            this.setDefaultPlayer();
            playersNameView.init();
            playersView.init();
            adminFormView.init();
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
        },

        getFormVisible: function () {
            return model.adminFormVisible;
        },

        setFormNotVisible: function () {
            model.adminFormVisible = false;
        },

        setFormVisible: function () {
            model.adminFormVisible = true;
        },

    };

    var playersNameView = {

        init: function () {

            this.namesList = $('.namesList');
            this.render();
        },

        render: function () {
            var players = controller.getPlayers();
            var btn;
            players.forEach(function (player) {
                btn = document.createElement('button');
                btn.textContent = player.name;
                btn.addEventListener('click', (function (playername) {
                    return function () {
                        var isFormVisible = controller.getFormVisible();
                        if (isFormVisible) {
                            alert('save or cancel form');
                            return false;
                        }
                        controller.setCurrentPlayer(playername);
                        playersView.render();
                    };
                })(player));
                playersNameView.namesList.append(btn);
            });
        },
    };

    var playersView = {

        init: function () {
          
            this.render();
        },

        render: function () {
            playersView.container = $('.container');
            var playerhtml = '';
            var currentPlayer = controller.getCurrentPlayer();

            playerhtml += '<div class="player-box">';
            playerhtml += '<h1>' + currentPlayer.name + '</h1>';
            playerhtml += '<img class="player-img" src=" ' + currentPlayer.imgsrc + '"/>';
            playerhtml += '<div>' + currentPlayer.clicks + '</div>';
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
        
    var adminFormView = {

        init: function () {

            $adminBtn = $('.admin-btn');
            $cancelBtn = $('.cancel-btn');
            $saveBtn = $('.save-btn');
            this.$adminForm = $('.admin-form');
            this.$nameInput = $('.name-input');
            this.$imgurlInput = $('.imgurl-input');
            this.$clicksInput = $('.clicks-input');

            $adminBtn.click(function () {
                controller.setFormVisible();
                adminFormView.render();
            });

            $cancelBtn.click(function (e) {
                controller.setFormNotVisible();
                adminFormView.render();
                e.preventDefault();
            });

            $saveBtn.click(function (e) {
                playersView.render();
                controller.setFormNotVisible();
                adminFormView.render();
                e.preventDefault();
            });

            this.$nameInput.keyup(function () {
                var currentPlayer = controller.getCurrentPlayer();
                var updatedName = this.value;
                currentPlayer.name = updatedName;
            });

            this.$clicksInput.keyup(function () {
                var currentPlayer = controller.getCurrentPlayer();
                var updatedClicks = this.value;
                currentPlayer.clicks = updatedClicks;
            });

            adminFormView.render();
        },
        
        render: function () {
           
            var currentPlayer = controller.getCurrentPlayer();
            var isFormVisible = controller.getFormVisible();
            if (isFormVisible) {
              
                this.$nameInput.val(currentPlayer.name);
                this.$imgurlInput.val(currentPlayer.imgsrc);
                this.$clicksInput.val(currentPlayer.clicks);
                this.$adminForm.show();
                return;
            }
            this.$adminForm.hide();
        },

    };
    
    controller.init();
});
