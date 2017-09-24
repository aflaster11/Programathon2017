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
    
    function referendum(address[] votantes) public{
        uint votos = votantes.length;
        for(uint i = 0; i < votantes.length; ++i){
            votosToken.Transferir(votantes[i],1);
            --votos;
        }
    }
    
    function papeleta(address[] votantes) public{
        uint votos = votantes.length;
        for(uint i = 0; i < votantes.length; ++i){
            votosToken.Transferir(votantes[i],1);
            --votos;
        }
    }
    
    function opcionMultiple(address[] votantes, uint max) public{
        uint votos = votantes.length * max;
        for(uint i = 0; i < votantes.length; ++i){
            votosToken.Transferir(votantes[i],max);
            votos -= max;
        }
    }
}
