
(() => {
  "use strict";

  const cfg = window.MINDCASE_CONFIG || {};
  const configured = Boolean(
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.includes("PASTE_") &&
    !cfg.SUPABASE_ANON_KEY.includes("PASTE_")
  );

  const db = configured && window.supabase
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : null;

  const $ = id => document.getElementById(id);
  const viewIds = ["authView", "dashboardView", "gameView"];

  let user = null;
  let profile = null;
  let registering = false;
  let activeCase = null;
  let inspected = new Set();
  let toastTimer;

  const cases = [
    {
      id: "last-guest",
      number: "001",
      category: "CRIME",
      title: "The Last Guest",
      subtitle: "A hotel room is empty. Three stories don't fit.",
      difficulty: "ROOKIE",
      mark: "01",
      description: "A guest vanishes before checkout. Three people give conflicting accounts of the night.",
      briefing: `At 11:20 PM, the fictional Northbridge Hotel reported that Room 408 was empty. Guest Elias Ward had checked in that afternoon and left his bag behind.

The night manager says the room was already empty at 10:45 PM. The porter remembers carrying fresh towels upstairs at 11:05 PM. A visitor claims she was waiting in the lobby until midnight.

Your task is to reconstruct the timeline from the records. A suspicious detail is not automatically proof of a crime.`,
      evidence: [
        {
          id: "log", icon: "▤", title: "Front desk log",
          short: "A timestamped desk record",
          detail: "The log records a keycard reset for Room 408 at 11:12 PM using the night manager's staff code. This proves the reset was recorded, but not who physically held the card."
        },
        {
          id: "lift", icon: "↟", title: "Lift maintenance note",
          short: "A brief lift interruption",
          detail: "The guest lift stopped between floors from 10:58 PM to 11:08 PM. The stairwell remained accessible, so a lift trip during that window was unlikely."
        },
        {
          id: "receipt", icon: "▧", title: "Cafe receipt",
          short: "A purchase across the street",
          detail: "A receipt records two coffees at 11:16 PM, paid in cash. A cashier's note says the customer wore a porter jacket. That observation is not a verified identity."
        },
        {
          id: "camera", icon: "◉", title: "Lobby camera summary",
          short: "A gap in the recording",
          detail: "The lobby camera has a recording gap from 11:10 PM to 11:18 PM. It cannot establish who entered or left during that interval. A gap alone does not prove tampering."
        }
      ],
      suspects: [
        {
          id: "mara", name: "Mara Voss", role: "NIGHT MANAGER",
          statement: "I checked the floor at 10:45 PM. Room 408 was already empty. I stayed at the desk after that.",
          note: "Had access to staff codes."
        },
        {
          id: "leon", name: "Leon Pike", role: "HOTEL PORTER",
          statement: "I took towels upstairs around 11:05 PM, but the lift was working when I arrived. I didn't go near the cafe.",
          note: "Wears a porter jacket."
        },
        {
          id: "nina", name: "Nina Vale", role: "VISITOR",
          statement: "I waited in the lobby until midnight. I never went upstairs, and I didn't leave the hotel.",
          note: "Her visit was not in the guest register."
        }
      ],
      motives: [
        { id: "cover", label: "Concealing an unauthorized room entry" },
        { id: "theft", label: "Taking a guest's belongings" },
        { id: "mistake", label: "An ordinary scheduling mistake" }
      ],
      correctSuspect: "mara",
      correctMotive: "cover",
      correctEvidence: "log",
      explanation: "The keycard reset for Room 408 was recorded at 11:12 PM using Mara's staff code, contradicting the impression that the room was already settled. This makes Mara the intended answer for the room-entry cover-up. It does not prove exactly what happened to Elias Ward. The other clues are suggestive, but weaker.",
      hint: "Compare each person's timeline with the timestamped records. Prefer a record over an unverified observation."
    },
    {
      id: "perfect-alibi",
      number: "002",
      category: "PSYCHOLOGICAL",
      title: "The Perfect Alibi",
      subtitle: "A witness remembers everything — perhaps too neatly.",
      difficulty: "INVESTIGATOR",
      mark: "02",
      description: "A detailed account seems airtight, until the sequence of events is checked.",
      briefing: `At a private gallery, a signed sketch disappeared during a ten-minute power interruption. Curator Adrian says he was in the archive from 8:00 to 8:20 PM and gives a precise account of every minute.

Two other staff members disagree about when they saw him. Your task is to evaluate the statements carefully: confidence is not the same as accuracy, and a mismatch matters only when records support it.`,
      evidence: [
        {
          id: "clock", icon: "◷", title: "Gallery clock photo",
          short: "Time shown in a visitor photo",
          detail: "A visitor's photo shows the gallery clock at 8:14 PM. The clock was later found to run six minutes fast, making the corrected time approximately 8:08 PM."
        },
        {
          id: "badge", icon: "▣", title: "Archive access record",
          short: "A badge entry at 8:11 PM",
          detail: "The archive reader recorded Adrian's badge at 8:11 PM. Its clock is synchronized to the building server. It proves the badge was used, but not who carried it."
        },
        {
          id: "note", icon: "✎", title: "Curator's written timeline",
          short: "A minute-by-minute account",
          detail: "Adrian wrote that he entered the archive at 8:02 PM and did not touch his badge again that evening. The 8:11 PM record conflicts with that exact claim, although someone else could theoretically have used his badge."
        },
        {
          id: "outage", icon: "ϟ", title: "Power interruption report",
          short: "Lights out for ten minutes",
          detail: "The building report records an interruption from 8:06 to 8:16 PM. Battery-backed access readers continued to operate, so the interruption does not explain away the 8:11 PM event."
        }
      ],
      suspects: [
        {
          id: "adrian", name: "Adrian Cole", role: "CURATOR",
          statement: "I entered the archive at 8:02 PM. I did not use my badge again that evening, and I stayed inside until the lights returned.",
          note: "Wrote the detailed timeline."
        },
        {
          id: "bea", name: "Bea Lin", role: "GALLERY ASSISTANT",
          statement: "I saw Adrian near the archive door after the lights went out, but I didn't see whether he entered.",
          note: "Was checking the public gallery."
        },
        {
          id: "owen", name: "Owen Hart", role: "SECURITY OFFICER",
          statement: "I stayed at the front entrance throughout the interruption. I did not enter the archive corridor.",
          note: "His patrol log has no missing entry."
        }
      ],
      motives: [
        { id: "prestige", label: "Protecting professional reputation" },
        { id: "prank", label: "Playing a harmless practical joke" },
        { id: "weather", label: "Avoiding the rain outside" }
      ],
      correctSuspect: "adrian",
      correctMotive: "prestige",
      correctEvidence: "note",
      explanation: "The strongest contradiction is between Adrian's claim that he did not use his badge again and the synchronized 8:11 PM record. Adrian is the intended answer. The motive is an inference, not a timestamped fact, and the record alone cannot prove who physically used the badge.",
      hint: "Separate what a record proves from what you infer. Confidence is not evidence."
    },
    {
      id: "silent-witness",
      number: "003",
      category: "HYBRID MYSTERY",
      title: "The Silent Witness",
      subtitle: "Three people describe the same moment differently.",
      difficulty: "DETECTIVE",
      mark: "03",
      description: "A remote cabin, a stormy evening, and three memories that cannot all be right.",
      briefing: `At a fictional lakeside research cabin, a sealed field notebook was found outside the locked study after a storm. No one was hurt.

Researcher Imani, caretaker Tomas, and journalist Jules each insist they saw the notebook in a different place shortly before the storm. Determine whose account is most inconsistent with the physical record, without assuming more than the clues can support.`,
      evidence: [
        {
          id: "mud", icon: "⌁", title: "Mud trace",
          short: "A partial print by the side door",
          detail: "A muddy partial shoe print was found inside the side entrance. Rain began at 9:18 PM. The print is consistent with someone entering after rain began, but it cannot identify a person."
        },
        {
          id: "window", icon: "▱", title: "Window latch",
          short: "Latch found closed from inside",
          detail: "The study window latch was found closed. A caretaker's checklist at 9:00 PM also says it was closed. This weakens the idea that the notebook was blown through the window, but does not identify who moved it."
        },
        {
          id: "journal", icon: "▤", title: "Research journal",
          short: "A note written at 9:10 PM",
          detail: "Imani's journal says the notebook was on the study desk at 9:10 PM. The timestamp comes from an offline device checked that morning, so it is useful but not perfectly independent."
        },
        {
          id: "checklist", icon: "☷", title: "Caretaker checklist",
          short: "A signed room check",
          detail: "Tomas signed a checklist at 9:15 PM stating that the desk was clear except for a lamp and cup. This conflicts with Imani's earlier journal entry unless one timestamp or observation is wrong."
        }
      ],
      suspects: [
        {
          id: "imani", name: "Imani Rao", role: "RESEARCHER",
          statement: "I wrote at 9:10 PM that the notebook was on the desk. I did not leave the study after that.",
          note: "Kept the notebook for her research."
        },
        {
          id: "tomas", name: "Tomas Reed", role: "CARETAKER",
          statement: "I checked the room at 9:15 PM. The desk was clear, and I signed the checklist immediately afterward.",
          note: "Responsible for the building checklist."
        },
        {
          id: "jules", name: "Jules Mercer", role: "JOURNALIST",
          statement: "I saw the notebook beside the door before the storm. I never entered the study.",
          note: "Was visiting to interview the researcher."
        }
      ],
      motives: [
        { id: "attention", label: "Creating a misleading story for attention" },
        { id: "protect", label: "Protecting a private research result" },
        { id: "routine", label: "Following ordinary cabin procedures" }
      ],
      correctSuspect: "tomas",
      correctMotive: "protect",
      correctEvidence: "checklist",
      explanation: "Tomas's signed checklist conflicts with Imani's 9:10 PM journal entry. Tomas is the intended answer for further scrutiny, with the checklist as the key clue. The evidence does not conclusively establish who moved the notebook or why.",
      hint: "Find the two records that make incompatible claims about the same object. A contradiction narrows possibilities; it does not prove every part of a theory."
    }
  ];

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }

  function showView(id) {
    viewIds.forEach(view => $(view).classList.toggle("hidden", view !== id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function message(text, type = "") {
    $("authMessage").textContent = text;
    $("authMessage").className = "message " + type;
  }

  function toast(text) {
    const el = $("toast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
  }

  function connection(text) {
    $("connection").textContent = "● " + text;
  }

  function setAuthMode(createAccount) {
    registering = createAccount;
    $("loginTab").classList.toggle("active", !createAccount);
    $("registerTab").classList.toggle("active", createAccount);
    $("nameLabel").classList.toggle("hidden", !createAccount);
    $("codename").classList.toggle("hidden", !createAccount);
    $("codename").required = createAccount;
    $("password").autocomplete = createAccount ? "new-password" : "current-password";
    $("authTitle").textContent = createAccount ? "Begin your file." : "Welcome back.";
    $("authSubtitle").textContent = createAccount
      ? "Create your detective identity."
      : "Your case files are waiting.";
    $("authSubmit").textContent = createAccount ? "Create account ↗" : "Sign in ↗";
    message("");
  }

  function rankName(xp) {
    if (xp >= 600) return "Mastermind";
    if (xp >= 300) return "Detective";
    if (xp >= 120) return "Investigator";
    return "Rookie";
  }

  async function fetchProfile(authUser) {
    const { data, error } = await db
      .from("profiles")
      .select("id,display_name,xp,solved_cases")
      .eq("id", authUser.id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      throw new Error("Your profile was not created. Check that schema.sql ran successfully.");
    }
    return data;
  }

  async function enterApp(authUser) {
    user = authUser;
    $("signOut").classList.remove("hidden");
    connection("SIGNED IN");

    try {
      profile = await fetchProfile(authUser);
      renderDashboard();
      showView("dashboardView");
    } catch (err) {
      console.error(err);
      showView("authView");
      message(err.message || "Could not load your profile.", "error");
    }
  }

  function renderDashboard() {
    const xp = Number(profile?.xp || 0);
    const solved = Array.isArray(profile?.solved_cases) ? profile.solved_cases : [];

    $("playerName").textContent = (profile?.display_name || "Detective") + ".";
    $("rank").textContent = rankName(xp);
    $("xpRank").textContent = xp + " XP";
    $("xp").textContent = xp;
    $("solved").textContent = solved.length;

    $("caseGrid").innerHTML = cases.map((c, index) => {
      const completed = solved.includes(c.id);
      return `
        <article class="case-card">
          <div class="case-art art-${index + 1}" data-mark="${c.mark}"></div>
          <div class="case-body">
            <span class="case-label">CASE ${c.number} · ${escapeHTML(c.category)}</span>
            <h3>${escapeHTML(c.title)}</h3>
            <p>${escapeHTML(c.description)}</p>
            <div class="case-bottom">
              <span class="difficulty">${c.difficulty}${completed ? " · SOLVED ✓" : ""}</span>
              <button class="case-open" data-case="${c.id}">${completed ? "Replay ↗" : "Open file ↗"}</button>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  function openCase(id) {
    activeCase = cases.find(c => c.id === id);
    if (!activeCase) return;

    inspected = new Set();
    $("caseCategory").textContent = `CASE ${activeCase.number} · ${activeCase.category}`;
    $("caseTitle").textContent = activeCase.title;
    $("caseSubtitle").textContent = activeCase.subtitle;
    $("difficulty").textContent = activeCase.difficulty;
    $("briefing").textContent = activeCase.briefing;

    $("motive").innerHTML = '<option value="">Choose a motive...</option>' +
      activeCase.motives.map(m => `<option value="${m.id}">${escapeHTML(m.label)}</option>`).join("");

    $("supportingClue").innerHTML = '<option value="">Choose supporting evidence...</option>' +
      activeCase.evidence.map(e => `<option value="${e.id}">${escapeHTML(e.title)}</option>`).join("");

    $("suspectChoices").innerHTML = activeCase.suspects.map(s => `
      <label class="suspect-choice">
        <input type="radio" name="suspect" value="${s.id}" required>
        <span>${escapeHTML(s.name)}<br><small>${escapeHTML(s.role)}</small></span>
      </label>`).join("");

    $("suspectGrid").innerHTML = activeCase.suspects.map(s => `
      <article class="suspect-card">
        <h3>${escapeHTML(s.name)}</h3>
        <span class="suspect-role">${escapeHTML(s.role)}</span>
        <p>“${escapeHTML(s.statement)}”</p>
        <small>FILE NOTE: ${escapeHTML(s.note)}</small>
      </article>`).join("");

    $("deductionForm").reset();
    $("result").className = "result hidden";
    $("result").innerHTML = "";
    $("evidenceDetail").classList.add("hidden");
    renderEvidence();
    switchPanel("briefing");
    showView("gameView");
  }

  function renderEvidence() {
    $("evidenceGrid").innerHTML = activeCase.evidence.map(e => `
      <button class="evidence-card ${inspected.has(e.id) ? "selected" : ""}" data-evidence="${e.id}">
        <i>${e.icon}</i>
        <strong>${escapeHTML(e.title)}</strong>
        <small>${inspected.has(e.id) ? "INSPECTED · " : ""}${escapeHTML(e.short)}</small>
      </button>`).join("");

    $("clueCount").textContent = `${inspected.size}/${activeCase.evidence.length}`;
    $("progress").textContent = `${inspected.size} / ${activeCase.evidence.length} CLUES`;
  }

  function inspectEvidence(id) {
    const evidence = activeCase.evidence.find(e => e.id === id);
    if (!evidence) return;

    inspected.add(id);
    renderEvidence();

    $("evidenceDetail").innerHTML =
      `<strong>FILE NOTE · ${escapeHTML(evidence.title.toUpperCase())}</strong>
       <p>${escapeHTML(evidence.detail)}</p>`;
    $("evidenceDetail").classList.remove("hidden");
  }

  function switchPanel(name) {
    document.querySelectorAll(".game-tab").forEach(btn =>
      btn.classList.toggle("active", btn.dataset.panel === name)
    );
    document.querySelectorAll(".game-panel").forEach(panel =>
      panel.classList.toggle("hidden", panel.id !== "panel-" + name)
    );
  }

  async function submitDeduction(event) {
    event.preventDefault();
    if (!activeCase || !user) return;

    const suspect = new FormData($("deductionForm")).get("suspect");
    const motive = $("motive").value;
    const evidence = $("supportingClue").value;

    if (!suspect || !motive || !evidence) {
      toast("Choose a suspect, motive, and supporting clue.");
      return;
    }

    const submitButton = $("deductionForm").querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Checking deduction...";

    try {
      const { data, error } = await db.rpc("submit_case_deduction", {
        p_case_id: activeCase.id,
        p_suspect: suspect,
        p_motive: motive,
        p_evidence: evidence
      });

      if (error) throw error;

      const result = data;
      const correct = Boolean(result.correct);
      const suspectName = activeCase.suspects.find(s => s.id === activeCase.correctSuspect)?.name || "Unknown";

      $("result").className = "result " + (correct ? "correct" : "");
      $("result").innerHTML = `
        <h3>${correct ? "Case deduction accepted." : "The evidence tells another story."}</h3>
        <p>${correct
          ? "Your suspect, motive, and evidence match the intended solution."
          : "Your theory does not match the strongest-supported solution. Review the timeline and try again."}</p>
        <p><strong>CASE FILE CONCLUSION:</strong> ${escapeHTML(suspectName)} is the intended answer. ${escapeHTML(activeCase.explanation)}</p>
        <p><strong>DETECTIVE TIP:</strong> ${escapeHTML(activeCase.hint)}</p>
        <p><strong>XP EARNED:</strong> ${Number(result.earned_xp || 0)} · <strong>TOTAL XP:</strong> ${Number(result.total_xp || 0)}</p>
        <button id="returnHQ" class="btn btn-primary" type="button">Return to headquarters ↗</button>`;

      $("result").classList.remove("hidden");
      $("result").scrollIntoView({ behavior: "smooth", block: "start" });

      profile = await fetchProfile(user);
      renderDashboard();

      $("returnHQ").addEventListener("click", () => showView("dashboardView"));
      if (correct && result.earned_xp > 0) toast("+100 XP — case solved!");
      else if (correct) toast("Case replayed. No extra completion XP.");
      else toast("Deduction recorded. Review the clues and try again.");
    } catch (err) {
      console.error(err);
      toast("Could not check the deduction. Verify your Supabase setup.");
      $("result").className = "result";
      $("result").innerHTML = `<p>${escapeHTML(err.message || "A database error occurred.")}</p>`;
      $("result").classList.remove("hidden");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit final deduction ↗";
    }
  }

  async function handleAuth(event) {
    event.preventDefault();

    if (!db) {
      $("setupNotice").classList.remove("hidden");
      message("Connect Supabase first. Follow the setup instructions below.", "error");
      return;
    }

    const email = $("email").value.trim();
    const password = $("password").value;
    const name = $("codename").value.trim();

    if (password.length < 8) {
      message("Use a password with at least 8 characters.", "error");
      return;
    }

    if (registering && name.length < 2) {
      message("Your detective codename must have at least 2 characters.", "error");
      return;
    }

    const submit = $("authSubmit");
    submit.disabled = true;
    submit.textContent = registering ? "Creating account..." : "Signing in...";
    message("");

    try {
      if (registering) {
        const { data, error } = await db.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
            emailRedirectTo: window.location.href.split("#")[0]
          }
        });
        if (error) throw error;

        if (data.session && data.user) {
          await enterApp(data.user);
          toast("Welcome to MINDCASE, Detective.");
        } else {
          message("Account created. Check your email to confirm it, then sign in.", "success");
        }
      } else {
        const { data, error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await enterApp(data.user);
      }
    } catch (err) {
      message(err.message || "Authentication failed. Try again.", "error");
    } finally {
      submit.disabled = false;
      submit.textContent = registering ? "Create account ↗" : "Sign in ↗";
    }
  }

  async function googleSignIn() {
    if (!db) {
      $("setupNotice").classList.remove("hidden");
      message("Connect Supabase first, then configure Google OAuth.", "error");
      return;
    }

    try {
      const { error } = await db.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.href.split("#")[0] }
      });
      if (error) throw error;
    } catch (err) {
      message("Google sign-in failed: " + (err.message || "check OAuth settings"), "error");
    }
  }

  async function signOut() {
    if (!db) return;
    const { error } = await db.auth.signOut();
    if (error) {
      toast("Could not sign out. Please retry.");
      return;
    }
    user = null;
    profile = null;
    $("signOut").classList.add("hidden");
    connection("SIGNED OUT");
    setAuthMode(false);
    showView("authView");
  }

  function bindEvents() {
    $("loginTab").addEventListener("click", () => setAuthMode(false));
    $("registerTab").addEventListener("click", () => setAuthMode(true));
    $("authForm").addEventListener("submit", handleAuth);
    $("googleBtn").addEventListener("click", googleSignIn);
    $("signOut").addEventListener("click", signOut);

    $("homeLink").addEventListener("click", event => {
      event.preventDefault();
      if (user && profile) showView("dashboardView");
    });

    $("caseGrid").addEventListener("click", event => {
      const button = event.target.closest("[data-case]");
      if (button) openCase(button.dataset.case);
    });

    $("backBtn").addEventListener("click", () => showView("dashboardView"));

    document.querySelectorAll(".game-tab").forEach(button =>
      button.addEventListener("click", () => switchPanel(button.dataset.panel))
    );

    document.querySelectorAll("[data-goto]").forEach(button =>
      button.addEventListener("click", () => switchPanel(button.dataset.goto))
    );

    $("evidenceGrid").addEventListener("click", event => {
      const button = event.target.closest("[data-evidence]");
      if (button) inspectEvidence(button.dataset.evidence);
    });

    $("deductionForm").addEventListener("submit", submitDeduction);
  }

  async function init() {
    bindEvents();
    setAuthMode(false);

    if (!db) {
      connection("SETUP REQUIRED");
      $("setupNotice").classList.remove("hidden");
      return;
    }

    connection("CONNECTING");

    const { data, error } = await db.auth.getSession();

    if (error) {
      connection("CONNECTION ERROR");
      message("Could not restore your session. Refresh the page and try again.", "error");
      return;
    }

    if (data.session?.user) {
      await enterApp(data.session.user);
    } else {
      connection("NOT SIGNED IN");
      showView("authView");
    }

    db.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        user = null;
        profile = null;
        $("signOut").classList.add("hidden");
        connection("SIGNED OUT");
        showView("authView");
      } else if (
        event === "SIGNED_IN" &&
        session?.user &&
        (!user || user.id !== session.user.id)
      ) {
        // Defer profile queries until after the auth callback.
        setTimeout(() => enterApp(session.user), 0);
      }
    });
  }

  init();
})();
