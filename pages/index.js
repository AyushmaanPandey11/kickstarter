import { useEffect, useState } from "react";
import factory from "../ethereum/factory.js";

const CampaignIndex = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(data);
    };

    fetchCampaigns();
    console.log(campaigns);
  }, []);
  return <div>Campaigns List!</div>;
};

export default CampaignIndex;
