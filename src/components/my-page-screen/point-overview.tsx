function PointOverview() {
  return (
    <section className="text-secondary-foreground border-lighter-gray-border flex flex-col justify-between gap-6 border-1 bg-white px-4 py-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm">총 보유 포인트</span>
        <span className="text-4xl font-bold">4,500</span>
      </div>
      <div className="flex">
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs">획득 포인트</span>
          <span className="text-mountain_meadow text-lg font-bold">5,200</span>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs">사용 포인트</span>
          <span className="text-error text-lg font-bold">700</span>
        </div>
      </div>
    </section>
  )
}

export default PointOverview
