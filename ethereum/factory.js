import web3 from "./web3";
import {CampaignFactory} from "./build/CampaignFactory.json" assert {type: "json"};
import dotenv from "dotenv";
dotenv.config();
const factory = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
    process.env.CONTRACT_DEPLOYED_ADDRESS
);
export default factory;