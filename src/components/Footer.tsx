export default function Footer() {
  return (
    <>
      <footer>
        <div className="container mx-auto">
          <div className="py-2 text-center">
            © {new Date().getFullYear()} RUET Materials Club. All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
