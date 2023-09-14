'use client'

import ProfileCard from '@/components/ProfileCard/ProfileCard'
import { FaCamera } from 'react-icons/fa'
import './styles.css'
import { useUserProfile } from '@/store/userStore'
import avatarDefault from '@/../../public/assets/dashboard/user-default.png'
import Image from 'next/image'

export default function Profile() {
  const { name, email } = useUserProfile()

  return (
    <div>
      <section>
        <div className="mt-10 profile-container">
          <div className="relative flex w-2/3 mb-10 text-center rounded-md profile-info h-44 mt-30">
            <div>
              <Image
                src={avatarDefault}
                alt="Admin"
                className="relative p-1 mt-10 ml-5 rounded-full cursor-pointer bg-primary"
                width="110"
                height="110"
              />
              <div className="absolute p-1 mb-5 bg-white rounded-full cursor-pointer bottom-2 left-24">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#BFBFBF"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10L11.06 12.06L9 13L11.06 13.94L12 16L12.94 13.94L15 13L12.94 12.06L12 10ZM20 5H16.83L15 3H9L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5ZM20 19H4V7H8.05L8.64 6.35L9.88 5H14.12L15.36 6.35L15.95 7H20V19ZM12 8C9.24 8 7 10.24 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 10.24 14.76 8 12 8ZM12 16C10.35 16 9 14.65 9 13C9 11.35 10.35 10 12 10C13.65 10 15 11.35 15 13C15 14.65 13.65 16 12 16Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-10 ml-10 leading-loose text-left">
              {/* <h4 className="font-semibold">{profileData.name}</h4>
              <p>{profileData.email}</p> */}
              <h4 className="font-semibold">
                {name === '' ? 'Loading...' : name}
              </h4>
              <p>{email === '' ? '' : email}</p>
              <p className="mt-2 text-base text-cyan-600">
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
