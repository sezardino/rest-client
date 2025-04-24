import { useRequest } from "@/components/providers/request";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import { useState, type ComponentProps } from "react";

export type RequestAuthProps = ComponentProps<"section"> & {};

export const RequestAuth = (props: RequestAuthProps) => {
  const { className, ...rest } = props;

  const { request, setRequest } = useRequest();
  const [authType, setAuthType] = useState(request.auth.type);

  const handleAuthTypeChange = (value: string) => {
    const newAuthType = value as "none" | "basic" | "bearer" | "oauth2";
    setAuthType(newAuthType);
    setRequest({
      ...request,
      auth: {
        type: newAuthType,
        data: {},
      },
    });
  };

  const handleAuthDataChange = (key: string, value: string) => {
    setRequest({
      ...request,
      auth: {
        ...request.auth,
        data: {
          ...request.auth.data,
          [key]: value,
        },
      },
    });
  };

  return (
    <section {...rest} className={cn("", className)}>
      <Tabs
        value={authType}
        onValueChange={handleAuthTypeChange}
        className="w-full"
      >
        <div className="border-b">
          <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="none"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              No Auth
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Basic
            </TabsTrigger>
            <TabsTrigger
              value="bearer"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Bearer
            </TabsTrigger>
            <TabsTrigger
              value="oauth2"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              OAuth 2.0
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="none" className="p-4">
          <div className="text-sm text-muted-foreground">
            No authentication will be used for this request.
          </div>
        </TabsContent>
        <TabsContent value="basic" className="p-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={request.auth.data.username || ""}
              onChange={(e) => handleAuthDataChange("username", e.target.value)}
              placeholder="Username"
              className="font-mono"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={request.auth.data.password || ""}
              onChange={(e) => handleAuthDataChange("password", e.target.value)}
              placeholder="Password"
              className="font-mono"
            />
          </div>
        </TabsContent>
        <TabsContent value="bearer" className="p-4">
          <div className="grid gap-2">
            <Label htmlFor="token">Token</Label>
            <Input
              id="token"
              value={request.auth.data.token || ""}
              onChange={(e) => handleAuthDataChange("token", e.target.value)}
              placeholder="Bearer token"
              className="font-mono"
            />
          </div>
        </TabsContent>
        <TabsContent value="oauth2" className="p-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="client_id">Client ID</Label>
            <Input
              id="client_id"
              value={request.auth.data.client_id || ""}
              onChange={(e) =>
                handleAuthDataChange("client_id", e.target.value)
              }
              placeholder="Client ID"
              className="font-mono"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="client_secret">Client Secret</Label>
            <Input
              id="client_secret"
              value={request.auth.data.client_secret || ""}
              onChange={(e) =>
                handleAuthDataChange("client_secret", e.target.value)
              }
              placeholder="Client Secret"
              className="font-mono"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="access_token_url">Access Token URL</Label>
            <Input
              id="access_token_url"
              value={request.auth.data.access_token_url || ""}
              onChange={(e) =>
                handleAuthDataChange("access_token_url", e.target.value)
              }
              placeholder="https://example.com/oauth/token"
              className="font-mono"
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
