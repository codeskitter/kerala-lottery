import Image from "next/image"
import Link from "next/link"

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="card p-8 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">
          Check <span className="text-accent">Live</span> Results Now!
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted">Watch the winners being announced in real-time!</p>
        <div className="mt-6">
          <Link href="#latest" className="btn btn-accent">
            Check Live Results
          </Link>
        </div>
      </div>

      <div id="latest" className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-heading text-xl font-semibold">Latest Draw Snapshot</h2>
          <p className="mt-2 text-sm text-muted">Sample ticket artwork preview:</p>
          <div className="mt-4 overflow-hidden rounded-md border">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-30%20at%202.57.24%E2%80%AFPM.png-rZ8ZqMGSrFI0EYkXnmvimJM00wylfM.jpeg"
              alt="Kerala lottery ticket artwork"
              width={1200}
              height={600}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-heading text-xl font-semibold">Result Feed</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <span className="label">1st Prize</span> <span className="ml-2 font-semibold">SN 687960</span>
            </li>
            <li>
              <span className="label">2nd Prize</span> <span className="ml-2 font-semibold">SP 102345</span>
            </li>
            <li>
              <span className="label">3rd Prize</span> <span className="ml-2 font-semibold">SR 554321</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
