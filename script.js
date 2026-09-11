/* =================================
   SCENE CONTROL
================================= */

const scenes = document.querySelectorAll(".scene");

function showScene(sceneId) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    document.getElementById(sceneId).classList.add("active");
}


/* =================================
   INTRO → GARDEN
================================= */

document.getElementById("enterGarden").addEventListener("click", () => {

    showScene("garden");

});


/* =================================
   GARDEN → FLOWER HUNT
================================= */

document.getElementById("startMission").addEventListener("click", () => {

    showScene("flowerHunt");

});


/* =================================
   FLOWER SYSTEM
================================= */

let flowersFound = 0;

const flowerMessages = {

    1: "For more little things that make you happy. 🌷",

    2: "For more random laughs and good conversations. 🌻",

    3: "For more moments worth remembering. 🌼",

    4: "For more good food, good sleep, and fewer unnecessary headaches. 😂",

    5: "For whatever you're hoping this year will bring. 🌸"

};


const flowers = document.querySelectorAll(".flower");

const flowerMessage = document.getElementById("flowerMessage");
const flowerNumber = document.getElementById("flowerNumber");
const flowerText = document.getElementById("flowerText");
const closeFlowerMessage = document.getElementById("closeFlowerMessage");

let clickedFlowers = [];


flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        const number = flower.dataset.flower;

        if (clickedFlowers.includes(number)) {
            return;
        }

        clickedFlowers.push(number);

        flowersFound++;

        document.getElementById("foundCount").textContent = flowersFound;

        flowerNumber.textContent = `Flower #${number}`;

        flowerText.textContent = flowerMessages[number];

        flowerMessage.classList.remove("hidden");

        flower.style.opacity = "0.35";

    });

});


/* =================================
   CLOSE FLOWER MESSAGE
================================= */

closeFlowerMessage.addEventListener("click", () => {

    flowerMessage.classList.add("hidden");

    if (flowersFound === 5) {

        setTimeout(() => {

            showScene("lilyScene");

        }, 500);

    }

});


/* =================================
   LILY → BIRTHDAY
================================= */

document.getElementById("bloomLily").addEventListener("click", () => {

    document.getElementById("lilyPlant").textContent = "🤍";

    document.getElementById("lilyIntro").textContent =
        "Some things take a little longer to bloom.";

    document.getElementById("lilyText").textContent =
        "And sometimes, the wait makes them even more special.";

    setTimeout(() => {

        showScene("birthday");

    }, 2500);

});


/* =================================
   BIRTHDAY → LETTER
================================= */

document.getElementById("openLetter").addEventListener("click", () => {

    showScene("letter");

});


/* =================================
   LETTER → FINISHED GARDEN
================================= */

document.getElementById("finish").addEventListener("click", () => {

    showScene("garden");

});
