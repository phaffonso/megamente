
var pontosTime1 = 0, pontosTime2 = 0, tempo = 10;
var finalContagem;
var intervalCron;
var time1 = 0, time2 = 0;
var times = ["rola", "azver", "amver", "pb"];

$(".tela").hide();
$(".img-identifique").hide();

function mostraImg(i){
    $(".img-identifique").hide();
    $(".toolbar-identifique").hide();
    $("#imgIdentifique"+i).show();
    console.log(i);
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
    intervalCron = setInterval(atualizaTempo, 100);
});

$("#btnParaCronometro").click(function(){
    clearInterval(intervalCron);
});

function atualizaTempo(){
    tempo = (finalContagem - new Date().getTime())/1000;
    console.log(tempo);
    if(tempo < 0){
        tempo = 0;
        clearInterval(intervalCron);
    }
    mostraTempo();
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

$("#btnPlacarMais1").click(function(){
    pontosTime1++;
    mostraPlacar()
});

$("#btnPlacarMenos1").click(function(){
    pontosTime1--;
    mostraPlacar()
});

$("#btnPlacarMais2").click(function(){
    pontosTime2++;
    mostraPlacar()
});

$("#btnPlacarMenos2").click(function(){
    pontosTime2--;
    mostraPlacar()
});

$("#btnMudaTime1").click(function(){
    $(".time1").removeClass(times[time1]);
    time1 = (time1 + 1) % 4;
    $(".time1").addClass(times[time1]);
});

$("#btnMudaTime2").click(function(){
    $(".time2").removeClass(times[time2]);
    time2 = (time2 + 1) % 4;
    $(".time2").addClass(times[time2]);
});

function mostraTempo(){
    $("#tempo").text(tempo.toFixed(1));
}

function mostraPlacar(){
    $("#placar1").text(pontosTime1);
    $("#placar2").text(pontosTime2);
}