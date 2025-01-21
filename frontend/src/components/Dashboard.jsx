// import React from 'react';
// import { Link } from 'react-router-dom';
// import MoodJournal from './MoodJournal';
// import FacialExpressionTracker from './FacialExpressionTracker';
// import WellnessRoutines from './WellnessRoutines';
// import CommunityChat from './CommunityChat';

// const Dashboard = () => {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container">
//           <Link to="/dashboard" className="navbar-brand">MindWell</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link to="/dashboard" className="nav-link">Dashboard</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/" className="nav-link">Logout</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         <h1 className="mb-4">Welcome to Your Dashboard</h1>
//         <div className="row">
//           <div className="col-md-6 mb-4">
//             <MoodJournal />
//           </div>
//           <div className="col-md-6 mb-4">
//             <FacialExpressionTracker />
//           </div>
//           <div className="col-md-6 mb-4">
//             <WellnessRoutines />
//           </div>
//           <div className="col-md-6 mb-4">
//             <CommunityChat />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

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

