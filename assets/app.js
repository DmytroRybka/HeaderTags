/* Safety First — shared front-end logic.
 * No frameworks, no build step. Works from file:// or any static host. */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
   * THE ENGINE
   * Three inputs (1–10), one consistent verdict. This is the heart of the
   * whole site: every risk card and the live calculator call verdict().
   * -------------------------------------------------------------------- */

  // How much one point of mitigation buys down one point of raw risk.
  var MITIGATION_POWER = 0.6;

  var CATEGORIES = {
    free_lunch: {
      key: "free_lunch",
      label: "Free Lunch",
      band: "good",
      tagline: "Big upside, almost no danger.",
      recommendation: "Just do it — and do it consistently. This is the cheapest safety you will ever buy."
    },
    worthwhile: {
      key: "worthwhile",
      label: "Worthwhile Risk",
      band: "good",
      tagline: "The reward beats a danger you can control.",
      recommendation: "Earn it. Get the training and gear, respect the rules, then enjoy it fully."
    },
    care: {
      key: "care",
      label: "Proceed With Care",
      band: "warn",
      tagline: "It can go either way — your discipline decides.",
      recommendation: "Tighten your mitigation until the reward clearly wins, or scale the activity back."
    },
    unnecessary: {
      key: "unnecessary",
      label: "Unnecessary Risk",
      band: "bad",
      tagline: "Real danger bolted onto almost no benefit.",
      recommendation: "Eliminate it. You give up nothing that matters and remove a genuine downside."
    },
    reckless: {
      key: "reckless",
      label: "Reckless Risk",
      band: "bad",
      tagline: "The danger is severe and you can't meaningfully control it.",
      recommendation: "Step back. No amount of upside fixes a risk you cannot bring under control."
    }
  };

  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }

  function verdict(benefit, risk, mitigation) {
    benefit = clamp(+benefit, 1, 10);
    risk = clamp(+risk, 1, 10);
    mitigation = clamp(+mitigation, 1, 10);

    // What's left of the danger after you've done your homework.
    var residual = clamp(risk - MITIGATION_POWER * mitigation, 0, 10);
    // Net deal: reward minus the danger you can't get rid of.
    var net = benefit - residual;

    var category;
    if (benefit <= 3 && risk >= 5) {
      // Low reward + real danger = the seatbelt shape.
      category = CATEGORIES.unnecessary;
    } else if (residual >= 7) {
      // Danger you simply cannot tame, whatever the reward.
      category = CATEGORIES.reckless;
    } else if (net >= 5 && risk <= 3) {
      category = CATEGORIES.free_lunch;
    } else if (net >= 3) {
      category = CATEGORIES.worthwhile;
    } else {
      category = CATEGORIES.care;
    }

    return {
      benefit: benefit,
      risk: risk,
      mitigation: mitigation,
      residual: Math.round(residual * 10) / 10,
      net: Math.round(net * 10) / 10,
      category: category
    };
  }

  /* ----------------------------------------------------------------------
   * RENDERING HELPERS
   * -------------------------------------------------------------------- */

  function stars(value, max) {
    max = max || 10;
    var v = Math.round(clamp(value, 0, max));
    var out = "";
    for (var i = 1; i <= max; i++) {
      out += '<span class="star ' + (i <= v ? "on" : "off") + '">★</span>';
    }
    return '<span class="stars" aria-label="' + v + " out of " + max + '">' + out + "</span>";
  }

  function metricRow(name, value, hint) {
    return (
      '<div class="metric">' +
      '<div class="metric-head"><span class="metric-name">' + name + "</span>" +
      '<span class="metric-num">' + value + "/10</span></div>" +
      stars(value) +
      (hint ? '<p class="metric-hint">' + hint + "</p>" : "") +
      "</div>"
    );
  }

  // Builds the full Risk Card markup for a set of scores.
  function riskCardHTML(scores, opts) {
    opts = opts || {};
    var v = verdict(scores.benefit, scores.risk, scores.mitigation);
    var c = v.category;
    return (
      '<div class="risk-card band-' + c.band + '">' +
      '<div class="risk-card-top">' +
      '<span class="verdict-badge band-' + c.band + '">' + c.label + "</span>" +
      '<span class="verdict-tagline">' + c.tagline + "</span>" +
      "</div>" +
      (opts.withMetrics === false
        ? ""
        : '<div class="metrics">' +
          metricRow("Benefit", v.benefit, "What you genuinely gain.") +
          metricRow("Raw Risk", v.risk, "Worst realistic outcome, unprotected.") +
          metricRow("Mitigation", v.mitigation, "How much you can buy that danger down.") +
          "</div>") +
      '<div class="residual">' +
      '<div><span class="residual-label">Residual danger after mitigation</span>' +
      stars(v.residual) +
      '<span class="residual-num">' + v.residual + "/10</span></div>" +
      "</div>" +
      '<p class="verdict-reco">' + c.recommendation + "</p>" +
      "</div>"
    );
  }

  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* ----------------------------------------------------------------------
   * PAGE: blog index — render the card grid
   * -------------------------------------------------------------------- */

  function renderBlogIndex(el) {
    var posts = (window.SF_POSTS || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
    el.innerHTML = posts
      .map(function (p) {
        var v = verdict(p.scores.benefit, p.scores.risk, p.scores.mitigation);
        return (
          '<a class="post-card" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
          '<div class="post-card-emoji">' + (p.emoji || "🛡️") + "</div>" +
          '<div class="post-card-body">' +
          '<span class="verdict-badge sm band-' + v.category.band + '">' + v.category.label + "</span>" +
          "<h3>" + esc(p.title) + "</h3>" +
          '<p class="post-card-activity">' + esc(p.activity) + "</p>" +
          '<p class="post-card-summary">' + esc(p.summary) + "</p>" +
          '<div class="post-card-meta">' + fmtDate(p.date) + " · " + esc(p.author) + "</div>" +
          "</div></a>"
        );
      })
      .join("");
  }

  /* ----------------------------------------------------------------------
   * PAGE: single post
   * -------------------------------------------------------------------- */

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function list(items, cls) {
    return '<ul class="' + cls + '">' + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
  }

  function renderPost(el) {
    var slug = getParam("slug");
    var posts = window.SF_POSTS || [];
    var p = posts.filter(function (x) { return x.slug === slug; })[0] || posts[0];
    if (!p) {
      el.innerHTML = "<p>Post not found.</p>";
      return;
    }
    document.title = p.title + " · Safety First";

    el.innerHTML =
      '<article class="post">' +
      '<header class="post-header">' +
      '<div class="post-emoji-lg">' + (p.emoji || "🛡️") + "</div>" +
      '<div class="post-tags">' + (p.tags || []).map(function (t) { return '<span class="tag">#' + esc(t) + "</span>"; }).join("") + "</div>" +
      "<h1>" + esc(p.title) + "</h1>" +
      '<p class="post-activity">Risk under review: <strong>' + esc(p.activity) + "</strong></p>" +
      '<p class="post-meta">' + fmtDate(p.date) + " · by " + esc(p.author) + "</p>" +
      "</header>" +
      riskCardHTML(p.scores) +
      '<div class="post-body">' + p.body.map(function (para) { return "<p>" + para + "</p>"; }).join("") + "</div>" +
      '<section class="post-section">' +
      "<h2>How to minimise the risk</h2>" +
      list(p.measures, "measures") +
      "</section>" +
      '<section class="post-section action">' +
      "<h2>Your action plan</h2>" +
      '<p class="action-intro">Reading changes nothing. Pick a line and do it today.</p>' +
      '<ol class="action-plan">' + p.actionPlan.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" +
      "</section>" +
      '<a class="back-link" href="blog.html">← All risk reviews</a>' +
      "</article>";
  }

  /* ----------------------------------------------------------------------
   * PAGE: featured posts (home)
   * -------------------------------------------------------------------- */

  function renderFeatured(el, n) {
    var posts = (window.SF_POSTS || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    }).slice(0, n || 3);
    el.innerHTML = posts
      .map(function (p) {
        var v = verdict(p.scores.benefit, p.scores.risk, p.scores.mitigation);
        return (
          '<a class="post-card" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
          '<div class="post-card-emoji">' + (p.emoji || "🛡️") + "</div>" +
          '<div class="post-card-body">' +
          '<span class="verdict-badge sm band-' + v.category.band + '">' + v.category.label + "</span>" +
          "<h3>" + esc(p.title) + "</h3>" +
          '<p class="post-card-summary">' + esc(p.summary) + "</p>" +
          "</div></a>"
        );
      })
      .join("");
  }

  /* ----------------------------------------------------------------------
   * PAGE: ratings — the live calculator
   * -------------------------------------------------------------------- */

  function initCalculator(root) {
    var sliders = {
      benefit: root.querySelector("#in-benefit"),
      risk: root.querySelector("#in-risk"),
      mitigation: root.querySelector("#in-mitigation")
    };
    var out = root.querySelector("#calc-output");

    function update() {
      var scores = {
        benefit: +sliders.benefit.value,
        risk: +sliders.risk.value,
        mitigation: +sliders.mitigation.value
      };
      Object.keys(sliders).forEach(function (k) {
        var lbl = root.querySelector("#val-" + k);
        if (lbl) lbl.textContent = sliders[k].value;
      });
      out.innerHTML = riskCardHTML(scores);
    }

    Object.keys(sliders).forEach(function (k) {
      sliders[k].addEventListener("input", update);
    });
    update();
  }

  /* ----------------------------------------------------------------------
   * Shared chrome: mark active nav link, set year
   * -------------------------------------------------------------------- */

  function initChrome() {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("nav.site-nav a").forEach(function (a) {
      var target = (a.getAttribute("href") || "").toLowerCase();
      if (target === here || (here === "" && target === "index.html")) a.classList.add("active");
    });
    document.querySelectorAll("[data-year]").forEach(function (e) {
      e.textContent = new Date().getFullYear();
    });
    var burger = document.querySelector(".nav-toggle");
    if (burger) {
      burger.addEventListener("click", function () {
        document.querySelector("nav.site-nav").classList.toggle("open");
      });
    }
  }

  /* ----------------------------------------------------------------------
   * Boot
   * -------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initChrome();
    var el;
    if ((el = document.getElementById("featured"))) renderFeatured(el, 3);
    if ((el = document.getElementById("blog-index"))) renderBlogIndex(el);
    if ((el = document.getElementById("post-root"))) renderPost(el);
    if ((el = document.getElementById("calculator"))) initCalculator(el);
  });

  // Expose for reuse / testing.
  window.SF = { verdict: verdict, stars: stars, riskCardHTML: riskCardHTML, CATEGORIES: CATEGORIES };
})();
