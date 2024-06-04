import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPopUp({isOpen, setIsOpen, Msg, Status}) {
  
    const navigate = useNavigate();
    console.log(Status)
    console.log(Msg)
  return (
    <>      
      <Transition appear show={isOpen}>
        <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll">            
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none">
                <Dialog
              as="div"
              className="relative z-50 focus:outline-none"
              onClose={()=> setIsOpen(false)}
            >
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-full max-w-md rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-6 backdrop-blur-2xl">
                      <DialogTitle
                        as="h3"
                        className="text-base/7 font-medium text-white"
                      >

                        {Status === 1 ? (<h1 className="text-base/7 font-medium text-[2xl] text-white">Login Successfull</h1>) : (<h1 className="text-base/7 font-medium text-[2xl] text-white">Login Failed</h1>) }
                      </DialogTitle>                      
                      <p className="mt-2 text-sm/6 text-white/80">
                        {Msg}
                      </p>
                      <div className="mt-4">
                        <Button
                          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                          onClick={() => {Status === 1 ? navigate("/") : setIsOpen(false)} }
                        >
                          {Status === 1 ? <span>Go to Dashboard</span> : <span>Try Again</span>}
                        </Button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
            </div>
            
          </div>
        </div>
      </Transition>
    </>
  );
}
export default LoginPopUp