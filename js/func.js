document.addEventListener("DOMContentLoaded", () => {
  const addReasonButton = document.getElementById("add-reason-button");
  const clearReasonsButton = document.getElementById("clear-reasons-button");
  const newReasonInput = document.getElementById("new-reason");
  const reasonsList = document.getElementById("reasons-list");

  // Load reasons from cookies
  const savedReasons = getCookie("reasons");
  if (savedReasons) {
    const reasons = JSON.parse(savedReasons);
    reasons.forEach((reason) => {
      const li = document.createElement("li");
      li.textContent = reason;
      reasonsList.appendChild(li);
    });
  }

  function addReason() {
    const newReason = newReasonInput.value.trim();
    if (newReason) {
      const li = document.createElement("li");
      li.textContent = newReason;
      reasonsList.appendChild(li);
      newReasonInput.value = "";

      // Save to cookies
      saveReasons();
    }
  }

  function clearReasons() {
    reasonsList.innerHTML = "";
    setCookie("reasons", "", -1); // Delete the cookie
  }

  addReasonButton.addEventListener("click", addReason);
  clearReasonsButton.addEventListener("click", clearReasons);

  newReasonInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addReason();
    }
  });

  function saveReasons() {
    const reasons = [];
    reasonsList.querySelectorAll("li").forEach((li) => {
      reasons.push(li.textContent);
    });
    setCookie("reasons", JSON.stringify(reasons), 365);
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
});
