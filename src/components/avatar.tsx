//blog's avtar imported from github
import Image from "next/image"

const Avatar = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        
        src="https://github.com/CRUSVEDER.png"
        quality="100"
        height="128"
        width="128"
        className="mr-4 rounded-full !size-14 sm:!size-28"
        alt="CRUSVEDER"
      />
    </div>
  )
}

export default Avatar
