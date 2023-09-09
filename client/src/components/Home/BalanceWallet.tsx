'use client'

import { getWallet } from '@/services'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import arrow from '../../../public/assets/dashboard/arrow2.svg'
import warning from '../../../public/assets/dashboard/warning.svg'
import Link from 'next/link'

export default function BalanceWallet() {
  const { data } = useQuery(['wallet'], getWallet)
  const balance = data?.data

  const [hidden, setHidden] = useState(true)

  return (
    <>
      <section className=" w-[370px] h-[136px] bg-white rounded-lg shadow-[0.0px_4.0px_4.0px_rgba(0,0,0,0.25)]">
        <div className="flex">
          <div className="px-5 mt-2 text-base font-semibold leading-normal text-black text-start">
            Disponible en Mercado pago Wallet
          </div>
          <Link
            href={'/money-charge/clabe'}
            className="flex items-center w-6 h-6 pt-4"
          >
            <p className="px-2 py-1 font-semibold rounded-lg text-primary bg-slate-200">
              CVU
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-between px-5">
          <div className="flex gap-4 ">
            <p className="text-start  mt-3 text-black text-[31px] font-semibold leading-normal">
              $ {!hidden ? balance?.balance : '***'}
            </p>
            <svg
              onClick={() => setHidden(!hidden)}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer mt-7"
            >
              <path
                d="M9 4.875C11.8425 4.875 14.3775 6.4725 15.615 9C14.3775 11.5275 11.85 13.125 9 13.125C6.15 13.125 3.6225 11.5275 2.385 9C3.6225 6.4725 6.1575 4.875 9 4.875ZM9 3.375C5.25 3.375 2.0475 5.7075 0.75 9C2.0475 12.2925 5.25 14.625 9 14.625C12.75 14.625 15.9525 12.2925 17.25 9C15.9525 5.7075 12.75 3.375 9 3.375ZM9 7.125C10.035 7.125 10.875 7.965 10.875 9C10.875 10.035 10.035 10.875 9 10.875C7.965 10.875 7.125 10.035 7.125 9C7.125 7.965 7.965 7.125 9 7.125ZM9 5.625C7.14 5.625 5.625 7.14 5.625 9C5.625 10.86 7.14 12.375 9 12.375C10.86 12.375 12.375 10.86 12.375 9C12.375 7.14 10.86 5.625 9 5.625Z"
                fill="#797979"
              />
            </svg>
          </div>
          <Image src={arrow} alt="arrow" className="w-6 h-6 mt-2 " />
        </div>
      </section>
    </>
  )
}
