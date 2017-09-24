pragma solidity ^0.4.11;

contract VotosToken{
    mapping(address => uint256) public votosPer;
    mapping(address => uint256) public opciones;
    mapping(address => address[]) public misVotos;
    
    function Balance(address votante) public constant returns (uint256){
        require(votosPer[votante] > 0);
        return votosPer[votante];
    }
    
    function Transferir(address votante,uint256 votos) public{
        require(votos > 0);
        votosPer[votante] += votos;
    }
    
    function TransferirDe(address votante, address opcion, uint256 votos) public{
        require(votos == 1);
        require(votosPer[votante] > 0 && opciones[votante] == 0);
        require(votosPer[opcion]==0);
        
        votosPer[votante] -= votos;
        opciones[opcion] += votos;
    }
}