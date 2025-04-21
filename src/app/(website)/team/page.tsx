import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Team() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-16 text-center text-4xl font-bold">Our Team</h1>

      {/* Moderator Section */}
      <div className="mb-20 rounded-xl bg-slate-50 p-8">
        <div className="mb-8 flex justify-center">
          <Card className="w-full max-w-md border-0 bg-white shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-6 h-32 w-32">
                  <AvatarImage
                    src="/placeholder.svg?height=128&width=128"
                    alt="Moderator"
                  />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold">Moderator Name</h3>
                <p className="mt-2 text-lg font-medium text-slate-600">
                  Moderator
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advisors Section - More prominent */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 18 }, (_, i) => (
            <Card
              key={i}
              className="border-0 bg-gradient-to-b from-amber-50 to-white shadow-md"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-4 h-24 w-24">
                    <AvatarImage
                      src={`/placeholder.svg?height=96&width=96`}
                      alt={`Advisor ${i + 1}`}
                    />
                    <AvatarFallback>A{i + 1}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">
                    Advisor Name {i + 1}
                  </h3>
                  <p className="mt-1 font-medium text-slate-600">Advisor</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Faculty, Department of Materials Science
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* President & Vice Presidents Section */}
      <div className="mb-20 rounded-xl bg-slate-50 p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* President */}
          <Card className="border-0 bg-white shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-4 h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt="President"
                  />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">President Name</h3>
                <p className="mt-1 font-medium text-slate-500">President</p>
              </div>
            </CardContent>
          </Card>

          {/* Vice Presidents */}
          <Card className="border-0 bg-white shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-4 h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="VP Admin"
                  />
                  <AvatarFallback>VP</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">VP Admin Name</h3>
                <p className="mt-1 font-medium text-slate-500">
                  Vice President (Admin)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-4 h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="VP Technical"
                  />
                  <AvatarFallback>VP</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">VP Technical Name</h3>
                <p className="mt-1 font-medium text-slate-500">
                  Vice President (Technical)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* General Secretaries Section */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* General Secretary */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-4 h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="General Secretary"
                  />
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">
                  General Secretary Name
                </h3>
                <p className="mt-1 font-medium text-slate-500">
                  General Secretary
                </p>
              </div>
            </CardContent>
          </Card>

          {/* General Secretary (Hospitality) */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-4 h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="GS Hospitality"
                  />
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">GS Hospitality Name</h3>
                <p className="mt-1 font-medium text-slate-500">
                  General Secretary (Hospitality)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Secretaries Section */}
      <div className="mb-20 rounded-xl bg-slate-50 p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            "Finance",
            "Human Resources",
            "IT",
            "Office",
            "Production Design & Media",
            "Public Relation",
            "Workshop, R&D",
          ].map((dept, index) => (
            <Card key={index} className="border-0 bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-3 h-16 w-16">
                    <AvatarImage
                      src={`/placeholder.svg?height=64&width=64`}
                      alt={`Secretary ${dept}`}
                    />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-semibold">Secretary Name</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Secretary ({dept})
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Assistant Secretaries Section */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            "Office",
            "Finance",
            "Human Resource",
            "Publication",
            "Public Relations",
            "Workshop R&D",
            "IT",
          ].map((dept, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-3 h-16 w-16">
                    <AvatarImage
                      src={`/placeholder.svg?height=64&width=64`}
                      alt={`Asst. Secretary ${dept}`}
                    />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-semibold">
                    Asst. Secretary Name
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Asst. Secretary ({dept})
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Executive Members Section */}
      <div className="mb-20 rounded-xl bg-slate-50 p-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 15 }, (_, i) => (
            <Card key={i} className="border-0 bg-white shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-2 h-14 w-14">
                    <AvatarImage
                      src={`/placeholder.svg?height=56&width=56`}
                      alt={`Executive Member ${i + 1}`}
                    />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm font-semibold">Member Name</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Executive Member
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Junior Executives Section */}
      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: 27 }, (_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-2 h-12 w-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={`Junior Executive ${i + 1}`}
                    />
                    <AvatarFallback>JE</AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm font-semibold">Junior Name</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Junior Executive
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
