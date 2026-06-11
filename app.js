const aurasMopsData = window.AurasMopsData || {};

const portfolio = {
  auras: {
    company: "雙鴻科技股份有限公司",
    creditLimit: "NT$ 300M",
    sector: "散熱模組 / 其他電子",
    sourceType: "public",
    dataSource: aurasMopsData.sourceLabel || "公開資訊觀測站資料快照",
    statements: aurasMopsData.annualStatements || [
      {
        year: 2023,
        revenue: 12712.629,
        grossProfit: 3004.923,
        operatingIncome: 1376.298,
        netIncome: 1239.244,
        currentAssets: 8652.92,
        inventory: 2306.877,
        accountsReceivable: 4419.022,
        currentLiabilities: 4786.848,
        totalLiabilities: 5745.41,
        totalAssets: 12611.75,
        equity: 6866.34,
        interestExpense: 27.907,
        operatingCashFlow: 1970.965,
      },
      {
        year: 2024,
        revenue: 15778.909,
        grossProfit: 4026.096,
        operatingIncome: 1910.641,
        netIncome: 1931.24,
        currentAssets: 11679.883,
        inventory: 2809.505,
        accountsReceivable: 5428.765,
        currentLiabilities: 5901.656,
        totalLiabilities: 7638.058,
        totalAssets: 16926.376,
        equity: 9288.318,
        interestExpense: 31.097,
        operatingCashFlow: 1643.43,
      },
      {
        year: 2025,
        revenue: 23276.344,
        grossProfit: 6371.904,
        operatingIncome: 3258.929,
        netIncome: 2697.755,
        currentAssets: 18587.376,
        inventory: 6057.435,
        accountsReceivable: 10068.439,
        currentLiabilities: 12522.996,
        totalLiabilities: 14630.145,
        totalAssets: 26124.609,
        equity: 11494.464,
        interestExpense: 69.812,
        operatingCashFlow: -570.908,
      },
    ],
    quarterly: {
      ytdAndPeriodEnd: aurasMopsData.ytdAndPeriodEnd || [],
      singleQuarter: aurasMopsData.singleQuarter || [],
    },
    evidence: [
      ["公開資訊觀測站 / 財報公開資料", "股票代號 3324，雙鴻科技股份有限公司；資料直接作為客戶檔案分析來源。"],
      ["MOPS 季資料統整", "已保存 2023Q1-2025Q4 與 2026Q1 合併三大表原始 HTML，並區分單季、累計與 TTM 口徑。"],
      ["2025 年度公開財報快照", "2025 年營收成長、毛利率提升，但營業現金流轉為負，且流動負債、存貨與應收帳款明顯增加。"],
      ["分析提醒", "公開資料可直接用於初步財報分析；若作為正式決策依據，仍需補充公司說明與期後資訊。"],
    ],
  },
  sample: {
    company: "宏遠精密製造股份有限公司",
    creditLimit: "NT$ 180M",
    sector: "精密零組件製造",
    statements: [
      {
        year: 2023,
        revenue: 1280,
        grossProfit: 346,
        operatingIncome: 141,
        netIncome: 88,
        currentAssets: 720,
        inventory: 208,
        accountsReceivable: 264,
        currentLiabilities: 462,
        totalLiabilities: 1180,
        totalAssets: 1980,
        equity: 800,
        interestExpense: 22,
        operatingCashFlow: 96,
      },
      {
        year: 2024,
        revenue: 1185,
        grossProfit: 284,
        operatingIncome: 102,
        netIncome: 61,
        currentAssets: 690,
        inventory: 236,
        accountsReceivable: 318,
        currentLiabilities: 497,
        totalLiabilities: 1250,
        totalAssets: 2040,
        equity: 790,
        interestExpense: 29,
        operatingCashFlow: 42,
      },
      {
        year: 2025,
        revenue: 852,
        grossProfit: 171,
        operatingIncome: 58,
        netIncome: 19,
        currentAssets: 596,
        inventory: 241,
        accountsReceivable: 335,
        currentLiabilities: 621,
        totalLiabilities: 1510,
        totalAssets: 2128,
        equity: 618,
        interestExpense: 41,
        operatingCashFlow: -26,
      },
    ],
    evidence: [
      ["損益表", "營收與營業利益取自年度損益表，原型以結構化欄位替代頁碼。"],
      ["資產負債表", "短期借款、流動負債與總負債由資產負債表欄位匯入。"],
      ["現金流量表", "營業現金流量用於驗證獲利品質與償債壓力。"],
    ],
  },
  stable: {
    company: "勤實電子材料股份有限公司",
    creditLimit: "NT$ 120M",
    sector: "電子材料",
    statements: [
      {
        year: 2023,
        revenue: 910,
        grossProfit: 273,
        operatingIncome: 112,
        netIncome: 78,
        currentAssets: 560,
        inventory: 132,
        accountsReceivable: 170,
        currentLiabilities: 310,
        totalLiabilities: 650,
        totalAssets: 1410,
        equity: 760,
        interestExpense: 14,
        operatingCashFlow: 96,
      },
      {
        year: 2024,
        revenue: 996,
        grossProfit: 309,
        operatingIncome: 124,
        netIncome: 86,
        currentAssets: 604,
        inventory: 148,
        accountsReceivable: 188,
        currentLiabilities: 322,
        totalLiabilities: 675,
        totalAssets: 1490,
        equity: 815,
        interestExpense: 13,
        operatingCashFlow: 104,
      },
      {
        year: 2025,
        revenue: 1068,
        grossProfit: 342,
        operatingIncome: 137,
        netIncome: 96,
        currentAssets: 642,
        inventory: 153,
        accountsReceivable: 196,
        currentLiabilities: 334,
        totalLiabilities: 704,
        totalAssets: 1580,
        equity: 876,
        interestExpense: 12,
        operatingCashFlow: 118,
      },
    ],
    evidence: [
      ["年度財報", "三年度營收穩定成長，現金流與獲利方向一致。"],
      ["延伸資料", "原型未接內部資料庫，正式版可串接公司自結數、客戶說明與產業資料。"],
      ["同業比較", "正式版可接產業資料庫補充同業分位數。"],
    ],
  },
  stress: {
    company: "景泰營造工程股份有限公司",
    creditLimit: "NT$ 260M",
    sector: "營造工程",
    statements: [
      {
        year: 2023,
        revenue: 1540,
        grossProfit: 246,
        operatingIncome: 92,
        netIncome: 54,
        currentAssets: 980,
        inventory: 84,
        accountsReceivable: 420,
        currentLiabilities: 760,
        totalLiabilities: 1680,
        totalAssets: 2240,
        equity: 560,
        interestExpense: 38,
        operatingCashFlow: 44,
      },
      {
        year: 2024,
        revenue: 1615,
        grossProfit: 226,
        operatingIncome: 66,
        netIncome: 31,
        currentAssets: 1035,
        inventory: 91,
        accountsReceivable: 536,
        currentLiabilities: 890,
        totalLiabilities: 1860,
        totalAssets: 2380,
        equity: 520,
        interestExpense: 51,
        operatingCashFlow: -12,
      },
      {
        year: 2025,
        revenue: 1210,
        grossProfit: 121,
        operatingIncome: 11,
        netIncome: -18,
        currentAssets: 930,
        inventory: 96,
        accountsReceivable: 612,
        currentLiabilities: 1070,
        totalLiabilities: 2135,
        totalAssets: 2420,
        equity: 285,
        interestExpense: 68,
        operatingCashFlow: -96,
      },
    ],
    evidence: [
      ["工程合約明細", "應收帳款增加速度高於營收，需追蹤驗收與收款進度。"],
      ["損益表", "毛利率與營業利益率連續下滑，顯示成本或合約風險上升。"],
      ["現金流量表", "營業現金流連續兩年為負，需補充資金缺口說明。"],
    ],
  },
};

const { requiredColumns, money, pct, ratio, comparisonText, analyzeCompany } = window.CreditReviewAnalysis;

const dom = {
  companySelect: document.querySelector("#companySelect"),
  companyName: document.querySelector("#companyName"),
  creditLimit: document.querySelector("#creditLimit"),
  dataSource: document.querySelector("#dataSource"),
  recommendation: document.querySelector("#recommendation"),
  recommendationReason: document.querySelector("#recommendationReason"),
  riskScore: document.querySelector("#riskScore"),
  riskScoreReason: document.querySelector("#riskScoreReason"),
  alertCount: document.querySelector("#alertCount"),
  currentRatio: document.querySelector("#currentRatio"),
  currentRatioDelta: document.querySelector("#currentRatioDelta"),
  debtRatio: document.querySelector("#debtRatio"),
  debtRatioDelta: document.querySelector("#debtRatioDelta"),
  riskLevel: document.querySelector("#riskLevel"),
  ratioBasis: document.querySelector("#ratioBasis"),
  chartBasis: document.querySelector("#chartBasis"),
  ratioLatestHeader: document.querySelector("#ratioLatestHeader"),
  ratioPreviousHeader: document.querySelector("#ratioPreviousHeader"),
  quarterBasis: document.querySelector("#quarterBasis"),
  quarterTable: document.querySelector("#quarterTable"),
  barChart: document.querySelector("#barChart"),
  ratioTable: document.querySelector("#ratioTable"),
  alertSummary: document.querySelector("#alertSummary"),
  alertList: document.querySelector("#alertList"),
  alertRuleList: document.querySelector("#alertRuleList"),
  evidenceList: document.querySelector("#evidenceList"),
  reviewSummary: document.querySelector("#reviewSummary"),
  confidenceScore: document.querySelector("#confidenceScore"),
  structuredUpload: document.querySelector("#structuredUpload"),
  parserStatus: document.querySelector("#parserStatus"),
  parserDetail: document.querySelector("#parserDetail"),
  resetData: document.querySelector("#resetData"),
  downloadTemplate: document.querySelector("#downloadTemplate"),
  copySummary: document.querySelector("#copySummary"),
  exportReport: document.querySelector("#exportReport"),
  toast: document.querySelector("#toast"),
};

let activeKey = "auras";
let activeChart = "revenue";
let activeBasis = "ttm";
let customCompany = null;

function getCompany() {
  return customCompany || portfolio[activeKey];
}

function html(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function rowLabel(row) {
  return row.period || (row.season ? `${row.year}Q${row.season}` : row.year);
}

function renderKpis(rows, recommendation, alerts, compareLabel, riskProfile) {
  const latest = rows.at(-1);
  const previous = rows.at(-2);

  dom.recommendation.textContent = recommendation.label;
  dom.recommendationReason.textContent = recommendation.reason;
  dom.riskScore.textContent = `${riskProfile.score}`;
  dom.riskScoreReason.textContent = `${riskProfile.band}；${riskProfile.summary}`;
  dom.alertCount.textContent = alerts.filter((item) => item.severity !== "low").length;
  dom.currentRatio.textContent = ratio(latest.currentRatio);
  dom.currentRatioDelta.textContent = comparisonText(latest.currentRatio, previous.currentRatio, compareLabel);
  dom.debtRatio.textContent = pct(latest.debtRatio);
  dom.debtRatioDelta.textContent = comparisonText(latest.debtRatio, previous.debtRatio, compareLabel);
  dom.riskLevel.textContent = recommendation.riskLabel;
  dom.riskLevel.className = `status-pill ${recommendation.riskLabel.includes("高") ? "danger" : recommendation.riskLabel.includes("觀察") ? "warning" : ""}`;
  dom.confidenceScore.textContent = `${recommendation.confidence}%`;
}

function chartMetric(row) {
  if (activeChart === "profit") return row.operatingIncome;
  if (activeChart === "liquidity") return row.currentRatio;
  return row.revenue;
}

function renderChart(rows) {
  const values = rows.map(chartMetric);
  const max = Math.max(...values.map((value) => Math.abs(value)), 1);
  dom.barChart.innerHTML = rows
    .map((row) => {
      const value = chartMetric(row);
      const height = Math.max(8, (Math.abs(value) / max) * 100);
      const label = activeChart === "liquidity" ? ratio(value) : money(value);
      const cssClass = value < 0 ? "danger" : activeChart === "profit" && row.operatingMargin < 0.06 ? "warning" : "";
      return `
        <div class="bar-item">
          <div class="bar-track">
            <div class="bar ${cssClass}" style="height: ${height}%"></div>
          </div>
          <div class="bar-label">
            <strong>${html(rowLabel(row))}</strong>
            <span>${label}</span>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderRatios(items) {
  const latestLabel = dom.ratioLatestHeader.textContent || "最新期間";
  const previousLabel = dom.ratioPreviousHeader.textContent || "比較期間";
  dom.ratioTable.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td data-label="指標"><strong>${html(item.name)}</strong></td>
          <td data-label="${html(latestLabel)}">${html(item.latest)}</td>
          <td data-label="${html(previousLabel)}">${html(item.previous)}</td>
          <td data-label="變動">${html(item.delta)}</td>
          <td data-label="判讀"><span class="tag ${html(item.tag)}">${html(item.reading)}</span></td>
        </tr>
      `,
    )
    .join("");
}

function renderQuarterTable(items, basis) {
  dom.quarterBasis.textContent = basis === "quarterly" ? "單季 / TTM" : "年度樣本";
  if (!items.length) {
    dom.quarterTable.innerHTML = `
      <tr>
        <td colspan="5">此客戶目前只有年度樣本資料，尚未接入季度來源。</td>
      </tr>
    `;
    return;
  }

  dom.quarterTable.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td data-label="期間"><strong>${html(item.period)}</strong></td>
          <td data-label="單季營收">${html(item.revenue)}</td>
          <td data-label="營業現金流">${html(item.operatingCashFlow)}</td>
          <td data-label="流動比率">${html(item.currentRatio)}</td>
          <td data-label="判讀"><span class="tag ${html(item.tag)}">${html(item.stress)}</span></td>
        </tr>
      `,
    )
    .join("");
}

function renderAlerts(alerts, alertRules = []) {
  const materialAlerts = alerts.filter((item) => item.severity !== "low");
  const triggeredTitles = new Set(materialAlerts.map((item) => item.title));

  dom.alertSummary.textContent = `已觸發 ${materialAlerts.length} 項 / 監控 ${alertRules.length} 項規則`;
  dom.alertList.innerHTML = alerts
    .map(
      (item) => `
        <li class="alert-item ${item.severity === "high" ? "high" : ""}">
          <strong>${html(item.title)}</strong>
          <span>${html(item.detail)}</span>
          ${item.action ? `<em>${html(item.action)}</em>` : ""}
        </li>
      `,
    )
    .join("");
  dom.alertRuleList.innerHTML = alertRules
    .map((rule) => {
      const triggered = triggeredTitles.has(rule);
      return `
        <li class="${triggered ? "triggered" : ""}">
          <span>${html(rule)}</span>
          <strong>${triggered ? "已觸發" : "監控中"}</strong>
        </li>
      `;
    })
    .join("");
}

function renderEvidence(company) {
  dom.evidenceList.innerHTML = (company.evidence || [])
    .map(
      ([title, detail]) => `
        <div class="evidence-item">
          <strong>${html(title)}</strong>
          <span>${html(detail)}</span>
        </div>
      `,
    )
    .join("");
}

function renderSummary(sections) {
  dom.reviewSummary.innerHTML = sections
    .map(
      (section) => `
        <section class="report-section">
          <h3>${html(section.title)}</h3>
          <p>${html(section.text)}</p>
        </section>
      `,
    )
    .join("");
}

function updateBasisButtons(analysis, selectedBasis) {
  document.querySelectorAll(".basis-toggle button").forEach((button) => {
    const exists = Boolean(analysis.views[button.dataset.basis]);
    button.disabled = !exists;
    button.classList.toggle("selected", button.dataset.basis === selectedBasis);
  });
}

function render() {
  const company = getCompany();
  const analysis = analyzeCompany(company);
  const { alerts, alertRules, recommendation, ratios, summarySections } = analysis;
  const selectedBasis = analysis.views[activeBasis] ? activeBasis : analysis.defaultView;
  const view = analysis.views[selectedBasis];
  activeBasis = selectedBasis;

  dom.companyName.textContent = company.company;
  dom.creditLimit.textContent = analysis.basis === "quarterly" ? "季度 / TTM" : "年度";
  dom.dataSource.textContent = company.dataSource || "匯入文件";
  dom.ratioBasis.textContent = view.ratioBasisLabel;
  dom.chartBasis.textContent = view.chartBasisLabel || view.ratioBasisLabel;
  dom.ratioLatestHeader.textContent = view.ratioLatestHeader;
  dom.ratioPreviousHeader.textContent = view.ratioPreviousHeader;
  updateBasisButtons(analysis, selectedBasis);
  renderKpis(view.rows, recommendation, alerts, view.kpiCompareLabel, analysis.riskProfile);
  renderChart(view.chartRows);
  renderRatios(view.ratios || ratios);
  renderQuarterTable(analysis.quarterTableRows, analysis.basis);
  renderAlerts(alerts, alertRules);
  renderEvidence(company);
  renderSummary(summarySections);
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  window.setTimeout(() => dom.toast.classList.remove("show"), 2200);
}

function updateParserStatus(title, detail, state = "") {
  dom.parserStatus.className = `parser-status ${state}`;
  dom.parserStatus.querySelector("strong").textContent = title;
  dom.parserDetail.textContent = detail;
}

function resetSourceStatus() {
  const company = getCompany();
  if (company.sourceType === "public") {
    updateParserStatus("公開資料已載入", `${company.company}已依公開財報資料建立分析。`, "done");
    return;
  }
  updateParserStatus("樣本資料已載入", "目前使用內建樣本資料展示財報分析流程。");
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(",").map((header) => header.trim());
  const missing = requiredColumns.filter((column) => !headers.includes(column));
  if (missing.length) throw new Error(`缺少欄位：${missing.join(", ")}`);

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    return headers.reduce((row, header, index) => {
      row[header] = header === "year" ? Number.parseInt(values[index], 10) : Number.parseFloat(values[index]);
      return row;
    }, {});
  });
}

function validateStatements(statements) {
  if (!Array.isArray(statements) || statements.length < 2) {
    throw new Error("至少需要兩個年度的財務資料。");
  }

  for (const row of statements) {
    for (const column of requiredColumns) {
      if (!Number.isFinite(row[column])) {
        throw new Error(`欄位 ${column} 需為數字。`);
      }
    }
  }
}

async function handleStructuredUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();
  if (!["csv", "json"].includes(extension)) {
    showToast("測試匯入僅支援 CSV / JSON。");
    event.target.value = "";
    return;
  }

  try {
    const text = await file.text();
    const parsedJson = extension === "json" ? JSON.parse(text) : null;
    const statements = extension === "json" ? parsedJson.statements || parsedJson : parseCsv(text);
    validateStatements(statements);
    customCompany = {
      company: file.name.replace(/\.[^.]+$/, ""),
      creditLimit: "自訂資料",
      sector: "自訂匯入",
      statements,
      evidence: [
        ["使用者匯入資料", "本次分析由上傳的結構化財報資料產生。"],
        ["數字計算層", "比率與異常判讀由前端規則引擎計算，非 LLM 心算。"],
        ["來源註記", "正式分析可補充資料來源、期間範圍與人工註記。"],
      ],
    };
    activeBasis = "annual";
    render();
    updateParserStatus("已匯入結構化資料", `${file.name} 已完成財報分析。`, "done");
    showToast("已完成財報分析。");
  } catch (error) {
    showToast(error.message);
  } finally {
    event.target.value = "";
  }
}

function downloadTemplate() {
  const headers = requiredColumns.join(",");
  const rows = portfolio.sample.statements
    .map((row) => requiredColumns.map((column) => row[column]).join(","))
    .join("\n");
  const blob = new Blob([`${headers}\n${rows}\n`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "financial-analysis-template.csv";
  link.click();
  URL.revokeObjectURL(url);
}

async function copySummary() {
  const text = dom.reviewSummary.innerText.trim();
  await navigator.clipboard.writeText(text);
  showToast("已複製分析摘要。");
}

function exportReport() {
  const company = getCompany();
  const note = document.querySelector("#reviewerNote").value.trim();
  const content = [
    `財報分析報告 - ${company.company}`,
    "",
    dom.reviewSummary.innerText.trim(),
    "",
    "人工註記",
    note || "尚未填寫。",
  ].join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${company.company}-財報分析報告.txt`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("已匯出分析報告。");
}

document.querySelectorAll(".chart-toggle button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".chart-toggle button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    activeChart = button.dataset.chart;
    render();
  });
});

document.querySelectorAll(".basis-toggle button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    activeBasis = button.dataset.basis;
    render();
  });
});

dom.companySelect.addEventListener("change", (event) => {
  activeKey = event.target.value;
  customCompany = null;
  activeBasis = activeKey === "auras" ? "ttm" : "annual";
  resetSourceStatus();
  render();
});
dom.structuredUpload.addEventListener("change", handleStructuredUpload);
dom.resetData.addEventListener("click", () => {
  customCompany = null;
  activeBasis = activeKey === "auras" ? "ttm" : "annual";
  resetSourceStatus();
  render();
  showToast("已還原樣本資料。");
});
dom.downloadTemplate.addEventListener("click", downloadTemplate);
dom.copySummary.addEventListener("click", copySummary);
dom.exportReport.addEventListener("click", exportReport);

resetSourceStatus();
render();
