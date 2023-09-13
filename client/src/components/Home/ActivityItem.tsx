import Image from 'next/image';
import React from 'react';
import transfer from '../../../public/assets/dashboard/transfer.svg';
import deposit from '../../../public/assets/dashboard/deposit.svg';
import { Movements } from './ActivityBox';

interface Props {
  activityItem: Movements;
}

export default function ActivityItem({activityItem}: Props) {
  
  return (
    <>
      <section className='w-[750px] h-[100px] flex justify-between mt-5 '>
        <div className='flex gap-8 '>
          <Image
            // src={transfer}
             src={activityItem.movement_type === 'deposit' ||  activityItem.movement_type === 'withdrawal'? deposit : transfer}
            className=' w-[47px] h-[47px]'
            alt='image-item'
          />
          <div className='flex flex-col '>
            <div className=' text-start text-black text-base font-normal leading-normal'>
              {/* Recarga de celular */}
              {activityItem.movement_type}
            </div>
            <div className=' text-start text-neutral-500 text-base font-normal leading-normal'>
              {/* Claro */}
              {activityItem.destination}
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className=' text-center text-black text-base font-normal leading-normal'>
            {/* -$2000 */}
            ${activityItem.amount.toFixed(2)}
          </div>
          <div className='text-center text-neutral-500 text-base font-normal leading-normal'>
            {/* Ayer */}
            {new Date(activityItem.date_created).toLocaleDateString()}
          </div>
        </div>
      </section>
    </>
  );
}
