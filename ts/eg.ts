import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from "@polkadot/extension-dapp";
import {
  MachineModel,
  MachinesModel,
  GridClient,
  NetworkEnv,
  BackendStorageType,
  KeypairType,
  NetworkModel,
  DiskModel,
} from "grid3_client/dist/es6";
import { HTTPMessageBusClient } from "ts-rmb-http-client/dist/es6";

async function main() {
  await web3Enable("my cool dapp");
  const allAccounts = await web3Accounts();

  const [_, x] = allAccounts;
  const injector = await web3FromAddress(x.address);

  /* Deploy VM with signer */
  const grid = new GridClient(
    NetworkEnv.dev,
    "guilt leaf sure wheel shield broom retreat zone stove cycle candy nation",
    "secret",
    new HTTPMessageBusClient(0, "", "", ""),
    "",
    BackendStorageType.localstorage,
    KeypairType.sr25519,
    injector.signer
  );

  console.log({ signer: injector.signer });

  await grid.connect();

  // create network Object
  const n = new NetworkModel();
  n.name = "wedtest";
  n.ip_range = "10.249.0.0/16";

  // create disk Object
  const disk = new DiskModel();
  disk.name = "wedDisk";
  disk.size = 8;
  disk.mountpoint = "/testdisk";

  // create vm node Object
  const vm = new MachineModel();
  vm.name = "testvm";
  vm.node_id = 9;
  vm.disks = [disk];
  vm.public_ip = true;
  vm.planetary = true;
  vm.cpu = 1;
  vm.memory = 1024 * 2;
  vm.rootfs_size = 0;
  vm.flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist";
  vm.entrypoint = "/sbin/zinit init";
  vm.env = {
    SSH_KEY:
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMUv2EQUnLL/Ei2+JRR/8EFIOrMxmlVLIc7psOZau6FE engm5081@gmail.com",
  };

  // create VMs Object
  const vms = new MachinesModel();
  vms.name = "newVMS";
  vms.network = n;
  vms.machines = [vm];
  vms.metadata = "{'testVMs': true}";
  vms.description = "test deploying VMs via ts grid3 client";

  await grid.machines.deploy(vms);
  console.log(await grid.machines.getObj(vms.name));
}

window.onload = main;
