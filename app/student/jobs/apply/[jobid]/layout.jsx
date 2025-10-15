export default function ApplyLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {children}
    </div>
  );
}
