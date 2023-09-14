'use client'

import Image from 'next/image'
import Link from 'next/link'
import search from '../../../public/assets/dashboard/search.svg'
import arrow from '../../../public/assets/dashboard/arrow2.svg'
import ActivityItem from './ActivityItem'
import { useActivity } from '@/store/activityStore'

export default function ActivityBox() {
  const { movements } = useActivity()
  return (
    <>
      <div className="w-[892px] h-[772px] flex flex-col bg-white rounded-lg shadow-[0.0px_4.0px_4.0px_rgba(0,0,0,0.25)]">
        <div>
          <h3 className="px-16 mt-5 text-base font-semibold leading-normal text-black text-start">
            Tu actividad
          </h3>
          <div className=" w-[892px] h-px bg-zinc-300 mt-3" />
        </div>
        <section className="px-16">
          <input className=" w-[772px] h-[41px] bg-zinc-300 rounded-lg absolute focus:border-2 focus:border-primary mt-5 ps-10 px-10 focus:outline-none" />
          <Image
            src={search}
            alt="search"
            className="relative w-6 h-6 top-7 left-3"
          ></Image>
        </section>
        <section className="w-[600px] h-[640px] px-16 py-16 flex flex-col gap-4 items-start">
          {movements.map((msg, index) => (
            <ActivityItem movement={msg} key={index} />
          ))}
        </section>
        <Link href={'/home'} className="flex justify-between px-16">
          <div className="text-base font-semibold leading-normal text-start text-sky-500">
            Ver toda tu actividad
          </div>
          <Image src={arrow} alt="arrow" className="relative w-6 h-6 " />
        </Link>
      </div>
    </>
  )
}
