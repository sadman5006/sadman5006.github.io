/* =========================================================
   SCENE SYSTEM
   ========================================================= */

const scenes = document.querySelectorAll(".scene");

function showScene(id) {
    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }
}


/* =========================================================
   INTRO → GARDEN
   ========================================================= */

const enterGarden = document.getElementById("enterGarden");

enterGarden.addEventListener("click", () => {
    showScene("garden");
});


/* =========================================================
   GARDEN → FLOWER HUNT
   ========================================================= */

const startMission = document.getElementById("startMission");

startMission.addEventListener("click", () => {
    showScene("flowerHunt");
});


/* =========================================================
   FLOWER MESSAGES
   ========================================================= */

const flowerMessages = {
    1: "A little flower to start things off. 🌷",
    2: "You found another one. Keep going. ✨",
    3: "Halfway there... the garden is getting brighter. 🌸",
    4: "Almost there. One more flower is waiting. 🌼",
    5: "You found them all. But... something is still waiting."
};


/* =========================================================
   FLOWER ELEMENTS
   ========================================================= */

const flowers = document.querySelectorAll(".flower");

const flowerMessage = document.getElementById("flowerMessage");
const flowerNumber = document.getElementById("flowerNumber");
const flowerText = document.getElementById("flowerText");
const closeFlowerMessage =
    document.getElementById("closeFlowerMessage");

const foundCount =
    document.getElementById("foundCount");


let flowersFound = 0;
let currentFlower = null;


/* =========================================================
   FLOWER CLICK
   ========================================================= */

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        const number =
            Number(flower.dataset.flower);

        currentFlower = flower;


        /* Don't count the same flower twice */

        if (!flower.classList.contains("found")) {

            flower.classList.add("found");
            flower.classList.add("blooming");

            flowersFound++;

            foundCount.textContent =
                flowersFound;

            createSparkles(flower);

            setTimeout(() => {
                flower.classList.remove("blooming");
            }, 800);
        }


        /* Show message */

        flowerNumber.textContent =
            `Flower #${number}`;

        flowerText.textContent =
            flowerMessages[number] ||
            "A little flower just for you. 🌷";

        flowerMessage.classList.remove("hidden");
    });
});


/* =========================================================
   CLOSE FLOWER MESSAGE
   ========================================================= */

closeFlowerMessage.addEventListener("click", () => {

    flowerMessage.classList.add("hidden");


    /*
       Only move on after ALL FIVE flowers
       have been discovered.
    */

    if (flowersFound === 5) {

        setTimeout(() => {
            startLilyScene();
        }, 700);
    }
});


/* =========================================================
   SPARKLES
   ========================================================= */

function createSparkles(element) {

    const rect =
        element.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent =
            Math.random() > 0.5 ? "✦" : "·";

        sparkle.style.left =
            `${rect.left + rect.width / 2}px`;

        sparkle.style.top =
            `${rect.top + 35}px`;

        sparkle.style.setProperty(
            "--sparkle-x",
            `${(Math.random() - 0.5) * 100}px`
        );

        sparkle.style.setProperty(
            "--sparkle-y",
            `${(Math.random() - 0.5) * 100}px`
        );

        document.body.appendChild(sparkle);


        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}


/* =========================================================
   LILY SCENE
   ========================================================= */

const lilyPlant =
    document.getElementById("lilyPlant");

const lilyIntro =
    document.getElementById("lilyIntro");

const lilyText =
    document.getElementById("lilyText");

const bloomLily =
    document.getElementById("bloomLily");


function startLilyScene() {

    showScene("lilyScene");

    /*
       Reset everything in case the scene
       is visited again.
    */

    lilyPlant.classList.remove(
        "growing",
        "budding",
        "bloomed"
    );

    lilyIntro.textContent =
        "Wait...";

    lilyText.textContent =
        "There's still one plant that hasn't bloomed.";

    bloomLily.textContent =
        "Watch it grow";

    bloomLily.style.opacity = "1";
    bloomLily.style.pointerEvents = "auto";


    /*
       Let the scene appear first.
    */

    setTimeout(() => {

        lilyIntro.style.opacity = "1";
        lilyText.style.opacity = "1";

    }, 400);
}


/* =========================================================
   LILY GROWTH
   ========================================================= */

bloomLily.addEventListener("click", () => {

    bloomLily.disabled = true;

    bloomLily.style.opacity = "0";
    bloomLily.style.pointerEvents = "none";


    /*
       STEP 1
       Stem grows upward
    */

    lilyPlant.classList.add("growing");


    setTimeout(() => {

        /*
           STEP 2
           Bud appears at the top
        */

        lilyPlant.classList.add("budding");

    }, 2300);


    setTimeout(() => {

        /*
           STEP 3
           The bud opens into the lily
        */

        lilyPlant.classList.add("bloomed");


        lilyIntro.textContent =
            "And then...";

        lilyText.textContent =
            "Some things take a little longer to bloom.";


    }, 4200);


    /*
       Give the lily time to stay on screen
       before moving to the birthday scene.
    */

    setTimeout(() => {

        showScene("birthday");

    }, 7600);
});


/* =========================================================
   BIRTHDAY → LETTER
   ========================================================= */

const openLetter =
    document.getElementById("openLetter");

openLetter.addEventListener("click", () => {

    showScene("letter");

});


/* =========================================================
   LETTER → FINISHED GARDEN
   ========================================================= */

const finish =
    document.getElementById("finish");

finish.addEventListener("click", () => {

    showScene("flowerHunt");

});
