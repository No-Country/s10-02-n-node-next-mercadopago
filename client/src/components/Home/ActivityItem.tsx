import Image from 'next/image';
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
             src={activityItem.movement === 'deposit' ||  activityItem.movement === 'withdrawal'? deposit : transfer}
            className=' w-[47px] h-[47px]'
            alt='image-item'
          />
          <div className='flex flex-col '>
            <div className='capitalize text-start text-black text-base font-normal leading-normal'>
              {activityItem.movement.toLowerCase()}
            </div>
            <div className='capitalize text-start text-neutral-500 text-base font-normal leading-normal'>
              {activityItem.nameDest}
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className=' text-center text-black text-base font-normal leading-normal'>
            ${activityItem.amount.toFixed(2)}
          </div>
          <div className='text-center text-neutral-500 text-base font-normal leading-normal'>
            {new Date(activityItem.createdAt).toLocaleDateString()}
          </div>
        </div>
      </section>
    </>
  );
}
