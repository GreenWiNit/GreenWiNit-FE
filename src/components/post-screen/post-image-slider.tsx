import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PostImageSliderProps {
  imageUrls: string[]
}

const PostImageSlider = ({ imageUrls }: PostImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const firstImage = currentIndex === 0
  const lastImage = currentIndex === imageUrls.length - 1

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      {imageUrls.length > 1 && (
        <>
          {!firstImage && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-gray-200 p-2 opacity-50 shadow-sm transition hover:bg-gray-400"
              aria-label="Previous image"
              disabled={firstImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {!lastImage && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gray-200 p-2 opacity-50 shadow-sm transition hover:bg-gray-400"
              aria-label="Next image"
              disabled={lastImage}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </>
      )}
      {imageUrls.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition ${
                index === currentIndex ? 'w-4 bg-gray-400' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PostImageSlider
