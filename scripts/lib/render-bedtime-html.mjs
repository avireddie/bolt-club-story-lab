/** @param {string} s */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {object} mission
 * @param {object} options
 * @param {boolean} [options.includePipelineNote]
 */
export function renderBedtimeHtml(mission, options = {}) {
  const slug = mission.slug;
  const missionTitle = esc(mission.missionTitle ?? "Untitled Mission");
  const tagline = esc(mission.tagline ?? "A printable story for Soham — read under the lamp, pictures and all.");

  const pages = mission.storyPages;
  if (!Array.isArray(pages) || pages.length === 0) {
    throw new Error("mission.storyPages must be a non-empty array");
  }

  const storySections = pages
    .map((page, idx) => {
      const n = idx + 1;
      const chapter = esc(page.chapterTitle ?? `Chapter ${n}`);
      const brief = esc(page.panelArtBrief ?? "");
      const imgName = `${slug}-page${n}.png`;
      const continued = idx > 0 ? " story-page--continued" : "";
      const running = idx > 0 ? "    <p class=\"running-head\">The Bolt Club</p>\n" : "";

      const paras = (page.paragraphs ?? []).map((block) => {
        const t = block?.text ?? "";
        if (block?.type === "sign") {
          return `      <p class="sign">${esc(t)}</p>`;
        }
        return `      <p>${esc(t)}</p>`;
      }).join("\n");

      return `  <section class="story-page${continued}" id="page-${n}">
${running}    <p class="page-lead">
      <span class="page-num">Page ${n}</span><span class="page-sep">:</span>
      <span class="chapter-name">${chapter}</span>
    </p>

    <figure class="hero-illustration">
      <div class="panel-frame">
        <img class="panel-img" src="images/${esc(imgName)}" alt="" width="1200" height="900" decoding="async" />
        <span class="panel-hint">Run <code>npm run generate:panels -- --manifest printables/panel-manifests/${esc(
          slug
        )}.json</code> or draw in this frame.</span>
      </div>
      <figcaption class="art-brief">
        <strong>Panel art brief</strong>
        ${brief}
      </figcaption>
    </figure>

    <div class="story-body">
${paras}
    </div>
  </section>`;
    })
    .join("\n\n");

  const debrief = mission.debrief ?? {};
  const items = Array.isArray(debrief.items) ? debrief.items : [];
  const dl = items
    .map((it) => `      <dt>${esc(it.dt ?? "")}</dt>\n      <dd>${esc(it.dd ?? "")}</dd>`)
    .join("\n\n");

  const pk = debrief.parentKey ?? {};
  const parentKey = `
    <div class="parent-key">
      <h3>Parent-only answer key</h3>
      ${pk.gist ? `<p><strong>Gist:</strong> ${esc(pk.gist)}</p>` : ""}
      ${pk.recap ? `<p><strong>Recap:</strong> ${esc(pk.recap)}</p>` : ""}
      ${pk.evidence ? `<p><strong>Evidence:</strong> ${esc(pk.evidence)}</p>` : ""}
      ${pk.trap ? `<p><strong>Trap:</strong> ${esc(pk.trap)}</p>` : ""}
      ${pk.inference ? `<p><strong>Inference:</strong> ${esc(pk.inference)}</p>` : ""}
    </div>`;

  const pipelineNote = options.includePipelineNote
    ? `
  <aside class="screen-only">
    <strong>Generated</strong> by <code>npm run mission:pdf</code>. Print → Save as PDF. Images: merged style from <code>bolt-club-panel-defaults.json</code>.
  </aside>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${missionTitle} — Bolt Club</title>
  <link rel="stylesheet" href="css/bolt-club-chapter-pdf.css" />
</head>
<body>

  <header class="doc-header">
    <p class="series-banner">The Bolt Club</p>
    <h1 class="mission-title">${missionTitle}</h1>
    <p class="bedtime-tagline">${tagline}</p>
  </header>
${pipelineNote}

${storySections}

  <section class="debrief" id="debrief">
    <h2>Case File — Mission Debrief</h2>

    <dl>

${dl}

    </dl>

${parentKey}
  </section>

  <script>
    (function () {
      document.querySelectorAll(".panel-frame").forEach(function (frame) {
        var img = frame.querySelector(".panel-img");
        var hint = frame.querySelector(".panel-hint");
        if (!img || !hint) return;

        function showImage() {
          img.classList.add("is-visible");
          hint.setAttribute("hidden", "");
        }

        function showPlaceholder() {
          img.classList.remove("is-visible");
          hint.removeAttribute("hidden");
        }

        if (img.complete && img.naturalWidth > 0) {
          showImage();
        } else {
          img.addEventListener("load", showImage);
          img.addEventListener("error", showPlaceholder);
        }
      });
    })();
  </script>

</body>
</html>
`;
}
