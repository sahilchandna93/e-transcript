// SPDX-License-Identifier: MIT
pragma solidity 0.4.24;

contract SimpleStorage {
  string ipfsHash;

  function set(string _hash) public {
    ipfsHash  = _hash;
  }

  function get() public view returns (string) {
    return ipfsHash;
  }
}
