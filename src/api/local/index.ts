import { RemoteCallsService } from "./remote-calls.service";
import { ThreeNodesService } from "./three-nodes.service";

class LocalApiService {
  threeNodes: ThreeNodesService;
  remoteCalls: RemoteCallsService;

  constructor() {
    this.remoteCalls = new RemoteCallsService();

    this.threeNodes = new ThreeNodesService(this.remoteCalls);
  }
}

export const localApi = new LocalApiService();
