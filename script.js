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

if (enterGarden) {
    enterGarden.addEventListener("click", () => {
        showScene("garden");
    });
}


/* =========================================================
   GARDEN → FLOWER HUNT
   ========================================================= */

const startMission = document.getElementById("startMission");

if (startMission) {
    startMission.addEventListener("click", () => {
        showScene("flowerHunt");
    });
}


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


let flowersFound = 0;


/* =========================================================
   FLOWER CLICK
   ========================================================= */

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        const number =
            Number(flower.dataset.flower);


        /*
           Only count a flower the first time
           it is clicked.
        */

        if (!flower.classList.contains("found")) {

            flower.classList.add("found");
            flower.classList.add("blooming");

            flowersFound++;

            if (foundCount) {
                foundCount.textContent =
                    flowersFound;
            }

            createSparkles(flower);


            /*
               Remove the temporary bloom animation
               after it finishes.
            */

            setTimeout(() => {

                flower.classList.remove("blooming");

            }, 800);
        }


        /*
           Show the flower message.
        */

        if (flowerNumber) {
            flowerNumber.textContent =
                `Flower #${number}`;
        }

        if (flowerText) {
            flowerText.textContent =
                flowerMessages[number] ||
                "A little flower just for you. 🌷";
        }

        if (flowerMessage) {
            flowerMessage.classList.remove("hidden");
        }
    });
});


/* =========================================================
   CLOSE FLOWER MESSAGE
   ========================================================= */

if (closeFlowerMessage) {

    closeFlowerMessage.addEventListener("click", () => {

        flowerMessage.classList.add("hidden");


        /*
           Once all five flowers have been found,
           move to the lily scene.
        */

        if (flowersFound === 5) {

            setTimeout(() => {

                startLilyScene();

            }, 700);
        }
    });
}


/* =========================================================
   SPARKLES
   ========================================================= */

function createSparkles(element) {

    const rect =
        element.getBoundingClientRect();


    for (let i = 0; i < 8; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className =
            "sparkle";

        sparkle.textContent =
            Math.random() > 0.5
                ? "✦"
                : "·";


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
   LILY ELEMENTS
   ========================================================= */

const lilyPlant =
    document.getElementById("lilyPlant");

const lilyIntro =
    document.getElementById("lilyIntro");

const lilyText =
    document.getElementById("lilyText");

const bloomLily =
    document.getElementById("bloomLily");


/* =========================================================
   START LILY SCENE
   ========================================================= */

function startLilyScene() {

    showScene("lilyScene");


    /*
       Reset the lily.
       This makes the scene safe to replay.
    */

    if (lilyPlant) {

        lilyPlant.classList.remove(
            "growing",
            "budding",
            "bloomed"
        );
    }


    if (lilyIntro) {

        lilyIntro.textContent =
            "Wait...";

        lilyIntro.style.opacity =
            "1";
    }


    if (lilyText) {

        lilyText.textContent =
            "There's still one plant that hasn't bloomed.";

        lilyText.style.opacity =
            "1";
    }


    if (bloomLily) {

        bloomLily.textContent =
            "Watch it grow";

        bloomLily.disabled =
            false;

        bloomLily.style.opacity =
            "1";

        bloomLily.style.pointerEvents =
            "auto";
    }
}


/* =========================================================
   LILY GROWTH + BLOOM
   ========================================================= */

if (bloomLily) {

    bloomLily.addEventListener("click", () => {

        /*
           Prevent multiple clicks.
        */

        bloomLily.disabled = true;

        bloomLily.style.opacity = "0";
        bloomLily.style.pointerEvents = "none";


        /* -----------------------------------------------
           STEP 1 — STEM GROWS
           ----------------------------------------------- */

        if (lilyPlant) {
            lilyPlant.classList.add("growing");
        }


        /* -----------------------------------------------
           STEP 2 — BUD APPEARS
           ----------------------------------------------- */

        setTimeout(() => {

            if (lilyPlant) {
                lilyPlant.classList.add("budding");
            }

        }, 2300);


        /* -----------------------------------------------
           STEP 3 — LILY OPENS
           ----------------------------------------------- */

        setTimeout(() => {

            if (lilyPlant) {
                lilyPlant.classList.add("bloomed");
            }


            if (lilyIntro) {

                lilyIntro.textContent =
                    "And then...";
            }


            if (lilyText) {

                lilyText.textContent =
                    "Some things take a little longer to bloom.";
            }

        }, 4200);


        /* -----------------------------------------------
           STEP 4 — BIRTHDAY REVEAL
           ----------------------------------------------- */

        setTimeout(() => {

            showScene("birthday");


            /*
               Let the birthday scene appear first,
               then release the confetti.
            */

            setTimeout(() => {

                createConfetti();

            }, 900);

        }, 7600);
    });
}


/* =========================================================
   CONFETTI
   ========================================================= */

function createConfetti() {

    const pieces = 45;


    for (let i = 0; i < pieces; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti";


        /*
           Random horizontal starting position.
        */

        piece.style.left =
            `${Math.random() * 100}%`;


        /*
           Random sideways movement.
        */

        piece.style.setProperty(
            "--confetti-x",
            `${(Math.random() - 0.5) * 250}px`
        );


        /*
           Random falling speed.
        */

        piece.style.setProperty(
            "--confetti-duration",
            `${3 + Math.random() * 3}s`
        );


        /*
           Random starting delay.
        */

        piece.style.setProperty(
            "--confetti-delay",
            `${Math.random() * 1.5}s`
        );


        /*
           Mix round and rectangular pieces.
        */

        if (Math.random() > 0.5) {

            piece.style.borderRadius =
                "50%";

        } else {

            piece.style.borderRadius =
                "2px";
        }


        document.body.appendChild(piece);


        /*
           Remove the piece after its animation.
        */

        setTimeout(() => {

            piece.remove();

        }, 7500);
    }
}


/* =========================================================
   BIRTHDAY → LETTER
   ========================================================= */

const openLetter =
    document.getElementById("openLetter");

if (openLetter) {

    openLetter.addEventListener("click", () => {

        showScene("letter");

    });
}


/* =========================================================
   LETTER → GARDEN
   ========================================================= */

const finish =
    document.getElementById("finish");

if (finish) {

    finish.addEventListener("click", () => {

        showScene("flowerHunt");

    });
}
