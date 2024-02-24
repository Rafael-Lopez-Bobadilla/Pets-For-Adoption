import s from './TokenError.module.css'
import reload from '../../assets/svgs/reload.svg'
const TokenError = ({ reloadToken }: { reloadToken: () => void }) => {
  return (
    <div className={s.container}>
      <h1>Something went wrong...</h1>
      <button onClick={reloadToken}>Try again
        <img src={reload} />
      </button>
    </div>
  )
}

export default TokenError