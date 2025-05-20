import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
      <p className="mb-8 text-lg text-gray-600">
        The post you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/posts">Back to Posts</Link>
      </Button>
    </div>
  );
}
