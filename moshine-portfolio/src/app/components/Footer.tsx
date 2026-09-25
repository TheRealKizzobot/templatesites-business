export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
      <p>Made with MoshineSites.</p>
      <p className="mt-2">
        <a href="https://dkservers.space" className="underline hover:no-underline" style={{ color: "var(--brand)" }}>
          Back to MoshineSites
        </a>
      </p>
    </footer>
  );
}