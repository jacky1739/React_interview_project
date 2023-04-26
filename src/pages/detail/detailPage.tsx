import React from 'react'
import { useParams } from 'react-router-dom'

// type MatchParams = {
//   touristRouteId: string,
//   other: string
// }

interface MatchParams2 {
  touristRouteId: string
}

export const DetailPage: React.FC = () => {
    // let params = useParams<"touristRouteId">
  let params = useParams<keyof MatchParams2>()
  return (
    <h1>旅遊路線詳情頁面, 路線id: {params.touristRouteId}</h1>
  )
}