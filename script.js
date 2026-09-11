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

const enterGarden = document.getElementById("enterGarden");

enterGarden.addEventListener("click", () => {

    showScene("garden");

});


// =========================================================
// GARDEN → FLOWER HUNT
// =========================================================

const startMission = document.getElementById("startMission");

startMission.addEventListener("click", () => {

    showScene("flowerHunt");

});


// =========================================================
// FLOWER HUNT VARIABLES
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


// =========================================================
// FLOWER ELEMENTS
// =========================================================

const flowers = document.querySelectorAll(".flower");

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
// SPARKLE CREATION
// =========================================================

function createSparkles(flower) {

    for (let i = 0; i < 7; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent = "✦";


        // Spread sparkles around the flower

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


        // Remove sparkle after animation

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


        // Prevent the same flower
        // from being collected twice

        if (clickedFlowers.includes(number)) {
            return;
        }


        // Remember this flower

        clickedFlowers.push(number);


        // Increase counter

        flowersFound++;


        foundCount.textContent =
            flowersFound;


        // Bloom animation

        flower.classList.add("blooming");


        // Create sparkle effect

        createSparkles(flower);


        // After the bloom animation,
        // keep the flower glowing

        setTimeout(() => {

            flower.classList.remove("blooming");

            flower.classList.add("found");

        }, 750);


        // Set popup information

        flowerNumber.textContent =
            `Flower #${number}`;

        flowerText.textContent =
            flowerMessages[number];


        // Show popup

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


    // Once all five flowers are found,
    // continue to the lily scene

    if (flowersFound === 5) {

        setTimeout(() => {

            showScene("lilyScene");

        }, 600);

    }

});


// =========================================================
// LILY SCENE
// =========================================================

const bloomLily =
    document.getElementById("bloomLily");


bloomLily.addEventListener("click", () => {

    const lily =
        document.getElementById("lilyPlant");

    const lilyIntro =
        document.getElementById("lilyIntro");

    const lilyText =
        document.getElementById("lilyText");


    // Start lily bloom

    lily.classList.add("bloomed");


    // Change story text

    lilyIntro.textContent =
        "Some things take a little longer to bloom.";


    lilyText.textContent =
        "And sometimes, the wait makes them even more special.";


    // Change the little plant
    // into the white lily

    lily.textContent = "🤍";


    // Wait for the bloom animation
    // before revealing the birthday

    setTimeout(() => {

        showScene("birthday");

    }, 2500);

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
