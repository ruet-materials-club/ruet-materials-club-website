import { Post } from "@/../payload-types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import config from "@payload-config";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

function getImageURL(post: Post) {
  return typeof post.featuredImage === "number" ? "" : post.featuredImage.url!;
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative -mt-6 h-48 w-full overflow-hidden">
        <Image
          src={getImageURL(post)}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        {post.publishedDate && (
          <CardDescription>
            {format(new Date(post.publishedDate), "MMMM d, yyyy")}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-sm text-gray-600">
          {post.excerpt || ""}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/posts/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export const metadata = {
  title: "Blog Posts | RUET Materials Club",
  description: "Latest news and articles from RUET Materials Club",
};

export default async function PostsPage() {
  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: "posts",
    where: {
      status: {
        equals: "published",
      },
    },
    sort: "-publishedDate",
    depth: 1, // To populate the featuredImage relation
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Latest Posts</h1>

      {posts.docs.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600">No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.docs.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
