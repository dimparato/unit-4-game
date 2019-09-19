function arena (playerLoc) {

    var defeat;

    jediNSith = [
        {
            name: "Luke",
            hp : 30,
            hpCap : 30,
            attac : 10,
            def : 10,
            heal : 10,
            rightPic : '<img src="assets/images/luker.png"></img>',
            leftPic : '<img src="assets/images/lukel.png"></img>',
        },
        {
            name: "Darth",
            hp : 20,
            hpCap : 20,
            attac : 15,
            def : 15,
            heal : 5,
            rightPic : '<img src="assets/images/darthr.png"></img>',
            leftPic : '<img src="assets/images/darthl.png"></img>',
        },
        {
            name: "Yoda",
            hp : 10,
            hpCap : 10,
            attac : 10,
            def : 20,
            heal : 5,
            rightPic : '<img src="assets/images/yodar.gif"></img>',
            leftPic : '<img src="assets/images/yodal.png"></img>',
        },
        {
            name: "Maul",
            hp : 30,
            hpCap : 30,
            attac : 25,
            def : 10,
            heal : 5,
            rightPic : '<img src="assets/images/maulr.png"></img>',
            leftPic : '<img src="assets/images/maull.png"></img>',
        },
    ];

    player = jediNSith.splice(playerLoc, 1);
    opponent = jediNSith[Math.floor(Math.random()*jediNSith.length)];

    $("#playerHitPoints").text(player[0].hp);
    $("#opponentHitPoints").text(opponent.hp);
    $('#playerPic').html(player[0].leftPic);
    $('#opponentPic').html(opponent.rightPic);

    $("#healBtn").on("click",function() {
            player[0].hp += Math.round(player[0].heal*Math.random());
            if (player[0].hp > player[0].hpCap) {
                player[0].hp = player[0].hpCap;
            }
            $("#playerHitPoints").text(player[0].hp);
            $("#opponentHitPoints").text(opponent.hp);
            defeat = opponentAction();
            if (defeat==1) {
                $("#playerHitPoints").empty();
                $("#opponentHitPoints").empty();
                $("#attackBtn").remove();
                $("#healBtn").remove();
                $("#gameOver").text("Sorry! Game Over!");
            }
    });
    $("#attackBtn").on("click",function() {
            opponent.hp -= Math.round(player[0].attac*Math.random());
            if (opponent.hp <= 0){
                nextBattle();
            }
            else {
                $("#playerHitPoints").text(player[0].hp);
                $("#opponentHitPoints").text(opponent.hp);
                defeat = opponentAction();
                if (defeat==1) {
                    $("#playerHitPoints").empty();
                    $("#opponentHitPoints").empty();
                    $("#attackBtn").remove();
                    $("#healBtn").remove();
                    $("#gameOver").text("Sorry! Game Over!");
                }
            }
    });
    function opponentAction() {
        if (opponent.hp <= 5){
            opponent.hp += Math.round(opponent.heal*Math.random());
            if (opponent.hp > opponent.hpCap) {
                opponent.hp = opponent.hpCap;
            }
            $("#playerHitPoints").text(player[0].hp);
            $("#opponentHitPoints").text(opponent.hp);
            return 0;
        }
        else {
            player[0].hp -= Math.round(opponent.attac*Math.random());
            if (player[0].hp <= 0){
                return 1;
            }
            else {
                $("#playerHitPoints").text(player[0].hp);
                $("#opponentHitPoints").text(opponent.hp);
                return 0;
            }
        }
    }
    function nextBattle() {
    
        jediNSith = $.grep (jediNSith, function (undefeated) {
            return undefeated != opponent;
        });

        opponent = jediNSith[Math.floor(Math.random()*jediNSith.length)];
        player[0].hp = player[0].hpCap;
        $("#playerHitPoints").text(player[0].hp);
        $("#opponentHitPoints").text(opponent.hp);
        $('#opponentPic').html(opponent.rightPic);
    }
}