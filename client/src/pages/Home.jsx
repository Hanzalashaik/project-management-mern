import React from 'react'
import StatusBar from "../components/StatusBar.jsx"
import SideBar from "../components/SideBar.jsx"
import PieChart from "../../utils/PieChart.jsx"

export default function Home() {
  return (
    <div className='flex '>
        <SideBar />
        <div className='w-full'>
          <StatusBar />
          <div>
            <h1 className='mx-9 my-4 text-2xl italic'>Dashboard</h1>
            <PieChart />
          </div>
        </div>

      </div>
  )
}
