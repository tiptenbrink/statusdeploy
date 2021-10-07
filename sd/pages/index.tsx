import { useDeno } from 'aleph/react'
import React, { useState } from 'react'
import openTab from '~/lib/openTab.ts'
import Footer from '~/components/footer.tsx'
import Status from '~/components/status.tsx'
import Filler from '~/components/filler.tsx'
import SdTabs from '~/components/sdTabs.tsx'


export default function Home() {
  
  const [activeTab, setActiveTab] = useState(-1)

  return (
    <div className="page">
      <head>
        <title>Status Deploy</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
        <div id="tabs" className="tab">
            <button className={0 == activeTab ? 'active' : ''} onClick={() => setActiveTab(0)}>Status</button>
            <button className={1 == activeTab ? 'active' : ''} onClick={() => setActiveTab(1)}>Deploy</button>
        </div>
        <div id="sd">
            <div id="status" className={0 == activeTab ? 'tabcontent active' : 'tabcontent'}>
                <h2>Status</h2>
                <Status server="https://reminders.tipten.nl/alive" />
                <Status server="https://utilities.tipten.nl/alive" />
                <Status server="https://auth.tipten.nl/alive" />
                <Status server="https://www.tiptenbrink.nl/alive" />

            </div>
            <div id="deploy" className={1 == activeTab ? 'tabcontent active' : 'tabcontent'}>
                <h2>Deploy</h2>

            </div>
        </div>

        <div className="spacer"></div>
        <Footer />
    </div>
  )
}
