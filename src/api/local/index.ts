import { RemoteCallsService } from "./remote-calls";
import { ThreeNodesService } from "./three-node";

export * from "./three-node/three-nodes.types";

class LocalApiService {
  threeNodes: ThreeNodesService;
  remoteCalls: RemoteCallsService;

  constructor() {
    this.remoteCalls = new RemoteCallsService();

    this.threeNodes = new ThreeNodesService(this.remoteCalls);
  }
}

export const localApi = new LocalApiService();
