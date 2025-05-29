import { Member } from "@/../payload-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import { getPayload } from "payload";

function getPhotoURL(x: Member) {
  return typeof x.photo === "number" ? "" : x.photo.url!;
}

function MemberCard({ data: x }: { data: Member }) {
  return (
    <Card
      className={cn(
        "border-0 bg-gradient-to-b from-amber-50/10 to-white/10 backdrop-blur-[2px]",
        x.groupOrder < 5
          ? "w-full shadow-md sm:w-[calc(50%_-_0.75rem)] md:w-[calc(calc(100%_-_3rem)_/_3)]"
          : x.groupOrder < 7
            ? "w-full shadow-md sm:w-[calc(50%_-_0.75rem)] md:w-[calc(calc(100%_-_3rem)_/_3)] lg:w-[calc(calc(100%_-_4.5rem)_/_4)]"
            : x.groupOrder < 8
              ? "w-[calc(50%_-_0.5rem)] shadow-sm sm:w-[calc(calc(100%_-_2rem)_/_3)] md:w-[calc(calc(100%_-_4rem)_/_5)]"
              : "w-[calc(50%_-_0.5rem)] shadow-sm sm:w-[calc(calc(100%_-_2rem)_/_3)] md:w-[calc(calc(100%_-_4rem)_/_5)] lg:w-[calc(calc(100%_-_5rem)_/_6)]",
      )}
      style={{ order: x.orderWithInGroup }}
    >
      <CardContent className={cn(x.groupOrder < 7 ? "pt-6" : "pt-4")}>
        <div className="flex flex-col items-center text-center">
          <Avatar
            className={cn(
              x.groupOrder < 5
                ? "mb-4 h-24 w-24"
                : x.groupOrder < 7
                  ? "mb-3 h-16 w-16"
                  : x.groupOrder < 8
                    ? "mb-2 h-14 w-14"
                    : "mb-2 h-12 w-12",
            )}
          >
            <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
            <AvatarFallback>{x.fullName[0]}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "font-semibold",
              x.groupOrder < 5
                ? "text-xl"
                : x.groupOrder < 8
                  ? "text-base"
                  : "text-sm",
            )}
          >
            {x.fullName}
          </div>
          <p
            className={cn(
              "mt-1",
              x.groupOrder < 8
                ? "text-sm font-medium text-slate-600"
                : "text-xs text-slate-500",
            )}
          >
            {x.position}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function Team() {
  const payload = await getPayload({ config });
  const members = await payload.find({
    collection: "members",
    limit: 0,
    sort: ["groupOrder", "orderWithInGroup"],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-16 text-center text-4xl font-bold">Meet our team</h1>

      <div className="space-y-16">
        {/* Moderator Section */}
        <div className="mb-6 flex justify-center">
          {members.docs
            .filter((x) => x.groupOrder === 0)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Advisors Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {members.docs
            .filter((x) => x.groupOrder === 1)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* President & Vice Presidents Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* President */}
          {members.docs
            .filter((x) => x.groupOrder === 2)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}

          {/* Vice Presidents */}
          {members.docs
            .filter((x) => x.groupOrder === 3)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* General Secretaries Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* General Secretary */}
          {members.docs
            .filter((x) => x.groupOrder === 4)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Secretaries Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {members.docs
            .filter((x) => x.groupOrder === 5)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Assistant Secretaries Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {members.docs
            .filter((x) => x.groupOrder === 6)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Executive Members Section */}
        <div className="flex flex-wrap justify-center gap-4">
          {members.docs
            .filter((x) => x.groupOrder === 7)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Junior Executives Section */}
        <div className="flex flex-wrap justify-center gap-4">
          {members.docs
            .filter((x) => x.groupOrder === 8)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>
      </div>
    </div>
  );
}
