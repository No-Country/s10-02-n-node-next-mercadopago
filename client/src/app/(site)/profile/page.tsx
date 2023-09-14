'use client'

import ProfileCard from '@/components/ProfileCard/ProfileCard'
import { FaCamera } from 'react-icons/fa'
import './styles.css'
import { useUserProfile } from '@/store/userStore'

export default function Profile() {
  const profileData = {
    image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  if (!profileData) {
    return <div>Loading...</div>
  }
  const { name, email } = useUserProfile()

  return (
    <div>
      <section>
        <div className="mt-10 profile-container">
          <div className="relative flex w-[892px] mb-10 text-center rounded-lg profile-info h-44 mt-30">
            <div>
              <img
                src={profileData.image}
                alt="Admin"
                className="relative p-1 mt-10 ml-5 rounded-full cursor-pointer bg-primary"
                width="110"
                height="110"
              />
              <div className="absolute mb-5 bg-white cursor-pointer bottom-2 left-24">
                <FaCamera size={24} color="gray" />
              </div>
            </div>
            <div className="mt-10 ml-10 leading-loose text-left">
              {/* <h4 className="font-semibold">{profileData.name}</h4>
              <p>{profileData.email}</p> */}
              <h4 className=" text-bas font-semibold">
                {name === '' ? 'Loading...' : name}
              </h4>
              <p className="text-[#797979] font-normal">
                {email === '' ? '' : email}
              </p>
              <p className="mt-2 text-base font-bold text-sky-500">
                Estás en lvl 2- Mercado puntos
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <ProfileCard />
      </section>
    </div>
  )
}
