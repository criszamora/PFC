function peticion(accion, funcionrespuesta, opciones){
	var url = "http://pfc-czamora.libresoft.es:8000/";
	var formato = "json";
	var ruta = "ajax";
	var datos = {};
	var metodo = jQuery.get;
	
	if (opciones == undefined){
		opciones = {};
	}
	
	if ("tipo" in opciones){
			if (opciones.tipo == "text"){
				formato = "text";
				ruta = "input";
			}
		
	}
	if ("datos" in opciones){
		datos = opciones.datos;
	}
	
	if ("metodo" in opciones){
		if (opciones.metodo == "post"){
			metodo = jQuery.post;
		}
	}
	
	metodo(url+ruta+"/"+accion, datos, funcionrespuesta, formato);
}

function pedirtoken(funcionrespuesta){
	peticion("token", funcionrespuesta, {tipo:"text"});
}

function parametros(){
	var search = document.location.search;
	var devolucion = {};
	if (search.length > 0){
		var parametros;
		search = search.substring(1);
		parametros = search.split("&");
		for (var i = 0; i < parametros.length; i++){
			var parametro = parametros[i].split("=");
			devolucion[parametro[0]] = parametro[1];
		}
	}
	return devolucion;
	
}

function transaccion(ttx){
	var database = window.openDatabase("ivApp", "1.0", "ivApp", 1024*1024);
	database.transaction(ttx);

}

function creartablas(){
	transaccion(function(tx){
		tx.executeSql("create table if not exists prorrata(id integer Primary Key autoincrement, "+
				"usuario text, anio integer, valor integer)")
		tx.executeSql("create table if not exists liquidacion(id integer Primary Key autoincrement, "+
				"usuario text, anio integer, trimestre integer, gasto real, ingreso real)")
	});
	
}
