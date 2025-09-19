import { Member } from "@/../payload-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import { getPayload } from "payload";
import CommitteeSelector from "./committee-selector";

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

function getCommitteeLabel(committee: number, latestCommittee: number): string {
  if (committee === 0) return "Founding";
  if (committee === latestCommittee) return "Running";
  return `${committee + 1}${committee === 1 ? "nd" : committee === 2 ? "rd" : "th"}`;
}

export default async function Team({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const payload = await getPayload({ config });

  // Get all members
  const members = await payload.find({
    collection: "members",
    limit: 0,
    sort: ["committee", "groupOrder", "orderWithInGroup"],
  });

  // Get unique committee numbers
  const committees = [
    ...new Set(members.docs.map((member) => member.committee)),
  ].sort((a, b) => a - b);

  // Get the latest committee (highest number) as default
  const latestCommittee = Math.max(...committees);
  const selectedCommittee = params.committee
    ? parseInt(params.committee as string)
    : latestCommittee;

  // Filter members by selected committee
  const filteredMembers = members.docs.filter(
    (member) => member.committee === selectedCommittee,
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Meet our team</h1>

      {/* Committee Selector */}
      <div className="mb-8 flex justify-center">
        <CommitteeSelector
          committees={committees.map((committee) =>
            getCommitteeLabel(committee, latestCommittee),
          )}
          selectedCommittee={selectedCommittee}
        />
      </div>

      <h2 className="mb-8 text-center text-2xl font-bold">
        The{" "}
        {getCommitteeLabel(selectedCommittee, latestCommittee).toLowerCase()}{" "}
        committee
      </h2>

      <div className="space-y-16">
        {/* Moderator Section */}
        <div className="mb-6 flex justify-center">
          {filteredMembers
            .filter((x) => x.groupOrder === 0)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Advisors Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredMembers
            .filter((x) => x.groupOrder === 1)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* President & Vice Presidents Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* President */}
          {filteredMembers
            .filter((x) => x.groupOrder === 2)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}

          {/* Vice Presidents */}
          {filteredMembers
            .filter((x) => x.groupOrder === 3)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* General Secretaries Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* General Secretary */}
          {filteredMembers
            .filter((x) => x.groupOrder === 4)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Secretaries Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredMembers
            .filter((x) => x.groupOrder === 5)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Assistant Secretaries Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredMembers
            .filter((x) => x.groupOrder === 6)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Executive Members Section */}
        <div className="flex flex-wrap justify-center gap-4">
          {filteredMembers
            .filter((x) => x.groupOrder === 7)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>

        {/* Junior Executives Section */}
        <div className="flex flex-wrap justify-center gap-4">
          {filteredMembers
            .filter((x) => x.groupOrder === 8)
            .map((x) => (
              <MemberCard key={x.id} data={x} />
            ))}
        </div>
      </div>
    </div>
  );
}
