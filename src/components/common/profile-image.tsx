interface ProfileImageProps {
  imageUrl: string
  size?: number
}

function ProfileImage({ imageUrl, size = 92 }: ProfileImageProps) {
  return (
    <div
      className="overflow-hidden rounded-full border-2 border-gray-300 bg-cover bg-no-repeat"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img src={imageUrl} alt="프로필 이미지" className="h-full w-full object-scale-down" />
    </div>
  )
}

export default ProfileImage
