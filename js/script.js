// Al cargar la página - uso 'JQuery' casi en la totalidad del código...
// Author: Andrés Chirino   05/2020

$(document).ready(function() {
    var aleatorio;
    var mano_jugador;
    var mano_compu;
    var pts_j=0, pts_c=0;
    var nom_jugador;
    var rounds=0;
    var eleccion;

    //Validando el ingreso al juego
    $("#validar").on("click", function() {
        validarEntrada();
    });

    $("#nom_reg").keydown(function(event) {
        if (event.which==13) {
            validarEntrada();
        }
    })

    function validarEntrada() {
        var nombre = $("#nom_reg").val();
        if (nombre == "") {
            $("input[type='text']").css("border","2px solid red");
        } else {
            nom_jugador = $("#nom_reg").val();
            $("#nom_j").text(nom_jugador);
            $("#pts_jug").text(nom_jugador);
            $("#pts_jug").text(nom_jugador + " = " + pts_j + " pts");
            $("#pts_comp").text("Compu = " + pts_c + " pts");
            $("#registro").remove();
            $("#juego").css("visibility","visible");
            $("#juego").hide();
            $("#juego").fadeIn(1000);
        }
    }

    iniciar();

    function iniciar() {
        $("#jugador").attr("src","img/fondo.png");
        $("#compu").attr("src","img/fondo.png");
        $("#fallo").text("");
    }

    $("#boton").attr("disabled","disabled");

    // Al presionar el botón jugar
    $("#boton").click(function() {
        aleatorio = Math.floor(Math.random() * (4-1)) + 1;

        iniciar();
        // mostrar resultados

        if (aleatorio==1) {
            $("#compu").attr("src","img/tijera.png");
        } else if (aleatorio==2) {
            $("#compu").attr("src","img/papel.png");
        } else {
            $("#compu").attr("src","img/piedra.png");
        }

        if (eleccion=="papel") {
             $("#jugador").attr("src","img/papel.png");
        } else if (eleccion=="piedra") {
            $("#jugador").attr("src","img/piedra.png");
        } else {
            $("#jugador").attr("src","img/tijera.png");
        }

        setTimeout(round,3000);

        mano_jugador = $("#jugador").attr("src");
        logicaJuego(mano_jugador);
        $("#boton").attr("disabled","disabled");

        
    });

    function logicaJuego(pManoJug) {
        
        mano_compu = $("#compu").attr("src");

        if (mano_compu==pManoJug) {
            $("#fallo").text("Empate!.");
            fadeIn();
           
            $("#pts_jug").text(nom_jugador+" = "+(pts_j+=50)+" pts");
            $("#pts_comp").text("Compu = "+(pts_c+=50)+" pts");
        } else {
            if ((mano_compu=="img/piedra.png") && (pManoJug=="img/papel.png")) {
                $("#fallo").text("Tú ganas!.");
                fadeIn();
                $("#pts_jug").text(nom_jugador+" = "+(pts_j+=100)+" pts");
            }
            else if ((mano_compu=="img/piedra.png") && (pManoJug=="img/tijera.png")) {
                $("#fallo").text("Tú pierdes!.");
                fadeIn();
                $("#pts_comp").text("Compu = "+(pts_c+=100)+" pts");
            }
            else if ((mano_compu=="img/papel.png") && (pManoJug=="img/piedra.png")) {
                $("#fallo").text("Tú pierdes!.");
                fadeIn();
                $("#pts_comp").text("Compu = "+(pts_c+=100)+" pts");
            }
            else if ((mano_compu=="img/papel.png") && (pManoJug=="img/tijera.png")) {
                $("#fallo").text("Tú ganas!.");
                fadeIn();
                $("#pts_jug").text(nom_jugador+" = "+(pts_j+=100)+" pts");
            }
            else if ((mano_compu=="img/tijera.png") && (pManoJug=="img/piedra.png")) {
                $("#fallo").text("Tú ganas!.");
                fadeIn();
                $("#pts_jug").text(nom_jugador+" = "+(pts_j+=100)+" pts");
            }
            else if ((mano_compu=="img/tijera.png") && (pManoJug=="img/papel.png")) {
                $("#fallo").text("Tú pierdes!.");
                fadeIn();
                $("#pts_comp").text("Compu = "+(pts_c+=100)+" pts");
            }
        }
    }

    function fadeIn() {
        $("#fallo").hide();
        $("#fallo").fadeIn(2000); 
    }

    function setBackColMin() {
        $("#pap").css("background-color","rgb(230, 164, 79)");
        $("#pie").css("background-color","rgb(230, 164, 79)");
        $("#tij").css("background-color","rgb(230, 164, 79)");
    }

    // Asigna color de fondo e img a cada miniatura
    $("#pap").click(function() {
        eleccion="papel";
        $("#pap").css("background-color","rgb(255, 187, 84)");
        $("#pie").css("background-color","rgb(230, 164, 79)");
        $("#tij").css("background-color","rgb(230, 164, 79)");
        $("#boton").removeAttr("disabled");
    });

    $("#pie").click(function() {
        eleccion="piedra";
        $("#pie").css("background-color","rgb(255, 187, 84)");
        $("#pap").css("background-color","rgb(230, 164, 79)");
        $("#tij").css("background-color","rgb(230, 164, 79)");
        $("#boton").removeAttr("disabled");
    });

    $("#tij").click(function() {
        eleccion="tijera";
        $("#tij").css("background-color","rgb(255, 187, 84)");
        $("#pap").css("background-color","rgb(230, 164, 79)");
        $("#pie").css("background-color","rgb(230, 164, 79)");
        $("#boton").removeAttr("disabled");
    });  
    
    // Muestra en el visor el round actual
    function limpiarVisor() {
        $("#fallo").text("");
    }

    function round() {
        rounds++;
        $("#fallo").text("Round "+rounds);
        setTimeout(limpiarVisor,2000);
        setTimeout(iniciar,2000);

        if (rounds>=3) {
            setTimeout(function() {
                $("#boton").remove();
                $("#op").remove();
                $("#fallo").text("¡Final del encuentro!.");
                $("#panel").css("visibility","visible");
                $("#panel").hide();
                $("#panel").fadeIn(1000);
                var result=$("#f").text();

                if (pts_j > pts_c) {
                    result = "GANADOR => ¡" + nom_jugador + "!.";
                } else if (pts_j < pts_c) {
                    result = "GANADOR => ¡Compu!. ";
                } else {
                    result = "¡EMPATE!.";
                }

                //var marco = $("<div></div>").attr("id","marco"); 
             /* var puntos = $("<h2></h2>").attr("id","pts").text("Pts.")
                var jugador = $("<h3></h3>").attr("id","ju").text(nom_jugador + " = " + pts_j);
                var pc = $("<h3></h3>").attr("id","pc").text("Compu" + " = " + pts_c);
                var fallo = $("<h2></h2>").attr("id","f").text(f);
                var boton = $("<button></button>").attr("id","btn").text("Volver").on("click", function() {
                    location.reload();
                }); */

                $("#pts_jug").text(nom_jugador+" = "+ pts_j + " pts");
                $("#pts_comp").text("Compu = "+ pts_c + " pts");
                $("#f").text(result);
                // botón volver
                $("#btn").on("click",function() {
                    location.reload();
                })

                //$("body").append(puntos,jugador,pc,fallo,boton);
/*
                $("#pts").css({"width":"50px", "margin":"auto", "padding-bottom":"20px"});
                $("#ju").css({"width":"130px", "margin":"auto"});
                $("#pc").css({"width":"130px", "margin":"auto"});

                $("#f").css({
                    "width":"550px",
                    "padding-top":"25px",
                    "padding-bottom":"25px",
                    "margin":"auto",
                    "position":"relative",
                    "color":"rgb(95, 95, 231)"
                });

                $("#btn").css({
                    "width":"550px",
                    "padding":"15px",
                    "background-color":"#222222",
                    "font-size":"14pt",
                    "color":"white",
                    "margin-left":"300px",
                    "position":"relative",
                });                                         */
            },2000)
        }
    }
});