import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState } from './store'

export const useSelector:  TypedUseSelectorHook<RootState> = useReduxSelector