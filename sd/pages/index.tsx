import { useDeno } from 'aleph/react'
import React, { useState } from 'react'
import Footer from '~/components/footer.tsx'
import StatusContent from '~/components/statusContent.tsx'
import DeployContent from '~/components/deployContent.tsx'
import Filler from '~/components/filler.tsx'


export default function Home() {
  
  const [activeTab, setActiveTab] = useState(-1)

  return (
    <div className="page">
      <head>
        <title>Status Deploy</title>
        <link rel="stylesheet" href="../style/index.css" />
        <script src="https://kit.fontawesome.com/25e7972463.js" crossOrigin="anonymous"></script>
      </head>
        <div id="tabs" className="tab">
            <button className={0 == activeTab ? 'active' : ''} onClick={() => setActiveTab(0)}>Status</button>
            <button className={1 == activeTab ? 'active' : ''} onClick={() => setActiveTab(1)}>Deploy</button>
        </div>
        <div id="sd">
            <div id="status" className={0 == activeTab ? 'tabcontent active' : 'tabcontent'}>
                <StatusContent />
            </div>
            <div id="deploy" className={1 == activeTab ? 'tabcontent active' : 'tabcontent'}>
                <DeployContent />

            </div>
        </div>

        <div className="spacer"></div>
        <Footer />
    </div>
  )
}
