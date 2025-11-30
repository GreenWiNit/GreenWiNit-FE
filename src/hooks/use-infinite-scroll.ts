import { useEffect, useRef } from 'react'

interface InfiniteScrollOptions {
  enabled?: boolean
  onLoadMore: () => void
  isLoading?: boolean
}

export function useInfiniteScroll({
  enabled = true,
  onLoadMore,
  isLoading = false,
}: InfiniteScrollOptions) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    if (!bottomRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target?.isIntersecting && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 1 },
    )

    observer.observe(bottomRef.current)

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current)
    }
  }, [enabled, isLoading, onLoadMore])

  return bottomRef
}
