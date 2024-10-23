import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-10">
        <h2>Practical Assignment</h2>
        <Link href="/employee/list">View Employee List</Link>
      </div>
    </main>
  );
}
