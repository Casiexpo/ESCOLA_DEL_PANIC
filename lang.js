document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    ca: {
      title: "L'ESCOLA DEL PÀNIC <span class='numero'>II</span>",
      date: "🩸 8 / 11 / 2025 🩸",
      hour: "🕛 23:30h",
      price: "Entrada: 1 €",
      intro: "Després de l’èxit de l’any passat... torna l’experiència més esgarrifosa de Vilamalla!",
      contactTitle: "Contacte",
      mailLabel: "Correu",
      mapTitle: "📍 Ubicació",
      address: "Vilamalla, Carrer Siurana S/N — 17469",
      colaboraText: "Col·labora:",
      ajuntament: "Ajuntament de Vilamalla",
      associacio: "Associació de Joves",
      creditsText: "Creat per <span class='autor'>POL CASIÑOL EXPÓSITO</span> — <a href='https://www.instagram.com/pol_casi' target='_blank' rel='noopener'>@pol_casi</a>"
    },
    es: {
      title: "LA ESCUELA DEL PÁNICO <span class='numero'>II</span>",
      date: "🩸 8 / 11 / 2025 🩸",
      hour: "🕛 23:30h",
      price: "Entrada: 1 €",
      intro: "Tras el éxito del año pasado... ¡vuelve la experiencia más terrorífica de Vilamalla!",
      contactTitle: "Contacto",
      mailLabel: "Correo",
      mapTitle: "📍 Ubicación",
      address: "Vilamalla, Calle Siurana S/N — 17469",
      colaboraText: "Colabora:",
      ajuntament: "Ayuntamiento de Vilamalla",
      associacio: "Asociación de Jóvenes",
      creditsText: "Creado por <span class='autor'>POL CASIÑOL EXPÓSITO</span> — <a href='https://www.instagram.com/pol_casi' target='_blank' rel='noopener'>@pol_casi</a>"
    },
    en: {
      title: "THE SCHOOL OF PANIC <span class='numero'>II</span>",
      date: "🩸 8 / 11 / 2025 🩸",
      hour: "🕛 11:30 p.m.",
      price: "Entry: 1 €",
      intro: "After last year's success... the scariest experience in Vilamalla returns!",
      contactTitle: "Contact",
      mailLabel: "Email",
      mapTitle: "📍 Location",
      address: "Vilamalla, Carrer Siurana S/N — 17469",
      colaboraText: "With the support of:",
      ajuntament: "Vilamalla Town Hall",
      associacio: "Youth Association",
      creditsText: "Created by <span class='autor'>POL CASIÑOL EXPÓSITO</span> — <a href='https://www.instagram.com/pol_casi' target='_blank' rel='noopener'>@pol_casi</a>"
    },
  };

  const langSelect = document.getElementById("langSelect");
  if (!langSelect) return;

  const setLanguage = (lang) => {
    const t = translations[lang] || translations.ca;
    document.getElementById("title").innerHTML = t.title;
    document.getElementById("date").textContent = t.date;
    document.getElementById("hour").textContent = t.hour;
    document.getElementById("price").textContent = t.price;
    document.getElementById("intro").textContent = t.intro;
    document.getElementById("contactTitle").textContent = t.contactTitle;
    document.getElementById("mailLabel").textContent = t.mailLabel;
    document.getElementById("mapTitle").textContent = t.mapTitle;
    document.getElementById("address").textContent = t.address;
    document.getElementById("colaboraText").textContent = t.colaboraText;
    document.getElementById("ajuntament").textContent = t.ajuntament;
    document.getElementById("associacio").textContent = t.associacio;
    document.getElementById("creditsText").innerHTML = t.creditsText;

    document.documentElement.lang = lang;
    document.title = t.title.replace(/<[^>]*>/g, "");
  };

  setLanguage(langSelect.value);
  langSelect.addEventListener("change", () => setLanguage(langSelect.value));

  // Aparició suau al fer scroll
  const fadeElements = document.querySelectorAll(".fade-in");
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        appearOnScroll.unobserve(entry.target);
      }
    });
  });
  fadeElements.forEach((el) => appearOnScroll.observe(el));
});

