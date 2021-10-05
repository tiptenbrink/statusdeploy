function openStatus(tab) {
    openTab(tab, "status");
}
window.openStatus = openStatus;
function openDeploy(tab) {
    openTab(tab, "deploy");
}
window.openDeploy = openDeploy;
function openTab(tab, tab_name) {
    var tabChildren = document.querySelector("#tabs").children;
    for (var i = 0; i < tabChildren.length; i++) {
        tabChildren[i].classList.remove("active");
    }
    tab.classList.add("active");
    var tabcontent_div = document.querySelector("#" + tab_name);
    var sdChildren = document.querySelector("#sd").children;
    for (var i = 0; i < sdChildren.length; i++) {
        sdChildren[i].classList.remove("active");
    }
    tabcontent_div.classList.add("active");
}
