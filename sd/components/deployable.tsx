import React from 'react'
import getRunInfo from '~/lib/runInfo.ts'

type DeployableProps = {
    server: string
}

export default function Deployable({ server }: DeployableProps) {
    const [runInfo, isSyncing] = getRunInfo()

    return (
        <div className="deployable">
            <p> 
                {server}
                {' '}
                <button>Deploy from Docker <i className="fab fa-docker"></i></button>
            </p>
            {runInfo.map(run => {
                let info = run.conclusion
                let icon = (<>...</>)
                if (info === null) {
                    info = run.status
                    icon = (<svg viewBox="0 0 172 172" style={{ width: '1em', height: '1em' }}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1c40f"><path d="M111.08333,25.0905l46.58333,6.0415l-38.356,36.95133zM60.91667,146.91667l-46.58333,-6.0415l38.356,-36.9585z"></path><path d="M28.66667,86c0,-31.66592 25.66742,-57.33333 57.33333,-57.33333c3.66933,0 7.24192,0.37983 10.72133,1.03917l2.48325,-13.84958c-4.15667,-1.12158 -8.68242,-1.505 -13.20458,-1.505c-39.60658,0 -71.66667,32.06008 -71.66667,71.66667c0,17.35767 6.0415,33.9485 17.35767,46.76608l10.88258,-9.42058c-8.64658,-10.0405 -13.90692,-23.07667 -13.90692,-37.36342zM141.44492,40.37342l-11.26242,9.09092c8.213,9.91867 13.15083,22.65025 13.15083,36.53567c0,31.66592 -25.66742,57.33333 -57.33333,57.33333c-3.68725,0 -7.28492,-0.37983 -10.77867,-1.04633l-2.42233,13.51275c4.52217,0.7525 9.04792,1.13592 13.201,1.13592c39.60658,0 71.66667,-32.06008 71.66667,-71.66667c0,-15.84192 -5.65808,-32.06367 -16.22175,-44.89558z"></path></g></g></svg>)
                }
                else {
                    icon = (<svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#00acc1" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#e0f7fa" d="M24 8A16 16 0 1 0 24 40A16 16 0 1 0 24 8Z"></path></svg>)
                    if (info === "success") {
                        icon = (<svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path></svg>)
                    }
                    else if (info === "failure") {
                        icon = (<svg viewBox="0 0 48 48" style={{ width: '1em', height: '1em' }}><path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path></svg>)
                    }
                }

                icon = (<span title={info} className="icon-container">{icon}</span>)
                return (
                    <p>{icon} <a href={run.html_url}>{run.name}</a></p>
                )
            })}
        </div>
          
    )
}