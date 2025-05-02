import { AbstractLocalApiService, LS_API_NAMES } from "../local";
import { MOCK_LOCAL_REMOTE_CALLS } from "../mocks";

import type { RemoteCall } from "./remote-calls.entity";
import { RemoteCallSchema } from "./remote-calls.schema";

export class RemoteCallsService extends AbstractLocalApiService<RemoteCall> {
  constructor() {
    super({
      name: LS_API_NAMES.remoteCalls,
      schema: RemoteCallSchema,
      defaultValue: MOCK_LOCAL_REMOTE_CALLS,
    });
  }

  async getListByNodeId(nodeId: string): Promise<RemoteCall[]> {
    const allRemoteCalls = await super.getAll();

    const filteredRemoteCalls = allRemoteCalls.filter(
      (remoteCall) => remoteCall.threeNodeId === nodeId
    );

    return filteredRemoteCalls;
  }

  async deleteByNodeId(nodeId: string): Promise<void> {
    const allRemoteCalls = await super.getAll();

    const remoteCallsToDelete = allRemoteCalls
      .filter((remoteCall) => remoteCall.threeNodeId === nodeId)
      .map((remoteCall) => remoteCall.id);

    await this.deleteMany(remoteCallsToDelete);
  }
}
