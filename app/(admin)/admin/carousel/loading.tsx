export default function CarouselLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2"></div>
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-32 h-20 bg-muted animate-pulse rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 w-48 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
