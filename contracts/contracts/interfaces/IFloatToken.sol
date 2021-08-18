pragma solidity 0.8.3;

interface IFloatToken {
  function mint(address to, uint256 amount) external;

  function transfer(address, uint256) external returns (bool);
}
