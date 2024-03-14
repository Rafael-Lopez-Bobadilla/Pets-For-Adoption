import { useSearchParams } from 'react-router-dom'
import { Pagination as PaginationMui } from '@mui/material'
import s from './Pagination.module.css'
const Pagination = ({ pageCount }: { pageCount: number }) => {
  const [params, setParams] = useSearchParams()
  let page = Number(params.get('page'))
  const handleChange = (_e: any, value: number) => {
    setParams(params => {
      params.set('page', value.toString())
      return params
    })
  }
  return (
    <div className={s.pagination}>
      <PaginationMui count={pageCount} boundaryCount={0} siblingCount={1}
        onChange={handleChange} page={page}
        sx={{
          '& .MuiButtonBase-root': {
            '@media(min-width: 768px)': {
              fontSize: '18px',
              minWidth: '40px',
              height: '40px',
              borderRadius: '20px'
            }
          },
          '& .MuiSvgIcon-root': {
            '@media(min-width: 768px)': {
              width: '25px',
              height: '25px'
            }
          }
        }} />
    </div>
  )
}

export default Pagination