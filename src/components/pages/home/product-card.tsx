import Image, { StaticImageData } from 'next/image'

type TProductCardProps = {
  imageSource: StaticImageData
}

export default function ProductCard({
  imageSource
}: TProductCardProps): JSX.Element {
  return (
    <a
      className="bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg p-1 relative flex flex-col items-center justify-center overflow-hidden group"
      href=""
    >
      <Image className="object-cover" src={imageSource} alt="Camiseta" />
      <footer className="absolute bottom-1 left-1 right-1 rounded-md p-4 flex items-center justify-between bg-gray-800 bg-opacity-90 translate-y-[110%] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
        <strong className="text-lg text-gray-100">Camiseta X</strong>
        <span className="text-xl font-bold text-green-300">R$ 79,90</span>
      </footer>
    </a>
  )
}
