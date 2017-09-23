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

contract TokenDeVot is owned{
    address dir;
    
    function TokenDeVot(address _dir){
        dir = _dir;
    }
    
    event transferToken(address _form, address _to);
    
    function trasferForm(Votador _from, Opcion _to){
        _to.addToken(_from.getToken());
    }
    
    function getDir() public returns (address){
        return dir;
    }
}

contract manejadorDeTokens is owned{
    TokenDeVot[] public tokensDeVot;
    
    function addToken(TokenDeVot t) public{
        tokensDeVot[tokensDeVot.length++] = t;
    }
    
    function getToken() public returns (TokenDeVot) {
        return tokensDeVot[tokensDeVot.length-1];
    }
    
    function removeToken() public{
        delete tokensDeVot[tokensDeVot.length-1]; 
    }
}

contract Votador is manejadorDeTokens{
}

contract Opcion is manejadorDeTokens{
    bytes32 nombre;
    mapping(address => Votador) seguidores;
    
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
         votanteId[_nuevoVotante] = votante.length;
         id = votante.length++;
      }
      votante[id] = new Votante(_nuevoVotante, _correoVotante);
      votante[id].transferOwnership(_nuevoVotante);
    }

    function delVotante (address _victima) onlyOwner{
        require(votanteId[_victima] != 0);
        for(uint i = memberId[_target]; i < members.length-1; ++i){
          members[i] = members[i+1];
        }
        delete members[members.length-1];
        members.length--;
    }

}
