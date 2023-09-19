import {
  ConnectWallet,
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [totalClaimed, setTotalClaimed] = useState<string | null>(null);
  const [totalEvolved, setTotalEvolved] = useState<string | null>(null);
  const { contract } = useContract(
    "0x843d7f282b693783f45Cfd3aC32ADDBF386Cc2F7"
  );

  const address = useAddress();

  const { data: nfts } = useOwnedNFTs(contract, address);
  const fetchTotalSupply = (contract: any) => {
    contract
      .call("totalSupply", [0]) // or just contract.call("totalSupply") if no arguments are needed
      .then((result: any) => {
        setTotalClaimed(result.toString()); // assuming the result is a BigNumber, convert it to a string
      })
      .catch((error: Error) => {
        console.error("Error fetching total supply:", error);
      });
  };
  const fetchTotalEvolved = (contract: any) => {
    contract
      .call("totalSupply", [1]) // or just contract.call("totalSupply") if no arguments are needed
      .then((result: any) => {
        setTotalEvolved(result.toString()); // assuming the result is a BigNumber, convert it to a string
      })
      .catch((error: Error) => {
        console.error("Error fetching total supply:", error);
      });
  };

  return (
    <div className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
      <div className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto">
        {" "}
        {/* This makes the parent div fill the entire height and sets up centering for the button */}
        <ConnectWallet
          className="absolute top-0 right-0 m-4" // This positions the ConnectWallet button in the top right corner with a little margin
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
        <hr />
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            <p>Number of claimed NFTs: {nfts?.length || 0}</p>
            {nfts?.map((nft) => (
              <div key={nft.metadata.id.toString()}>
                <div className="p-8 w-full flex items-start gap-x-8 rounded-lg">
                  <ThirdwebNftMedia metadata={nft.metadata} />
                </div>
                <hr />
                <div className="p-8 w-full flex items-start gap-x-8 rounded-lg">
                  Name of NFTs : {nft.metadata.name}
                </div>
                <div className="p-8 w-full flex items-start gap-x-8 rounded-lg">
                  Id of NFTs : {nft.metadata.id}
                </div>
              </div>
            ))}
          </div>
          <hr />
          <Web3Button
            contractAddress={"0x843d7f282b693783f45Cfd3aC32ADDBF386Cc2F7"}
            action={(contract) => contract.erc1155.claim(0, 1)}
          >
            Claim a NFT
          </Web3Button>
          <hr />
          <Web3Button
            contractAddress={"0x843d7f282b693783f45Cfd3aC32ADDBF386Cc2F7"}
            action={fetchTotalSupply}
          >
            Fetch Total Claimed NFTs
          </Web3Button>
          {totalClaimed && <p>Total Rabit NFTs: {totalClaimed}</p>}
          <hr />
          <Web3Button
            contractAddress={"0x843d7f282b693783f45Cfd3aC32ADDBF386Cc2F7"}
            action={(contract) => contract.call("evolve")}
          >
            Evolve Rabbit NFT to Unicorn
          </Web3Button>
          <hr />
          <Web3Button
            contractAddress={"0x843d7f282b693783f45Cfd3aC32ADDBF386Cc2F7"}
            action={fetchTotalEvolved}
          >
            Fetch Total Evolved NFTs
          </Web3Button>
          <hr/>
          {totalEvolved && <p>Total Rabit NFTs: {totalEvolved}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
