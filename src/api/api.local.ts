import { RemoteCallsService } from "./remote-calls";
import { ThreeNodesService } from "./three-node";

export class LocalApiService {
  threeNodes: ThreeNodesService;
  remoteCalls: RemoteCallsService;

  constructor() {
    this.remoteCalls = new RemoteCallsService();

    this.threeNodes = new ThreeNodesService(this.remoteCalls);

    this.remoteCalls.save();
    this.threeNodes.save();
  }
}
