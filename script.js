const scenes = document.querySelectorAll(".scene");


// =========================
// SCENE CONTROL
// =========================

function showScene(sceneId) {
    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const targetScene = document.getElementById(sceneId);

    if (targetScene) {
        targetScene.classList.add("active");
    }
}


// =========================
// INTRO → GARDEN
// =========================

document.getElementById("enterGarden").addEventListener("click", () => {
    showScene("garden");
});


// =========================
// GARDEN → FLOWER HUNT
// =========================

document.getElementById("startMission").addEventListener("click", () => {
    showScene("flowerHunt");
});


// =========================
// FLOWER HUNT
// =========================

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


// =========================
// CREATE SPARKLES
// =========================

function createSparkles(flower) {

    for (let i = 0; i < 7; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.textContent = "✦";

        const angle = (Math.PI * 2 * i) / 7;
        const distance = 35 + Math.random() * 25;

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


// =========================
// FLOWER CLICK
// =========================

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        const number = flower.dataset.flower;

        // Prevent clicking the same flower twice
        if (clickedFlowers.includes(number)) {
            return;
        }

        clickedFlowers.push(number);
        flowersFound++;

        // Update counter
        document.getElementById("foundCount").textContent = flowersFound;

        // Bloom animation
        flower.classList.add("blooming");

        // Sparkle effect
        createSparkles(flower);

        // Keep flower glowing after being found
        setTimeout(() => {

            flower.classList.remove("blooming");
            flower.classList.add("found");

        }, 750);

        // Set popup content
        flowerNumber.textContent = `Flower #${number}`;
        flowerText.textContent = flowerMessages[number];

        // Show popup slightly after the animation begins
        setTimeout(() => {
            flowerMessage.classList.remove("hidden");
        }, 350);

    });

});


// =========================
// CLOSE FLOWER MESSAGE
// =========================

closeFlowerMessage.addEventListener("click", () => {

    flowerMessage.classList.add("hidden");

    // After all five flowers are found,
    // move to the lily scene
    if (flowersFound === 5) {

        setTimeout(() => {
            showScene("lilyScene");
        }, 600);

    }

});


// =========================
// LILY SCENE
// =========================

document.getElementById("bloomLily").addEventListener("click", () => {

    const lily = document.getElementById("lilyPlant");
    const lilyIntro = document.getElementById("lilyIntro");
    const lilyText = document.getElementById("lilyText");

    // Start lily bloom
    lily.classList.add("bloomed");

    // Change the story text
    lilyIntro.textContent =
        "Some things take a little longer to bloom.";

    lilyText.textContent =
        "And sometimes, the wait makes them even more special.";

    // Turn the little plant into a white lily
    lily.textContent = "🤍";

    // Move to birthday reveal
    setTimeout(() => {
        showScene("birthday");
    }, 2500);

});


// =========================
// BIRTHDAY → LETTER
// =========================

document.getElementById("openLetter").addEventListener("click", () => {
    showScene("letter");
});


// =========================
// LETTER → GARDEN
// =========================

document.getElementById("finish").addEventListener("click", () => {
    showScene("garden");
});
