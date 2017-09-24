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
	
	if(nombreDelEvento == undefined){
		alert("Falta Nombre");
		return;
	}
	
	if(primerFecha == undefined){
		alert("Falta Inicio");
		return;
	}
	
	if(segundaFecha == undefined){
		alert("Falta Conlcusion");
		return;
	}
	
	primerFecha = primerFecha.split("-");
	segundaFecha = segundaFecha.split("-");
	
	fechaInicio = new Date(primerFecha[0] + "," + primerFecha[1] + "," + primerFecha[2] + "," + primerFecha[3] + "," + primerFecha[4])
	fechaConclusion = new Date(segundaFecha[0] + "," + segundaFecha[1] + "," + segundaFecha[2] + "," + segundaFecha[3] + "," + segundaFecha[4]);
	
	for(var i=0;i < primerFecha.length-1;++i){
		if(parseInt(primerFecha[i]) > parseInt(segundaFecha[i])){
			alert("La fecha incio es mayor a la fecha conclusion");
			return;
		}
	}
	
	if(parseInt(primerFecha[primerFecha.length-1]) == parseInt(segundaFecha[segundaFecha.length-1])){
		alert("La fecha incio es mayor a la fecha conclusion");
		return;
	}
	
	tipoDeVoto = $("input[name=optionsRadios1]:checked").val();
	avances = $("input[name=optionsRadios2]:checked").val();
	valueToSave = $("input[name=optionsRadios3]:checked").val();
	
	console.log(tipoDeVoto + " " + avances + " " + valueToSave);
}