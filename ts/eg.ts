import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from "@polkadot/extension-dapp";
import {} from "grid3_client/dist/es6";
import {} from "ts-rmb-http-client/dist/es6";

async function main() {
  const allInjected = await web3Enable("my cool dapp");
  const allAccounts = await web3Accounts();
  console.log({ allInjected, allAccounts });

  //   const SENDER = "5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE";
  //   const injector = await web3FromAddress(SENDER);
}

window.onload = main;
