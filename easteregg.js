document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("egg-overlay");
  const closeBtn = document.getElementById("egg-close");
  const eggImage = document.getElementById("egg-image");

  // Lista de imágenes del túnel del terror
  const eggImages = [
    "FOTOS/tunel1.jpg",
    "FOTOS/tunel2.jpg",
    "FOTOS/tunel3.jpg",
    "FOTOS/tunel4.jpg"
  ];

  let konami = [];
  const secretCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

  document.addEventListener("keydown", (e) => {
    konami.push(e.key);
    konami.splice(-secretCode.length - 1, konami.length - secretCode.length);
    if (konami.join("").toLowerCase().includes(secretCode.toLowerCase())) {
      const randomImg = eggImages[Math.floor(Math.random() * eggImages.length)];
      eggImage.src = randomImg;
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
});
