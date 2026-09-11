/* =========================================================
   SCENE MANAGEMENT
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
   INTRO
   ========================================================= */

const enterGarden = document.getElementById("enterGarden");

if (enterGarden) {
    enterGarden.addEventListener("click", () => {
        showScene("flowerHunt");
    });
}


/* =========================================================
   FLOWER HUNT
   ========================================================= */

const flowers = document.querySelectorAll(".flower");
const flowerPopup = document.getElementById("flowerPopup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");
const foundCount = document.getElementById("foundCount");

let foundFlowers = 0;

const flowerMessages = [
    {
        title: "A little flower 🌸",
        message: "Every garden starts with something small."
    },
    {
        title: "You found another 🌼",
        message: "Some beautiful things are easy to miss."
    },
    {
        title: "Another one 🌷",
        message: "Keep looking. There are still a few more."
    },
    {
        title: "Almost there 🌻",
        message: "The garden is slowly revealing itself."
    },
    {
        title: "You found them all 🌹",
        message: "But there is still one more thing waiting."
    }
];

flowers.forEach((flower, index) => {
    flower.addEventListener("click", () => {

        if (flower.classList.contains("found")) {
            return;
        }

        flower.classList.add("found");
        foundFlowers++;

        if (foundCount) {
            foundCount.textContent = foundFlowers;
        }

        if (popupTitle) {
            popupTitle.textContent =
                flowerMessages[index]?.title || "A little flower 🌸";
        }

        if (popupMessage) {
            popupMessage.textContent =
                flowerMessages[index]?.message ||
                "There is something special about this little flower.";
        }

        if (flowerPopup) {
            flowerPopup.classList.add("show");
        }

        if (foundFlowers === flowers.length) {
            setTimeout(() => {
                const missionText =
                    document.getElementById("missionText");

                if (missionText) {
                    missionText.textContent =
                        "Now look closely... something is still waiting to bloom.";
                }
            }, 900);
        }
    });
});


/* =========================================================
   CLOSE FLOWER POPUP
   ========================================================= */

if (closePopup) {
    closePopup.addEventListener("click", () => {
        if (flowerPopup) {
            flowerPopup.classList.remove("show");
        }
    });
}

if (flowerPopup) {
    flowerPopup.addEventListener("click", event => {
        if (event.target === flowerPopup) {
            flowerPopup.classList.remove("show");
        }
    });
}


/* =========================================================
   LILY
   ========================================================= */

const lilyPlant = document.getElementById("lilyPlant");
const bloomLily = document.getElementById("bloomLily");

const lilyIntro = document.getElementById("lilyIntro");
const lilyText = document.getElementById("lilyText");

if (bloomLily) {

    bloomLily.addEventListener("click", () => {

        bloomLily.disabled = true;
        bloomLily.style.opacity = "0";
        bloomLily.style.pointerEvents = "none";

        /*
         * STEP 1
         * Lily stem and leaves begin growing upward.
         */

        if (lilyPlant) {
            lilyPlant.classList.add("growing");
        }


        /*
         * STEP 2
         * The bud begins forming.
         */

        setTimeout(() => {

            if (lilyPlant) {
                lilyPlant.classList.add("budding");
            }

        }, 2300);


        /*
         * STEP 3
         * The bud opens into the lily.
         */

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


        /*
         * STEP 4
         * Fade the lily text before moving to the birthday reveal.
         */

        setTimeout(() => {

            if (lilyIntro) {
                lilyIntro.style.opacity = "0";
            }

            if (lilyText) {
                lilyText.style.opacity = "0";
            }

        }, 6900);


        /*
         * STEP 5
         * Birthday reveal.
         */

        setTimeout(() => {

            showScene("birthday");

            createBirthdayFireflies();

            setTimeout(() => {
                createConfetti();
            }, 700);

        }, 7900);
    });
}


/* =========================================================
   BIRTHDAY FIREFLIES
   ========================================================= */

let birthdayFireflyTimer = null;

function createBirthdayFireflies() {

    document
        .querySelectorAll(".birthday-firefly")
        .forEach(firefly => firefly.remove());

    const fireflies = 18;

    for (let i = 0; i < fireflies; i++) {

        const firefly = document.createElement("span");

        firefly.className = "birthday-firefly";

        firefly.style.left =
            `${8 + Math.random() * 84}%`;

        firefly.style.top =
            `${48 + Math.random() * 45}%`;

        firefly.style.setProperty(
            "--firefly-x",
            `${(Math.random() - 0.5) * 90}px`
        );

        firefly.style.setProperty(
            "--firefly-duration",
            `${3.5 + Math.random() * 3}s`
        );

        firefly.style.setProperty(
            "--firefly-delay",
            `${Math.random() * 2.5}s`
        );

        document.body.appendChild(firefly);
    }

    clearTimeout(birthdayFireflyTimer);

    birthdayFireflyTimer = setTimeout(() => {

        const birthday =
            document.getElementById("birthday");

        if (
            birthday &&
            birthday.classList.contains("active")
        ) {
            createBirthdayFireflies();
        }

    }, 9000);
}


/* =========================================================
   CONFETTI
   ========================================================= */

function createConfetti() {

    const amount = 55;

    for (let i = 0; i < amount; i++) {

        const confetti = document.createElement("span");

        confetti.className = "confetti";

        confetti.style.left =
            `${Math.random() * 100}%`;

        confetti.style.setProperty(
            "--confetti-duration",
            `${4 + Math.random() * 4}s`
        );

        confetti.style.setProperty(
            "--confetti-delay",
            `${Math.random() * 1.5}s`
        );

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 8500);
    }
}


/* =========================================================
   LETTER
   ========================================================= */

const openLetter = document.getElementById("openLetter");

if (openLetter) {

    openLetter.addEventListener("click", () => {

        clearTimeout(birthdayFireflyTimer);

        document
            .querySelectorAll(".birthday-firefly")
            .forEach(firefly => firefly.remove());

        showScene("letter");
    });
}


/* =========================================================
   FINAL GARDEN CELEBRATION
   ========================================================= */

let celebrationConfettiTimer = null;

function startGardenCelebration() {

    const flowerHunt =
        document.getElementById("flowerHunt");

    if (!flowerHunt) {
        return;
    }

    flowerHunt.classList.add("celebration-mode");


    /*
     * Keep all normal flowers bloomed.
     */

    flowers.forEach(flower => {
        flower.classList.add("found");
        flower.classList.add("celebrating");
    });


    /*
     * Hide mission UI.
     */

    const mission =
        document.querySelector(".mission");

    if (mission) {
        mission.style.opacity = "0";
        mission.style.pointerEvents = "none";
    }


    /*
     * Bring the fully bloomed lily back into the final garden.
     */

    if (lilyPlant) {

        const celebrationLily =
            lilyPlant.cloneNode(true);

        celebrationLily.removeAttribute("id");

        celebrationLily.classList.add(
            "celebration-lily"
        );

        celebrationLily.classList.add("bloomed");

        celebrationLily.classList.remove(
            "growing",
            "budding"
        );

        flowerHunt.appendChild(celebrationLily);
    }


    /*
     * Start continuous gentle confetti.
     */

    startCelebrationConfetti();
}


/* =========================================================
   CELEBRATION CONFETTI
   ========================================================= */

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


/* =========================================================
   FINISH / RETURN TO GARDEN
   ========================================================= */

const finish = document.getElementById("finish");

if (finish) {

    finish.addEventListener("click", () => {

        showScene("flowerHunt");

        setTimeout(() => {
            startGardenCelebration();
        }, 500);
    });
}


/* =========================================================
   INITIAL STATE
   ========================================================= */

showScene("intro");
