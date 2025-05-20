import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path");
  if (!path) return Response.json({ message: "No path provided" });
  revalidatePath(path);
  return Response.json({ message: "Revalidated" });
}
