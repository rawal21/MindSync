

import { Header } from './DashboadComponent/Header'
import { StatsCards } from './DashboadComponent/StatsCards'
import { MoodChart } from './DashboadComponent/MoodChart'
import { RecentJournalEntries } from './DashboadComponent/RecentJournalEntries'
import { SupportCommunity } from './DashboadComponent/SupportCommunity'
import { QuickMoodInput } from './DashboadComponent/QuickMoodInput'
import { DailyAffirmation } from './DashboadComponent/DailyAffirmation'
import { Achievements } from './DashboadComponent/Achievements'
import { UpcomingActivities } from './DashboadComponent/UpcomingActivities'


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <StatsCards />
        <MoodChart />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <RecentJournalEntries />
          <SupportCommunity />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <QuickMoodInput />
          <DailyAffirmation />
          <Achievements />
        </div>
        <UpcomingActivities />
      </main>
    </div>
  )
}

