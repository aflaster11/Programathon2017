var nombreDelEvento; //String
var fechaInicio; //Int??
var fechaConclusion; //Int??
var tipoDeVoto; //Bool>>
var avances; //Bool??
var valueToSave; //Bool??

function crearEvento(){
	nombreDelEvento = document.getElementById("inputDanger1");
	fechaInicio = document.getElementById("inputEmail4");
	fechaConclusion = document.getElementById("inputPassword4");
	
	if(nombreDelEvento == undefined || fechaInicio == undefined || fechaConclusion == undefined){
		alert("Todos los espacios deben estar llenos");
		return;
	}
	
	tipoDeVoto = $("input[name=optionsRadios1]:checked").val();
	avances = $("input[name=optionsRadios2]:checked").val();
	valueToSave = $("input[name=optionsRadios3]:checked").val();
	
	console.log(tipoDeVoto + " " + avances + " " + valueToSave);
}