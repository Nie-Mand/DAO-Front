import Features from 'utils/components/Features'
import Hero from 'utils/components/Hero'
import Cool from 'utils/components/Cool'
import Campaigns from 'utils/components/Campaigns'
export default function Home() {
  return (
    <div className="font-syne">
      <Hero />
      <Features />
      <Cool />
      <Campaigns />
    </div>
  )
}
