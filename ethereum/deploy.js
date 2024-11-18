import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import compiledFactory from "./build/CampaignFactory.json" assert { type: "json" };
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../.env") });
const provider = new HDWalletProvider(
  process.env.REACT_APP_MNEUMONIC_PASSWORD,
  process.env.REACT_APP_TEST_NETWORK_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
