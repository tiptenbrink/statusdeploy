import { useDeno } from 'aleph/react'
import React from 'react'
import openTab from '~/lib/openTab.ts'
import Footer from '~/components/footer.tsx'
import Status from '~/components/status.tsx'


export default function Home() {
  
  return (
    <div className="page">
      <head>
        <title>Status Deploy</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <div id="tabs" className="tab">
            <button onClick={(e) => openTab(e, "status")}>Status</button>
            <button onClick={(e) => openTab(e, "deploy")}>Deploy</button>
        </div>
        <div id="sd">
            <div id="status" className="tabcontent">
                <h2>Status</h2>
                <Status server="https://sd.tipten.nl/alive" />
                <Status server="https://reminders.tipten.nl/alive" />
                <Status server="https://utilities.tipten.nl/alive" />

            </div>
            <div id="deploy" className="tabcontent">
                <h2>Deploy</h2>

            </div>
        </div>
        <Footer />
    </div>
  )
}
