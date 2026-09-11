/* =========================================
   SCENE CONTROL
========================================= */

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


/* =========================================
   INTRO → GARDEN
========================================= */

document
    .getElementById("enterGarden")
    .addEventListener("click", () => {

        showScene("garden");

    });


/* =========================================
   GARDEN → FLOWER HUNT
========================================= */

document
    .getElementById("startMission")
    .addEventListener("click", () => {

        showScene("flowerHunt");

    });


/* =========================================
   FLOWER SYSTEM
========================================= */

let flowersFound = 0;

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


let clickedFlowers = [];


/* =========================================
   CLICK FLOWER
========================================= */

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        const number =
            flower.dataset.flower;


        /* Prevent clicking the same flower twice */

        if (clickedFlowers.includes(number)) {
            return;
        }


        /* Remember flower */

        clickedFlowers.push(number);

        flowersFound++;


        /* Update counter */

        document.getElementById("foundCount").textContent =
            flowersFound;


        /* Mark flower as found */

        flower.classList.add("found");


        /* Show message */

        flowerNumber.textContent =
            `Flower #${number}`;

        flowerText.textContent =
            flowerMessages[number];


        flowerMessage.classList.remove("hidden");

    });

});


/* =========================================
   CLOSE FLOWER MESSAGE
========================================= */

closeFlowerMessage.addEventListener("click", () => {

    flowerMessage.classList.add("hidden");


    /*
       Once all five flowers are found,
       move to the lily scene.
    */

    if (flowersFound === 5) {

        setTimeout(() => {

            showScene("lilyScene");

        }, 600);

    }

});


/* =========================================
   LILY → BIRTHDAY
========================================= */

document
    .getElementById("bloomLily")
    .addEventListener("click", () => {


        const lily =
            document.getElementById("lilyPlant");


        const lilyIntro =
            document.getElementById("lilyIntro");


        const lilyText =
            document.getElementById("lilyText");


        /*
           Start the bloom animation
        */

        lily.classList.add("bloomed");


        /*
           Change the story text
        */

        lilyIntro.textContent =
            "Some things take a little longer to bloom.";


        lilyText.textContent =
            "And sometimes, the wait makes them even more special.";


        /*
           Change the little plant
           into a white flower.
        */

        lily.textContent = "🤍";


        /*
           Give the animation time to play
           before revealing the birthday.
        */

        setTimeout(() => {

            showScene("birthday");

        }, 2500);

    });


/* =========================================
   BIRTHDAY → LETTER
========================================= */

document
    .getElementById("openLetter")
    .addEventListener("click", () => {

        showScene("letter");

    });


/* =========================================
   LETTER → GARDEN
========================================= */

document
    .getElementById("finish")
    .addEventListener("click", () => {

        showScene("garden");

    });
