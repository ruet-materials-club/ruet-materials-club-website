import { Member } from "@/../payload-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import config from "@payload-config";
import { getPayload } from "payload";

function getPhotoURL(x: Member) {
  return typeof x.photo === "number" ? "" : x.photo.url!;
}

export default async function Team() {
  const payload = await getPayload({ config });
  const members = await payload.find({
    collection: "members",
    limit: 0,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-16 text-center text-4xl font-bold">Our Team</h1>

      {/* Moderator Section */}
      <div className="glass-card mb-20 rounded-xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-[2px]">
        <div className="mb-8 flex justify-center">
          {members.docs
            .filter((x) => x.groupOrder === 0)
            .map((x) => (
              <Card
                className="w-full max-w-md border-0 bg-white shadow-lg"
                key={x.id}
              >
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-6 h-32 w-32">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold">{x.fullName}</h3>
                    <p className="mt-2 text-lg font-medium text-slate-600">
                      {x.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Advisors Section - More prominent */}
      <div className="mb-20">
        <div className="flex flex-wrap justify-center gap-6">
          {members.docs
            .filter((x) => x.groupOrder === 1)
            .map((x) => (
              <Card
                key={x.id}
                className="w-full border-0 bg-gradient-to-b from-amber-50 to-white shadow-md sm:w-[calc(50%_-_0.75rem)] md:w-[calc(calc(100%_-_3rem)_/_3)]"
                style={{ order: x.orderWithInGroup }}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-24 w-24">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{x.fullName}</h3>
                    <p className="mt-1 font-medium text-slate-600">
                      {x.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* President & Vice Presidents Section */}
      <div className="glass-card mb-20 rounded-xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-[2px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* President */}
          {members.docs
            .filter((x) => x.groupOrder === 2)
            .map((x) => (
              <Card key={x.id} className="border-0 bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-24 w-24">
                      <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt="President"
                      />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{x.fullName}</h3>
                    <p className="mt-1 font-medium text-slate-500">
                      {x.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

          {/* Vice Presidents */}
          {members.docs
            .filter((x) => x.groupOrder === 3)
            .map((x) => (
              <Card key={x.id} className="border-0 bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-20 w-20">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{x.fullName}</h3>
                    <p className="mt-1 font-medium text-slate-500">
                      {x.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* General Secretaries Section */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* General Secretary */}
          {members.docs
            .filter((x) => x.groupOrder === 4)
            .map((x) => (
              <Card key={x.id} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-20 w-20">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{x.fullName}</h3>
                    <p className="mt-1 font-medium text-slate-500">
                      {x.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Secretaries Section */}
      <div className="glass-card mb-20 rounded-xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-[2px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.docs
            .filter((x) => x.groupOrder === 5)
            .map((x) => (
              <Card key={x.id} className="border-0 bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-3 h-16 w-16">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-base font-semibold">{x.fullName}</h3>
                    <p className="mt-1 text-sm text-slate-500">{x.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Assistant Secretaries Section */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.docs
            .filter((x) => x.groupOrder === 6)
            .map((x) => (
              <Card key={x.id} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-3 h-16 w-16">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-base font-semibold">{x.fullName}</h3>
                    <p className="mt-1 text-sm text-slate-500">{x.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Executive Members Section */}
      <div className="glass-card mb-20 rounded-xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-[2px]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {members.docs
            .filter((x) => x.groupOrder === 7)
            .map((x) => (
              <Card key={x.id} className="border-0 bg-white shadow-sm">
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-2 h-14 w-14">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm font-semibold">{x.fullName}</h3>
                    <p className="mt-1 text-xs text-slate-500">{x.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Junior Executives Section */}
      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {members.docs
            .filter((x) => x.groupOrder === 8)
            .map((x) => (
              <Card key={x.id} className="border-0 shadow-sm">
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-2 h-12 w-12">
                      <AvatarImage src={getPhotoURL(x)} alt={x.fullName} />
                      <AvatarFallback>{x.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm font-semibold">{x.fullName}</h3>
                    <p className="mt-1 text-xs text-slate-500">{x.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
