// GitVerify — app.js

// Auto-dismiss alerts after 5 seconds
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".alert").forEach(el => {
    setTimeout(() => {
      el.style.transition = "opacity .5s";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 500);
    }, 5000);
  });

  // Confirm before creating portfolio
  const portfolioForm = document.getElementById("portfolio-form");
  if (portfolioForm) {
    portfolioForm.addEventListener("submit", (e) => {
      const action = e.submitter?.value;
      if (action === "verify") return; // just verifying, no confirm needed
      const name = portfolioForm.querySelector("[name=full_name]")?.value.trim();
      if (!name) {
        e.preventDefault();
        alert("Please enter your full name.");
      }
    });
  }
});
