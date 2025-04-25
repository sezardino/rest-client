export const getStatusCodeColor = (status: number) => {
  if (status >= 200 && status < 300) return "text-green-500";
  if (status >= 400 && status < 500) return "text-yellow-500";
  if (status >= 500) return "text-red-500";
  return "text-muted-foreground";
};
