import { cn } from "@/lib/utils";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaLocationPin,
  FaWhatsapp,
} from "react-icons/fa6";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={cn(
        "mt-auto border-t-2 border-solid border-blue-500/5",
        classes.footer,
      )}
    >
      <div className="container mx-auto space-y-4 p-4">
        <div className="prose-sm flex flex-wrap justify-between gap-4 max-md:flex-col">
          <div className="max-w-prose flex-1">
            <h2>RUET Materials Club</h2>
            <p>
              The official club of MSE, RUET, unites all students aiming for
              careers in Materials Science & Engineering. We offer career
              insights, industry visits, and networking. Join to innovate,
              research, and grow in this field!
            </p>
            <p className="flex flex-wrap gap-4">
              <a
                href="mailto:ruet.materials@gmail.com"
                className="flex flex-wrap items-center gap-2"
              >
                <FaEnvelope />
                ruet.materials@gmail.com
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=8801771849044"
                className="flex flex-wrap items-center gap-2"
              >
                <FaWhatsapp />
                +8801771849044
              </a>
              <a
                href="https://maps.app.goo.gl/hKgz6R95woTyxFFk8"
                className="flex flex-wrap items-center gap-2"
              >
                <FaLocationPin />
                RUET, Rajshahi, Bangladesh
              </a>
            </p>
          </div>
          <div className="flex-auto grow-0">
            <h2>Related Sites</h2>
            <div className="flex flex-col gap-2">
              <a
                className="flex items-center gap-2 underline hover:text-gray-500"
                target="_blank"
                href="https://www.mse.ruet.ac.bd/"
              >
                <FaExternalLinkAlt />
                https://www.mse.ruet.ac.bd/
              </a>
              <a
                className="flex items-center gap-2 underline hover:text-gray-500"
                target="_blank"
                href="https://sites.google.com/view/matstorage/?ref=rmc"
              >
                <FaExternalLinkAlt />
                MatStorage
              </a>
            </div>
          </div>
          <div className="flex-auto grow-0 md:text-right">
            <h2>Follow us on</h2>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <a
                className="p-2 hover:text-gray-500"
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61571848140351"
              >
                <FaFacebookF />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                className="p-2 hover:text-gray-500"
                target="_blank"
                href="https://www.linkedin.com/company/ruet-materials-club/"
              >
                <FaLinkedinIn />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="md:text-center">
          © {new Date().getFullYear()} RUET Materials Club. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
