import React from 'react'

type DeployableProps = {
    server: string
}

export default function Deployable({ server }: DeployableProps) {
    
    return (
        <p className="deployable"> 
            {server}
            {' '}
            <span className="icon-container"><a href="https://github.com/tiptenbrink/tiauth" className="icon"></a>
            <img src="https://github.com/tmtenbrink/maturin-manylinux-wheels-action/actions/workflows/test.yml/badge.svg" alt="workflow status"></img></span>
            {' '}
            <button>Deploy from Docker <i className="fab fa-docker"></i></button>
        </p>
          
    )
}