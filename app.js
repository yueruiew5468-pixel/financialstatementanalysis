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
      ["公開資訊觀測站 / 財報公開資料", "股票代號 3324，雙鴻科技股份有限公司；資料直接作為財報分析來源。"],
      ["MOPS 季資料統整", "已保存 2023Q1-2025Q4 與 2026Q1 合併三大表原始 HTML，並區分單季、累計與 TTM 口徑。"],
      ["2025 年度公開財報快照", "2025 年營收成長、毛利率提升，但營業現金流轉為負，且流動負債、存貨與應收帳款明顯增加。"],
      ["分析提醒", "公開資料可直接用於初步財報分析；正式解讀仍應搭配期後資訊、管理層說明與產業趨勢。"],
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
      ["延伸資料", "原型未接內部資料庫，正式版可串接公司自結數、法說會資訊與產業資料。"],
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
      ["現金流量表", "營業現金流連續兩年為負，需分析營運資金缺口來源。"],
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

function metricDays(value) {
  if (!Number.isFinite(value)) return "n/a";
  return `${Math.round(value)} 天`;
}

function normalizeFinancialText(text) {
  return String(text || "")
    .replace(/加強條件/g, "審慎觀察")
    .replace(/列入觀察/g, "中性偏審慎")
    .replace(/維持追蹤/g, "穩健追蹤")
    .replace(/授信複審/g, "財報分析")
    .replace(/授信/g, "財報分析")
    .replace(/複審/g, "分析")
    .replace(/客戶檔案/g, "財報分析來源")
    .replace(/此客戶/g, "此公司")
    .replace(/要求客戶補充/g, "補充檢視")
    .replace(/要求提供/g, "補充檢視")
    .replace(/需補資料/g, "需後續追蹤")
    .replace(/補資料/g, "補充資訊")
    .replace(/擔保或保證/g, "財務風險緩衝")
    .replace(/保證條件/g, "風險緩衝")
    .replace(/展延/g, "延後判斷")
    .replace(/自動續約/g, "例行追蹤");
}

function normalizeRecommendation(recommendation = {}) {
  const labelMap = {
    加強條件: "審慎觀察",
    列入觀察: "中性偏審慎",
    維持追蹤: "穩健追蹤",
  };

  return {
    ...recommendation,
    label: labelMap[recommendation.label] || normalizeFinancialText(recommendation.label || "審慎觀察"),
    reason: normalizeFinancialText(recommendation.reason || "財務指標需持續追蹤"),
    riskLabel: normalizeFinancialText(recommendation.riskLabel || "觀察"),
  };
}

function normalizeAlerts(alerts = []) {
  return alerts.map((item) => ({
    ...item,
    title: normalizeFinancialText(item.title),
    detail: normalizeFinancialText(item.detail),
    action: normalizeFinancialText(item.action),
  }));
}

function joinObservationItems(alerts) {
  return alerts
    .slice(0, 3)
    .map((item) => item.action)
    .filter(Boolean)
    .map((text) => normalizeFinancialText(text).replace(/[。；;]+$/u, ""))
    .join("；");
}

function leadSummarySection(company, recommendation, riskProfile) {
  return {
    type: "lead",
    title: "一句話總結",
    text: `${company.company} 初步判讀為「${recommendation.label}」，風險分數 ${riskProfile.score ?? "--"}/100（${riskProfile.band || recommendation.riskLabel}）；目前重點是確認成長動能是否能同步轉化為現金流與營運資金品質改善。`,
  };
}

function reportSection(title, fact, judgement, followUp) {
  return {
    title,
    items: [
      { label: "事實", text: normalizeFinancialText(fact) },
      { label: "判讀", text: normalizeFinancialText(judgement) },
      { label: "追蹤", text: normalizeFinancialText(followUp) },
    ],
  };
}

function buildFinancialSummary(company, analysis) {
  const recommendation = analysis.recommendation;
  const riskProfile = analysis.riskProfile || {};
  const alerts = analysis.alerts || [];
  const materialAlerts = alerts.filter((item) => item.severity !== "low");
  const keyAlerts = materialAlerts
    .slice(0, 4)
    .map((item) => item.title)
    .join("、");
  const observationText =
    joinObservationItems(materialAlerts) ||
    "持續比對月營收、管理層展望、期後現金流與下一期財報變化";

  const annualRows = analysis.views?.annual?.rows || analysis.rows || [];
  const latestAnnual = annualRows.at(-1);
  const previousAnnual = annualRows.at(-2);
  const quarterRows = analysis.views?.quarter?.rows || analysis.quarterRows || [];
  const latestQuarter = quarterRows.at(-1);
  const previousQuarter = quarterRows.at(-2);
  const ttmRows = analysis.views?.ttm?.rows || analysis.ttmRows || [];
  const latestTtm = ttmRows.at(-1);

  if (analysis.basis === "quarterly" && latestQuarter && previousQuarter && latestTtm && latestAnnual && previousAnnual) {
    return [
      leadSummarySection(company, recommendation, riskProfile),
      {
        ...reportSection(
          "一、有利因素",
          `${rowLabel(latestQuarter)} 單季營收為 ${money(latestQuarter.revenue)}，${comparisonText(latestQuarter.revenue, previousQuarter.revenue, "前一季")}；最新年度營收為 ${money(latestAnnual.revenue)}，${comparisonText(latestAnnual.revenue, previousAnnual.revenue, "去年")}。TTM 毛利率 ${pct(latestTtm.grossMargin)}、營業利益率 ${pct(latestTtm.operatingMargin)}、稅後淨利率 ${pct(latestTtm.netMargin)}。`,
          "營收與利潤率仍提供基本支撐，代表本業動能尚未完全失速；這是本次分析中較正面的基礎訊號。",
          "後續確認營收成長是否能維持毛利率與營業利益率，避免只增加規模卻未同步改善現金回收。",
        ),
      },
      {
        ...reportSection(
          "二、整體風險判讀",
          `目前判讀為「${recommendation.label}」；風險分數 ${riskProfile.score ?? "--"}/100（${riskProfile.band || recommendation.riskLabel}）。主要壓力來自 ${recommendation.reason}。`,
          "本次以最新季資料、單季異常與 TTM 指標作為主要分析口徑；若成長伴隨現金流與營運資金壓力，短期財務彈性會被壓縮。",
          "優先追蹤現金流、營運資金與槓桿變化，並與下一期財報及期後營運資訊交叉確認。",
        ),
      },
      {
        ...reportSection(
          "三、現金流與盈餘品質",
          `最新 TTM 營業現金流為 ${money(latestTtm.operatingCashFlow)}，單季營業現金流為 ${money(latestQuarter.operatingCashFlow)}，獲利轉現金比率為 ${ratio(latestTtm.cfoToNetIncome)}。`,
          "若淨利維持成長但現金流偏弱，代表盈餘品質與營運資金占用需要優先檢視，不能只看損益表獲利。",
          "追蹤應收帳款回收、存貨去化、付款條件變動，以及下一季營業現金流是否回到正向。",
        ),
      },
      {
        ...reportSection(
          "四、資產負債與償債能力",
          `${rowLabel(latestQuarter)} 流動比率 ${ratio(latestQuarter.currentRatio)}、速動比率 ${ratio(latestQuarter.quickRatio)}、負債比率 ${pct(latestQuarter.debtRatio)}、短期借款 / 流動負債 ${pct(latestQuarter.shortDebtToCurrentLiabilities)}。`,
          "短期流動性目前尚需與負債增加速度一起判讀；若槓桿升高但現金流未改善，償債緩衝會變薄。",
          "追蹤短期借款用途、到期分布、可用資金安排，以及流動比率是否能維持在合理區間。",
        ),
      },
      {
        ...reportSection(
          "五、營運資金變化",
          `${rowLabel(latestQuarter)} 應收帳款 / 營收為 ${pct(latestQuarter.arToRevenue)}，存貨 / 營收為 ${pct(latestQuarter.inventoryToRevenue)}，應收加存貨 / 營收為 ${pct(latestQuarter.workingCapitalLoad)}；應收帳款週轉天數 ${metricDays(latestQuarter.dso)}、存貨週轉天數 ${metricDays(latestQuarter.inventoryDays)}。`,
          "應收與存貨若同步升高，可能表示營收成長被營運資金占用抵銷，進而壓縮自由現金流。",
          "追蹤主要客戶收款節奏、庫齡與跌價風險，以及應收加存貨占營收比率是否下降。",
        ),
      },
      {
        ...reportSection(
          "六、異常訊號與後續觀察",
          `${keyAlerts || "目前未偵測重大季度異常"}。`,
          "異常訊號應搭配單季、季累計、TTM 與年度趨勢交叉檢視，避免只看單一期間造成誤判。",
          `${observationText}。`,
        ),
      },
    ];
  }

  const rows = analysis.views?.annual?.rows || analysis.rows || [];
  const latest = rows.at(-1);
  const previous = rows.at(-2);
  if (!latest || !previous) return (analysis.summarySections || []).map((section) => ({ ...section, text: normalizeFinancialText(section.text) }));

  return [
    leadSummarySection(company, recommendation, riskProfile),
    {
      ...reportSection(
        "一、有利因素",
        `最新年度營收為 ${money(latest.revenue)}，${comparisonText(latest.revenue, previous.revenue, "去年")}；毛利率 ${pct(latest.grossMargin)}、營業利益率 ${pct(latest.operatingMargin)}、稅後淨利率 ${pct(latest.netMargin)}。`,
        "營收與利潤率是本次分析中的正面基礎，代表公司仍具備一定本業獲利能力。",
        "追蹤營收成長是否能同步維持毛利、本業利益率與淨利品質。",
      ),
    },
    {
      ...reportSection(
        "二、整體風險判讀",
        `目前判讀為「${recommendation.label}」；風險分數 ${riskProfile.score ?? "--"}/100（${riskProfile.band || recommendation.riskLabel}）。主要壓力來自 ${recommendation.reason}。`,
        "若獲利、現金流、營運資金與槓桿沒有同步改善，單一成長指標不足以支撐偏樂觀結論。",
        "後續以現金流、營運資金與槓桿變化作為核心觀察軸。",
      ),
    },
    {
      ...reportSection(
        "三、現金流與盈餘品質",
        `營業現金流為 ${money(latest.operatingCashFlow)}，營業現金流 / 負債為 ${pct(latest.cfoDebtRatio)}，獲利轉現金比率為 ${ratio(latest.cfoToNetIncome)}。`,
        "若損益表獲利未同步轉為現金，代表盈餘品質與營運資金占用需要進一步追蹤。",
        "追蹤營業現金流是否改善，以及淨利能否穩定轉化為可用現金。",
      ),
    },
    {
      ...reportSection(
        "四、資產負債與償債能力",
        `流動比率 ${ratio(latest.currentRatio)}、速動比率 ${ratio(latest.quickRatio)}、負債比率 ${pct(latest.debtRatio)}、利息保障倍數 ${ratio(latest.interestCoverage)} 倍。`,
        "此區重點在於短期流動性緩衝、財務槓桿與利息覆蓋能力是否同步惡化。",
        "追蹤負債比率、利息保障倍數與短期資金安排是否出現連續壓力。",
      ),
    },
    {
      ...reportSection(
        "五、營運資金變化",
        `應收帳款 / 營收為 ${pct(latest.arToRevenue)}，存貨 / 營收為 ${pct(latest.inventoryToRevenue)}，應收加存貨 / 營收為 ${pct(latest.workingCapitalLoad)}；應收帳款週轉天數 ${metricDays(latest.dso)}、存貨週轉天數 ${metricDays(latest.inventoryDays)}。`,
        "若應收與存貨升高，表示營收成長可能被營運資金占用抵銷。",
        "追蹤收款、庫存去化與應收加存貨占營收比率是否回落。",
      ),
    },
    {
      ...reportSection(
        "六、異常訊號與後續觀察",
        `${keyAlerts || "目前未偵測重大財務異常"}。`,
        "異常偵測結果應與趨勢圖、比率矩陣及原始財報來源交叉比對，避免單一指標造成過度解讀。",
        `${observationText}。`,
      ),
    },
  ];
}

function normalizeAnalysis(company, analysis) {
  analysis.recommendation = normalizeRecommendation(analysis.recommendation);
  analysis.alerts = normalizeAlerts(analysis.alerts || []);
  analysis.summarySections = buildFinancialSummary(company, analysis);
  return analysis;
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

function parseDisplayedPercent(value) {
  const text = String(value || "").trim();
  if (!text.endsWith("%")) return Number.NaN;
  return Number.parseFloat(text.replace("%", ""));
}

function formatRatioDeltaForDisplay(item) {
  const latestPercent = parseDisplayedPercent(item.latest);
  const previousPercent = parseDisplayedPercent(item.previous);
  if (!Number.isFinite(latestPercent) || !Number.isFinite(previousPercent)) return item.delta;

  const compareLabel = String(item.delta || "").match(/^較(.+?)(?:上升|下降|持平)/)?.[1] || "比較期";
  const delta = latestPercent - previousPercent;
  if (Math.abs(delta) < 0.05) return `較${compareLabel}持平 0.0 個百分點`;

  const direction = delta >= 0 ? "上升" : "下降";
  return `較${compareLabel}${direction} ${Math.abs(delta).toFixed(1)} 個百分點`;
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
          <td data-label="變動">${html(formatRatioDeltaForDisplay(item))}</td>
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
        <td colspan="5">此公司目前只有年度樣本資料，尚未接入季度來源。</td>
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
      (section) => {
        const points = section.items
          ? `
            <dl class="report-points">
              ${section.items
                .map(
                  (item) => `
                    <div class="report-point">
                      <dt>${html(item.label)}</dt>
                      <dd>${html(item.text)}</dd>
                    </div>
                  `,
                )
                .join("")}
            </dl>
          `
          : `<p>${html(section.text)}</p>`;
        return `
        <section class="report-section ${section.type === "lead" ? "report-lead" : ""}">
          <h3>${html(section.title)}</h3>
          ${points}
        </section>
      `;
      },
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
  const analysis = normalizeAnalysis(company, analyzeCompany(company));
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

function formatSummarySectionForExport(section) {
  const title = formatSummaryTitleForExport(section.title);
  if (section.items) {
    return [
      title,
      ...section.items.map((item) => `${item.label}：${item.text}`),
    ].join("\n");
  }
  return `${title}\n${section.text}`;
}

function formatSummaryTitleForExport(title) {
  const cleanedTitle = String(title || "").replace(/^[一二三四五六七八九十]+、\s*/u, "");
  return cleanedTitle === title ? cleanedTitle : `摘要重點：${cleanedTitle}`;
}

function formatAlertsForExport(alerts, alertRules = []) {
  const materialAlerts = alerts.filter((item) => item.severity !== "low");
  const lines = [
    `已觸發 ${materialAlerts.length} 項 / 監控 ${alertRules.length} 項規則`,
  ];

  if (!materialAlerts.length) {
    lines.push("目前未偵測重大財務異常。");
    return lines.join("\n");
  }

  materialAlerts.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title}`);
    lines.push(`   說明：${item.detail}`);
    if (item.action) lines.push(`   追蹤：${item.action}`);
  });

  return lines.join("\n");
}

function formatEvidenceForExport(company) {
  const evidence = company.evidence || [];
  if (!evidence.length) return "尚未提供來源追溯資料。";

  return evidence
    .map(([title, detail], index) => `${index + 1}. ${title}：${detail}`)
    .join("\n");
}

function buildExportReport(company, analysis, note = "") {
  const selectedBasis = analysis.views[activeBasis] ? activeBasis : analysis.defaultView;
  const view = analysis.views[selectedBasis];
  const generatedAt = new Date().toLocaleString("zh-TW", { hour12: false });
  const sourceLabel = company.dataSource || "匯入文件";
  const recommendation = analysis.recommendation || {};
  const riskProfile = analysis.riskProfile || {};
  const summaryBlocks = analysis.summarySections
    .map(formatSummarySectionForExport)
    .join("\n\n");
  const ratioSnapshot = (view.ratios || analysis.ratios || [])
    .slice(0, 6)
    .map((item) => `- ${item.name}：${item.latest}（${formatRatioDeltaForDisplay(item)}，${item.reading}）`)
    .join("\n");

  return [
    `財報分析報告 - ${company.company}`,
    "",
    "一、報告資訊",
    `產生時間：${generatedAt}`,
    `分析標的：${company.company}`,
    `資料來源：${sourceLabel}`,
    `分析口徑：${view.ratioBasisLabel || "年度 / TTM"}`,
    `初步結論：${recommendation.label || "--"}`,
    `風險分數：${riskProfile.score ?? "--"}/100（${riskProfile.band || recommendation.riskLabel || "--"}）`,
    "",
    "二、分析摘要",
    summaryBlocks,
    "",
    "三、主要財務指標",
    ratioSnapshot || "尚無可用比率資料。",
    "",
    "四、異常偵測",
    formatAlertsForExport(analysis.alerts || [], analysis.alertRules || []),
    "",
    "五、來源追溯",
    formatEvidenceForExport(company),
    "",
    "六、人工註記",
    note || "尚未填寫。",
  ].join("\n");
}

function exportReport() {
  const company = getCompany();
  const analysis = normalizeAnalysis(company, analyzeCompany(company));
  const note = document.querySelector("#reviewerNote").value.trim();
  const content = buildExportReport(company, analysis, note);
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
