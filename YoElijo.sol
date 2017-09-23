pragma solidity ^0.4.11

contract owned {
      address public owner;

      function owned() {
          owner = msg.sender;
      }

      modifier onlyOwner {
          require (msg.sender == owner);
          _;
      }

      function transferOwnership(address newOwner) onlyOwner {
          owner = newOwner;
      }
}

contract ProcesoVotacion is owned{

    bytes32 nombreProceso;
    uint constant PAPELETA = 0;
    uint constant REFERENDUM = 1;
    uint constant OPCION_MULTIPLE = 2;
    bool votoPublico = false;
    bool avances = false;
    Votante[] public votantes;
    mapping (address => uint) votantesId;

    contract votante is owned{
      bytes32 correoElectronico;
      address direccionEth;
      mapping (bytes32 => address) dirToken;

      function votante(address _nuevoVotante, bytes32 _correoVotante){
        direccionEth = _nuevoVotante;
        correoElectronico = _correoVotante;
      }
    }

    function addVotante (address _nuevoVotante, bytes32 _correoVotante) onlyOwner{
      uint id = votanteId[_nuevoVotante];
      if(id == 0){
         votanteId[_nuevoVotante] = votantes.length;
         id = votantes.length++;
      }
      votantes[id] = new Votante(_nuevoVotante, _correoVotante);
      votantes[id].transferOwnership(_nuevoVotante);
    }

    function delVotante (address _victima) onlyOwner{
        require(votanteId[_victima] != 0);
        for(uint i = votanteId[_target]; i < votantes.length-1; ++i){
          votantes[i] = votantes[i+1];
        }
        delete votantes[votantes.length-1];
        votantes.length--;
    }

}
