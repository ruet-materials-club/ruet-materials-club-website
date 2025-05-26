import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              About Us
            </Badge>
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Innovate, Research, and Grow
            </h2>
            <p className="text-xl leading-relaxed text-gray-600">
              RUET Materials Club offers career insights, industry visits, and
              networking opportunities. Join us to innovate, research, and grow
              in the exciting field of Materials Science & Engineering!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with fellow materials science enthusiasts and build
                  lasting professional relationships.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access exclusive workshops, seminars, and educational
                  resources to enhance your knowledge.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Strive for excellence in research, innovation, and
                  professional development in materials science.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
