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
    Votante[] votantes;
    mapping (address => uint) votantesId;

}

struct votante{
  bytes32 correoElectronico;
  address direccionEth;
}
