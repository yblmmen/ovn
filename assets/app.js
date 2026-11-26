(function () {
  const STORAGE_DONE = "cilium_ovn_done_v1";
  const STORAGE_THEME = "cilium_ovn_theme_v1";

  const base = document.body.getAttribute("data-base") || "./";
  const currentPostId = document.body.getAttribute("data-post-id") || "";
  const isOverview = document.body.getAttribute("data-page") === "overview";

  let doneList = [];
  let theme = "light";
  const openDomains = new Set(); // 기본적으로 모두 닫힘 (클릭 시 열림)

  function loadState() {
    try {
      const d = localStorage.getItem(STORAGE_DONE);
      if (d) doneList = JSON.parse(d);
      const t = localStorage.getItem(STORAGE_THEME);
      if (t === "dark" || t === "light") theme = t;
    } catch (e) {}
    applyTheme(theme);
  }

  function saveDone() {
    try {
      localStorage.setItem(STORAGE_DONE, JSON.stringify(doneList));
    } catch (e) {}
  }

  function applyTheme(next) {
    theme = next;
    document.documentElement.setAttribute("data-theme", next);
    const icon = document.getElementById("themeIcon");
    const label = document.getElementById("themeLabel");
    if (icon) icon.textContent = next === "dark" ? "☀️" : "🌙";
    if (label) label.textContent = next === "dark" ? "라이트" : "다크";
    try {
      localStorage.setItem(STORAGE_THEME, next);
    } catch (e) {}
  }

  function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function renderShell() {
    const topbar = document.getElementById("topbar");
    if (topbar) {
      topbar.innerHTML = `
        <div class="brand-group">
          <button id="mobileMenu" class="mobile-menu-btn" type="button" aria-label="메뉴 열기">☰</button>
          <a class="brand-link" href="${base}index.html">
            <div class="brand-icon">eBPF</div>
            <div class="brand-text">
              <div class="brand-title">Cilium Network Study Blog</div>
              <div class="brand-sub">Kubernetes eBPF · Observability · BGP · Service Mesh · Security</div>
            </div>
          </a>
        </div>
        <div class="top-actions">
          <div class="search-wrap">
            <span class="search-icon">🔍</span>
            <input id="globalSearch" class="search-input" type="search" placeholder="주제, 명령어, 키워드 검색..." aria-label="블로그 검색" autocomplete="off" />
            <span class="search-kbd">Ctrl+K</span>
            <div id="searchDropdown" class="search-dropdown"></div>
          </div>
          <button id="themeToggle" class="icon-btn" type="button" title="테마 전환">
            <span id="themeIcon">${theme === "dark" ? "☀️" : "🌙"}</span>
            <span class="btn-label-hide" id="themeLabel">${theme === "dark" ? "라이트" : "다크"}</span>
          </button>
        </div>
      `;
    }

    renderSidebar();
    renderCompleteButton();
    renderArticleNav();
    bindEvents();
  }

  function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar || !window.BLOG_DOMAINS || !window.BLOG_POSTS) return;

    const total = window.BLOG_POSTS.length;
    const doneCount = doneList.filter(id => window.BLOG_POSTS.some(p => p.id === id)).length;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <a class="nav-overview-link ${isOverview ? "active" : ""}" href="${base}index.html">
          <span>📚 전체 학습 대문</span>
          <span>${total}편</span>
        </a>
        <div class="progress-mini">
          <div class="progress-mini-top">
            <span>학습 진행률</span>
            <span>${doneCount} / ${total} (${pct}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      </div>
      <nav class="sidebar-nav" aria-label="주제별 목차">
        ${window.BLOG_DOMAINS.map(dom => {
          const items = window.BLOG_POSTS.filter(p => p.domainId === dom.id);
          const domDone = items.filter(p => doneList.includes(p.id)).length;
          const isOpen = openDomains.has(dom.id);
          return `
            <div class="domain-accordion ${isOpen ? "open" : ""}" data-domain="${dom.id}">
              <button class="acc-trigger" type="button" data-acc-toggle="${dom.id}">
                <span class="acc-title-wrap">
                  <span class="acc-badge">${dom.badge}</span>
                  <span class="acc-label">${dom.title}</span>
                </span>
                <span class="acc-meta">
                  <span>${domDone}/${items.length}</span>
                  <span class="acc-chevron">▶</span>
                </span>
              </button>
              <div class="acc-list">
                ${items.map(item => {
                  const isDone = doneList.includes(item.id);
                  const isActive = currentPostId === item.id;
                  return `
                    <a class="lesson-link ${isDone ? "done" : ""} ${isActive ? "active" : ""}" href="${base}${item.file}">
                      <span class="lesson-dot">${isDone ? "✓" : ""}</span>
                      <span>${item.title}</span>
                    </a>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </nav>
      <div class="sidebar-footer">
        <div>원본 출처: <a href="https://dobby-isfree.tistory.com/category/%EA%B8%B0%EC%88%A0%20%ED%86%A0%EB%A1%A0%EC%9E%A5/%5BK8s%5D%20Kubernetes" target="_blank" rel="noopener noreferrer">Jini-99 · Tistory</a></div>
        <div>학습 완료 상태는 브라우저에 저장됩니다.</div>
      </div>
    `;
  }

  function renderCompleteButton() {
    const btn = document.getElementById("completeBtn");
    if (!btn || !currentPostId) return;
    const isDone = doneList.includes(currentPostId);
    btn.classList.toggle("is-done", isDone);
    btn.textContent = isDone ? "✓ 학습 완료됨" : "○ 학습 완료 표시";
  }

  function renderArticleNav() {
    const nav = document.getElementById("articleNav");
    if (!nav || !currentPostId || !window.BLOG_POSTS) return;
    const idx = window.BLOG_POSTS.findIndex(p => p.id === currentPostId);
    if (idx < 0) return;
    const prev = idx > 0 ? window.BLOG_POSTS[idx - 1] : null;
    const next = idx < window.BLOG_POSTS.length - 1 ? window.BLOG_POSTS[idx + 1] : null;

    nav.innerHTML = `
      ${prev ? `
        <a class="nav-step-btn" href="${base}${prev.file}">
          <div class="nav-step-dir">← 이전 주제</div>
          <div class="nav-step-title">${prev.title}</div>
        </a>
      ` : `<div></div>`}
      ${next ? `
        <a class="nav-step-btn" href="${base}${next.file}" style="text-align:right;">
          <div class="nav-step-dir">다음 주제 →</div>
          <div class="nav-step-title">${next.title}</div>
        </a>
      ` : `<div></div>`}
    `;
  }

  function renderOverviewGrid() {
    const grid = document.getElementById("domainGrid");
    const metricCount = document.getElementById("metricTotal");
    const metricProgress = document.getElementById("metricProgress");
    const metricProgressSub = document.getElementById("metricProgressSub");
    if (!grid || !window.BLOG_DOMAINS || !window.BLOG_POSTS) return;

    const total = window.BLOG_POSTS.length;
    const doneCount = doneList.filter(id => window.BLOG_POSTS.some(p => p.id === id)).length;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;

    if (metricCount) metricCount.textContent = `${total}편`;
    if (metricProgress) metricProgress.textContent = `${pct}%`;
    if (metricProgressSub) metricProgressSub.textContent = `${doneCount} / ${total} 완료`;

    grid.innerHTML = window.BLOG_DOMAINS.map(dom => {
      const posts = window.BLOG_POSTS.filter(p => p.domainId === dom.id);
      const domDone = posts.filter(p => doneList.includes(p.id)).length;
      return `
        <article class="domain-card">
          <div class="domain-card-head">
            <div>
              <span class="acc-badge">${dom.badge}</span>
              <h2 class="domain-card-title">${dom.title}</h2>
            </div>
            <span style="font-size:12px; color:var(--text-soft); font-weight:600;">${domDone}/${posts.length} 완료</span>
          </div>
          <p class="domain-card-desc">${dom.desc}</p>
          <div class="domain-post-links">
            ${posts.map(p => {
              const isDone = doneList.includes(p.id);
              return `
                <a class="domain-post-link" href="${base}${p.file}">
                  <span>${isDone ? "✅ " : "📄 "}${p.title}</span>
                  <span style="font-size:12px; color:var(--accent); flex-shrink:0;">열기 →</span>
                </a>
              `;
            }).join("")}
          </div>
        </article>
      `;
    }).join("");
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast("코드를 클립보드에 복사했습니다.")).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("코드를 클립보드에 복사했습니다.");
    } catch (e) {
      showToast("복사에 실패했습니다.");
    }
    document.body.removeChild(ta);
  }

  function bindEvents() {
    const mobileBtn = document.getElementById("mobileMenu");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("open");
      });
    }

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        applyTheme(theme === "dark" ? "light" : "dark");
      });
    }

    const completeBtn = document.getElementById("completeBtn");
    if (completeBtn && currentPostId) {
      completeBtn.addEventListener("click", () => {
        const idx = doneList.indexOf(currentPostId);
        if (idx >= 0) {
          doneList.splice(idx, 1);
          showToast("학습 완료 표시를 해제했습니다.");
        } else {
          doneList.push(currentPostId);
          showToast("학습 완료로 기록했습니다!");
        }
        saveDone();
        renderCompleteButton();
        renderSidebar();
      });
    }

    const searchInput = document.getElementById("globalSearch");
    const dropdown = document.getElementById("searchDropdown");
    if (searchInput && dropdown) {
      searchInput.addEventListener("input", () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) {
          dropdown.classList.remove("open");
          dropdown.innerHTML = "";
          return;
        }
        const matches = window.BLOG_POSTS.filter(p =>
          (p.title + " " + p.keywords).toLowerCase().includes(q)
        );
        if (!matches.length) {
          dropdown.innerHTML = `<div class="search-result-item"><div class="search-result-title" style="color:var(--text-soft);">검색 결과가 없습니다.</div></div>`;
        } else {
          dropdown.innerHTML = matches.map(m => {
            const dom = window.BLOG_DOMAINS.find(d => d.id === m.domainId);
            return `
              <a class="search-result-item" href="${base}${m.file}">
                <div class="search-result-cat">${dom ? dom.badge + " · " + dom.title : ""}</div>
                <div class="search-result-title">${m.title}</div>
              </a>
            `;
          }).join("");
        }
        dropdown.classList.add("open");
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrap")) {
          dropdown.classList.remove("open");
        }
      });
    }
  }

  document.addEventListener("click", (e) => {
    const accBtn = e.target.closest("[data-acc-toggle]");
    if (accBtn) {
      const domId = accBtn.getAttribute("data-acc-toggle");
      if (openDomains.has(domId)) openDomains.delete(domId);
      else openDomains.add(domId);
      renderSidebar();
      return;
    }

    const copyBtn = e.target.closest(".copy-btn");
    if (copyBtn) {
      const box = copyBtn.closest(".code-box");
      const pre = box ? box.querySelector("pre") : null;
      if (pre) copyText(pre.textContent);
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("globalSearch");
      if (input) input.focus();
    }
  });

  loadState();
  renderShell();
  if (isOverview) renderOverviewGrid();
})();
