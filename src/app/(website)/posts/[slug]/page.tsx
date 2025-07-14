import { Post, User } from "@/../payload-types";
import { Button } from "@/components/ui/button";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config });
  const { slug } = await params;
  const post = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  });

  if (!post.docs.length) {
    return {
      title: "Post Not Found | RUET Materials Club",
    };
  }

  const postData = post.docs[0];

  return {
    title: `${postData.title} | RUET Materials Club`,
    description: postData.excerpt || "RUET Materials Club blog post",
  };
}

export default async function PostPage({ params }: Props) {
  const payload = await getPayload({ config });
  const { slug } = await params;
  const post = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // To populate the featuredImage and author relations
  });

  if (!post.docs.length) {
    notFound();
  }

  const postData = post.docs[0] as Post;
  const author = postData.author as User | null;
  const featuredImageUrl =
    typeof postData.featuredImage === "number"
      ? ""
      : postData.featuredImage.url!;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/posts" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Posts
          </Link>
        </Button>

        <h1 className="mb-4 text-4xl font-bold">{postData.title}</h1>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {postData.publishedDate && (
            <time dateTime={postData.publishedDate}>
              {format(new Date(postData.publishedDate), "MMMM d, yyyy")}
            </time>
          )}

          {author && (
            <div>
              By <span className="font-medium">{author.email}</span>
            </div>
          )}

          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {postData.tags.map(
                (tag, index) =>
                  tag.tag && (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
                    >
                      {tag.tag}
                    </span>
                  ),
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={featuredImageUrl}
          alt={postData.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      {postData.excerpt && (
        <div className="mb-8 rounded-lg bg-gray-50 p-6 text-lg text-gray-700 italic">
          {postData.excerpt}
        </div>
      )}

      <div className="prose-lg prose-blue mx-auto max-w-4xl">
        <RichText data={postData.content} />
      </div>
    </div>
  );
}
