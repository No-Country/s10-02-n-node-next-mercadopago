import Image from 'next/image'
import transfer from '@/../../public/assets/dashboard/wallet.svg'

export default function ActivityItem({ movement }: any) {
  return (
    <div className="w-[750px] flex justify-between mt-5 ">
      <div className="flex gap-8 ">
        <Image src={transfer} className=" w-[47px] h-[47px]" alt="image-item" />
        <div className="flex flex-col ">
          <div className="text-base font-normal leading-normal text-black text-start">
            {movement.detail}
          </div>
          <div className="text-base font-normal leading-normal text-start text-neutral-500">
            Mercado Wallet
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-base font-normal leading-normal text-center text-black ">
          $ {movement.amount}
        </div>
        <div className="text-base font-normal leading-normal text-center text-neutral-500">
          Hoy{/* {new Date().toLocaleDateString()} */}
        </div>
      </div>
    </div>
  )
}
