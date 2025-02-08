export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center">
          © {new Date().getFullYear()} RUET Materials Club. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
