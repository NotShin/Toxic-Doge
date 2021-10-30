const addr = '0x7D31dcDca5F5b2B101EaEab5d921C1c36E8Ba0b3';
const abi = 
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_your_enemy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_your_ammo",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_toxic_message",
				"type": "bytes32"
			}
		],
		"name": "toxic",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

function mmconnect() {
	return Promise((resolve, reject) => {
		if (typeof window.ethereum === 'undefined') {
			return reject("No MetaMask");
		}
	
		if (window.web3) {
			window.ethereum.enable();
			return resolve("Connecting...");
		} else
			return reject("No MetaMask");
	});
}

function leaderboard() {
    con.methods.attack_count().call().then( (e,v)=>{console.log(e, v);})
}

function addmm() {
    mmconnect();

    try {
        window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: addr,
                    symbol: 'TOXICDOGE',
                    decimals: 18
                },
            },
        });
    } catch (error) {
        console.log(error);
    }

    window.web3Inst = new Web3(window.etherem);
    window.con = new web3Inst.eth.Contract(abi, addr);

    leaderboard();
}

function toxic_send() {
	mmconnect();
	// window.web3Inst = new Web3(window.etherem);
	window.web3Inst = new Web3(window.web3.currentProvider);
	window.con = new web3Inst.eth.Contract(abi, addr);
	console.log(window.web3Inst.defaultAccount);

	var enemy = document.getElementById('enemy-address').value;
	var ammo = document.getElementById('ammo-amount').value;
	var message = document.getElementById('toxic-message').value;
	var bmessage = window.web3Inst.utils.asciiToHex(message);

	try {
    	window.con.methods.toxic(enemy, ammo, bmessage).send().then((result) => {
			console.log(result);
		}).catch(function(error){
            console.log(error);
        });
	} catch (error) {
		console.log(error);
	}
}