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
      <div className="relative overflow-hidden bg-gray-400 opacity-40">
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      {imageUrls.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="bg-gray/80 absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 opacity-50 shadow-sm transition hover:bg-white"
            aria-label="Previous image"
            disabled={firstImage}
          >
            {!firstImage && <ChevronLeft className="h-6 w-6" />}
          </button>
          <button
            onClick={handleNext}
            className="bg-gray/80 absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 opacity-50 shadow-sm transition hover:bg-white"
            aria-label="Next image"
            disabled={lastImage}
          >
            {!lastImage && <ChevronRight className="h-6 w-6" />}
          </button>
        </>
      )}
      {imageUrls.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition ${
                index === currentIndex ? 'w-6 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PostImageSlider
