import React, { Component } from "react";
import ipfs from "../ipfs"
import getWeb3 from "../utils/getWeb3"
import SimpleStorageContract from "../build/SimpleStorage.json";

class Student extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            ipfsHash: "",
            web3: null,
            buffer: null,
            imgHash: "",
            account: null,
            blockHash: ''
        }
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                console.log(results, "sahil")
                this.setState({
                    web3: results.web3
                })
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }
    instantiateContract() {
        const contract = require('truffle-contract')
        const simpleStorage = contract(SimpleStorageContract)
        console.log("get simple storage", SimpleStorageContract)
        simpleStorage.setProvider(this.state.web3.currentProvider)

        this.state.web3.eth.getAccounts((error, accounts) => {
            console.log("ac", accounts, "er", error);
            accounts[0] = "0x35Fc723439B272f4661a67ff6556c85BA6E9B8dB";
            simpleStorage.deployed().then((instance) => {
                console.log(instance, "sahil")
                // debugger

                this.simpleStorageInstance = instance
                this.setState({ account: accounts[0] })
                return this.simpleStorageInstance.get({ from: accounts[0] })
            }).then((ipfsHash) => {
                console.log("hash", ipfsHash)
                // debugger
                this.state.web3.eth.getBlock('latest', (error, block) => {
                    console.log("block", block)
                    return this.setState({
                        ipfsHash: ipfsHash,
                        blockHash: block.hash
                    })
                });
                // return this.setState({ ipfsHash })
            }).catch(err => console.error("error", err));
        })
    }

    render() {
        return (
            <div>
                <h4>Your can view the transcript below</h4>
                <h6>IPFS Certificate Hash: {this.state.ipfsHash}</h6>
                <h6>Block Hash: {this.state.blockHash}</h6>
                {this.props.imgHash ? <img src={`https://ipfs.io/ipfs/${this.props.imgHash}`}></img> :
                    <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}></img>}

            </div>
        )
    }
}

export default Student
