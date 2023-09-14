'use client'

import { useUserProfile } from '@/store/userStore'
import { useState } from 'react'

export default function Clabe() {
  const [open, setOpen] = useState(false)
  const { walletId, name } = useUserProfile()

  const handleRead = () => {
    setOpen(false)
  }

  const handdleCopy = () => {
    const clabe = document.getElementById('quote')

    if (clabe) {
      const textToCopy = clabe.textContent
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
      }
    }
    setOpen(true)
    console.log('copiado')
  }

  return (
    <>
      <div className=" min-h-[763px]">
        <div className="w-[1142px] h-[216px] bg-white rounded-lg shadow-[0px_4px_4px_0px_#00000025] p-4 flex justify-between ">
          <div className="flex flex-col space-y-2">
            <div
              id="quote"
              className="text-base font-normal leading-normal text-black"
            >
              {walletId.cvu}
            </div>
            <div className="text-base font-normal leading-normal text-neutral-500">
              CLABE interbancaria
            </div>
            <div className="text-base font-normal leading-normal text-black">
              {name}
            </div>
            <div className="text-base font-normal leading-normal text-neutral-500">
              Beneficiario
            </div>
            <div className="text-base font-normal leading-normal text-black">
              STP
            </div>
            <div className="text-base font-normal leading-normal text-neutral-500">
              Banco receptor
            </div>
          </div>
          <button
            onClick={handdleCopy}
            className="text-xs font-normal leading-normal text-sky-500 mb-36 "
          >
            Copiar
          </button>
        </div>
        <div className="w-[1142px] h-[237px] bg-white rounded-lg shadow-[0px_4px_4px_0px_#00000025] p-4 flex justify-between mt-5">
          <div className="flex flex-col space-y-2">
            <div className="text-base font-semibold leading-normal text-black">
              Como ingresar dinero por SPEI
            </div>
            <div className="w-[708px]">
              <span className="text-base font-normal leading-normal text-neutral-500">
                Comparte tus datos para que puedan transferirte desde otra
                cuenta o hazlo desde tu banca en línea:
                <br />
              </span>
              <span className="text-base font-normal leading-normal text-neutral-500">
                1. Desde el portal de tu banco, selecciona la opción para
                transferir a una nueva cuenta.
                <br />
                2. Elige “Sistema de Transferencias y Pagos” (STP) como banco
                receptor.
                <br />
                3. Ingresa tus datos y los 18 dígitos de tu CLABE.
                <br />
                4. Indica el monto que quieres transferir y confirma.
                <br />
              </span>
              <span className="text-base font-normal leading-normal text-neutral-500">
                Tu dinero estará disponible al instante.
              </span>
            </div>
          </div>
        </div>
        {open && (
          <div className="absolute top-[90%] right-[40%] ">
            <span
              onClick={handleRead}
              className="w-[748px] p-2 text-white font-ligth px-10 py-4 bg-[#00a650] rounded-md cursor-pointer "
            >
              Listo ya copiaste tu CLABE
            </span>
          </div>
        )}
      </div>
    </>
  )
}
function getElementById(arg0: string) {
  throw new Error('Function not implemented.')
}
