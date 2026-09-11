// =========================================================
// SCENE CONTROL
// =========================================================

const scenes = document.querySelectorAll(".scene");


function showScene(sceneId) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const targetScene = document.getElementById(sceneId);

    if (targetScene) {
        targetScene.classList.add("active");
    }
}


// =========================================================
// INTRO → GARDEN
// =========================================================

const enterGarden =
    document.getElementById("enterGarden");

enterGarden.addEventListener("click", () => {

    showScene("garden");

});


// =========================================================
// GARDEN → FLOWER HUNT
// =========================================================

const startMission =
    document.getElementById("startMission");

startMission.addEventListener("click", () => {

    showScene("flowerHunt");

});


// =========================================================
// FLOWER HUNT
// =========================================================

let flowersFound = 0;

let clickedFlowers = [];


const flowerMessages = {

    1:
        "For more little things that make you happy. 🌷",

    2:
        "For more random laughs and good conversations. 🌻",

    3:
        "For more moments worth remembering. 🌼",

    4:
        "For more good food, good sleep, and fewer unnecessary headaches. 😂",

    5:
        "For whatever you're hoping this year will bring. 🌸"

};


const flowers =
    document.querySelectorAll(".flower");

const flowerMessage =
    document.getElementById("flowerMessage");

const flowerNumber =
    document.getElementById("flowerNumber");

const flowerText =
    document.getElementById("flowerText");

const closeFlowerMessage =
    document.getElementById("closeFlowerMessage");

const foundCount =
    document.getElementById("foundCount");


// =========================================================
// SPARKLES
// =========================================================

function createSparkles(flower) {

    for (let i = 0; i < 7; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent = "✦";


        const angle =
            (Math.PI * 2 * i) / 7;

        const distance =
            35 + Math.random() * 25;


        sparkle.style.setProperty(
            "--sparkle-x",
            `${Math.cos(angle) * distance}px`
        );

        sparkle.style.setProperty(
            "--sparkle-y",
            `${Math.sin(angle) * distance}px`
        );


        sparkle.style.left = "50%";
        sparkle.style.top = "30%";


        flower.appendChild(sparkle);


        setTimeout(() => {
            sparkle.remove();
        }, 900);

    }

}


// =========================================================
// FLOWER CLICKING
// =========================================================

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        const number =
            flower.dataset.flower;


        if (clickedFlowers.includes(number)) {
            return;
        }


        clickedFlowers.push(number);

        flowersFound++;


        foundCount.textContent =
            flowersFound;


        flower.classList.add("blooming");


        createSparkles(flower);


        setTimeout(() => {

            flower.classList.remove("blooming");

            flower.classList.add("found");

        }, 750);


        flowerNumber.textContent =
            `Flower #${number}`;

        flowerText.textContent =
            flowerMessages[number];


        setTimeout(() => {

            flowerMessage.classList.remove("hidden");

        }, 350);

    });

});


// =========================================================
// CLOSE FLOWER MESSAGE
// =========================================================

closeFlowerMessage.addEventListener("click", () => {

    flowerMessage.classList.add("hidden");


    if (flowersFound === 5) {

        setTimeout(() => {

            showScene("lilyScene");

        }, 600);

    }

});


// =========================================================
// LILY STORY
// =========================================================

const bloomLily =
    document.getElementById("bloomLily");

const lilyScene =
    document.getElementById("lilyScene");

const lilyPlant =
    document.getElementById("lilyPlant");

const lilyIntro =
    document.getElementById("lilyIntro");

const lilyText =
    document.getElementById("lilyText");


let lilyStarted = false;


bloomLily.addEventListener("click", () => {

    if (lilyStarted) {
        return;
    }

    lilyStarted = true;


    // Hide button
    lilyScene.classList.add("lily-growing");


    // -----------------------------------------------------
    // PHASE 1
    // The plant begins growing
    // -----------------------------------------------------

    lilyIntro.textContent =
        "It didn't look like much at first.";

    lilyText.textContent =
        "But maybe it was just taking its time.";


    lilyPlant.classList.add("growing");


    // -----------------------------------------------------
    // PHASE 2
    // Horizontal shoot appears
    // -----------------------------------------------------

    setTimeout(() => {

        lilyIntro.textContent =
            "Then something started to change...";

        lilyText.textContent =
            "A little shoot reached out from the plant.";

    }, 2200);


    // -----------------------------------------------------
    // PHASE 3
    // Bud appears
    // -----------------------------------------------------

    setTimeout(() => {

        lilyPlant.classList.add("budding");

        lilyIntro.textContent =
            "And then...";

        lilyText.textContent =
            "Something was finally beginning to bloom.";

    }, 4500);


    // -----------------------------------------------------
    // PHASE 4
    // Lily opens
    // -----------------------------------------------------

    setTimeout(() => {

        lilyPlant.classList.add("bloomed");

        lilyIntro.textContent =
            "Some things take a little longer to bloom.";

        lilyText.textContent =
            "And sometimes, the wait makes them even more special.";

    }, 6500);


    // -----------------------------------------------------
    // PHASE 5
    // Birthday reveal
    // -----------------------------------------------------

    setTimeout(() => {

        showScene("birthday");

    }, 9500);

});


// =========================================================
// BIRTHDAY → LETTER
// =========================================================

const openLetter =
    document.getElementById("openLetter");

openLetter.addEventListener("click", () => {

    showScene("letter");

});


// =========================================================
// LETTER → GARDEN
// =========================================================

const finish =
    document.getElementById("finish");

finish.addEventListener("click", () => {

    showScene("garden");

});
