/* =====================================================
   SCENE SYSTEM
   ===================================================== */

const scenes =
    document.querySelectorAll(".scene");


function showScene(id) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const target =
        document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }
}


/* =====================================================
   INTRO
   ===================================================== */

const enterGarden =
    document.getElementById("enterGarden");

if (enterGarden) {

    enterGarden.addEventListener(
        "click",
        () => {
            showScene("garden");
        }
    );

}


/* =====================================================
   START MISSION
   ===================================================== */

const startMission =
    document.getElementById("startMission");

if (startMission) {

    startMission.addEventListener(
        "click",
        () => {
            showScene("flowerHunt");
        }
    );

}


/* =====================================================
   FLOWER MESSAGES
   ===================================================== */

const flowerMessages = {

    1:
        "Bura hoe jaiteso jehetu aktu sorirer kheyal rakho",

    2:
        "Just wanted to say i apreciate you talking with me",

    3:
        "I hope that you can keep being you",

    4:
        "Aikhane amar bolar kichu chilo na matha hang korse",

    5:
        "Oh Birthday treat dao nai mone rakhbo"

};


/* =====================================================
   FLOWER ELEMENTS
   ===================================================== */

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


/* =====================================================
   FLOWER CLICK
   ===================================================== */

flowers.forEach(flower => {

    flower.addEventListener(
        "click",
        () => {

            /*
             * If this flower was already found,
             * do nothing.
             */

            if (
                flower.classList.contains("found")
            ) {
                return;
            }


            const number =
                Number(
                    flower.dataset.flower
                );


            /*
             * Permanently mark flower as found.
             */

            flower.classList.add("found");


            /*
             * Temporary bloom animation.
             */

            flower.classList.add("blooming");


            /*
             * Disable the actual button too.
             */

            flower.disabled = true;

            flower.setAttribute(
                "aria-disabled",
                "true"
            );


            flowersFound++;


            if (foundCount) {

                foundCount.textContent =
                    flowersFound;

            }


            /*
             * Sparkle burst.
             */

            createSparkles(flower);


            /*
             * Remove only the temporary
             * bloom class.
             *
             * "found" stays permanently.
             */

            setTimeout(
                () => {

                    flower.classList.remove(
                        "blooming"
                    );

                },
                800
            );


            /*
             * Popup content.
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

                flowerMessage.classList.remove(
                    "hidden"
                );

            }

        }
    );

});


/* =====================================================
   CLOSE FLOWER MESSAGE
   ===================================================== */

if (closeFlowerMessage) {

    closeFlowerMessage.addEventListener(
        "click",
        () => {

            if (flowerMessage) {

                flowerMessage.classList.add(
                    "hidden"
                );

            }


            /*
             * Once all five flowers are found,
             * move to the lily story.
             */

            if (flowersFound === 5) {

                setTimeout(
                    () => {
                        startLilyScene();
                    },
                    700
                );

            }

        }
    );

}


/* =====================================================
   SPARKLES
   ===================================================== */

function createSparkles(element) {

    const rect =
        element.getBoundingClientRect();


    for (let i = 0; i < 8; i++) {

        const sparkle =
            document.createElement("span");


        sparkle.className =
            "sparkle";


        sparkle.textContent =
            Math.random() > .5
                ? "✦"
                : "·";


        sparkle.style.left =
            `${rect.left + rect.width / 2}px`;


        sparkle.style.top =
            `${rect.top + rect.height / 2}px`;


        sparkle.style.setProperty(
            "--sparkle-x",
            `${(Math.random() - .5) * 100}px`
        );


        sparkle.style.setProperty(
            "--sparkle-y",
            `${(Math.random() - .5) * 100}px`
        );


        document.body.appendChild(
            sparkle
        );


        setTimeout(
            () => {
                sparkle.remove();
            },
            1000
        );

    }

}


/* =====================================================
   LILY ELEMENTS
   ===================================================== */

const lilyPlant =
    document.getElementById("lilyPlant");

const lilyIntro =
    document.getElementById("lilyIntro");

const lilyText =
    document.getElementById("lilyText");

const bloomLily =
    document.getElementById("bloomLily");


/* =====================================================
   START LILY SCENE
   ===================================================== */

function startLilyScene() {

    showScene("lilyScene");


    /*
     * Reset lily for the story.
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


/* =====================================================
   LILY GROW / BLOOM
   ===================================================== */

if (bloomLily) {

    bloomLily.addEventListener(
        "click",
        () => {

            /*
             * Prevent double clicking.
             */

            bloomLily.disabled =
                true;

            bloomLily.style.opacity =
                "0";

            bloomLily.style.pointerEvents =
                "none";


            /*
             * Stem + leaves start growing.
             */

            if (lilyPlant) {

                lilyPlant.classList.add(
                    "growing"
                );

            }


            /*
             * Bud appears.
             */

            setTimeout(
                () => {

                    if (lilyPlant) {

                        lilyPlant.classList.add(
                            "budding"
                        );

                    }

                },
                2300
            );


            /*
             * Full flower blooms.
             */

            setTimeout(
                () => {

                    if (lilyPlant) {

                        lilyPlant.classList.add(
                            "bloomed"
                        );

                    }


                    if (lilyIntro) {

                        lilyIntro.textContent =
                            "And Finally jar jonno atokisu.......";

                    }


                    if (lilyText) {

                        lilyText.textContent =
                            "";

                    }

                },
                4200
            );


            /*
             * Quiet moment before birthday reveal.
             */

            setTimeout(
                () => {

                    if (lilyIntro) {

                        lilyIntro.style.opacity =
                            "0";

                    }


                    if (lilyText) {

                        lilyText.style.opacity =
                            "0";

                    }

                },
                6900
            );


            /*
             * Birthday reveal.
             */

            setTimeout(
                () => {

                    showScene("birthday");

                    createBirthdayFireflies();


                    setTimeout(
                        () => {
                            createConfetti();
                        },
                        700
                    );

                },
                7900
            );

        }
    );

}


/* =====================================================
   CONFETTI
   ===================================================== */

function createConfetti() {

    const pieces = 55;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement("span");


        piece.className =
            "confetti";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.setProperty(
            "--confetti-x",
            `${(Math.random() - .5) * 250}px`
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


        if (Math.random() > .5) {

            piece.style.borderRadius =
                "50%";

        } else {

            piece.style.borderRadius =
                "2px";

        }


        document.body.appendChild(
            piece
        );


        setTimeout(
            () => {
                piece.remove();
            },
            8000
        );

    }

}


/* =====================================================
   BIRTHDAY ATMOSPHERE
   ===================================================== */

let birthdayFireflyTimer =
    null;


function createBirthdayFireflies() {

    document
        .querySelectorAll(".birthday-firefly")
        .forEach(
            firefly => firefly.remove()
        );


    const fireflies = 18;


    for (
        let i = 0;
        i < fireflies;
        i++
    ) {

        const firefly =
            document.createElement("span");


        firefly.className =
            "birthday-firefly";


        firefly.style.left =
            `${8 + Math.random() * 84}%`;


        firefly.style.top =
            `${48 + Math.random() * 45}%`;


        firefly.style.setProperty(
            "--firefly-x",
            `${(Math.random() - .5) * 90}px`
        );


        firefly.style.setProperty(
            "--firefly-duration",
            `${3.5 + Math.random() * 3}s`
        );


        firefly.style.setProperty(
            "--firefly-delay",
            `${Math.random() * 2.5}s`
        );


        document.body.appendChild(
            firefly
        );

    }


    clearTimeout(
        birthdayFireflyTimer
    );


    birthdayFireflyTimer =
        setTimeout(
            () => {

                const birthday =
                    document.getElementById(
                        "birthday"
                    );


                if (
                    birthday &&
                    birthday.classList.contains(
                        "active"
                    )
                ) {

                    createBirthdayFireflies();

                }

            },
            9000
        );

}


/* =====================================================
   BIRTHDAY → LETTER
   ===================================================== */

const openLetter =
    document.getElementById("openLetter");


if (openLetter) {

    openLetter.addEventListener(
        "click",
        () => {

            clearTimeout(
                birthdayFireflyTimer
            );


            document
                .querySelectorAll(".birthday-firefly")
                .forEach(
                    firefly => firefly.remove()
                );


            showScene("letter");

        }
    );

}


/* =====================================================
   FINAL CELEBRATION
   ===================================================== */

const finish =
    document.getElementById("finish");

let celebrationConfettiTimer =
    null;


/* =====================================================
   START FINAL GARDEN CELEBRATION
   ===================================================== */

function startGardenCelebration() {

    const flowerHunt =
        document.getElementById(
            "flowerHunt"
        );


    if (!flowerHunt) {
        return;
    }


    /*
     * Make every flower permanently alive.
     */

    flowers.forEach(
        flower => {

            flower.classList.add(
                "found"
            );

            flower.classList.add(
                "celebrating"
            );


            flower.disabled =
                true;


            flower.setAttribute(
                "aria-disabled",
                "true"
            );

        }
    );


    /*
     * Activate celebration mode.
     */

    flowerHunt.classList.add(
        "celebration-mode"
    );


    /*
     * Make the mission UI subtle.
     */

    const missionUI =
        flowerHunt.querySelector(
            ".mission-ui"
        );


    if (missionUI) {

        missionUI.classList.add(
            "celebration-hidden"
        );

    }


    /*
     * Remove previous celebration lily
     * if the page has been replayed.
     */

    const oldCelebrationLily =
        flowerHunt.querySelector(
            ".celebration-lily"
        );


    if (oldCelebrationLily) {

        oldCelebrationLily.remove();

    }


    /*
     * Clone the ACTUAL lily that was grown.
     */

    if (lilyPlant) {

        const celebrationLily =
            lilyPlant.cloneNode(true);


        /*
         * Remove ID so there is never
         * a duplicate #lilyPlant.
         */

        celebrationLily.removeAttribute(
            "id"
        );


        /*
         * Give it its own class.
         */

        celebrationLily.classList.add(
            "celebration-lily"
        );


        /*
         * Make absolutely sure it is
         * in the final bloomed state.
         */

        celebrationLily.classList.remove(
            "growing",
            "budding"
        );


        celebrationLily.classList.add(
            "bloomed"
        );


        /*
         * Put it inside the final garden.
         */

        flowerHunt.appendChild(
            celebrationLily
        );

    }


    /*
     * Start continuous confetti.
     */

    startCelebrationConfetti();

}


/* =====================================================
   CONTINUOUS CONFETTI
   ===================================================== */

function startCelebrationConfetti() {

    stopCelebrationConfetti();


    /*
     * First shower immediately.
     */

    createConfetti();


    /*
     * Then another shower every 2.5 seconds.
     */

    celebrationConfettiTimer =
        setInterval(
            () => {

                createConfetti();

            },
            2500
        );

}


/* =====================================================
   STOP CONFETTI
   ===================================================== */

function stopCelebrationConfetti() {

    if (
        celebrationConfettiTimer
    ) {

        clearInterval(
            celebrationConfettiTimer
        );


        celebrationConfettiTimer =
            null;

    }

}


/* =====================================================
   RETURN TO GARDEN
   ===================================================== */

if (finish) {

    finish.addEventListener(
        "click",
        () => {

            showScene(
                "flowerHunt"
            );


            /*
             * Small delay lets the scene
             * transition finish before
             * the celebration appears.
             */

            setTimeout(
                () => {

                    startGardenCelebration();

                },
                500
            );

        }
    );

}
