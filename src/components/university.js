import React, { Component } from "react"
import ipfs from "../ipfs"
import getWeb3 from "../utils/getWeb3"
import Student from "./student"
import SimpleStorageContract from "../build/SimpleStorage.json";

class University extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ipfsHash: "",
            web3: null,
            buffer: null,
            imgHash: "",
            account: null,
            blockHash: ''
        }
        this.captureFile = this.captureFile.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
                console.log("web3", results);
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
                // debug
                this.simpleStorageInstance = instance
                this.setState({ account: accounts[0] })
                return this.simpleStorageInstance.get({ from: accounts[0] })
            }).then((ipfsHash) => {
                console.log("hash", ipfsHash)
                // debugger
                return this.setState({ ipfsHash })
            }).catch(err => {

                console.error("error", err)
            });
        })
    }

    captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
            console.log('buffer', this.state.buffer)
        }
    }

    onSubmit(event) {
        console.log("event", event);
        event.preventDefault()
        console.log("ipfs", ipfs)
        ipfs.files.add(this.state.buffer, (error, result) => {
            console.log("inside ipfs", result, "err", error);
            if (error) {
                console.error(error)
                return
            }

            this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then(() => {
                return this.setState({
                    ipfsHash: result[0].hash
                })
            })
        })
    }

    render() {
        const mystyle1 = {
            marginRight: "50px",
            marginBottom: "20px",
        }
        const mystyle = {
            color: "black",
            backgroundColor: "#6793A3",
            fontFamily: "Arial",
            fontSize: "20px",
            padding: "10px"
        };
        return (
            <main>
                <div>
                    <div style={mystyle}>
                        <h4>Upload Transcript Here</h4>
                        <form onSubmit={this.onSubmit} >
                            <input style={mystyle1} type="file" accept="image/*" onChange={this.captureFile} />
                            <input style={mystyle1} type="submit" />
                        </form>
                    </div>
                    <Student imgHash={this.state.ipfsHash} />

                </div>
            </main>
        );
    }
}

export default University
