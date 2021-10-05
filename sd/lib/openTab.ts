
import React from 'react'

export default function openTab(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tab_name: string) {
    const tab = event.currentTarget
    const tabChildren = document.querySelector("#tabs").children;
    for (let i = 0; i < tabChildren.length; i++) {
        tabChildren[i].classList.remove("active");
    }
    tab.classList.add("active");
    const tabcontent_div = document.querySelector("#" + tab_name);
    const sdChildren = document.querySelector("#sd").children;
    for (let i = 0; i < sdChildren.length; i++) {
        sdChildren[i].classList.remove("active");
    }
    tabcontent_div.classList.add("active");
}