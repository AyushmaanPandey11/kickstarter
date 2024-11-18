import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json" assert { type: "json" };

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.REACT_APP_CONTRACT_FACTORY_DEPLOYED_ADDRESS
);
export default factory;
