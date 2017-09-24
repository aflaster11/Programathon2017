pragma solidity ^0.4.11;
import './VotosToken.sol';

contract owned{
    address owner;

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function owned() public{
        owner = msg.sender;
    }

    function transferOwnership(address _newOwner) public onlyOwner{
        owner = _newOwner;
    }
}

contract YoElijo is owned{
    VotosToken public votosToken = new VotosToken();
    mapping(address => bool) public yaVoto;

    function repartirTokens(address[] votantes, uint max) public{
        uint votos = votantes.length * max;
        for(uint i = 0; i < votantes.length; ++i){
            votosToken.Transferir(votantes[i],max);
            votos -= max;
        }
    }
}

modifier yaVoto(address _votante){
  require(yaVoto[_votante] == false);
  _;
}

function votar(address _votante, address[] _opcion) yaVoto{
  for(int i = 0; i < _opcion.length-1;++i){
    opciones[_opcion[i]]++;
  }
  yaVoto[_votante] = true;
}
