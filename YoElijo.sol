pragma solidity ^0.4.11;

contract owned {
      address public owner;

      function owned() {
          owner = msg.sender;
      }

      modifier onlyOwner {
          require (msg.sender == owner);
          _;
      }

      function transferOwnership(address newOwner) public onlyOwner {
          owner = newOwner;
      }
}

contract TokenDeVot is owned{
    address dir;

    function TokenDeVot(address _dir){
        dir = _dir;
    }

    event transferToken(address _form, address _to);

    function trasferForm (Votante _from, Opcion _to) public{
        _to.addToken(_from.getToken());
    }

    function getDir() public onlyOwner returns (address) {
        return dir;
    }
}

contract manejadorDeTokens is owned{
    TokenDeVot[] public tokensDeVot;

    function addToken(TokenDeVot t) public{
        tokensDeVot[tokensDeVot.length++] = t;
    }

    function getToken() public onlyOwner returns (TokenDeVot) {
        return tokensDeVot[tokensDeVot.length-1];
    }

    function removeToken() public onlyOwner{
        delete tokensDeVot[tokensDeVot.length-1];
    }
}

contract Votante is manejadorDeTokens{
    bytes32 correoElectronico;
    address direccionEth;
    mapping (bytes32 => address) dirToken;

    function Votante(address _nuevoVotante, bytes32 _correoVotante){
        direccionEth = _nuevoVotante;
        correoElectronico = _correoVotante;
    }
}

contract Opcion is manejadorDeTokens{
    bytes32 nombre;
    mapping(address => Votante) seguidores;
}

contract ProcesoVotacion is owned{

    bytes32 nombreProceso;
    uint constant PAPELETA = 0;
    uint constant REFERENDUM = 1;
    uint constant OPCION_MULTIPLE = 2;
    uint tipoVotacion;
    bool votoPublico = false;
    bool avances = false;
    Votante[] public votantes;
    mapping (address => uint) votantesId;

    function addVotante (address _nuevoVotante, bytes32 _correoVotante) public onlyOwner{
      uint id = votantesId[_nuevoVotante];
      if(id == 0){
         votantesId[_nuevoVotante] = votantes.length;
         id = votantes.length++;
      }
      votantes[id] = new Votante(_nuevoVotante, _correoVotante);
      votantes[id].transferOwnership(_nuevoVotante);
    }

    function delVotante (address _victima) public onlyOwner{
        require(votantesId[_victima] != 0);
        for(uint i = votantesId[_victima]; i < votantes.length-1; ++i){
          votantes[i] = votantes[i+1];
        }
        delete votantes[votantes.length-1];
        votantes.length--;
    }

    function ProcesoVotacion(bytes32 _nombreProceso){
      nombreProceso = _nombreProceso;
    }

    function setVotoPublico(bool _votoPublico){
      votoPublico = _votoPublico
    }

    function setAvances(bool _avances){
      avances = _avances;
    }

    function setTipoVotacion(uint _tipoVotacion){
      tipoVotacion = _tipoVotacion;
    }
}
