var nombreDelEvento; //String
var fechaInicio; //Int??
var fechaConclusion; //Int??
var tipoDeVoto; //Bool>>
var avances; //Bool??
var valueToSave; //Bool??
var listaVotantes; // Vector con los votantes

function crearEvento(){
	nombreDelEvento = document.getElementById("NombreEvento");
	var primerFecha = document.getElementById("Inicio").value;
	var segundaFecha = document.getElementById("Conclusion").value;
	listaVotantes = listaVotantes.split("-");
	
	if(nombreDelEvento == undefined || primerFecha == "" || segundaFecha == ""){
		alert("Falta rellenar espacios");
		return;
	}
	
	primerFecha = primerFecha.split("-");
	segundaFecha = segundaFecha.split("-");
	
	if(!cumpleReq(primerFecha,segundaFecha)){
		return;
	}
	
	fechaInicio = new Date(primerFecha[0] + "," + primerFecha[1] + "," + primerFecha[2] + "," + primerFecha[3] + "," + primerFecha[4])
	fechaConclusion = new Date(segundaFecha[0] + "," + segundaFecha[1] + "," + segundaFecha[2] + "," + segundaFecha[3] + "," + segundaFecha[4]);
	
	tipoDeVoto = $("input[name=optionsRadios1]:checked").val();
	avances = $("input[name=optionsRadios2]:checked").val();
	valueToSave = $("input[name=optionsRadios3]:checked").val();
}

function cumpleReq(pFecha,sFecha){
	var cumple = true;
	
	for(var i=0;i < pFecha.length-1 || !cumple;++i){
		if(parseInt(pFecha[i]) > parseInt(sFecha[i])){
			cumple = false;
		}
	}
	
	if(parseInt(pFecha[pFecha.length-1]) >= parseInt(sFecha[sFecha.length-1]) || !cumple){
		cumple = false;
		alert("La hora inicio debe ser menor a la hora de finalizacion");
	}
	
	
	
	var currentDate = new Date();
	if(cumple && (parseInt(pFecha[0]) <= currentDate.getYear()+1900|| parseInt(pFecha[1]) <= currentDate.getMonth() || parseInt(pFecha[2]) <= currentDate.getDate() || parseInt(pFecha[3]) <= currentDate.getHours() || parseInt(pFecha[4]) <= currentDate.getMinutes())){
		alert("La hora deinicio debe ser mayor a la fecha actual");
		cumple = false;
	}
	
	return cumple;
}

function resiveVotantes(votantes){
	listaVotantes+= votantes + "-";
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}