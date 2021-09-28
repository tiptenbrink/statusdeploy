function openStatus(tab) {
    openTab(tab, "status")
}
window.openStatus = openStatus;

function openDeploy(tab) {
    openTab(tab, "deploy")
}
window.openDeploy = openDeploy;

function openTab(tab, tab_name) {
    for (let other_tab of document.querySelector("#tabs").children) {
        other_tab.classList.remove("active");
    }
    tab.classList.add("active");
    let tabcontent_div = document.querySelector("#" + tab_name);
    for (let child of document.querySelector("#sd").children) {
        child.classList.remove("active");
    }
    tabcontent_div.classList.add("active");
}

