const { ipcRenderer } = require("electron");
const { readFileSync } = require("fs")
const ipc = ipcRenderer;

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp');
})

window.onload = () => {
    console.log("coucou")
    const shrines = JSON.parse(readFileSync("./shrines.json", { encoding: "utf-8" }))
    const shrines_div = document.getElementById('shrineInfos')

    function shrineHTML(shrine) {
        return `
        <div class="text-center">
            <img class="mx-auto" src="${shrine.logoPerk}" style="width:7rem;">
            <p class="pb-0 mb-0">${shrine.nomPerk}</p>
        </div>
        `
    }

    shrines_div.innerHTML = `
    <div class="row justify-content-center">
        <div class="col-4"></div>
        <div class="col-4 d-flex justify-content-center">
            ${shrineHTML(shrines[0])}
        </div>
        <div class="col-4"></div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4 d-flex justify-content-center">
            ${shrineHTML(shrines[1])}
        </div>
        <div class="col-4"></div>
        <div class="col-4 d-flex justify-content-center">
            ${shrineHTML(shrines[2])}
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-4"></div>
        <div class="col-4 d-flex justify-content-center">
            ${shrineHTML(shrines[3])}   
        </div>
        <div class="col-4"></div>
    </div>
    `
}
