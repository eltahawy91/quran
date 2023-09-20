let mega = document.getElementById("mega-menu")
let bodyMega = document.getElementById("body-mega")
let close = document.getElementById("close-menu")
const body = document.body
mega.addEventListener("click", () => {

    bodyMega.style.right = "0"
})
close.addEventListener("click", () => {
    bodyMega.style.right = "-150%"
})

function updateClock() {
    var clock = document.getElementById('clock');
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Add leading zeros if needed
    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;

    // Format the time as HH:MM:SS
    var time = hours + ':' + minutes + ':' + seconds;

    // Update the clock element
    clock.textContent = time;
}

// Update the clock every second
setInterval(updateClock, 1000);


//////////hadith
let hadithContainer = document.querySelector(".hadithContainer")
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
let number = document.querySelector(".number span")
let numberhad = document.querySelector(".number")
let numberHadith = document.querySelector(".number .length")
let hadithIndex = 0
function hadithChanger() {
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
        .then((response) => response.json())
        .then((data) => {
            let Hadiths = data.data.hadiths
            hadithContainer.innerHTML = Hadiths[hadithIndex].arab
            numberhad.innerHTML = `${Hadiths.length} - ${hadithIndex}`
            next.addEventListener("click", () => {
                hadithIndex++
                hadithContainer.innerHTML = Hadiths[hadithIndex].arab
                number.innerHTML = hadithIndex + 1
                if (hadithIndex === 299) {
                    hadithIndex = 0

                }
                numberhad.innerHTML = `${Hadiths.length} - ${hadithIndex}`

            })
            prev.addEventListener("click", () => {
                hadithIndex--
                hadithContainer.innerHTML = Hadiths[hadithIndex].arab
                number.innerHTML = hadithIndex + 1
                console.log(hadithIndex);
                if (hadithIndex === 0) {
                    hadithIndex = 299
                }
                numberhad.innerHTML = `${Hadiths.length} - ${hadithIndex}`

            })
        })
}
hadithChanger()
let accident = document.querySelector(".accident")
let hadith = document.querySelector(".hadith")

accident.addEventListener("click", () => {
    hadith.scrollIntoView(
        {
            behavior: "smooth"
        }
    )
})
// quran
const allSura = document.getElementById("allSura")
////// sura div

const ayatCont = document.querySelector(".ayat p")

getSura()
function getSura() {
    fetch('http://api.alquran.cloud/v1/meta')
        .then((response) => response.json())
        .then((data) => {
            let surahs = data.data.surahs.references;
            let numberOfSurah = 114;
            allSura.innerHTML = ""
            for (let i = 0; i < numberOfSurah; i++) {
                allSura.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12">
                     <div class="alsoura">
                         <div class="name-num">
                             <div class="number"><span>${surahs[i].number}</span></div>
                             <span class="name">${surahs[i].name}</span>
                         </div>
                         <div class="numAya"> ${surahs[i].numberOfAyahs} آيات </div>
                      </div>
                </div> 
                `
            }
            let surasTitle = document.querySelectorAll(".alsoura")
            let suraPopUp = document.querySelector(".suraPopUp")     //// mega menu for ayat
            let ayatCont = document.querySelector(".ayat")
            surasTitle.forEach((title, index) => {
                // console.log(title);
                title.addEventListener("click", () => {
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then((response) => response.json())
                        .then((data) => {
                            ayatCont.innerHTML = "";
                            let ayatSura = data.data.ayahs
                            ayatSura.forEach((aya) => {
                                suraPopUp.style.transform = "translateX(0%)"
                                ayatCont.innerHTML += `
                                <p> (${aya.numberInSurah}) - ${aya.text}</p>
                                `
                            })
                        })
                })

            })
            //sound of surah
            surasTitle.forEach((sound, index) => {
                let audio = document.querySelector(".audio")
                sound.addEventListener("click", () => {
                    fetch(`https://quran-endpoint.vercel.app/quran/${index + 1}`)
                        .then((response) => response.json())
                        .then((data) => {
                            let data_of_data = data.data.recitation.full
                            console.log(data_of_data);
                            audio.src = data_of_data
                        })
                })
            })
        })
}
const suraPopUp = document.querySelector(".suraPopUp")     //// mega menu for ayat
const closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", () => {
    suraPopUp.style.transform = "translateX(100%)"
})


////////pray time

let cards = document.querySelector(".card-pray")


function getPrayTime() {

    const api = `http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8`;
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            let prayData = data.data.timings
            for (time in prayData) {
                // console.log(prayData);



                cards.innerHTML += `
                <div class="col-lg-2 col-md-4 col-sm-6">
                     <div class="cards card-pray">
                          <div class="card-pray">
                              <div class="namePray">${time}</div>
                              <div class="time">
                                  <span>${prayData[time]}</span>
                                  <small class="stat">pm</small>
                              </div>
                           </div>
                     </div>
                </div>
                
                `
            }


        })


}
getPrayTime()

let date = document.getElementById("date")
let dataTime = new Date()
date.innerHTML = dataTime.getFullYear()