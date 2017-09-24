var nombreDelEvento; //String
var fechaInicio; //Int??
var fechaConclusion; //Int??
var tipoDeVoto; //Bool>>
var avances; //Bool??
var valueToSave; //Bool??

function crearEvento(){
	nombreDelEvento = document.getElementById("NombreEvento");
	var primerFecha = document.getElementById("Inicio").value;
	var segundaFecha = document.getElementById("Conclusion").value;
	
	console.log(primerFecha);
	console.log(segundaFecha);
	
	if(nombreDelEvento == undefined || primerFecha == undefined || segundaFecha == undefined){
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
	
	console.log(tipoDeVoto + " " + avances + " " + valueToSave);
}

function cumpleReq(pFecha,sFecha){
	var cumple = true;
	
	for(var i=0;i < pFecha.length-1 || !cumple;++i){
		if(parseInt(pFecha[i]) > parseInt(sFecha[i])){
			cumple = false;
		}
	}
	
	if(parseInt(pFecha[pFecha.length-1]) >= parseInt(sFecha[sFecha.length-1]) || !cumple){
		alert("La hora inicio debe ser menor a la hora de finalizacion");
	}
	
	
	
	var currentDate = new Date();
	console.log(currentDate.getMonth());
	if(parseInt(pFecha[0]) <= currentDate.getYear()+1900|| parseInt(pFecha[1]) <= currentDate.getMonth() || parseInt(pFecha[2]) <= currentDate.getDate() || parseInt(pFecha[3]) <= currentDate.getHours() || parseInt(pFecha[4]) <= currentDate.getMinutes()){
		alert("La hora deinicio debe ser mayor a la fecha actual");
		cumple = false;
	}
	
	return cumple;
}