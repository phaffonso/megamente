
var tempo = 10;
var finalContagem;
var intervalCron;
var time1 = 0, time2 = 0;
var pontos = [0, 0, 0, 0];
var times = ["", "", "", ""];
var listaTimes = ["rola", "azver", "amver", "pb"];
var numCartas = 8;
var cartas = [20, 20, 20, 30, 30, 30, -40, -40];

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
	/*$(".fora").removeClass("fora");
	$(".flipped").removeClass("flipped");
	$(".removed").removeClass("removed");
	embaralha();*/
    $(".tela").hide();
    $(".tela.cartas").show();
});

$("#mostraIdentifique").click(function(){
    $(".tela").hide();
    $(".img-identifique").hide();
    $(".tela.identifique").show();
    $(".toolbar-identifique").show();
});

var placarVisivel = false;
$("#mostra4").click(function(){
	placarVisivel = !placarVisivel;
    if(placarVisivel){
		$(".placar.extra").show()
		$(".container-circulo").addClass("container-circulo-peq");
	}else{
		$(".placar.extra").hide()
		$(".container-circulo").removeClass("container-circulo-peq");
	}
})

$("#mostraRoda").click(function(){
	$(".tela").hide();
	$(".tela.roda").show();
})

function iniciaCronometro(){
    clearInterval(intervalCron);
    finalContagem = new Date().getTime() + tempo * 1000;
    intervalCron = setInterval(atualizaTempo, 25);
}

function paraCronometro(){
    clearInterval(intervalCron);
}

function setTempo(val){
	tempo = val;
	mostraTempo();
}

function atualizaTempo(){
    tempo = (finalContagem - new Date().getTime())/1000;
    if(tempo < 0){
        tempo = 0;
        clearInterval(intervalCron);
    }
    mostraTempo();
}

function mostraTempo(){
    $("#tempo").text(tempo.toFixed(1));
    var deg = tempo * 360 / 30;
    console.log(deg);
    $(".container-circulo").css("transform", "rotate("+deg+"deg)");
}

function addCarta(){
    $(".fora").removeClass("fora");
}

function removeCartas(){
    $(".flipped").addClass("removed");
	setTimeout(()=>{$(".removed").hide()}, 1000);
}

function embaralha(){
    cartas = shuffle(cartas);
    for (i = 0; i < numCartas; i++){
        var card = $(".card-container .flip-card:nth-child("+(i+1)+")");
        card.find('h1').text(Math.abs(cartas[i]));
        if(cartas[i] > 0){
            card.find('h2').text("pontos");
        }else{
            card.addClass("fora");
            card.find('h2').text("+Torta na Cara!");
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

const incrementoPlacar = 10;

function somaPlacar(i){
    pontos[i-1] += incrementoPlacar;
    mostraPlacar();
    console.log("pass");
}

function subPlacar(i){
    pontos[i-1] -= incrementoPlacar;
    mostraPlacar();
}

function mudaTime(i){
    $(".time"+i).removeClass(listaTimes[times[i-1]]);
    times[i-1] = (times[i-1] + 1) % 4;
    $(".time"+i).addClass(listaTimes[times[i-1]]);
};


function mostraPlacar(){
    $("#placar1").text(pontos[0]);
    $("#placar2").text(pontos[1]);
    $("#placar3").text(pontos[2]);
    $("#placar4").text(pontos[3]);
}

function rodaARoda(){
	var x = 3*360; //minimo de voltas
	var y = 12*360; // máximo de voltas

	var deg = Math.floor(Math.random() * (x - y)) + y;
	// impedir que caia exatamente entre dois setores
	if(deg % 45 == 0)
		deg++;

	document.getElementById('box').style.transform = "rotate("+deg+"deg)";

	var element = document.getElementById('mainbox');
	element.classList.remove('animate');
	setTimeout(function(){
		element.classList.add('animate');
	}, 5000); //5000 = 5 second
}

/* Gamepad input */

function gamepadButtonPressed(button){
	console.log(button);
	switch(button){
		case 0: setTempo(60); break;
		case 1: setTempo(15); break;
		case 2: setTempo(30); break;
		case 3: setTempo(120); break;
		case 4: subPlacar(1); break;
		case 6: somaPlacar(1); break;
		case 5: subPlacar(2); break;
		case 7: somaPlacar(2); break;
		case 8: paraCronometro(); break;
		case 9: iniciaCronometro(); break;
	}
}

var buttonStates;

function pollGamepad(){
    for (const pad of navigator.getGamepads()) {
      if(pad != null){
		for(var i = 0; i < pad.buttons.length; i++){
			if(pad.buttons[i].pressed){
				if(buttonStates == null || !(buttonStates[i].pressed)){
					gamepadButtonPressed(i);
				}					
			}
		}
		buttonStates = pad.buttons;
	  }
    }
}

window.addEventListener("gamepadconnected", (event) => {
  console.log("A gamepad connected:");
  interval = window.setInterval(pollGamepad, 40);
  console.log(event.gamepad);
});


