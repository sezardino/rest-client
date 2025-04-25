import type { RemoteCall, ThreeNode } from "../api.entity";
import { RemoteCallSchema, ThreeNodeSchema } from "../api.schema";
import { AbstractLocalApiService } from "./local.abstract";
import { LS_API_NAMES } from "./local.const";

export class LocalApiService {
  threeNodes: AbstractLocalApiService<ThreeNode>;
  remoteCalls: AbstractLocalApiService<RemoteCall>;

  constructor() {
    this.threeNodes = new AbstractLocalApiService({
      name: LS_API_NAMES.threeNode,
      schema: ThreeNodeSchema,
    });

    this.remoteCalls = new AbstractLocalApiService({
      name: LS_API_NAMES.remoteCalls,
      schema: RemoteCallSchema,
    });
  }
}
