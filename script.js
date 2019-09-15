
var tempo = 10;
var finalContagem;
var intervalCron;
var time1 = 0, time2 = 0;
var pontos = [0, 0, 0, 0];
var times = ["", "", "", ""];
var listaTimes = ["rola", "azver", "amver", "pb"];
var numCartas = 8;
var cartas = [20, 20, 20, 30, 30, 30, -40];
var cartasAdc = [-40, -40];

$(".tela").hide();
$(".img-identifique").hide();
embaralha();

function mostraImg(i){
    $(".img-identifique").hide();
    $(".toolbar-identifique").hide();
    $("#imgIdentifique"+i).show();
    console.log(i);
}

function flip(item){
    $(item).addClass("flipped");
}

$("#mostraCronometro").click(function(){
    $(".tela").hide();
    $(".tela.cronometro").show();
});

$("#mostraCartas").click(function(){
    $(".tela").hide();
    $(".tela.cartas").show();
});

$("#mostraIdentifique").click(function(){
    $(".tela").hide();
    $(".img-identifique").hide();
    $(".tela.identifique").show();
    $(".toolbar-identifique").show();
});


$("#btnIniciaCronometro").click(function(){
    clearInterval(intervalCron);
    finalContagem = new Date().getTime() + tempo * 1000;
    intervalCron = setInterval(atualizaTempo, 25);
});

$("#btnParaCronometro").click(function(){
    clearInterval(intervalCron);
});

function atualizaTempo(){
    tempo = (finalContagem - new Date().getTime())/1000;
    if(tempo < 0){
        tempo = 0;
        clearInterval(intervalCron);
    }
    mostraTempo();
}

function addCarta(){
    /*numCartas ++;
    if(cartasAdc.length > 0){
        cartas.push(cartasAdc.shift());
    }
    $(".card-container div:nth-child("+numCartas+")").show();*/
    $(".fora").removeClass("fora");
}

function removeCartas(){
    numCartas -= $(".flipped").length;
    $(".flipped").remove();
}

function embaralha(){
    cartas = shuffle(cartas);
    for (i = 0; i < numCartas; i++){
        var card = $(".card-container .flip-card:nth-child("+(i+1)+")");
        card.find('h1').text(Math.abs(cartas[i]));
        if(cartas[i] > 0){
            card.find('h2').text("pontos");
        }else{
            console.log("fora");
            card.addClass("fora");
            card.find('h2').text("+Torta na cara!");
        }
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$("#btn10s").click(function(){
    console.log("foi");
    tempo = 10;
    mostraTempo();
});

$("#btn60s").click(function(){
    tempo = 60;
    mostraTempo();
});

$("#btn120s").click(function(){
    tempo = 120;
    mostraTempo();
});

function somaPlacar(i){
    pontos[i-1] = pontos[i-1] + 5;
    mostraPlacar();
    console.log("pass");
}

function subPlacar(i){
    pontos[i-1] -= 5;
    mostraPlacar();
}

function mudaTime(i){
    $(".time"+i).removeClass(listaTimes[times[i-1]]);
    times[i-1] = (times[i-1] + 1) % 4;
    $(".time"+i).addClass(listaTimes[times[i-1]]);
};

function mostra4(){
    $(".placar.extra").show();
}

function mostraTempo(){
    $("#tempo").text(tempo.toFixed(1));
    var deg = tempo *360 / 10;
    console.log(deg);
    $(".container-circulo").css("transform", "rotate("+deg+"deg)");
}

function mostraPlacar(){
    $("#placar1").text(pontos[0]);
    $("#placar2").text(pontos[1]);
    $("#placar3").text(pontos[2]);
    $("#placar4").text(pontos[3]);
}