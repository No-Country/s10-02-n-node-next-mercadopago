import Link from 'next/link'
import Image from 'next/image'
import PersonalInfo from '@/../public/assets/profile/personal-info.png'
import AccountDetail from '@/../public/assets/profile/account-detail.png'
import Security from '@/../public/assets/profile/security.png'
import BankCard from '@/../public/assets/profile/bank-card.png'
import Direction from '@/../public/assets/profile/direction.png'
import Privacity from '@/../public/assets/profile/privacity.png'
import Network from '@/../public/assets/profile/network.png'
import Suscription from '@/../public/assets/profile/suscription.png'
import Go from '@/../public/assets/profile/go.png'
import Check from '@/../public/assets/profile/check.png'
import './styles.css'

export default function ProfileCard () {
  return (
    <section>
      <div className='profile-container'>
        {/* Bloque 1 INFORMACIÓN PERSONAL*/}
        <div className='relative flex w-2/3 text-center profile-info1 h-36 mt-30'>
          <div>
            <Link href='./' className='profile-icons relative flex'>
              <Image
                src={PersonalInfo}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
            <div className='absolute -mt-5 bg-white ml-24'>
              <Image src={Check} alt='Admin' width='15' height='15' />
            </div>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>
                Información personal
              </p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Información de tu identificación oficial y tu actividad fiscal.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 2 DATOS DE LA CUENTA */}
        <div className='relative flex w-2/3 text-center profile-info2 h-36'>
          <div>
            <Link
              href='/profile/account-data'
              className='relative flex profile-icons'
            >
              <Image
                src={AccountDetail}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
            <div className='absolute -mt-5 bg-white ml-24'>
              <Image src={Check} alt='Admin' width='15' height='15' />
            </div>
          </div>
          <Link href='/profile/account-data'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>
                Datos de tu cuenta
              </p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Datos que representan a la cuenta de mercado pago y mercado
                libre.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/profile/account-data'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 3 SEGURIDAD */}
        <div className='relative flex w-2/3 text-center profile-info3 h-36'>
          <div>
            <Link href='./' className='relative flex profile-icons'>
              <Image
                src={Security}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
            <div className='absolute -mt-5 bg-white ml-24'>
              <Image src={Check} alt='Admin' width='15' height='15' />
            </div>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>Seguridad</p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Tienes configurada la seguridad de tu cuenta.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 4 TARJETAS DE BANCO */}
        <div className='relative flex w-2/3 text-center profile-info4 h-36'>
          <div>
            <Link href='./' className='relative flex profile-icons'>
              <Image
                src={BankCard}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>Tarjetas</p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Tienes configurada la seguridad de tu cuenta.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 5 DIRECCIONES */}
        <div className='relative flex w-2/3 text-center profile-info5 h-36'>
          <div>
            <Link href='./' className='relative flex profile-icons'>
              <Image
                src={Direction}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>Direcciones</p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Direcciones guardadas en tu cuenta.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 6 PRIVACIDAD */}
        <div className='relative flex w-2/3 text-center profile-info6 h-36'>
          <div>
            <Link href='./' className='relative flex profile-icons'>
              <Image
                src={Privacity}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>Privacidad</p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Preferencias y control sobre el uso de tus datos.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 7 COMUNICACIONES */}
        <div className='relative flex w-2/3 text-center profile-info7 h-36'>
          <div>
            <Link href='./' className='relative flex profile-icons'>
              <Image
                src={Network}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>Comunicaciones</p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Elige el tipo de información que quieres recibir.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
        {/* Bloque 8 SUSCRIPCIONES*/}
        <div className='relative flex w-2/3 mb-32 text-center profile-info8 h-36'>
          <div>
            <Link href='./' className='relative flex profile-icons'>
              <Image
                src={Suscription}
                alt='Admin'
                className='cursor-pointer '
                width='30'
                height='30'
              />
            </Link>
          </div>
          <Link href='./'>
            <div className='mt-10 ml-10 leading-loose text-left'>
              <p className='mt-2 font-semibold profile-title'>Suscripciones</p>
              <p className='mt-2 text-base font-light profile-subtitle'>
                Gestiona tus suscripciones.
              </p>
            </div>
          </Link>
          <div className='mt-10 ml-10 leading-loose text-left'>
            <Link href='/'>
              <Image
                src={Go}
                alt='go'
                width='10'
                height='10'
                className='cursor-pointer go-go'
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
