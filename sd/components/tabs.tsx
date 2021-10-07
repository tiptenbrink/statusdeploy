import React, { useState } from 'react'

export type Tab = {
    name: string,
    tab: JSX.Element
}

export type TabStructure = {
    tabs: Array<Tab>
    defaultTab: number
}

type TabProps = {
    tabStructure: TabStructure
}

export default function Tabs({ tabStructure }: TabProps) {
    if (tabStructure.defaultTab >= tabStructure.tabs.length || tabStructure.defaultTab < 0)
    {
        tabStructure.defaultTab = 0
    }
    
    const [activeTab, setActiveTab] = useState(tabStructure.defaultTab)
    console.log(tabStructure.tabs[0].tab)
    
    return (
        <div>
            <div className="tab">
                {tabStructure.tabs.map((tab, i) => {
                    <button className={i == activeTab ? 'active' : ''} onClick={() => setActiveTab(i)}>{tab.name}</button>
                })}
            </div>
            {tabStructure.tabs.map((tab, i) => {
                <div className={i == activeTab ? 'tabcontent active' : 'tabcontent'}>{tab.name}</div>
            })}
        </div>  
    )
}