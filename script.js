const scenes = document.querySelectorAll(".scene");

function showScene(id) {
    scenes.forEach(scene => scene.classList.remove("active"));

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }
}


/* =====================================================
   INTRO → GARDEN
   ===================================================== */

const enterGarden = document.getElementById("enterGarden");

if (enterGarden) {
    enterGarden.addEventListener("click", () => {
        showScene("garden");
    });
}


/* =====================================================
   GARDEN → FLOWER HUNT
   ===================================================== */

const startMission = document.getElementById("startMission");

if (startMission) {
    startMission.addEventListener("click", () => {
        showScene("flowerHunt");
    });
}


/* =====================================================
   FLOWER MESSAGES
   ===================================================== */

const flowerMessages = {
    1: "A little flower to start things off. 🌷",
    2: "You found another one. Keep going. ✨",
    3: "Halfway there... the garden is getting brighter. 🌸",
    4: "Almost there. One more flower is waiting. 🌼",
    5: "You found them all. But... something is still waiting."
};


/* =====================================================
   FLOWERS
   ===================================================== */

const flowers = document.querySelectorAll(".flower");

const flowerMessage = document.getElementById("flowerMessage");
const flowerNumber = document.getElementById("flowerNumber");
const flowerText = document.getElementById("flowerText");
const closeFlowerMessage = document.getElementById("closeFlowerMessage");
const foundCount = document.getElementById("foundCount");

let flowersFound = 0;


/* =====================================================
   FLOWER CLICK
   ===================================================== */

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        /* Already found = completely ignore click */
        if (flower.classList.contains("found")) {
            return;
        }

        const number = Number(flower.dataset.flower);

        /* Mark flower as permanently found */
        flower.classList.add("found");
        flower.classList.add("blooming");

        /* Prevent any future interaction */
        flower.disabled = true;
        flower.setAttribute("aria-disabled", "true");

        flowersFound++;

        if (foundCount) {
            foundCount.textContent = flowersFound;
        }

        /* One-time sparkle burst */
        createSparkles(flower);

        /* Remove only the temporary bloom animation class.
           The permanent dancing state stays. */
        setTimeout(() => {
            flower.classList.remove("blooming");
        }, 800);


        /* Popup */
        if (flowerNumber) {
            flowerNumber.textContent = `Flower #${number}`;
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


/* =====================================================
   FLOWER POPUP
   ===================================================== */

if (closeFlowerMessage) {

    closeFlowerMessage.addEventListener("click", () => {

        flowerMessage.classList.add("hidden");

        if (flowersFound === 5) {

            setTimeout(() => {
                startLilyScene();
            }, 700);

        }

    });

}


/* =====================================================
   SPARKLES
   ===================================================== */

function createSparkles(element) {

    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent =
            Math.random() > 0.5 ? "✦" : "·";

        sparkle.style.left =
            `${rect.left + rect.width / 2}px`;

        sparkle.style.top =
            `${rect.top + rect.height / 2}px`;

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


/* =====================================================
   LILY SCENE
   ===================================================== */

const lilyPlant = document.getElementById("lilyPlant");
const lilyIntro = document.getElementById("lilyIntro");
const lilyText = document.getElementById("lilyText");
const bloomLily = document.getElementById("bloomLily");


function startLilyScene() {

    showScene("lilyScene");

    if (lilyPlant) {
        lilyPlant.classList.remove(
            "growing",
            "budding",
            "bloomed"
        );
    }

    if (lilyIntro) {
        lilyIntro.textContent = "Wait...";
        lilyIntro.style.opacity = "1";
    }

    if (lilyText) {
        lilyText.textContent =
            "There's still one plant that hasn't bloomed.";

        lilyText.style.opacity = "1";
    }

    if (bloomLily) {

        bloomLily.textContent = "Watch it grow";

        bloomLily.disabled = false;

        bloomLily.style.opacity = "1";

        bloomLily.style.pointerEvents = "auto";
    }
}


/* =====================================================
   LILY BLOOM
   ===================================================== */

if (bloomLily) {

    bloomLily.addEventListener("click", () => {

        bloomLily.disabled = true;

        bloomLily.style.opacity = "0";

        bloomLily.style.pointerEvents = "none";


        if (lilyPlant) {
            lilyPlant.classList.add("growing");
        }


        setTimeout(() => {

            if (lilyPlant) {
                lilyPlant.classList.add("budding");
            }

        }, 2300);


        setTimeout(() => {

            if (lilyPlant) {
                lilyPlant.classList.add("bloomed");
            }

            if (lilyIntro) {
                lilyIntro.textContent = "And then...";
            }

            if (lilyText) {
                lilyText.textContent =
                    "Some things take a little longer to bloom.";
            }

        }, 4200);


        setTimeout(() => {

            showScene("birthday");

            setTimeout(() => {
                createConfetti();
            }, 900);

        }, 7600);

    });

}


/* =====================================================
   CONFETTI
   ===================================================== */

let celebrationConfettiTimer = null;


function createConfetti() {

    const pieces = 55;

    for (let i = 0; i < pieces; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti";

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
            "--confetti-rotation",
            `${Math.random() * 360}deg`
        );

        if (Math.random() > 0.5) {
            piece.style.borderRadius = "50%";
        } else {
            piece.style.borderRadius = "2px";
        }

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 8000);
    }
}


/* =====================================================
   LETTER
   ===================================================== */

const openLetter = document.getElementById("openLetter");

if (openLetter) {

    openLetter.addEventListener("click", () => {
        showScene("letter");
    });

}


/* =====================================================
   FINAL GARDEN CELEBRATION
   ===================================================== */

const finish = document.getElementById("finish");


function startGardenCelebration() {

    const flowerHunt =
        document.getElementById("flowerHunt");

    if (!flowerHunt) {
        return;
    }


    /* Make sure all flowers are permanently alive */
    flowers.forEach(flower => {

        flower.classList.add("found");
        flower.classList.add("celebrating");

        flower.disabled = true;
        flower.setAttribute("aria-disabled", "true");

    });


    /* Hide mission interface */
    const missionUI =
        flowerHunt.querySelector(".mission-ui");

    if (missionUI) {
        missionUI.classList.add("celebration-hidden");
    }


    /* =================================================
       CREATE A CELEBRATION COPY OF THE BLOOMED LILY
       ================================================= */

    const oldLily =
        flowerHunt.querySelector(".celebration-lily");

    if (oldLily) {
        oldLily.remove();
    }


    if (lilyPlant) {

        const celebrationLily =
            lilyPlant.cloneNode(true);

        /* Remove duplicate ID */
        celebrationLily.removeAttribute("id");

        celebrationLily.classList.add(
            "celebration-lily"
        );

        celebrationLily.classList.remove(
            "growing",
            "budding"
        );

        celebrationLily.classList.add(
            "bloomed",
            "celebrating"
        );

        flowerHunt.appendChild(celebrationLily);
    }


    /* Start continuous celebration confetti */
    startCelebrationConfetti();

}


function startCelebrationConfetti() {

    stopCelebrationConfetti();

    createConfetti();

    celebrationConfettiTimer =
        setInterval(() => {
            createConfetti();
        }, 2500);
}


function stopCelebrationConfetti() {

    if (celebrationConfettiTimer) {

        clearInterval(
            celebrationConfettiTimer
        );

        celebrationConfettiTimer = null;
    }
}


if (finish) {

    finish.addEventListener("click", () => {

        showScene("flowerHunt");

        setTimeout(() => {

            startGardenCelebration();

        }, 450);

    });

}
