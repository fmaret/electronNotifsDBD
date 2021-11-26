const puppeteer = require('puppeteer')
const fs = require("fs")

module.exports.getData = async () => {
  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // 2 - Naviguer jusqu'à l'URL cible
  await page.goto('https://deadbydaylight.fandom.com/wiki/Shrine_of_Secrets')
  //await page.waitFor(1000) // fait une pause d'une seconde

  // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    let lignes = document.querySelector(".sosTable").querySelectorAll(".sosRow");
    let data = [];
    for (let i=0;i<lignes.length;i++){
        let logoPerk = lignes[i].querySelector("a").href
        let ligne = lignes[i].querySelectorAll('td')
        let nomPerk = ligne[0].innerText
        let nomPerso = ligne[2].innerText
        data.push({logoPerk, nomPerk, nomPerso})
    }
    
    return data
  })

  browser.close()

  let shrines = []
 
  try {
    shrines = JSON.parse(fs.readFileSync("./shrines.json", {encoding: "utf-8"}))
  } catch {}
  
  if (shrines[0]?.nomPerk == result[0]?.nomPerk) return false

  fs.writeFileSync("./shrines.json", JSON.stringify(result), {encoding: "utf-8"})

  // 4 - Retourner les données (et fermer le navigateur)
  return true
}