'use client'

import { useTransferData } from '@/store/userStore'

export default function DetailMoney() {
  const { tempMoney } = useTransferData()

  return (
    <>
      <div className="flex flex-col items-start justify-start w-[350px] h-[150px] bg-white shadow-[0px_4px_4px_0px_#00000025] ml-4 rounded-xl">
        <p className="py-6 pl-4 text-base font-medium text-black">Detalle</p>

        <div className="flex flex-row justify-between pt-1 pb-12 pl-4">
          <p className="text-base text-black">Ingresas</p>
          <p className="text-base ml-52">$ {tempMoney}</p>
        </div>
      </div>
    </>
  )
}
