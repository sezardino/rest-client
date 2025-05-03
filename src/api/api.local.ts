import { RemoteCallsService } from "./remote-calls";
import { TreeNodesService } from "./tree-node";

export class LocalApiService {
  treeNodes: TreeNodesService;
  remoteCalls: RemoteCallsService;

  constructor() {
    const remoteCallsService = new RemoteCallsService();
    const treeNodesService = new TreeNodesService(remoteCallsService);

    this.remoteCalls = remoteCallsService;

    this.treeNodes = treeNodesService;
  }
}
