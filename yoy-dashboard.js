(function () {
  "use strict";

  const viewButtons = document.querySelectorAll(".view-menu button");
  const viewSections = document.querySelectorAll("[data-view-section]");
  const overviewDom = {
    band: document.querySelector("#overviewRiskBand"),
    lead: document.querySelector("#overviewRiskLead"),
    riskList: document.querySelector("#overviewRiskList"),
    actionList: document.querySelector("#overviewActionList"),
  };
  const yoyDom = {
    seasonality: document.querySelector("#yoySeasonality"),
    latestPeriod: document.querySelector("#yoyLatestPeriod"),
    compareBase: document.querySelector("#yoyCompareBase"),
    revenue: document.querySelector("#yoyRevenue"),
    revenueNote: document.querySelector("#yoyRevenueNote"),
    operatingIncome: document.querySelector("#yoyOperatingIncome"),
    operatingNote: document.querySelector("#yoyOperatingNote"),
    cashFlow: document.querySelector("#yoyCashFlow"),
    cashFlowNote: document.querySelector("#yoyCashFlowNote"),
    workingCapital: document.querySelector("#yoyWorkingCapital"),
    workingCapitalNote: document.querySelector("#yoyWorkingCapitalNote"),
    signal: document.querySelector("#yoySignal"),
    brief: document.querySelector("#yoyBrief"),
    chart: document.querySelector("#yoyChart"),
    table: document.querySelector("#yoyTable"),
  };

  if (!viewButtons.length || !viewSections.length || !yoyDom.table) return;

  let activeView = "overview";
  const originalRender = typeof render === "function" ? render : null;

  function getCurrentAnalysis() {
    if (typeof getCompany !== "function" || typeof analyzeCompany !== "function" || typeof normalizeAnalysis !== "function") return null;
    const company = getCompany();
    return normalizeAnalysis(company, analyzeCompany(company));
  }

  function cleanText(value) {
    return String(value || "").replace(/[。；;]+$/u, "");
  }

  function severityLabel(severity) {
    if (severity === "high") return "高";
    if (severity === "medium") return "中";
    return "低";
  }

  function severityClass(severity) {
    if (severity === "high") return "danger";
    if (severity === "medium") return "warning";
    return "";
  }

  function renderRiskOverview(analysis) {
    if (!analysis || !overviewDom.band || !overviewDom.lead || !overviewDom.riskList || !overviewDom.actionList) return;

    const recommendation = analysis.recommendation || {};
    const riskProfile = analysis.riskProfile || {};
    const materialAlerts = (analysis.alerts || []).filter((item) => item.severity !== "low");
    const band = riskProfile.band || recommendation.riskLabel || "觀察";

    overviewDom.band.textContent = band;
    overviewDom.band.className = `status-pill ${band.includes("高") ? "danger" : band.includes("觀察") || band.includes("中") ? "warning" : ""}`;
    overviewDom.lead.textContent =
      `目前判讀為「${recommendation.label || "--"}」，風險分數 ${riskProfile.score ?? "--"}/100（${band}）。` +
      `先看風險總覽確認警覺方向，再進入 YoY、趨勢與比率頁拆解原因。`;

    const riskItems = materialAlerts.slice(0, 3);
    overviewDom.riskList.innerHTML = riskItems.length
      ? riskItems
          .map(
            (item) => `
              <li>
                <strong>
                  ${html(item.title)}
                  <span class="overview-tag ${severityClass(item.severity)}">${severityLabel(item.severity)}風險</span>
                </strong>
                <span>${html(item.detail)}</span>
              </li>
            `,
          )
          .join("")
      : `
        <li>
          <strong>目前未偵測重大風險<span class="overview-tag">追蹤</span></strong>
          <span>仍建議定期比對下一期財報、月營收與期後重大訊息。</span>
        </li>
      `;

    const actionItems = materialAlerts
      .map((item) => cleanText(item.action))
      .filter(Boolean)
      .slice(0, 4);
    overviewDom.actionList.innerHTML = actionItems.length
      ? actionItems
          .map(
            (item, index) => `
              <li>
                <strong>追蹤 ${index + 1}<span class="overview-tag warning">待確認</span></strong>
                <span>${html(item)}。</span>
              </li>
            `,
          )
          .join("")
      : `
        <li>
          <strong>例行追蹤<span class="overview-tag">待確認</span></strong>
          <span>持續比對月營收、期後現金流、管理層展望與下一期財報。</span>
        </li>
      `;
  }

  function percentChange(current, previous) {
    if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return Number.NaN;
    return (current - previous) / Math.abs(previous);
  }

  function signedPercent(value) {
    if (!Number.isFinite(value)) return "n/a";
    const sign = value > 0 ? "+" : "";
    return `${sign}${(value * 100).toFixed(1)}%`;
  }

  function signedMoney(value) {
    if (!Number.isFinite(value)) return "n/a";
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";
    return `${sign}NT$ ${Math.round(Math.abs(value)).toLocaleString("zh-TW")}M`;
  }

  function signedPp(value) {
    if (!Number.isFinite(value)) return "n/a";
    const sign = value > 0 ? "+" : "";
    return `${sign}${(value * 100).toFixed(1)} 個百分點`;
  }

  function cashFlowYoYText(current, previous) {
    if (!Number.isFinite(current) || !Number.isFinite(previous)) return "n/a";
    const delta = current - previous;
    if (previous >= 0 && current < 0) return `轉負 ${signedMoney(delta)}`;
    if (previous < 0 && current >= 0) return `轉正 ${signedMoney(delta)}`;
    const growth = percentChange(current, previous);
    return Number.isFinite(growth) ? signedPercent(growth) : signedMoney(delta);
  }

  function quarterSort(row) {
    return Number(row.year) * 10 + Number(row.season || 0);
  }

  function buildYoYRows(quarterRows = []) {
    const rows = quarterRows
      .filter((row) => Number.isFinite(row.year) && Number.isFinite(row.season))
      .slice()
      .sort((a, b) => quarterSort(a) - quarterSort(b));
    const byPeriod = new Map(rows.map((row) => [`${row.year}-${row.season}`, row]));

    return rows
      .map((row) => {
        const previous = byPeriod.get(`${row.year - 1}-${row.season}`);
        if (!previous) return null;

        const item = {
          row,
          previous,
          period: rowLabel(row),
          previousPeriod: rowLabel(previous),
          revenueGrowth: percentChange(row.revenue, previous.revenue),
          operatingGrowth: percentChange(row.operatingIncome, previous.operatingIncome),
          netIncomeGrowth: percentChange(row.netIncome, previous.netIncome),
          cashFlowDelta: row.operatingCashFlow - previous.operatingCashFlow,
          workingCapitalDelta: row.workingCapitalLoad - previous.workingCapitalLoad,
          inventoryDelta: row.inventoryToRevenue - previous.inventoryToRevenue,
          arDelta: row.arToRevenue - previous.arToRevenue,
        };
        item.judgement = judgeYoY(item);
        return item;
      })
      .filter(Boolean);
  }

  function judgeYoY(item) {
    const { row, revenueGrowth, operatingGrowth, cashFlowDelta, workingCapitalDelta, inventoryDelta } = item;

    if (revenueGrowth < -0.1 && operatingGrowth < -0.1) return { tag: "danger", text: "同季營運轉弱" };
    if (revenueGrowth >= 0.2 && row.operatingCashFlow < 0) return { tag: "danger", text: "營收成長但現金流轉負" };
    if (revenueGrowth >= 0.2 && (workingCapitalDelta > 0.08 || inventoryDelta > 0.12)) {
      return { tag: "warning", text: "成長強，營運資金需追蹤" };
    }
    if (revenueGrowth >= 0.2 && operatingGrowth >= 0.2 && cashFlowDelta >= 0) return { tag: "ok", text: "成長品質佳" };
    if (revenueGrowth >= 0 && operatingGrowth < 0) return { tag: "warning", text: "營收成長但獲利未同步" };
    if (cashFlowDelta < 0) return { tag: "warning", text: "現金流轉弱" };
    return { tag: "warning", text: "需持續觀察" };
  }

  function seasonalityText(quarterRows = []) {
    const rows = quarterRows.filter((row) => row.year <= 2025 && row.season >= 1 && row.season <= 4);
    const completeYears = [...new Set(rows.map((row) => row.year))].filter((year) =>
      [1, 2, 3, 4].every((season) => rows.some((row) => row.year === year && row.season === season)),
    );
    const completeRows = rows.filter((row) => completeYears.includes(row.year));
    if (!completeRows.length) return "同季比較";

    const averages = [1, 2, 3, 4].map((season) => {
      const seasonRows = completeRows.filter((row) => row.season === season);
      const average = seasonRows.reduce((sum, row) => sum + row.revenue, 0) / seasonRows.length;
      return { season, average };
    });
    const strongest = averages.slice().sort((a, b) => b.average - a.average)[0];
    const weakest = averages.slice().sort((a, b) => a.average - b.average)[0];
    return `Q${strongest.season}偏旺 / Q${weakest.season}偏淡`;
  }

  function setEmptyState(quarterRows) {
    yoyDom.seasonality.textContent = seasonalityText(quarterRows);
    yoyDom.latestPeriod.textContent = "--";
    yoyDom.compareBase.textContent = "缺少同季比較資料";
    yoyDom.revenue.textContent = "--";
    yoyDom.revenueNote.textContent = "需至少兩年同季資料";
    yoyDom.operatingIncome.textContent = "--";
    yoyDom.operatingNote.textContent = "需至少兩年同季資料";
    yoyDom.cashFlow.textContent = "--";
    yoyDom.cashFlowNote.textContent = "需至少兩年同季資料";
    yoyDom.workingCapital.textContent = "--";
    yoyDom.workingCapitalNote.textContent = "需至少兩年同季資料";
    yoyDom.signal.textContent = "資料不足";
    yoyDom.signal.className = "status-pill warning";
    yoyDom.brief.textContent = "目前公司檔案沒有可做單季 YoY 的季度資料。";
    yoyDom.chart.innerHTML = "";
    yoyDom.table.innerHTML = `<tr><td colspan="7">尚無可比較的單季 YoY 資料。</td></tr>`;
  }

  function refreshYoYDashboard(analysis) {
    if (!analysis) return;
    const quarterRows = analysis.views?.quarter?.rows || analysis.quarterRows || [];
    const yoyRows = buildYoYRows(quarterRows);
    yoyDom.seasonality.textContent = seasonalityText(quarterRows);

    if (!yoyRows.length) {
      setEmptyState(quarterRows);
      return;
    }

    const latest = yoyRows.at(-1);
    yoyDom.latestPeriod.textContent = `${latest.period} / ${latest.previousPeriod}`;
    yoyDom.compareBase.textContent = "最新季對去年同季";
    yoyDom.revenue.textContent = signedPercent(latest.revenueGrowth);
    yoyDom.revenueNote.textContent = `營收 ${money(latest.row.revenue)}，去年同季 ${money(latest.previous.revenue)}`;
    yoyDom.operatingIncome.textContent = signedPercent(latest.operatingGrowth);
    yoyDom.operatingNote.textContent = `營業利益 ${money(latest.row.operatingIncome)}`;
    yoyDom.cashFlow.textContent = cashFlowYoYText(latest.row.operatingCashFlow, latest.previous.operatingCashFlow);
    yoyDom.cashFlowNote.textContent = `差額 ${signedMoney(latest.cashFlowDelta)}`;
    yoyDom.workingCapital.textContent = signedPp(latest.workingCapitalDelta);
    yoyDom.workingCapitalNote.textContent = `應收 ${signedPp(latest.arDelta)} / 存貨 ${signedPp(latest.inventoryDelta)}`;
    yoyDom.signal.textContent = latest.judgement.text;
    yoyDom.signal.className = `status-pill ${latest.judgement.tag === "danger" ? "danger" : latest.judgement.tag === "warning" ? "warning" : ""}`;
    yoyDom.brief.textContent =
      `${latest.period} 對 ${latest.previousPeriod}：營收 ${signedPercent(latest.revenueGrowth)}、營業利益 ${signedPercent(latest.operatingGrowth)}、營業現金流 ${cashFlowYoYText(latest.row.operatingCashFlow, latest.previous.operatingCashFlow)}；` +
      `應收加存貨 / 營收 ${signedPp(latest.workingCapitalDelta)}。判讀：${latest.judgement.text}。`;

    const chartRows = yoyRows.slice(-8);
    const maxGrowth = Math.max(...chartRows.map((item) => Math.abs(item.revenueGrowth)).filter(Number.isFinite), 0.1);
    yoyDom.chart.innerHTML = chartRows
      .map((item) => {
        const width = Math.max(6, (Math.abs(item.revenueGrowth) / maxGrowth) * 100);
        const barClass = item.revenueGrowth < 0 ? "danger" : item.judgement.tag === "warning" ? "warning" : "ok";
        return `
          <div class="yoy-bar-row">
            <div class="yoy-bar-label">
              <strong>${html(item.period)}</strong>
              <span>${html(signedPercent(item.revenueGrowth))}</span>
            </div>
            <div class="yoy-bar-track">
              <div class="yoy-bar ${barClass}" style="width: ${width}%"></div>
            </div>
          </div>
        `;
      })
      .join("");

    yoyDom.table.innerHTML = yoyRows
      .slice()
      .reverse()
      .map(
        (item) => `
          <tr>
            <td data-label="期間"><strong>${html(item.period)}</strong><span class="table-subtext">vs ${html(item.previousPeriod)}</span></td>
            <td data-label="營收 YoY">${html(signedPercent(item.revenueGrowth))}</td>
            <td data-label="營業利益 YoY">${html(signedPercent(item.operatingGrowth))}</td>
            <td data-label="淨利 YoY">${html(signedPercent(item.netIncomeGrowth))}</td>
            <td data-label="營業現金流 YoY">${html(cashFlowYoYText(item.row.operatingCashFlow, item.previous.operatingCashFlow))}</td>
            <td data-label="營運資金占用">${html(signedPp(item.workingCapitalDelta))}</td>
            <td data-label="判讀"><span class="tag ${html(item.judgement.tag)}">${html(item.judgement.text)}</span></td>
          </tr>
        `,
      )
      .join("");
  }

  function setActiveView(view) {
    activeView = view;
    viewButtons.forEach((button) => {
      button.classList.toggle("selected", button.dataset.view === activeView);
    });
    viewSections.forEach((section) => {
      section.hidden = section.dataset.viewSection !== activeView;
    });
  }

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });

  function refreshDashboards() {
    const analysis = getCurrentAnalysis();
    if (!analysis) return;
    renderRiskOverview(analysis);
    refreshYoYDashboard(analysis);
  }

  if (originalRender) {
    render = function renderWithYoYDashboard(...args) {
      const result = originalRender.apply(this, args);
      refreshDashboards();
      setActiveView(activeView);
      return result;
    };
  }

  refreshDashboards();
  setActiveView(activeView);
})();
