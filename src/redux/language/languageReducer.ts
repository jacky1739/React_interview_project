import i18n from 'i18next'
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from './languageActions' 

export interface LanguageState {
  language: "en" | "zh",
  languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en"}
  ]
}

// 使用參數傳入的就數據, 透過action的指令對數據作出處理, 輸出一個新的數據
export default (state = defaultState, action: LanguageActionTypes) => {
  console.log(state)
  switch(action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload)
      return { ...state, language: action.payload}
    case ADD_LANGUAGE:
      return { ...state, languageList: [...state.languageList, action.payload]}
  }
  return state
}
