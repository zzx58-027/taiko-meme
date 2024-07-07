import AdditionalCard from './additional'
import GlobalRankCard from './global'
import SummaryCard from './summary'

const Dashboard = () => {
  return (
    <div className="flex gap-1">
      <GlobalRankCard></GlobalRankCard>
      <SummaryCard></SummaryCard>
      <AdditionalCard></AdditionalCard>
    </div>
  )
}

export default Dashboard
