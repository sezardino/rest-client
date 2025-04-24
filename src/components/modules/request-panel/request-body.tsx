import { useRequest } from "@/components/providers/request";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { useState, type ComponentProps } from "react";

export type RequestBodyProps = ComponentProps<"section"> & {};

export const RequestBody = (props: RequestBodyProps) => {
  const { className, ...rest } = props;

  const { request, setRequest } = useRequest();
  const [contentType, setContentType] = useState<
    "json" | "form-data" | "x-www-form-urlencoded" | "raw"
  >(request.body.contentType);
  const [content, setContent] = useState(request.body.content);

  const handleContentTypeChange = (value: string) => {
    const newContentType = value as
      | "json"
      | "form-data"
      | "x-www-form-urlencoded"
      | "raw";
    setContentType(newContentType);
    setRequest({
      ...request,
      body: {
        ...request.body,
        contentType: newContentType,
      },
    });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setRequest({
      ...request,
      body: {
        ...request.body,
        content: value,
      },
    });
  };

  return (
    <section {...rest} className={cn("", className)}>
      <Tabs
        value={contentType}
        onValueChange={handleContentTypeChange}
        className="w-full"
      >
        <div className="border-b">
          <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="json"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              JSON
            </TabsTrigger>
            <TabsTrigger
              value="form-data"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Form Data
            </TabsTrigger>
            <TabsTrigger
              value="x-www-form-urlencoded"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              URL Encoded
            </TabsTrigger>
            <TabsTrigger
              value="raw"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Raw
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="json" className="p-4">
          <Textarea
            value={contentType === "json" ? content : ""}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder='{"key": "value"}'
            className="font-mono h-64 resize-none"
          />
        </TabsContent>
        <TabsContent value="form-data" className="p-4">
          <div className="text-sm text-muted-foreground">
            Form data editor would go here with key-value pairs and file upload
            support
          </div>
        </TabsContent>
        <TabsContent value="x-www-form-urlencoded" className="p-4">
          <div className="text-sm text-muted-foreground">
            URL encoded form editor would go here with key-value pairs
          </div>
        </TabsContent>
        <TabsContent value="raw" className="p-4">
          <Textarea
            value={contentType === "raw" ? content : ""}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Raw request body"
            className="font-mono h-64 resize-none"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};
