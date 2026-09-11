/* =========================================================
   A LITTLE BIRTHDAY GARDEN
   SCRIPT
   ========================================================= */


/* =========================================================
   SCENES
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

const enterGarden =
    document.getElementById("enterGarden");

if (enterGarden) {

    enterGarden.addEventListener("click", () => {
        showScene("garden");
    });

}


/* =========================================================
   GARDEN → FLOWER HUNT
   ========================================================= */

const startMission =
    document.getElementById("startMission");

if (startMission) {

    startMission.addEventListener("click", () => {

        showScene("flowerHunt");

        createButterflies();

    });

}


/* =========================================================
   FLOWER MESSAGES
   ========================================================= */

const flowerMessages = {

    1:
        "A little flower to start things off. 🌷",

    2:
        "You found another one. Keep going. ✨",

    3:
        "Halfway there... the garden is getting brighter. 🌸",

    4:
        "Almost there. One more flower is waiting. 🌼",

    5:
        "You found them all. But... something is still waiting."

};


/* =========================================================
   FLOWERS
   ========================================================= */

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

let flowersFound = 0;

let lilyStarted = false;


/* =========================================================
   FLOWER CLICK
   ========================================================= */

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        /*
         * A flower can only be discovered once.
         */

        if (flower.classList.contains("found")) {
            return;
        }


        const number =
            Number(flower.dataset.flower);


        /* mark as found */

        flower.classList.add("found");

        flower.classList.add("blooming");

        flower.disabled = true;


        /* count */

        flowersFound++;

        if (foundCount) {
            foundCount.textContent = flowersFound;
        }


        /* sparkle effect */

        createSparkles(flower);


        /* remove temporary bloom */

        setTimeout(() => {

            flower.classList.remove("blooming");

        }, 850);


        /* popup */

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

        if (flowerMessage) {
            flowerMessage.classList.add("hidden");
        }


        /*
         * Once all five have been discovered,
         * move to the lily scene.
         */

        if (
            flowersFound === 5 &&
            !lilyStarted
        ) {

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
   LILY
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

    lilyStarted = true;

    showScene("lilyScene");


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
   LILY BLOOM
   ========================================================= */

if (bloomLily) {

    bloomLily.addEventListener("click", () => {

        bloomLily.disabled =
            true;

        bloomLily.style.opacity =
            "0";

        bloomLily.style.pointerEvents =
            "none";


        if (lilyPlant) {

            lilyPlant.classList.add(
                "growing"
            );

        }


        /* bud */

        setTimeout(() => {

            if (lilyPlant) {

                lilyPlant.classList.add(
                    "budding"
                );

            }

        }, 2300);


        /* flower */

        setTimeout(() => {

            if (lilyPlant) {

                lilyPlant.classList.add(
                    "bloomed"
                );

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


        /* birthday */

        setTimeout(() => {

            showScene("birthday");

            createConfettiBurst();

        }, 7600);

    });

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
   FINAL RETURN
   ========================================================= */

const finish =
    document.getElementById("finish");

if (finish) {

    finish.addEventListener("click", () => {

        showFinalGarden();

    });

}


/* =========================================================
   FINAL GARDEN
   ========================================================= */

function showFinalGarden() {

    const flowerHunt =
        document.getElementById("flowerHunt");


    if (!flowerHunt) {
        return;
    }


    /*
     * All flowers are now permanently alive/dancing.
     */

    flowers.forEach(flower => {

        flower.classList.add("found");

        flower.disabled = true;

    });


    flowersFound = 5;


    if (foundCount) {
        foundCount.textContent = "5";
    }


    /*
     * Remove an old celebration lily
     * if the sequence is replayed.
     */

    const oldLily =
        document.querySelector(".celebration-lily");

    if (oldLily) {
        oldLily.remove();
    }


    /*
     * Clone the EXACT lily that was grown.
     */

    if (lilyPlant) {

        const celebrationLily =
            lilyPlant.cloneNode(true);


        /*
         * IDs must be unique.
         */

        celebrationLily.removeAttribute("id");


        /*
         * Keep it fully bloomed.
         */

        celebrationLily.classList.remove(
            "growing",
            "budding"
        );

        celebrationLily.classList.add(
            "bloomed",
            "celebration-lily"
        );


        /*
         * Put it into the final garden.
         */

        flowerHunt.appendChild(
            celebrationLily
        );

    }


    /*
     * Tell CSS this is the final scene.
     */

    flowerHunt.classList.add(
        "celebration-mode"
    );


    showScene("flowerHunt");


    /*
     * Bring back the atmosphere.
     */

    createButterflies();

    startCelebrationConfetti();

}


/* =========================================================
   BUTTERFLIES
   ========================================================= */

function createButterflies() {

    const flowerHunt =
        document.getElementById("flowerHunt");

    if (!flowerHunt) {
        return;
    }


    /*
     * Don't create duplicates.
     */

    if (
        flowerHunt.querySelector(
            ".butterfly"
        )
    ) {
        return;
    }


    const positions = [

        {
            left: "18%",
            top: "31%",
            delay: "0s"
        },

        {
            left: "72%",
            top: "37%",
            delay: "2.2s"
        },

        {
            left: "43%",
            top: "21%",
            delay: "4.1s"
        }

    ];


    positions.forEach(position => {

        const butterfly =
            document.createElement("div");


        butterfly.className =
            "butterfly";


        const body =
            document.createElement("span");


        butterfly.appendChild(body);


        butterfly.style.left =
            position.left;

        butterfly.style.top =
            position.top;

        butterfly.style.animationDelay =
            position.delay;


        flowerHunt.appendChild(
            butterfly
        );

    });

}


/* =========================================================
   CONFETTI
   ========================================================= */

let celebrationConfettiInterval =
    null;


/* one burst */

function createConfettiBurst(
    amount = 45
) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");


        piece.className =
            "confetti";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.setProperty(
            "--confetti-x",
            `${(Math.random() - 0.5) * 250}px`
        );


        piece.style.setProperty(
            "--confetti-duration",
            `${3 + Math.random() * 3}s`
        );


        piece.style.setProperty(
            "--confetti-delay",
            `${Math.random() * 1.5}s`
        );


        piece.style.setProperty(
            "--random-hue",
            `${Math.random() * 300}`
        );


        if (Math.random() > 0.5) {

            piece.style.borderRadius =
                "50%";

        } else {

            piece.style.borderRadius =
                "2px";

        }


        document.body.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 7500);

    }

}


/* =========================================================
   CONTINUOUS FINAL CONFETTI
   ========================================================= */

function startCelebrationConfetti() {

    /*
     * Prevent multiple intervals.
     */

    if (celebrationConfettiInterval) {

        clearInterval(
            celebrationConfettiInterval
        );

    }


    /*
     * First burst immediately.
     */

    createConfettiBurst(30);


    /*
     * Then small continuous showers.
     */

    celebrationConfettiInterval =
        setInterval(() => {

            createConfettiBurst(18);

        }, 1500);

}


/* =========================================================
   CLEANUP IF NEEDED
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (celebrationConfettiInterval) {

            clearInterval(
                celebrationConfettiInterval
            );

        }

    }
);
