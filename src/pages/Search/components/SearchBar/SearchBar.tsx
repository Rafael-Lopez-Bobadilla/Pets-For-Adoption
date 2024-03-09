import s from './SearchBar.module.css'
import pencil from '../../../../assets/svgs/pencil.svg'
import { useState } from 'react'
import OverlaySearch from './components/OverlaySearch/OverlaySearch'
import Message from './components/Message/Message'
import Controllers from './components/Controllers/Controllers'
const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={s.bar}>
      <div className={s.wrapper}>
        <Message />
        <img src={pencil} onClick={() => setIsOpen(true)} />
        <Controllers />
        {isOpen &&
          <OverlaySearch setIsOpen={setIsOpen} />
        }
      </div>
    </div >
  )
}

export default SearchBar