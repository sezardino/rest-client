import { RemoteCallsService } from "./remote-calls";
import { ThreeNodesService } from "./three-node";

export class LocalApiService {
  threeNodes: ThreeNodesService;
  remoteCalls: RemoteCallsService;

  constructor() {
    const remoteCallsService = new RemoteCallsService();
    const threeNodesService = new ThreeNodesService(remoteCallsService);

    this.remoteCalls = remoteCallsService;

    this.threeNodes = threeNodesService;
  }
}
