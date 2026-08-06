(() => {
  const stage = document.getElementById("slideshow-stage");
  if (!stage) return;

  const base = document.getElementById("slideshow-image");
  const nextImage = document.getElementById("slideshow-next");
  const title = document.getElementById("slide-title");
  const subtitle = document.getElementById("slide-subtitle");
  const number = document.getElementById("slide-number");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const slides = [
    {
      src: "img/covers/topography.png",
      alt: "Scanning tunneling microscopy topography",
      title: "Scanning tunneling microscopy",
      subtitle: "Local probe of interacting electrons"
    },
    {
      src: "img/covers/tdbg.jpeg",
      alt: "Twisted double bilayer graphene device",
      title: "Designing van der Waals heterostructures",
      subtitle: "A twisted double bilayer graphene device"
    },
    {
      src: "img/covers/supercon.png",
      alt: "Superconductivity measurement in twisted graphene",
      title: "Superconductivity in twisted graphene",
      subtitle: "Fraunhofer oscillations of critical current in a magnetic field"
    },
    {
      src: "img/covers/LL_fan.png",
      alt: "Recursive electronic energy spectrum in a strong magnetic field",
      title: "Topological states in graphene",
      subtitle: "Recursive energy spectra of electrons in a strong magnetic field"
    },
    {
      src: "img/covers/dilution.jpg",
      alt: "Dilution refrigerator used for quantum transport measurements",
      title: "Quantum transport",
      subtitle: "At millikelvin temperatures"
    },
    {
      src: "img/covers/oscillations.jpg",
      alt: "Quantum oscillations measured in a graphene device",
      title: "Fermiology",
      subtitle: "Quantum oscillations of resistivity measured in a graphene device"
    },
    {
      src: "img/covers/gaas_dots.jpg",
      alt: "Gate-defined quantum dots in a gallium arsenide heterostructure",
      title: "Mesoscopic physics",
      subtitle: "Gate-defined quantum dots in a GaAs/AlGaAs heterostructure"
    }
  ];

  slides.forEach((slide) => {
    const image = new Image();
    image.src = slide.src;
  });

  let current = 0;
  let timer = 0;
  let finishing = 0;

  const updateCopy = (slide, index) => {
    title.textContent = slide.title;
    subtitle.textContent = slide.subtitle;
    number.textContent = String(index + 1).padStart(2, "0");
  };

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(transition, 3600);
  };

  const transition = () => {
    const next = (current + 1) % slides.length;
    const incoming = slides[next];

    nextImage.src = incoming.src;
    nextImage.classList.add("is-visible");

    window.clearTimeout(finishing);
    finishing = window.setTimeout(() => {
      base.src = incoming.src;
      base.alt = incoming.alt;
      updateCopy(incoming, next);
      current = next;
      nextImage.classList.remove("is-visible");
      schedule();
    }, 1250);
  };

  const syncMotionPreference = () => {
    window.clearTimeout(timer);
    window.clearTimeout(finishing);
    nextImage.classList.remove("is-visible");
    if (!reducedMotion.matches) schedule();
  };

  reducedMotion.addEventListener("change", syncMotionPreference);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearTimeout(timer);
      nextImage.classList.remove("is-visible");
    } else if (!reducedMotion.matches) {
      schedule();
    }
  });

  syncMotionPreference();
})();
