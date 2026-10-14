
(() => {
  "use strict";

  const KEY = "mindcase_solo_progress_v1";

  const cases = [
    {
      id:"last-guest",
      number:"001",
      title:"The Last Guest",
      category:"CRIME",
      difficulty:"MODERATE",
      symbol:"⌁",
      accent:"#d9b778",
      tag:"LOCKED ROOM",
      short:"A collector is found unconscious after a closed-door dinner. Three guests insist they never left their seats.",
      objective:"Find who entered the study and why the timeline does not add up.",
      briefing:"At 9:40 PM, art collector Victor Hale was found unconscious in his locked study. Nothing valuable appears to be missing. Three people were still in the house: Mara Vale, his personal assistant; Elliot Cross, a business partner; and June Park, the chef. Each claims to have been somewhere else when the incident happened. The study uses an electronic keycard, and the system recorded one unexpected entry.",
      evidence:[
        {id:"log",icon:"▤",title:"Keycard Access Log",type:"DIGITAL RECORD",text:"The study lock recorded Mara Vale's card at 9:37 PM. Mara says her card was left in the staff room all evening. The system clock was checked earlier that day and was accurate to within one minute.",stamp:"TIME-STAMPED"},
        {id:"note",icon:"✎",title:"Torn Appointment Note",type:"PAPER EVIDENCE",text:"A note in Victor's pocket reads: 'M. — study, 9:30. Bring the revised inventory.' The note is torn through the last line. The handwriting matches Victor's calendar notes, not Mara's.",stamp:"HANDWRITING VERIFIED"},
        {id:"receipt",icon:"▧",title:"Cafe Receipt",type:"WITNESS SUPPORT",text:"Elliot presents a cafe receipt printed at 9:32 PM across town. The cafe is a twelve-minute drive away, and the payment matches his bank card. It supports his alibi, though it does not prove exactly when he left.",stamp:"ALIBI PARTLY VERIFIED"},
        {id:"camera",icon:"◉",title:"Hall Camera Summary",type:"VIDEO SUMMARY",text:"The hallway camera shows a person carrying a folded dinner cloth entering the study corridor. The face is obscured, but the person wears the dark staff uniform issued to Mara.",stamp:"IMAGE INCONCLUSIVE"}
      ],
      suspects:[
        {id:"mara",name:"Mara Vale",role:"PERSONAL ASSISTANT",initial:"M",portrait:"👩🏻‍💼",statement:"I never went near the study. My access card was in the staff room. I was folding linen before dinner service ended."},
        {id:"elliot",name:"Elliot Cross",role:"BUSINESS PARTNER",initial:"E",portrait:"🧔🏻",statement:"Victor and I argued about the collection, but I left before nine-thirty. I had no reason to return."},
        {id:"june",name:"June Park",role:"HEAD CHEF",initial:"J",portrait:"👩🏽‍🍳",statement:"I was cleaning the kitchen. I carried linen to the corridor once, but I never entered the study."}
      ],
      motives:[
        {id:"cover",label:"Cover up a changed inventory"},
        {id:"theft",label:"Steal a valuable painting"},
        {id:"revenge",label:"Settle a personal grudge"}
      ],
      evidenceChoices:[
        {id:"log",label:"Keycard access log"},
        {id:"note",label:"Torn appointment note"},
        {id:"receipt",label:"Cafe receipt"},
        {id:"camera",label:"Hall camera summary"}
      ],
      answer:{suspect:"mara",motive:"cover",evidence:"log"},
      explanation:"The keycard log places Mara's card at the study at 9:37 PM, contradicting her claim that she never went near it. Victor's note points to a meeting about the revised inventory. The strongest theory is that Mara entered to conceal a change in the inventory, then tried to hide behind the card's supposed location.",
      hint:"Compare the access record with each person's exact claim. Then ask which clue explains Victor's meeting about the inventory."
    },
    {
      id:"perfect-alibi",
      number:"002",
      title:"The Perfect Alibi",
      category:"PSYCHOLOGICAL",
      difficulty:"CHALLENGING",
      symbol:"◷",
      accent:"#83b8d7",
      tag:"FALSE TIMELINE",
      short:"A priceless museum exhibit disappears during a power cut. One suspect's alibi sounds too perfect.",
      objective:"Find the contradiction between the timeline and the physical evidence.",
      briefing:"A rare watch disappeared from a museum's locked display during a seven-minute power interruption. The display was not forced. Curator Adrian Shaw says he was in the public gallery with visitors the entire time. Security officer Lena Ortiz was checking the backup generator, while archivist Noah Bell says he was in the basement. The watch's display case was reopened using an authorized override.",
      evidence:[
        {id:"clock",icon:"◷",title:"Gallery Clock Photo",type:"PHOTOGRAPH",text:"A visitor's photo shows the gallery clock at 8:14 PM. The power interruption began at 8:10 and ended at 8:17. The clock runs on an independent battery, so it continued to display the correct time.",stamp:"INDEPENDENT CLOCK"},
        {id:"note",icon:"▤",title:"Override Access Note",type:"SECURITY RECORD",text:"The display case override was entered at 8:12 PM using the curator's personal authorization code. The code was not shared with the security team. The system records a successful override, not merely an attempt.",stamp:"AUTHORIZED ACCESS"},
        {id:"timeline",icon:"✎",title:"Curator's Timeline",type:"WRITTEN STATEMENT",text:"Adrian says he was visible in the gallery from 8:05 to 8:20 PM and never approached the display. But the visitor photo at 8:14 shows the spot where Adrian claims he stood is empty. He later says the photo must be from another night.",stamp:"STATEMENT CONFLICT"},
        {id:"power",icon:"ϟ",title:"Generator Report",type:"TECHNICAL REPORT",text:"The generator report confirms the seven-minute outage. The backup system did not reset the display's access log. The outage explains the dark cameras, but not the valid override code.",stamp:"SYSTEM CHECKED"}
      ],
      suspects:[
        {id:"adrian",name:"Adrian Shaw",role:"MUSEUM CURATOR",initial:"A",portrait:"🧑🏻‍🏫",statement:"I was in the gallery the entire time. The case override must have been a system fault during the outage."},
        {id:"lena",name:"Lena Ortiz",role:"SECURITY OFFICER",initial:"L",portrait:"👮🏻‍♀️",statement:"I was at the generator panel. I can explain the power cut, but I do not have the curator's override code."},
        {id:"noah",name:"Noah Bell",role:"ARCHIVIST",initial:"N",portrait:"🧑🏻‍💼",statement:"I was in the basement cataloguing. I heard the alarm, but I never went upstairs."}
      ],
      motives:[
        {id:"prestige",label:"Protect reputation and prestige"},
        {id:"money",label:"Sell the watch for money"},
        {id:"accident",label:"Cover up accidental damage"}
      ],
      evidenceChoices:[
        {id:"clock",label:"Gallery clock photo"},
        {id:"note",label:"Override access note"},
        {id:"timeline",label:"Curator's timeline"},
        {id:"power",label:"Generator report"}
      ],
      answer:{suspect:"adrian",motive:"prestige",evidence:"note"},
      explanation:"Only Adrian's authorization code opened the display, and the override succeeded during the outage. The visitor photo also contradicts his claim that he stood in the gallery the entire time. Protecting his reputation is the strongest motive supported by the story.",
      hint:"An outage explains missing camera footage, but does it explain a valid personal authorization code? Check which statement is contradicted by the photo."
    },
    {
      id:"silent-witness",
      number:"003",
      title:"The Silent Witness",
      category:"HYBRID MYSTERY",
      difficulty:"EXPERT",
      symbol:"◈",
      accent:"#b7a2df",
      tag:"HIDDEN MOTIVE",
      short:"A research notebook vanishes from a remote cabin. Muddy footprints and a witness tell different stories.",
      objective:"Separate the misleading trail from the clue that reveals the real reason.",
      briefing:"A research notebook vanished from a locked cabin during a storm. It contained observations that could expose a serious mistake in a conservation project. Three people had access: researcher Tomas Reed, land manager Evelyn Hart, and caretaker Sam Dyer. Muddy footprints lead toward a rear window, but its latch is intact. No one admits entering the cabin after sunset.",
      evidence:[
        {id:"mud",icon:"⌁",title:"Muddy Footprints",type:"SCENE OBSERVATION",text:"Footprints lead from the rear window toward the path, but the mud pattern is shallow and ends abruptly under the eaves. Rain fell heavily before the notebook was reported missing. The prints may have been made earlier and do not prove someone used the window that night.",stamp:"TRAIL UNCONFIRMED"},
        {id:"latch",icon:"▣",title:"Window Latch",type:"PHYSICAL EVIDENCE",text:"The rear window latch is dusty and undamaged. A thin line of dust crosses the latch without a break. The window was almost certainly not opened during the incident, making the footprints misleading.",stamp:"NO FORCED ENTRY"},
        {id:"journal",icon:"✎",title:"Research Journal",type:"DOCUMENT",text:"A page left in the cabin says Tomas discovered a flaw in the project's water sampling method. A margin note reads: 'If this goes public, the whole report will be withdrawn.' The note does not say who removed the notebook.",stamp:"MOTIVE CONTEXT"},
        {id:"checklist",icon:"☷",title:"Caretaker Checklist",type:"ROUTINE RECORD",text:"Sam's nightly checklist notes that Tomas requested the spare key at 7:10 PM to correct a page in the notebook. Sam recorded the key's return at 7:28 PM, but the cabin inventory was not checked until morning. Tomas was the only person documented with key access after sunset.",stamp:"KEY MOVEMENT RECORDED"}
      ],
      suspects:[
        {id:"tomas",name:"Tomas Reed",role:"FIELD RESEARCHER",initial:"T",portrait:"🧑🏼‍🔬",statement:"I only corrected a page and returned the key. I never took the notebook. I was trying to fix the research before anyone saw the mistake."},
        {id:"evelyn",name:"Evelyn Hart",role:"LAND MANAGER",initial:"E",portrait:"👩🏻‍💼",statement:"The project matters to the whole region. I had no reason to go into the cabin during a storm."},
        {id:"sam",name:"Sam Dyer",role:"CABIN CARETAKER",initial:"S",portrait:"🧑🏽‍🔧",statement:"I lock up at sunset. I recorded the key return, but I did not check the notebook's location that evening."}
      ],
      motives:[
        {id:"protect",label:"Protect himself from the research error"},
        {id:"profit",label:"Sell the notebook for profit"},
        {id:"revenge",label:"Punish the land manager"}
      ],
      evidenceChoices:[
        {id:"mud",label:"Muddy footprints"},
        {id:"latch",label:"Window latch"},
        {id:"journal",label:"Research journal page"},
        {id:"checklist",label:"Caretaker checklist"}
      ],
      answer:{suspect:"tomas",motive:"protect",evidence:"checklist"},
      explanation:"The intact dusty latch undermines the idea of a window entry. The caretaker's checklist places the spare key with Tomas after sunset, and the journal reveals why he feared the notebook becoming public. The checklist is the strongest direct link between Tomas and access to the cabin.",
      hint:"The most dramatic clue is not always the most reliable. Which record connects someone to the cabin after sunset, and which clue explains why the notebook mattered?"
    }
  ];

  const $ = id => document.getElementById(id);
  let state = loadState();
  let current = null;
  let toastTimer;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");

      return {
        xp:Number.isFinite(saved.xp) ? Math.max(0,saved.xp) : 0,
        solved:Array.isArray(saved.solved)
          ? saved.solved.filter(id => cases.some(c => c.id === id))
          : [],
        reviewed:saved.reviewed && typeof saved.reviewed === "object"
          ? saved.reviewed
          : {}
      };
    } catch {
      return {xp:0,solved:[],reviewed:{}};
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY,JSON.stringify(state));
    } catch {
      toast("Browser storage is unavailable. Progress may not save.");
    }
  }

  function rank() {
    if (state.xp >= 300) return "MASTER DETECTIVE";
    if (state.xp >= 200) return "DETECTIVE";
    if (state.xp >= 100) return "INVESTIGATOR";
    return "ROOKIE";
  }

  function updateStats() {
    $("homeSolved").textContent = state.solved.length;
    $("homeXP").textContent = state.xp;
    $("homeRank").textContent = rank();
    $("playerXP").textContent = `${state.xp} XP`;
    $("playerRank").textContent =
      `${rank().toLowerCase()} · ${state.solved.length} solved`;
  }

  function showView(id) {
    document.querySelectorAll(".view").forEach(view => {
      view.classList.remove("active");
    });

    $(id).classList.add("active");
    window.scrollTo({top:0,behavior:"smooth"});

    if (id === "archive") renderCases();
    updateStats();
  }

  function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      $("toast").classList.remove("show");
    },2600);
  }

  function renderCases() {
    const grid = $("caseGrid");
    grid.replaceChildren();

    cases.forEach(c => {
      const solved = state.solved.includes(c.id);
      const card = document.createElement("article");

      card.className = `case-card${solved ? " solved" : ""}`;
      card.style.setProperty("--accent",c.accent);
      card.tabIndex = 0;
      card.setAttribute("role","button");
      card.setAttribute("aria-label",`Open ${c.title}`);

      card.innerHTML = `
        <div class="case-top">
          <span>FILE / ${c.number}</span>
          <span class="case-tag">${c.tag}</span>
        </div>
        <div class="case-symbol">${c.symbol}</div>
        <h3>${c.title}</h3>
        <p>${c.short}</p>
        <div class="case-bottom">
          <span>${c.difficulty}</span>
          <strong>${solved ? "✓ SOLVED" : "OPEN FILE ↗"}</strong>
        </div>`;

      card.addEventListener("click",() => openCase(c.id));

      card.addEventListener("keydown",event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCase(c.id);
        }
      });

      grid.appendChild(card);
    });
  }

  function openCase(id) {
    current = cases.find(c => c.id === id);
    if (!current) return;

    $("caseFile").textContent = `CASE FILE ${current.number}`;
    $("fileNumber").textContent = current.number;
    $("sideTitle").textContent = current.title;
    $("difficulty").textContent = current.difficulty;
    $("category").textContent = current.category;
    $("objective").textContent = current.objective;
    $("briefingText").textContent = current.briefing;
    $("verdict").className = "verdict hidden";

    $("deductionForm").reset();

    renderEvidence();
    renderSuspects();
    renderChoices();
    updateClueCount();
    setPhase("briefing");
    showView("game");
  }

  function reviewedIds() {
    if (!Array.isArray(state.reviewed[current.id])) {
      state.reviewed[current.id] = [];
    }

    return state.reviewed[current.id];
  }

  function updateClueCount() {
    $("clueCount").textContent = reviewedIds().length;
  }

  function renderEvidence() {
    const list = $("evidenceList");
    list.replaceChildren();

    current.evidence.forEach(item => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "evidence-item";
      button.dataset.id = item.id;

      button.innerHTML = `
        <span class="evidence-icon">${item.icon}</span>
        <span>
          <strong>${item.title}</strong>
          <small>${item.type}</small>
        </span>`;

      button.addEventListener("click",() => inspectEvidence(item.id));
      list.appendChild(button);
    });

    $("evidenceDetail").innerHTML = `
      <small>SELECT AN EVIDENCE FILE</small>
      <p>Choose an item to inspect it.</p>
      <p><b>Investigator's hint:</b> ${current.hint}</p>`;
  }

  function inspectEvidence(id) {
    const item = current.evidence.find(e => e.id === id);
    if (!item) return;

    const reviewed = reviewedIds();

    if (!reviewed.includes(id)) {
      reviewed.push(id);
      save();
    }

    document.querySelectorAll(".evidence-item").forEach(button => {
      const active = button.dataset.id === id;
      button.classList.toggle("selected",active);

      const oldCheck = button.querySelector(".check");
      if (oldCheck) oldCheck.remove();

      if (reviewed.includes(button.dataset.id)) {
        const check = document.createElement("span");
        check.className = "check";
        check.textContent = "✓";
        button.appendChild(check);
      }
    });

    $("evidenceDetail").innerHTML = `
      <small>${item.type}</small>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <span class="stamp">${item.stamp}</span>`;

    updateClueCount();
  }

  function renderSuspects() {
    const grid = $("suspectGrid");
    grid.replaceChildren();

    current.suspects.forEach((suspect,index) => {
      const card = document.createElement("article");

      card.className = "suspect-card";
      card.tabIndex = 0;
      card.setAttribute("role","button");
      card.setAttribute("aria-pressed","false");
      card.setAttribute(
        "aria-label",
        `Focus on ${suspect.name}'s statement`
      );

      card.style.setProperty(
        "--character-delay",
        `${index * 100}ms`
      );

      const head = document.createElement("div");
      head.className = "suspect-head";

      const portrait = document.createElement("div");
      portrait.className = "suspect-avatar character-portrait";
      portrait.setAttribute("aria-hidden","true");

      const emoji = document.createElement("span");
      emoji.className = "portrait-emoji";
      emoji.textContent = suspect.portrait || "🕵️";

      const initial = document.createElement("span");
      initial.className = "portrait-initial";
      initial.textContent = suspect.initial;

      portrait.append(emoji,initial);

      const nameBlock = document.createElement("div");
      nameBlock.className = "character-name";

      const name = document.createElement("h3");
      name.textContent = suspect.name;

      const role = document.createElement("small");
      role.textContent = suspect.role;

      nameBlock.append(name,role);

      const focus = document.createElement("span");
      focus.className = "character-focus";
      focus.setAttribute("aria-hidden","true");
      focus.textContent = "＋";

      head.append(portrait,nameBlock,focus);

      const speech = document.createElement("div");
      speech.className = "character-speech";

      const label = document.createElement("span");
      label.className = "speech-label";
      label.textContent = "STATEMENT";

      const statement = document.createElement("p");
      statement.textContent = suspect.statement;

      speech.append(label,statement);

      const observation = document.createElement("div");
      observation.className = "character-observation";
      observation.textContent = "Select to focus on this statement.";

      card.append(head,speech,observation);

      function selectCharacter() {
        grid.querySelectorAll(".suspect-card").forEach(other => {
          const selected = other === card;

          other.classList.toggle("character-selected",selected);
          other.setAttribute("aria-pressed",String(selected));

          const otherFocus = other.querySelector(".character-focus");
          if (otherFocus) {
            otherFocus.textContent = selected ? "✓" : "＋";
          }

          const otherObservation =
            other.querySelector(".character-observation");

          if (otherObservation) {
            otherObservation.textContent = selected
              ? "FOCUS: Compare this statement with the evidence."
              : "Select to focus on this statement.";
          }
        });
      }

      card.addEventListener("click",selectCharacter);

      card.addEventListener("keydown",event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectCharacter();
        }
      });

      grid.appendChild(card);
    });
  }

  function fillSelect(id,items,placeholder) {
    const select = $(id);
    select.replaceChildren();

    const first = document.createElement("option");
    first.value = "";
    first.textContent = placeholder;
    select.appendChild(first);

    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.label || item.name;
      select.appendChild(option);
    });
  }

  function renderChoices() {
    fillSelect("suspectChoice",current.suspects,"Select a suspect");
    fillSelect("motiveChoice",current.motives,"Select a motive");
    fillSelect("evidenceChoice",current.evidenceChoices,"Select evidence");
  }

  function setPhase(phase) {
    const details = {
      briefing:["01 / 04","✦ CASE BRIEFING","The facts so far.",25],
      evidence:["02 / 04","✦ EVIDENCE REVIEW","Look closer.",50],
      suspects:["03 / 04","✦ SUSPECT INTERVIEWS","Everyone has a story.",75],
      deduction:["04 / 04","✦ FINAL DEDUCTION","Connect the evidence.",100]
    };

    const info = details[phase];
    if (!info) return;

    $("stepLabel").textContent = info[0];
    $("phaseKicker").textContent = info[1];
    $("phaseTitle").textContent = info[2];
    $("progressFill").style.width = `${info[3]}%`;

    ["briefing","evidence","suspects","deduction"].forEach(name => {
      $(`${name}Panel`).classList.toggle("hidden",name !== phase);
    });

    if (phase === "evidence") renderEvidence();

    if (phase === "deduction") {
      $("verdict").classList.add("hidden");
    }
  }

  function submitDeduction(event) {
    event.preventDefault();
    if (!current) return;

    const suspect = $("suspectChoice").value;
    const motive = $("motiveChoice").value;
    const evidence = $("evidenceChoice").value;

    if (!suspect || !motive || !evidence) {
      toast("Complete all three parts of your deduction.");
      return;
    }

    const answer = current.answer;

    const correct =
      suspect === answer.suspect &&
      motive === answer.motive &&
      evidence === answer.evidence;

    const box = $("verdict");
    box.className = `verdict${correct ? "" : " wrong"}`;

    if (correct) {
      const alreadySolved = state.solved.includes(current.id);

      if (!alreadySolved) {
        state.solved.push(current.id);
        state.xp += 100;
        save();
      }

      box.innerHTML = `
        <h3>${alreadySolved ? "Case reopened. Your verdict stands." : "Deduction confirmed."}</h3>
        <p>${current.explanation}</p>
        <div class="reward">
          ${alreadySolved ? "ALREADY CREDITED · NO EXTRA XP" : "+100 XP · CASE SOLVED"}
        </div>`;

      toast(
        alreadySolved
          ? "You've already earned XP for this case."
          : "Excellent work. +100 XP earned!"
      );

      updateStats();
    } else {
      box.innerHTML = `
        <h3>Something doesn't fit.</h3>
        <p>Your theory doesn't fully explain the evidence. Revisit the statements and records, then try again. Hint: ${current.hint}</p>
        <div class="reward">KEEP INVESTIGATING · NO XP AWARDED</div>`;

      toast("Not quite. Review the evidence and try again.");
    }

    box.scrollIntoView({behavior:"smooth",block:"nearest"});
  }

  $("enterBtn").addEventListener("click",() => showView("archive"));

  $("homeLink").addEventListener("click",event => {
    event.preventDefault();
    showView("home");
  });

  document.querySelectorAll("[data-home]").forEach(button => {
    button.addEventListener("click",() => showView("home"));
  });

  $("backBtn").addEventListener("click",() => showView("archive"));

  document.querySelectorAll("[data-phase]").forEach(button => {
    button.addEventListener("click",() => {
      setPhase(button.dataset.phase);
    });
  });

  $("deductionForm").addEventListener("submit",submitDeduction);

  $("resetBtn").addEventListener("click",() => {
    if (!window.confirm(
      "Reset all MINDCASE progress saved in this browser? This cannot be undone."
    )) return;

    state = {xp:0,solved:[],reviewed:{}};
    save();
    updateStats();
    renderCases();
    toast("Progress reset.");
  });

  updateStats();
})();
