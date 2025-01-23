
var salir = false; //Bloquea el tablero

var contX = 0; //Numero de fichas X

var ContY = 0; // Numero de fichas 0

var ConT = 0; // Rondas 

var fichas = 3; //Numero de fichas

var modosJu = 0; //Modo de juego

var bandera = true; 

var ficahIa = false;

var jug1 = 0;//acumula los puntos del jugador 1
var jug2 = 0;//acumula los puntos del jugador 2

var jug1Per = 0;
var jug2Per = 0;

var jug1Emp = 0;
var jug2Emp = 0;

var tablero =
    [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];


/* Esta funcion reinicia toda la partida para volver a empezar */

function reiniciarTablero() {

    contX = 0;
    ContY = 0;
    ConT = 0;

    if(tiempoTotal==0){

        tiempoTotal=30;
        updateClock();

    }else{

        tiempoTotal=30;

    }

    tablero =
        [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];

    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++) {

            var div = document.getElementById("cont" + i + j);
            div.innerHTML = "";


        }

    var panel = document.getElementById("panel");


    panel.innerHTML = "";
    document.getElementById("cuentaAtras").removeAttribute("hidden", "hidden");
    cambiarChicoNormal();
    if (modosJu == 1) {
        cambiarChicaNormal();
    }
    salir = false;



}

/* Esta funcion imprime una x donde se clica */

function imprimirX(x, y) {

    var hueco = tablero[x][y];

    var div = document.getElementById("cont" + x + y);

    if (hueco == 1) {

        imprimirX(x, y);

    } else if (hueco == 2) {

        imprimirX(x, y);

    }

    else {

        div.innerHTML = "X";

        tablero[x][y] = "1";
    }

    tiempoTotal = 30;

    validarculomna();
    validarfila();
    validardiagonal();


    if (salir == false) {
        validarEmpate();
    }

}

/* Esta funcion esribe un O cuando se clica*/

function imprimirO(x, y) {

    var hueco = tablero[x][y];

    var div = document.getElementById("cont" + x + y);

    var panel = document.getElementById("panel");
    if (hueco == 1) {

        imprimirO(x, y);

    } else if (hueco == 2) {

        imprimirO(x, y);

    }

    else {

        div.innerHTML = "O";

        tablero[x][y] = "2";
    }

    tiempoTotal = 30;

    validarculomna();
    validarfila();
    validardiagonal();


    if (salir == false) {
        validarEmpate();
    }
}

/* Descide que ficha ponr si O o X */

function ponerFicha(x, y) {

    var hueco = tablero[x][y];

    if (contX < fichas || ContY < fichas) {

        if (ConT % 2 == 0) {

            imprimirX(x, y);
            contX++;

        } else {

            imprimirO(x, y);
            ContY++;

        }

        ConT++;

    } else {

        var hueco = tablero[x][y];

        var div = document.getElementById("cont" + x + y)

        div.innerHTML = "";

        tablero[x][y] = 0;

        if (hueco == 1) {

            contX = 2;
            ConT = 2;

        } else if (hueco == 2) {

            ContY = 2;
            ConT = 1;

        }

    }

}

/* Seleciona los diferentes modos  de juego */

function modosDeJuego(x, y) {

    if (modosJu == 1) {

        if (salir == false) {

            ponerFicha(x, y);

        }

    } else if (modosJu == 2) {


        if (salir == false) {
            unoVSia(x, y);
        }

    } else if (modosJu == 3) {

        salir = true;




    }

};

/* Funcion para que funcione la maquina */

function unoVSia(x, y) {

    var hueco = tablero[x][y];

    if (contX < fichas || ContY < fichas) {
        if (bandera == true) {
            if (hueco == 2 || hueco == 1) {

                unoVSia();

            } else {

                tiempoTotal = 30;


                var div = document.getElementById("cont" + x + y);

                div.innerHTML = "X";

                tablero[x][y] = 1;

                contX++;


                validarculomna();
                validarfila();
                validardiagonal();


                if (salir == false) {
                    validarEmpate();


                    if (fichas == 5) {

                        if (salir == false) {

                            bandera = false;

                            setTimeout(ponerOIA, 1000);



                        }

                    } else if (fichas == 3) {
                        if (ContY < 3) {

                            if (salir == false) {

                                bandera = false;



                                setTimeout(ponerOIA, 1000);


                            }

                        } else {


                            fichas6();

                        }
                    }
                }

            }

        }
    } else {

        var hueco = tablero[x][y];

        var div = document.getElementById("cont" + x + y)


        if (hueco == 1) {

            div.innerHTML = "";

            tablero[x][y] = 0;


            contX = 2;
            ConT = 2;


        }

    }

}

/* Funcion si las fichas son 6 */

function fichas6() {

    x = Math.floor(Math.random() * (3 - 0) + 0);

    y = Math.floor(Math.random() * (3 - 0) + 0);

    var hueco = tablero[x][y];

    if (hueco == 2) {

        var div = document.getElementById("cont" + x + y);
        div.innerHTML = "";
        tablero[x][y] = 0;
        ponerOIA(x, y);

    } else {

        fichas6();

    }

}

/* Funcion para que la maquina ponga ficha */

function ponerOIA() {


    x = Math.floor(Math.random() * (3 - 0) + 0);

    y = Math.floor(Math.random() * (3 - 0) + 0);



    var hueco = tablero[x][y];

    if (hueco == 1) {

        ponerOIA();

    } else if (hueco == 2) {


        ponerOIA();

    } else if (hueco == 0) {

        var div = document.getElementById("cont" + x + y);

        div.innerHTML = "O";

        tablero[x][y] = 2;

        ContY++;

        tiempoTotal = 30;

        bandera = true;



        validarculomna();
        validarfila();
        validardiagonal();


        if (salir == false) {
            validarEmpate();
        }


    }


}

/*Comprueba si hay un empate  */

function validarEmpate() {

    var i;
    var j;
    var sumatorio = 0;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {


            sumatorio = sumatorio + parseInt(tablero[i][j]);
        }

    }


    if (sumatorio == 13) {

        var div = document.getElementById("panel");
        div.innerHTML = "Han empatado";

        salir = true;
        var chico = document.getElementById("empateChico");

        jug1Emp = jug1Emp + 1;

        chico.innerHTML = jug1Emp;


        var chica = document.getElementById("empateChica");

        jug2Emp = jug2Emp + 1;

        chica.innerHTML = jug2Emp;


    }


}

/*Estas funciones comprueban si hay una victoria y añaden puntos a la tabla */

function validarfila() {
    for (var i = 0; i < 3; i++) {
        if (tablero[i][0] == 1 && tablero[i][1] == 1 && tablero[i][2] == 1) {

            var div = document.getElementById("panel");
            div.innerHTML = "Ha ganado x";
            document.getElementById("cuentaAtras").setAttribute("hidden", "hidden");
            cambiarChicoFeliz();
            if (modosJu == 1) {
                cambiarChicaTriste();
            }
            salir = true;
            jug1 = jug1 + 1;
            jug2Per = jug2Per + 1;
            var chico = document.getElementById("ganadasChico");
            chico.innerHTML = jug1;
            var chica = document.getElementById("derrotaChica");
            chica.innerHTML = jug2Per;

        }
        if (tablero[i][0] == 2 && tablero[i][1] == 2 && tablero[i][2] == 2) {

            var div = document.getElementById("panel");
            div.innerHTML = "Ha ganado O";
            document.getElementById("cuentaAtras").setAttribute("hidden", "hidden");
            cambiarChicoTriste();
            if (modosJu == 1) {
                cambiarChicaFeliz();
            }
            salir = true;
            jug2 = jug2 + 1;
            jug1Per = jug1Per + 1;
            var chica = document.getElementById("ganadasChica");
            chica.innerHTML = jug2;
            var chico = document.getElementById("derrotaChico");
            chico.innerHTML = jug1Per;


        }
    }
}
function validarculomna() {
    for (var i = 0; i < 3; i++) {
        if (tablero[0][i] == 1 && tablero[1][i] == 1 && tablero[2][i] == 1) {

            var div = document.getElementById("panel");
            div.innerHTML = "Ha ganado X";
            document.getElementById("cuentaAtras").setAttribute("hidden", "hidden");
            cambiarChicoFeliz();
            if (modosJu == 1) {
                cambiarChicaTriste();
            }
            salir = true;
            jug1 = jug1 + 1;
            jug2Per = jug2Per + 1;
            var chico = document.getElementById("ganadasChico");
            chico.innerHTML = jug1;
            var chica = document.getElementById("derrotaChica");
            chica.innerHTML = jug2Per;


        }
        if (tablero[0][i] == 2 && tablero[1][i] == 2 && tablero[2][i] == 2) {

            var div = document.getElementById("panel");
            div.innerHTML = "Ha ganado O";
            document.getElementById("cuentaAtras").setAttribute("hidden", "hidden");
            cambiarChicoTriste();
            if (modosJu == 1) {
                cambiarChicaFeliz();
            }
            salir = true;
            jug2 = jug2 + 1;
            jug1Per = jug1Per + 1;
            var chica = document.getElementById("ganadasChica");
            chica.innerHTML = jug2;
            var chico = document.getElementById("derrotaChico");
            chico.innerHTML = jug1Per;



        }
    }
}

function validardiagonal() {
    for (var i = 0; i < 1; i++) {
        if (tablero[0][i] == 1 && tablero[1][i + 1] == 1 && tablero[2][i + 2] == 1 || tablero[0][i + 2] == 1 && tablero[1][i + 1] == 1 && tablero[2][i] == 1) {

            var div = document.getElementById("panel");
            div.innerHTML = "Ha ganado X";
            document.getElementById("cuentaAtras").setAttribute("hidden", "hidden");
            cambiarChicoFeliz();
            if (modosJu == 1) {
                cambiarChicaTriste();
            }
            salir = true;
            jug1 = jug1 + 1;
            jug2Per = jug2Per + 1;
            var chico = document.getElementById("ganadasChico");
            chico.innerHTML = jug1;
            var chica = document.getElementById("derrotaChica");
            chica.innerHTML = jug2Per;


        }
        if (tablero[0][i] == 2 && tablero[1][i + 1] == 2 && tablero[2][i + 2] == 2 || tablero[0][i + 2] == 2 && tablero[1][i + 1] == 2 && tablero[2][i] == 2) {

            var div = document.getElementById("panel");
            div.innerHTML = "Ha ganado O";
            document.getElementById("cuentaAtras").setAttribute("hidden", "hidden");
            cambiarChicoTriste();

            if (modosJu == 1) {

                cambiarChicaFeliz();
            }
            salir = true;
            jug2 = jug2 + 1;
            jug1Per = jug1Per + 1;
            var chica = document.getElementById("ganadasChica");
            chica.innerHTML = jug2;
            var chico = document.getElementById("derrotaChico");
            chico.innerHTML = jug1Per;


        }
    }
}

/*--------------------------------------------------------------------------------------------*/

/* Esta funcion crea los divs correspondientes al tablero ademas de hacer un par de cosas mas  */

function empezarPartida(num) {

    document.getElementById("chico").removeAttribute("hidden", "false");

    if (modosJu == 2 || modosJu == 3) {

        document.getElementById("chica").setAttribute("hidden", "hidden");

        document.getElementById("maquina").removeAttribute("hidden", "hidden");

    } else {

        document.getElementById("chica").removeAttribute("hidden", "hidden");

    }
    if (modosJu == 3) {

        var div = document.getElementById("panel");

        div.innerHTML = "JUEGO EN MANTENIMIENTO";

        div.className = "parpadea text";

        var cuenta = document.getElementById("cuentaAtras");

        cuenta.remove();
    }
    if(modosJu==2){

        document.getElementById("cuentaAtras").removeAttribute("hidden", "hidden");

    }

    document.getElementById("tablaChico").removeAttribute("hidden", "false");

    document.getElementById("tablaChica").removeAttribute("hidden", "false");

    if (num == 6) {

        fichas = 3;

    } else if (num == 9) {

        fichas = 5;

    }

    var j = 0;
    var i = 0;

    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++) {

            var div = document.createElement("div");

            div.innerHTML = "";

            div.id = ("cont" + i + j);

            div.classList.add("contenedor");

            div.setAttribute("onclick", "modosDeJuego(" + i + "," + j + ")");

            var tablero = document.getElementById("tablero");

            tablero.appendChild(div);

            var botn = document.getElementById("btnEm");

        }

    jugando();

    updateClock();

}

/* Esta funcion es para ocultar el menu */

function jugando() {

    document.getElementById("volverJugar").removeAttribute("hidden", "hidden");

    document.getElementById("tablero").removeAttribute("hidden", "hidden");

    document.getElementById("opcion2").setAttribute("hidden", "hidden");

}

/* Los modos de juego */

function jugadores(num) {

    if (num == 1) {

        document.getElementById("opcion2").removeAttribute("hidden", "hidden");

        document.getElementById("cuentaAtras").removeAttribute("hidden", "hidden");

        document.getElementById("opcion1").setAttribute("hidden", "hidden");
        modosJu = 1;

    } else if (num == 2) {

        document.getElementById("opcion2").removeAttribute("hidden", "hidden");

        document.getElementById("opcion1").setAttribute("hidden", "hidden");

        modosJu = 2;


    } else if (num == 3) {

        document.getElementById("opcion2").removeAttribute("hidden", "hidden");

        document.getElementById("opcion1").setAttribute("hidden", "hidden");

        modosJu = 3;

    }

}

var tiempoTotal = 30;

/* El temporizador */

console.log("Jugador 1 :"+jug1);

function updateClock() {

    document.getElementById('cuentaAtras').innerHTML = "El tiempo que tienes es : " + tiempoTotal;
    if (tiempoTotal == 0) {
        var div = document.getElementById("panel");

        if(ConT%2==0){

            div.innerHTML="Ha perdido la X, se te a acabado el tiempo";

            
            var chica=document.getElementById("ganadasChica");

            jug2++;

            chica.innerHTML=jug2;

            var chico=document.getElementById("derrotaChico");

            jug1Per++;

            chico.innerHTML=jug1Per;

            console.log(jug1Per,jug2);


        }else{


            div.innerHTML="Ha perdido la O , se te a acabado el tiempo";

            jug1++;
            
            var chico=document.getElementById("ganadasChico");

            chico.innerHTML=jug1;
            
            jug2Per++;

            var chica=document.getElementById("derrotaChica");

            chica.innerHTML=jug2Per;

        }

        salir = true;
    } else {
        tiempoTotal -= 1;
        setTimeout("updateClock()", 1000);
    }
}

/* Estas funciones cambian de animo a los avatares */

function cambiarChicoFeliz() {

    document.getElementById("chicofeliz").removeAttribute("hidden", "hidden");

    document.getElementById("chico").setAttribute("hidden", "hidden");

}
function cambiarChicoNormal() {

    document.getElementById("chico").removeAttribute("hidden", "hidden");

    document.getElementById("chicotriste").setAttribute("hidden", "hidden");

    document.getElementById("chicofeliz").setAttribute("hidden", "hidden");


}
function cambiarChicoTriste() {

    document.getElementById("chicotriste").removeAttribute("hidden", "hidden");

    document.getElementById("chico").setAttribute("hidden", "hidden");


}
function cambiarChicaFeliz() {

    document.getElementById("chicafeliz").removeAttribute("hidden", "hidden");

    document.getElementById("chica").setAttribute("hidden", "hidden");

}
function cambiarChicaNormal() {

    document.getElementById("chica").removeAttribute("hidden", "hidden");

    document.getElementById("chicatriste").setAttribute("hidden", "hidden");

    document.getElementById("chicafeliz").setAttribute("hidden", "hidden");

}
function cambiarChicaTriste() {

    document.getElementById("chicatriste").removeAttribute("hidden", "hidden");

    document.getElementById("chica").setAttribute("hidden", "hidden");

}

/*----------------------------------------------------------------------------------------------------*/
