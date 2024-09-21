interface Modalprops {
    modalOpen: boolean;
    setModalOpen :(open: boolean) => boolean | void ;
    children: React.ReactNode
}
export const Modal: React.FC<Modalprops>= ({modalOpen,setModalOpen,children}) => {
  return (
    <div  className={`modal ${modalOpen ? "modal-open" : ""}`}>

    <div className={`modal-box w-full max-w-6xl `}>
        <form method="dialog">
      {/* if there is a button in form, it will close the modal */}

      <button 
      onClick={()=> setModalOpen(false)}
       className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    {children}

  </div>
      </div>
  )
}
