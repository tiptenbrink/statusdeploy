

function openStatus(tab: HTMLDivElement) {
    openTab(tab, "status");
}
window.openStatus = openStatus;

function openDeploy(tab: HTMLDivElement) {
    openTab(tab, "deploy");
}
window.openDeploy = openDeploy;

function openTab(tab: HTMLDivElement, tab_name: string) {
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

