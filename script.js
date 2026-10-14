```javascript
"use strict";

/* ==========================================
   MINDCASE — Detective Mystery Game
   No paid API or backend required.
   ========================================== */

const CASES = [
  {
    title: "The Locked Room",
    subtitle: "A disappearance that defies explanation",
    difficulty: "MODERATE",
    location: "BLACKWOOD MANOR",
    story: "At 9:00 PM, wealthy collector Adrian Vale was found missing from his locked study. The door was locked from inside, and the window appeared closed. Three people were in the manor. The study's only key was supposedly on Adrian's desk.",
    suspects: [
      { id: "mara", name: "Mara Vale", role: "The Heir", statement: "I was in the drawing room reading. I never went near the study.", detail: "Mara says she remained in the drawing room all evening. She stands to inherit the collection." },
      { id: "ellis", name: "Ellis Crane", role: "The Housekeeper", statement: "I delivered tea at 8:30. Adrian was alone then.", detail: "Ellis knows the house routines and has worked there for fifteen years." },
      { id: "felix", name: "Felix Ward", role: "The Locksmith", statement: "I repaired the study lock last week. It cannot be opened from outside.", detail: "Felix insists the lock is secure, but he knows exactly how it works." }
    ],
    evidence: [
      { id: "key", icon: "⚿", title: "The Study Key", summary: "A key on the desk", detail: "The key is on the desk, but a thin layer of undisturbed dust lies beneath it. It may have been placed there after the room was secured." },
      { id: "window", icon: "▧", title: "The Window", summary: "A sealed-looking window", detail: "The window latch is painted shut. There are no footprints or marks on the outside ledge." },
      { id: "lock", icon: "⌑", title: "The Lock Mechanism", summary: "Fresh tool marks", detail: "Fresh scratches appear around the inner lock plate. The lock can be manipulated with a narrow tool without turning the key." }
    ],
    answer: { suspect: "felix", evidence: "lock" },
    hint: "Focus on the person who understands the lock better than anyone else.",
    solution: "Felix's claim that the lock could not be manipulated was misleading. The fresh tool marks show that someone with specialist knowledge could operate it without the key. His access and expertise make him the strongest explanation in this fictional case."
  },
  {
    title: "The Midnight Manuscript",
    subtitle: "A priceless page vanishes from a guarded archive",
    difficulty: "MODERATE",
    location: "RAVENHURST LIBRARY",
    story: "A rare manuscript page disappeared between 10:00 and 10:15 PM. The archive alarm never sounded. Only the curator, a visiting scholar, and the night guard had access to the building.",
    suspects: [
      { id: "iris", name: "Iris Bell", role: "The Curator", statement: "I was cataloguing books in the west wing.", detail: "Iris has a master archive key and knows the alarm schedule." },
      { id: "noah", name: "Noah Reed", role: "The Scholar", statement: "I left before ten. My research notes are all I took.", detail: "Noah was studying the missing manuscript for an upcoming lecture." },
      { id: "grant", name: "Grant Mills", role: "The Guard", statement: "I watched the entrance continuously.", detail: "Grant logged his patrols, but the archive corridor is outside his desk's direct view." }
    ],
    evidence: [
      { id: "log", icon: "▤", title: "Access Log", summary: "A suspicious time entry", detail: "The archive log records the curator's key at 10:08 PM, despite Iris claiming she was in the west wing." },
      { id: "dust", icon: "✧", title: "Empty Display Mount", summary: "A clean outline", detail: "The page was removed carefully. No damage or hurried handling is visible." },
      { id: "alarm", icon: "◉", title: "Alarm Panel", summary: "No forced entry", detail: "The panel shows no alarm interruption. Entry required an authorized key or code." }
    ],
    answer: { suspect: "iris", evidence: "log" },
    hint: "Compare the curator's statement with the exact time recorded in the archive log.",
    solution: "Iris claimed to be elsewhere, but the access log places her key at the archive during the disappearance window. The log is the direct contradiction that makes her the best-supported suspect."
  },
  {
    title: "The Last Train",
    subtitle: "An alibi falls apart at the station",
    difficulty: "EASY",
    location: "EASTBRIDGE STATION",
    story: "A sealed envelope containing a confidential letter disappeared from the stationmaster's office at 6:20 PM. Three people were seen near the office. One person's account of the evening conflicts with the timetable.",
    suspects: [
      { id: "clara", name: "Clara Finch", role: "The Passenger", statement: "I boarded the 6:10 train and was already miles away.", detail: "Clara bought a ticket but her departure has not been confirmed." },
      { id: "owen", name: "Owen Price", role: "The Porter", statement: "I was moving luggage on platform two.", detail: "Owen worked on the opposite platform during the incident." },
      { id: "peter", name: "Peter Shaw", role: "The Stationmaster", statement: "I was in the signal room until 6:30.", detail: "Peter had access to the office, but another worker saw him in the signal room." }
    ],
    evidence: [
      { id: "ticket", icon: "▣", title: "Unused Ticket", summary: "A ticket that was never scanned", detail: "Clara's ticket for the 6:10 train was never scanned at the platform gate." },
      { id: "board", icon: "◷", title: "Departure Board", summary: "The train ran late", detail: "The 6:10 train was delayed until 6:35 PM, meaning passengers could still be at the station at 6:20." },
      { id: "witness", icon: "☷", title: "Platform Witness", summary: "A porter remembers a detail", detail: "A witness places Owen at platform two during the theft, away from the office." }
    ],
    answer: { suspect: "clara", evidence: "ticket" },
    hint: "Someone claims to have left, but the station records may say otherwise.",
    solution: "Clara's claim that she had already departed is not supported by the unused ticket. The train delay also means she could have remained at the station during the incident."
  },
  {
    title: "The Vanishing Diamond",
    subtitle: "A glittering jewel and a very convenient story",
    difficulty: "HARD",
    location: "THE ASTER GALLERY",
    story: "The famous Aster Diamond vanished during a private exhibition. The display case was intact, and the gallery's motion sensor registered no alarm. The owner, a cleaner, and a security consultant were questioned.",
    suspects: [
      { id: "vivian", name: "Vivian Cross", role: "The Owner", statement: "I stayed with the guests throughout the evening.", detail: "Vivian owns the diamond and has access to the display case." },
      { id: "leo", name: "Leo Hart", role: "The Cleaner", statement: "I cleaned the gallery before visitors arrived.", detail: "Leo's work order ended two hours before the exhibition." },
      { id: "simon", name: "Simon Frost", role: "The Consultant", statement: "I tested the sensors, but never opened the case.", detail: "Simon installed the gallery's sensor system and knows its blind spots." }
    ],
    evidence: [
      { id: "sensor", icon: "◉", title: "Sensor Report", summary: "A short calibration window", detail: "The sensor report shows a manual calibration window opened with the consultant's service code during the exhibition." },
      { id: "case", icon: "◇", title: "Display Case", summary: "No visible damage", detail: "The case shows no forced-entry marks. Its authorized maintenance mode can temporarily disable the sensor." },
      { id: "cloth", icon: "▤", title: "Cleaning Cloth", summary: "An ordinary supply", detail: "The cloth contains common cleaning solution. It cannot be linked to the missing diamond." }
    ],
    answer: { suspect: "simon", evidence: "sensor" },
    hint: "The lack of an alarm may be more revealing than a loud alarm.",
    solution: "Simon knew the sensor system and the report shows his service code opened a calibration window at the relevant time. That is the clearest link between a suspect and the opportunity to remove the diamond."
  },
  {
    title: "The Silent Witness",
    subtitle: "A painting, a power cut, and a contradiction",
    difficulty: "MODERATE",
    location: "MORROW ART HOUSE",
    story: "A painting was swapped for a convincing copy during a brief power outage. The gallery's backup lights activated, and only three people remained inside. One witness described a detail that should have been impossible to see.",
    suspects: [
      { id: "elena", name: "Elena Moss", role: "The Artist", statement: "I stayed near the entrance when the lights went out.", detail: "Elena knows the painting's brushwork intimately." },
      { id: "david", name: "David Cole", role: "The Visitor", statement: "I saw the red signature clearly in the darkness.", detail: "David claims to have stood several metres from the painting." },
      { id: "ruth", name: "Ruth Lane", role: "The Attendant", statement: "I activated the backup lights and stayed at the switch.", detail: "Ruth was responsible for gallery lighting." }
    ],
    evidence: [
      { id: "signature", icon: "✎", title: "Signature Detail", summary: "The signature is blue", detail: "The original painting's signature is blue, not red. The gallery guide and catalogue both show the same detail." },
      { id: "lights", icon: "☼", title: "Backup Lighting", summary: "A dim emergency glow", detail: "The emergency lights were weak and did not illuminate the signature clearly from the visitor area." },
      { id: "frame", icon: "▧", title: "The Frame", summary: "A careful exchange", detail: "The frame was opened using its standard release clips. No damage suggests someone knew how to remove the canvas." }
    ],
    answer: { suspect: "david", evidence: "signature" },
    hint: "A witness gave a very specific description of something they could not reasonably see.",
    solution: "David described the signature as red even though it is blue, revealing that his account was unreliable. He also claimed to see it clearly under lighting that was too dim. His statement is the key contradiction."
  },
  {
    title: "The Clockmaker's Secret",
    subtitle: "A clock stopped at the wrong time",
    difficulty: "HARD",
    location: "WREN & SONS WORKSHOP",
    story: "A rare mechanical blueprint disappeared from a clockmaker's workshop. A large wall clock stopped at 8:15 PM, but the workshop's other records suggest the theft happened later. The apprentice, the business partner, and a delivery worker all deny taking it.",
    suspects: [
      { id: "ada", name: "Ada Finch", role: "The Apprentice", statement: "I left at eight, as usual.", detail: "Ada understands the workshop's mechanisms and was trained by the clockmaker." },
      { id: "miles", name: "Miles Wren", role: "The Partner", statement: "I was checking the accounts in the office.", detail: "Miles had a financial dispute with the clockmaker." },
      { id: "toby", name: "Toby Wells", role: "The Delivery Worker", statement: "I delivered a parcel and left immediately.", detail: "Toby's delivery receipt is timestamped before the incident window." }
    ],
    evidence: [
      { id: "clock", icon: "◷", title: "Stopped Clock", summary: "Hands fixed at 8:15", detail: "The clock was deliberately stopped by pulling its pendulum. The hands can be set to any time without affecting other clocks." },
      { id: "ledger", icon: "▤", title: "Workshop Ledger", summary: "An entry after eight", detail: "A handwritten ledger entry at 8:27 PM records a blueprint consultation. The handwriting matches Ada's training notes." },
      { id: "receipt", icon: "▣", title: "Delivery Receipt", summary: "A confirmed early visit", detail: "Toby's receipt is signed at 7:42 PM, well before the blueprint went missing." }
    ],
    answer: { suspect: "ada", evidence: "ledger" },
    hint: "Don't trust a clock just because it has hands. Look for a record made at a specific time.",
    solution: "The stopped clock was deliberately manipulated and cannot establish the time of the theft. The ledger entry after eight links Ada to the workshop during the relevant period, while the delivery receipt places Toby there earlier."
  },
  {
    title: "The Poisoned Invitation",
    subtitle: "A dinner party disrupted by a forged note",
    difficulty: "MODERATE",
    location: "WILLOWCREST ESTATE",
    story: "Before a formal dinner, the host received a note changing the seating arrangement. The note sent the host away from the dining room just before an important contract went missing. Three guests had reasons to want the contract delayed.",
    suspects: [
      { id: "beatrice", name: "Beatrice Shaw", role: "The Secretary", statement: "I prepared the invitations days ago.", detail: "Beatrice handles the host's correspondence and knows the house stationery." },
      { id: "henry", name: "Henry Vale", role: "The Rival", statement: "I never touched the host's correspondence.", detail: "Henry stood to benefit if the contract was delayed." },
      { id: "lucy", name: "Lucy Grey", role: "The Guest", statement: "I received the same seating note as everyone else.", detail: "Lucy was a guest and had no access to the host's writing desk." }
    ],
    evidence: [
      { id: "paper", icon: "▤", title: "The Note", summary: "A familiar paper stock", detail: "The note uses the secretary's private stationery, kept in a locked desk drawer in the office." },
      { id: "ink", icon: "✎", title: "Ink Comparison", summary: "Different writing instrument", detail: "The note was written with a blue fountain pen, unlike the host's black ballpoint pen." },
      { id: "draft", icon: "▧", title: "Invitation Drafts", summary: "An earlier version", detail: "A discarded draft in Beatrice's wastebasket contains the same unusual phrase used in the seating note." }
    ],
    answer: { suspect: "beatrice", evidence: "draft" },
    hint: "Look for a repeated phrase connecting the note to someone who prepared the invitations.",
    solution: "The discarded draft contains the same unusual wording as the misleading note. Combined with the private stationery, it connects Beatrice to the note more strongly than the other guests."
  },
  {
    title: "The Empty Theatre",
    subtitle: "A missing actor and a curtain that rose too early",
    difficulty: "EASY",
    location: "GRAND MERIDIAN THEATRE",
    story: "Minutes before the final act, the lead actor could not be found. The stage door was locked, and the show had to be delayed. The director, stage manager, and understudy gave different accounts of where they had been.",
    suspects: [
      { id: "nina", name: "Nina Vale", role: "The Director", statement: "I was in the front row reviewing the lighting.", detail: "Nina controls the production schedule." },
      { id: "oscar", name: "Oscar Reed", role: "The Stage Manager", statement: "I was at the cue desk the entire time.", detail: "Oscar controls backstage access and stage cues." },
      { id: "jules", name: "Jules Park", role: "The Understudy", statement: "I was warming up in the dressing room.", detail: "Jules would take the lead role if the actor could not perform." }
    ],
    evidence: [
      { id: "cue", icon: "▤", title: "Cue Sheet", summary: "A cue was changed", detail: "The cue sheet shows the stage-door warning was removed by the stage manager's account shortly before the disappearance." },
      { id: "door", icon: "▣", title: "Stage Door", summary: "No forced entry", detail: "The door remained locked. Its access panel recorded a valid staff code at the relevant time." },
      { id: "script", icon: "✎", title: "Marked Script", summary: "An understudy's notes", detail: "Jules's script has role notes, but no evidence places Jules near the stage door." }
    ],
    answer: { suspect: "oscar", evidence: "cue" },
    hint: "Who could alter a stage cue and knew the backstage access routine?",
    solution: "Oscar's role gave him control of the cue desk and backstage procedures. The altered cue sheet is a direct link between his duties and the missing actor's disappearance."
  },
  {
    title: "The Frozen Alibi",
    subtitle: "A winter lodge where every minute matters",
    difficulty: "HARD",
    location: "NORTHSTAR LODGE",
    story: "A signed guest register was altered during a snowstorm. The lodge owner insists every guest was accounted for, but one entry was written in ink that had not yet been available when the register was supposedly completed.",
    suspects: [
      { id: "mason", name: "Mason Pike", role: "The Owner", statement: "I signed the register at six, before the storm worsened.", detail: "Mason keeps the guest register and orders office supplies." },
      { id: "sylvie", name: "Sylvie Hart", role: "The Guest", statement: "I signed after dinner, just like the others.", detail: "Sylvie arrived late and did not see the original register." },
      { id: "caleb", name: "Caleb Frost", role: "The Guide", statement: "I was outside checking the snow markers.", detail: "Caleb knows the mountain trails but had no reason to handle the register." }
    ],
    evidence: [
      { id: "ink", icon: "✎", title: "Ink Test", summary: "A recently issued pen", detail: "The altered entry uses ink from a pen batch delivered to the lodge at 7:30 PM, after Mason says the register was completed." },
      { id: "storm", icon: "❄", title: "Storm Record", summary: "The road closed early", detail: "The road closure confirms no deliveries arrived after 7:30 PM. The pen batch's arrival is documented." },
      { id: "gloves", icon: "♧", title: "Wet Gloves", summary: "Ordinary winter gear", detail: "Wet gloves were found near the entrance, but they cannot be linked to any particular guest." }
    ],
    answer: { suspect: "mason", evidence: "ink" },
    hint: "The material used to alter the register arrived after the time the owner claims it was signed.",
    solution: "Mason claimed the register was completed at six, but the ink was from a pen delivered later. Since he controlled the register and the office supplies, his timeline cannot be correct."
  },
  {
    title: "The Final Encore",
    subtitle: "One last performance conceals the truth",
    difficulty: "EXPERT",
    location: "OPERA HOUSE, ROOM 9",
    story: "A famous conductor's baton vanished from a locked display between the rehearsal and the final performance. The stage was crowded, yet no one reported seeing anyone approach the display. Three members of the company had access to the rehearsal schedule.",
    suspects: [
      { id: "marcel", name: "Marcel DuPont", role: "The Conductor", statement: "I kept my baton with me until the performance.", detail: "Marcel has a personal connection to the missing baton." },
      { id: "celeste", name: "Celeste Wynn", role: "The Lead Singer", statement: "I never entered the prop room.", detail: "Celeste was rehearsing near the prop room shortly before the final performance." },
      { id: "theo", name: "Theo March", role: "The Stage Technician", statement: "I locked the display after rehearsal and did not reopen it.", detail: "Theo maintains the display locks and has access to the prop room." }
    ],
    evidence: [
      { id: "schedule", icon: "◷", title: "Rehearsal Schedule", summary: "An unlisted ten-minute break", detail: "The official schedule omits a ten-minute prop-room access period. A technician's handwritten copy includes it." },
      { id: "hinge", icon: "⌑", title: "Display Hinge", summary: "A recently adjusted screw", detail: "The hinge screws were adjusted with the same specialist tool listed in the technician's maintenance kit." },
      { id: "program", icon: "▤", title: "Performance Program", summary: "A printed dedication", detail: "The program dedicates the final performance to the conductor, but contains no information about the display or its access." }
    ],
    answer: { suspect: "theo", evidence: "hinge" },
    hint: "Look at the person responsible for the display's physical security and maintenance.",
    solution: "Theo controlled the display maintenance and had the specialist tool matching the fresh hinge marks. The hidden access period adds opportunity, while the altered hinge provides the strongest physical clue."
  }
];

const STORAGE_KEY = "mindcase_progress_v2";

const state = {
  current: 0,
  selectedEvidence: null,
  selectedSuspect: null,
  attempts: {},
  hints: {},
  solved: {},
  firstTryWins: 0,
  xp: 0
};

const $ = (id) => document.getElementById(id);

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    state.solved = saved.solved && typeof saved.solved === "object" ? saved.solved : {};
    state.attempts = saved.attempts && typeof saved.attempts === "object" ? saved.attempts : {};
    state.hints = saved.hints && typeof saved.hints === "object" ? saved.hints : {};
    state.firstTryWins = Number(saved.firstTryWins) || 0;
    state.xp = Number(saved.xp) || 0;
  } catch (error) {
    console.warn("Could not load saved progress.", error);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      solved: state.solved,
      attempts: state.attempts,
      hints: state.hints,
      firstTryWins: state.firstTryWins,
      xp: state.xp
    }));
  } catch (error) {
    console.warn("Progress could not be saved in this browser.", error);
    showToast("Progress couldn't be saved. Check browser storage settings.");
  }
}

function solvedCount() {
  return CASES.filter((_, index) => state.solved[index]).length;
}

function getRank(xp) {
  if (xp >= 900) return "Master Detective";
  if (xp >= 600) return "Chief Inspector";
  if (xp >= 350) return "Senior Detective";
  if (xp >= 150) return "Investigator";
  return "Rookie";
}

function updateStats() {
  const solved = solvedCount();
  const rate = solved ? Math.round((state.firstTryWins / solved) * 100) + "%" : "—";
  $("xpCount").textContent = state.xp;
  $("rankName").textContent = getRank(state.xp);
  $("statSolved").textContent = solved;
  $("statXP").textContent = state.xp;
  $("statAccuracy").textContent = rate;
  $("solvedCount").textContent = `${solved} / ${CASES.length} solved`;
  $("progressBar").style.width = `${(solved / CASES.length) * 100}%`;
  $("caseCount").textContent = CASES.length;
}

function renderCaseList() {
  $("caseList").innerHTML = CASES.map((item, index) => `
    <button class="case-button ${index === state.current ? "active" : ""}"
      data-case="${index}" aria-current="${index === state.current ? "page" : "false"}">
      <span class="case-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="case-button-title">${escapeHTML(item.title)}</span>
      ${state.solved[index] ? '<span class="case-check" title="Solved">✓</span>' : ""}
    </button>
  `).join("");

  $("caseList").querySelectorAll("[data-case]").forEach(button => {
    button.addEventListener("click", () => openCase(Number(button.dataset.case)));
  });
}

function openCase(index) {
  state.current = index;
  state.selectedEvidence = null;
  state.selectedSuspect = null;
  renderCaseList();
  renderCurrentCase();
  $("caseWorkspace").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCurrentCase() {
  const item = CASES[state.current];
  const solved = !!state.solved[state.current];

  $("caseNumber").textContent = `CASE ${String(state.current + 1).padStart(2, "0")}`;
  $("caseDifficulty").textContent = item.difficulty;
  $("caseTitle").textContent = item.title;
  $("caseSubtitle").textContent = item.subtitle;
  $("caseLocation").textContent = `LOCATION: ${item.location}`;
  $("caseStory").textContent = item.story;
  $("caseStatus").textContent = solved ? "SOLVED ✓" : "UNSOLVED";
  $("caseStatus").classList.toggle("solved", solved);

  $("evidenceList").innerHTML = item.evidence.map((evidence, index) => `
    <button class="evidence-card" data-evidence="${escapeHTML(evidence.id)}">
      <span class="evidence-symbol">${evidence.icon}</span>
      <span class="card-copy"><strong>${escapeHTML(evidence.title)}</strong><small>${escapeHTML(evidence.summary)}</small></span>
      <span class="card-arrow">›</span>
    </button>
  `).join("");

  $("suspectList").innerHTML = item.suspects.map((suspect, index) => `
    <button class="suspect-card" data-suspect="${escapeHTML(suspect.id)}">
      <span class="suspect-avatar">${escapeHTML(suspect.name.charAt(0))}</span>
      <span class="card-copy"><strong>${escapeHTML(suspect.name)}</strong><small>${escapeHTML(suspect.role)}</small></span>
      <span class="card-arrow">›</span>
    </button>
  `).join("");

  const evidenceOptions = item.evidence.map(e =>
    `<option value="${escapeHTML(e.id)}">${escapeHTML(e.title)}</option>`
  ).join("");
  const suspectOptions = item.suspects.map(s =>
    `<option value="${escapeHTML(s.id)}">${escapeHTML(s.name)} — ${escapeHTML(s.role)}</option>`
  ).join("");

  $("evidenceSelect").innerHTML = '<option value="">Select evidence...</option>' + evidenceOptions;
  $("accusedSelect").innerHTML = '<option value="">Select a suspect...</option>' + suspectOptions;

  $("evidenceDetail").innerHTML = "Select an evidence card to examine it.";
  $("suspectDetail").innerHTML = "Select a person to review their statement.";
  $("feedback").className = "feedback";
  $("feedback").textContent = "";
  $("solutionBox").classList.add("hidden");
  $("retryButton").classList.toggle("hidden", !solved);
  $("nextButton").classList.toggle("hidden", !solved || state.current === CASES.length - 1);
  $("submitButton").disabled = solved;
  $("hintButton").disabled = solved;

  $("evidenceList").querySelectorAll("[data-evidence]").forEach(button => {
    button.addEventListener("click", () => selectEvidence(button.dataset.evidence));
  });

  $("suspectList").querySelectorAll("[data-suspect]").forEach(button => {
    button.addEventListener("click", () => selectSuspect(button.dataset.suspect));
  });

  if (solved) {
    showFeedback("success", "Case solved. Revisit the evidence whenever you like.");
    showSolution(item);
  }

  updateStats();
}

function selectEvidence(id) {
  const item = CASES[state.current];
  const evidence = item.evidence.find(entry => entry.id === id);
  if (!evidence) return;

  state.selectedEvidence = id;
  $("evidenceSelect").value = id;

  $("evidenceList").querySelectorAll("[data-evidence]").forEach(button => {
    button.classList.toggle("selected", button.dataset.evidence === id);
  });

  $("evidenceDetail").innerHTML =
    `<span class="detail-label">EVIDENCE EXAMINED</span><strong>${escapeHTML(evidence.title)}</strong><br>${escapeHTML(evidence.detail)}`;
}

function selectSuspect(id) {
  const item = CASES[state.current];
  const suspect = item.suspects.find(entry => entry.id === id);
  if (!suspect) return;

  state.selectedSuspect = id;
  $("accusedSelect").value = id;

  $("suspectList").querySelectorAll("[data-suspect]").forEach(button => {
    button.classList.toggle("selected", button.dataset.suspect === id);
  });

  $("suspectDetail").innerHTML =
    `<span class="detail-label">PERSON OF INTEREST</span><strong>${escapeHTML(suspect.name)} — ${escapeHTML(suspect.role)}</strong><br>“${escapeHTML(suspect.statement)}”<br>${escapeHTML(suspect.detail)}`;
}

function showFeedback(type, message) {
  const feedback = $("feedback");
  feedback.className = `feedback show ${type}`;
  feedback.textContent = message;
}

function showSolution(item) {
  const suspect = item.suspects.find(s => s.id === item.answer.suspect);
  const evidence = item.evidence.find(e => e.id === item.answer.evidence);
  $("solutionBox").innerHTML = `
    <h4>Case analysis</h4>
    <p><strong>Best-supported suspect:</strong> ${escapeHTML(suspect.name)}</p>
    <p><strong>Decisive evidence:</strong> ${escapeHTML(evidence.title)}</p>
    <p>${escapeHTML(item.solution)}</p>
  `;
  $("solutionBox").classList.remove("hidden");
}

function submitDeduction() {
  const item = CASES[state.current];
  if (state.solved[state.current]) return;

  const suspectId = $("accusedSelect").value;
  const evidenceId = $("evidenceSelect").value;

  if (!suspectId || !evidenceId) {
    showFeedback("info", "Choose both a suspect and a piece of evidence before submitting your deduction.");
    return;
  }

  state.attempts[state.current] = (Number(state.attempts[state.current]) || 0) + 1;
  const suspectCorrect = suspectId === item.answer.suspect;
  const evidenceCorrect = evidenceId === item.answer.evidence;

  if (suspectCorrect && evidenceCorrect) {
    const firstTry = state.attempts[state.current] === 1;
    const reward = firstTry ? 100 : 60;
    state.solved[state.current] = true;
    state.xp += reward;
    if (firstTry) state.firstTryWins += 1;

    saveProgress();
    renderCaseList();
    updateStats();
    $("caseStatus").textContent = "SOLVED ✓";
    $("caseStatus").classList.add("solved");
    $("submitButton").disabled = true;
    $("hintButton").disabled = true;
    $("retryButton").classList.remove("hidden");
    $("nextButton").classList.toggle("hidden", state.current === CASES.length - 1);

    showFeedback("success", `Excellent deduction! You solved the case and earned ${reward} XP${firstTry ? " for solving it on your first attempt" : ""}.`);
    showSolution(item);
    showToast(`Case solved! +${reward} XP`);
    return;
  }

  if (!suspectCorrect && !evidenceCorrect) {
    showFeedback("error", "That combination doesn't fit the case. Recheck the statements and the evidence before accusing anyone.");
  } else if (!suspectCorrect) {
    showFeedback("error", "The evidence may be relevant, but your accusation isn't supported. Compare each suspect's statement again.");
  } else {
    showFeedback("error", "Your suspect may be on the right track, but that isn't the decisive clue. Examine the other evidence.");
  }

  saveProgress();
}

function requestHint() {
  const item = CASES[state.current];
  if (state.solved[state.current]) return;

  state.hints[state.current] = (Number(state.hints[state.current]) || 0) + 1;
  showFeedback("info", `DETECTIVE'S NOTE: ${item.hint}`);
  saveProgress();
}

function retryCase() {
  if (state.solved[state.current]) {
    showToast("This case is already solved. Choose another file to investigate.");
    return;
  }

  $("accusedSelect").value = "";
  $("evidenceSelect").value = "";
  state.selectedEvidence = null;
  state.selectedSuspect = null;
  $("evidenceList").querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
  $("suspectList").querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
  $("evidenceDetail").textContent = "Select an evidence card to examine it.";
  $("suspectDetail").textContent = "Select a person to review their statement.";
  $("feedback").className = "feedback";
  $("solutionBox").classList.add("hidden");
  showToast("Investigation reset. Look at the evidence with fresh eyes.");
}

function nextCase() {
  if (state.current < CASES.length - 1) {
    openCase(state.current + 1);
  } else {
    showToast("You've reached the final case. You're a true detective!");
  }
}

function resetAllProgress() {
  const confirmed = window.confirm("Reset all MINDCASE progress, XP, hints, and solved cases? This cannot be undone.");
  if (!confirmed) return;

  state.solved = {};
  state.attempts = {};
  state.hints = {};
  state.firstTryWins = 0;
  state.xp = 0;
  saveProgress();
  renderCaseList();
  renderCurrentCase();
  updateStats();
  showToast("Progress reset. A fresh investigation begins.");
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function init() {
  loadProgress();
  $("year").textContent = new Date().getFullYear();

  $("accusedSelect").addEventListener("change", event => {
    if (event.target.value) selectSuspect(event.target.value);
  });

  $("evidenceSelect").addEventListener("change", event => {
    if (event.target.value) selectEvidence(event.target.value);
  });

  $("submitButton").addEventListener("click", submitDeduction);
  $("hintButton").addEventListener("click", requestHint);
  $("retryButton").addEventListener("click", retryCase);
  $("nextButton").addEventListener("click", nextCase);
  $("resetProgress").addEventListener("click", resetAllProgress);

  renderCaseList();
  renderCurrentCase();
  updateStats();
}

document.addEventListener("DOMContentLoaded", init);
```
