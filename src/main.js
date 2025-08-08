document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("menu-icon");
  const linksContainer = document.querySelector(".links");
  const linksAll = document.querySelectorAll(".links a");
  const homeSection = document.getElementById("home");
  let manualScroll = false;

  //  Default scroll to #home on initial load or when hash is #home
  if (!window.location.hash || window.location.hash === "#home") {
    history.replaceState(null, null, "#home");

    setTimeout(() => {
      homeSection?.scrollIntoView({ behavior: "auto" });
    }, 50);
  }

  // Handle active link styling by current hash
  function setActiveLinkByHash() {
    const currentHash = window.location.hash || "#home";

    linksAll.forEach(link => {
      const isActive = link.getAttribute("href") === currentHash;
      link.classList.toggle("active", isActive);
      link.style.fontWeight = isActive ? "bold" : "normal";
    });
  }

  setActiveLinkByHash(); // on load
  window.addEventListener("hashchange", setActiveLinkByHash);

  //  menu toggle
  icon.addEventListener("click", () => {
    const isBars = icon.classList.contains("fa-bars");

    icon.classList.toggle("fa-bars", !isBars);
    icon.classList.toggle("fa-xmark", isBars);

    linksContainer.classList.toggle("active");
  });



  //  ScrollSpy: highlight link based on visible section
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          linksAll.forEach(link => {
            const isMatch = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isMatch);
            link.style.fontWeight = isMatch ? "bold" : "normal";
          });
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  // Observe all hash-target sections
  document.querySelectorAll("section[id]").forEach(section =>{

      observer.observe(section)
  }
  );
});
