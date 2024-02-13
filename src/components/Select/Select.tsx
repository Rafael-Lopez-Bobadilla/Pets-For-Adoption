import s from './Select.module.css'
import arrowDown from '../../assets/svgs/arrowDown.svg'
import { useSearchParams } from 'react-router-dom'
import { useRef, useState } from 'react'

type SelectType = {
  options: string[],
  field: string
}
const Select = ({ options, field }: SelectType) => {
  const [params, setParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleChange = (option: string) => {
    let newParams: URLSearchParams
    if (field === 'type') {
      newParams = new URLSearchParams()
    } else {
      newParams = new URLSearchParams(params)
    }
    newParams.set(field, option.toLowerCase())
    setParams(newParams)
    buttonRef.current?.blur()
  }
  const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      setIsOpen(true)
      return
    }
    if (e.code === 'Enter') {
      handleChange(options[selected])
      buttonRef.current?.blur()
      return
    }
    let nextSelected = selected
    if (e.code === 'ArrowDown' && selected < options.length - 1) nextSelected += 1
    if (e.code === 'ArrowUp' && selected > 0) nextSelected -= 1
    setSelected(nextSelected)
  }
  const capitalizeWords = (str: string) => {
    const words = str.split(' ')
    return words.map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
  }

  return (
    <div className={s.select}>
      <button onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)} ref={buttonRef}
        onKeyDown={handleKey}>
        {params.get(field) ? capitalizeWords(params.get(field) as string) : options[0]}
        <img src={arrowDown} />
      </button>
      {isOpen &&
        <div className={s.options} onMouseDown={e => e.preventDefault()}>
          {options?.map((option, index) => <div key={option}
            onClick={() => handleChange(option)}
            className={selected === index ? s.selected : ''}
          >{option}</div>)}
        </div>}
    </div>
  )
}

export default Select