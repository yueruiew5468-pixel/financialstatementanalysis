(function (global) {
  "use strict";

  const requiredColumns = [
    "year",
    "revenue",
    "grossProfit",
    "operatingIncome",
    "netIncome",
    "currentAssets",
    "inventory",
    "accountsReceivable",
    "currentLiabilities",
    "totalLiabilities",
    "totalAssets",
    "equity",
    "interestExpense",
    "operatingCashFlow",
  ];

  const annualAlertRules = [
    "營收明顯下滑 / 營收轉弱",
    "負債快速增加",
    "負債比率偏高",
    "短期償債能力不足",
    "速動資產緩衝不足",
    "營業現金流為負",
    "獲利品質偏弱",
    "毛利率下滑",
    "營業利益率惡化",
    "應收帳款壓力上升",
    "存貨水位偏高",
    "利息保障倍數偏低",
    "獲利轉負",
    "權益明顯下降",
  ];

  const quarterlyAlertRules = [
    "近四季營業現金流為負",
    "單季營業現金流為負",
    "單季獲利未轉成現金",
    "營業現金流連續轉負",
    "總負債較去年同期快速增加",
    "存貨成長快於營收",
    "應收帳款成長快於營收",
    "應收與存貨吃掉營收成長",
    "應收帳款週轉天數拉長",
    "存貨週轉天數拉長",
    "應收週轉天數較前季拉長",
    "存貨週轉天數較前季拉長",
    "最新季流動比率低於 1",
    "最新季速動比率偏低",
    "短期借款占流動負債偏高",
    "TTM 現金流趨勢惡化",
    "TTM 營收較去年同期轉弱",
  ];

  function safeDivide(numerator, denominator) {
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return Number.NaN;
    }
    return numerator / denominator;
  }

  function money(value) {
    if (!Number.isFinite(value)) return "n/a";
    return `NT$ ${Math.round(value).toLocaleString("zh-TW")}M`;
  }

  function pct(value) {
    if (!Number.isFinite(value)) return "n/a";
    return `${(value * 100).toFixed(1)}%`;
  }

  function ratio(value) {
    if (!Number.isFinite(value)) return "n/a";
    return value.toFixed(2);
  }

  function multiple(value) {
    if (!Number.isFinite(value)) return "n/a";
    return `${value.toFixed(2)} 倍`;
  }

  function days(value) {
    if (!Number.isFinite(value)) return "n/a";
    return `${Math.round(value)} 天`;
  }

  function change(current, previous) {
    if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return 0;
    return (current - previous) / Math.abs(previous);
  }

  function periodSortValue(row) {
    return row.year * 10 + (row.season || 4);
  }

  function periodLabel(row) {
    return row.period || (row.season ? `${row.year}Q${row.season}` : `${row.year}`);
  }

  function comparisonText(current, previous, compareLabel = "去年", formatter = pct) {
    const delta = change(current, previous);
    const direction = delta >= 0 ? "上升" : "下降";
    return `較${compareLabel}${direction} ${formatter(Math.abs(delta))}`;
  }

  function trendText(current, previous, formatter = pct) {
    return comparisonText(current, previous, "去年", formatter);
  }

  function formatMetric(value, format) {
    if (format === "percent") return pct(value);
    if (format === "multiple") return multiple(value);
    if (format === "days") return days(value);
    return ratio(value);
  }

  function tagLowBad(value, danger, warning) {
    if (!Number.isFinite(value)) return "warning";
    if (value < danger) return "danger";
    if (value < warning) return "warning";
    return "ok";
  }

  function tagHighBad(value, danger, warning) {
    if (!Number.isFinite(value)) return "warning";
    if (value > danger) return "danger";
    if (value > warning) return "warning";
    return "ok";
  }

  const ratioDefinitions = [
    {
      key: "currentRatio",
      name: "流動比率",
      format: "ratio",
      tag: (value) => tagLowBad(value, 1, 1.2),
      reading: (value) =>
        value < 1 ? "短期資金壓力偏高" : value < 1.2 ? "流動性緩衝偏薄" : "流動性尚可",
    },
    {
      key: "quickRatio",
      name: "速動比率",
      format: "ratio",
      tag: (value) => tagLowBad(value, 0.8, 1),
      reading: (value) =>
        value < 0.8 ? "扣除存貨後償債緩衝不足" : value < 1 ? "速動資產略顯不足" : "可接受",
    },
    {
      key: "debtRatio",
      name: "負債比率",
      format: "percent",
      tag: (value) => tagHighBad(value, 0.7, 0.6),
      reading: (value) => (value > 0.7 ? "財務槓桿偏高" : value > 0.6 ? "槓桿需觀察" : "結構可控"),
    },
    {
      key: "grossMargin",
      name: "毛利率",
      format: "percent",
      tag: (value) => tagLowBad(value, 0.15, 0.22),
      reading: (value) => (value < 0.15 ? "成本或報價壓力偏高" : value < 0.22 ? "毛利緩衝有限" : "毛利表現尚可"),
    },
    {
      key: "operatingMargin",
      name: "營業利益率",
      format: "percent",
      tag: (value) => tagLowBad(value, 0.05, 0.08),
      reading: (value) => (value < 0.05 ? "本業獲利轉弱" : value < 0.08 ? "本業獲利需觀察" : "本業獲利尚可"),
    },
    {
      key: "netMargin",
      name: "稅後淨利率",
      format: "percent",
      tag: (value) => tagLowBad(value, 0.02, 0.05),
      reading: (value) => (value < 0 ? "出現虧損" : value < 0.02 ? "淨利緩衝不足" : "獲利可支撐營運"),
    },
    {
      key: "roa",
      name: "ROA",
      format: "percent",
      tag: (value) => tagLowBad(value, 0.02, 0.05),
      reading: (value) => (value < 0 ? "資產報酬為負" : value < 0.02 ? "資產效率偏弱" : "資產效率可觀察"),
    },
    {
      key: "roe",
      name: "ROE",
      format: "percent",
      tag: (value) => tagLowBad(value, 0.05, 0.1),
      reading: (value) => (value < 0 ? "股東權益報酬為負" : value < 0.05 ? "權益報酬偏低" : "權益報酬尚可"),
    },
    {
      key: "interestCoverage",
      name: "利息保障倍數",
      format: "multiple",
      tag: (value) => tagLowBad(value, 2, 4),
      reading: (value) =>
        value < 2 ? "利息支付緩衝不足" : value < 4 ? "償息能力需觀察" : "償息能力尚可",
    },
    {
      key: "cfoDebtRatio",
      name: "營業現金流 / 負債",
      format: "percent",
      tag: (value) => tagLowBad(value, 0, 0.05),
      reading: (value) => (value < 0 ? "獲利品質需追查" : value < 0.05 ? "現金流支持度偏低" : "現金流支持度可觀察"),
    },
    {
      key: "arToRevenue",
      name: "應收帳款 / 營收",
      format: "percent",
      tag: (value) => tagHighBad(value, 0.35, 0.25),
      reading: (value) => (value > 0.35 ? "收款與客戶集中風險偏高" : value > 0.25 ? "收款週期需追蹤" : "收款壓力可控"),
    },
    {
      key: "inventoryToRevenue",
      name: "存貨 / 營收",
      format: "percent",
      tag: (value) => tagHighBad(value, 0.3, 0.22),
      reading: (value) => (value > 0.3 ? "存貨去化風險偏高" : value > 0.22 ? "存貨水位需觀察" : "存貨水位可控"),
    },
    {
      key: "workingCapitalLoad",
      name: "應收 + 存貨 / 營收",
      format: "percent",
      tag: (value) => tagHighBad(value, 0.75, 0.55),
      reading: (value) => (value > 0.75 ? "營運資金吃掉營收成長" : value > 0.55 ? "營運資金占用偏高" : "營運資金占用可控"),
    },
    {
      key: "shortDebtToCurrentLiabilities",
      name: "短期借款 / 流動負債",
      format: "percent",
      tag: (value) => tagHighBad(value, 0.35, 0.2),
      reading: (value) => (value > 0.35 ? "短債集中度偏高" : value > 0.2 ? "短債占比需追蹤" : "短債占比可控"),
    },
    {
      key: "dso",
      name: "應收帳款週轉天數",
      format: "days",
      tag: (value) => tagHighBad(value, 120, 90),
      reading: (value) => (value > 120 ? "收款天期偏長" : value > 90 ? "收款效率需觀察" : "收款效率可接受"),
    },
    {
      key: "inventoryDays",
      name: "存貨週轉天數",
      format: "days",
      tag: (value) => tagHighBad(value, 150, 100),
      reading: (value) => (value > 150 ? "存貨去化天期偏長" : value > 100 ? "存貨去化需追蹤" : "存貨去化可接受"),
    },
  ];

  function enrichStatements(statements) {
    return statements
      .slice()
      .sort((a, b) => periodSortValue(a) - periodSortValue(b))
      .map((row) => {
        const cogs = row.revenue - row.grossProfit;
        const periodDays = row.periodBasis === "singleQuarter" ? 90 : 365;
        return {
          ...row,
          currentRatio: safeDivide(row.currentAssets, row.currentLiabilities),
          quickRatio: safeDivide(row.currentAssets - row.inventory, row.currentLiabilities),
          debtRatio: safeDivide(row.totalLiabilities, row.totalAssets),
          grossMargin: safeDivide(row.grossProfit, row.revenue),
          operatingMargin: safeDivide(row.operatingIncome, row.revenue),
          netMargin: safeDivide(row.netIncome, row.revenue),
          roa: safeDivide(row.netIncome, row.totalAssets),
          roe: safeDivide(row.netIncome, row.equity),
          interestCoverage: safeDivide(row.operatingIncome, row.interestExpense),
          cfoDebtRatio: safeDivide(row.operatingCashFlow, row.totalLiabilities),
          arToRevenue: safeDivide(row.accountsReceivable, row.revenue),
          inventoryToRevenue: safeDivide(row.inventory, row.revenue),
          workingCapitalLoad: safeDivide(row.accountsReceivable + row.inventory, row.revenue),
          shortDebtToCurrentLiabilities: safeDivide(row.shortTermBorrowings, row.currentLiabilities),
          cfoToNetIncome: safeDivide(row.operatingCashFlow, row.netIncome),
          dso: safeDivide(row.accountsReceivable, row.revenue) * periodDays,
          inventoryDays: safeDivide(row.inventory, cogs) * periodDays,
        };
      });
  }

  function detectAlerts(rows) {
    const latest = rows.at(-1);
    const previous = rows.at(-2);
    const alerts = [];
    const push = (severity, title, detail, action, metricKey) => {
      alerts.push({ severity, title, detail, action, metricKey });
    };

    const revenueGrowth = change(latest.revenue, previous.revenue);
    const liabilityGrowth = change(latest.totalLiabilities, previous.totalLiabilities);
    const arGrowth = change(latest.accountsReceivable, previous.accountsReceivable);
    const inventoryGrowth = change(latest.inventory, previous.inventory);
    const grossMarginChange = change(latest.grossMargin, previous.grossMargin);
    const operatingMarginChange = change(latest.operatingMargin, previous.operatingMargin);
    const equityChange = change(latest.equity, previous.equity);

    if (revenueGrowth <= -0.25) {
      push("high", "營收明顯下滑", `最新年度營收為 ${money(latest.revenue)}，${trendText(latest.revenue, previous.revenue)}。`, "要求客戶補充訂單、主要客戶流失與未來接單說明。", "revenue");
    } else if (revenueGrowth <= -0.1) {
      push("medium", "營收轉弱", `最新年度營收為 ${money(latest.revenue)}，${trendText(latest.revenue, previous.revenue)}。`, "追蹤下一期營收與接單能見度。", "revenue");
    }

    if (liabilityGrowth >= 0.15) {
      push("high", "負債快速增加", `總負債達 ${money(latest.totalLiabilities)}，${trendText(latest.totalLiabilities, previous.totalLiabilities)}。`, "確認新增借款用途、到期結構與還款來源。", "totalLiabilities");
    }

    if (latest.debtRatio > 0.7) {
      push("high", "負債比率偏高", `負債比率為 ${pct(latest.debtRatio)}，高於 70% 觀察門檻。`, "檢查短中長期負債組成與是否需增提擔保或保證。", "debtRatio");
    }

    if (latest.currentRatio < 1) {
      push("high", "短期償債能力不足", `流動比率 ${ratio(latest.currentRatio)}，低於 1.00 的觀察門檻。`, "確認短期借款到期日、可用資金與營運資金缺口。", "currentRatio");
    } else if (latest.quickRatio < 0.8) {
      push("medium", "速動資產緩衝不足", `速動比率 ${ratio(latest.quickRatio)}，扣除存貨後短期償債緩衝偏薄。`, "確認存貨變現性與應收帳款可收回性。", "quickRatio");
    }

    if (latest.operatingCashFlow < 0) {
      push("high", "營業現金流為負", `營業現金流為 ${money(latest.operatingCashFlow)}，需確認收款與營運資金壓力。`, "要求說明現金流轉負原因、付款條件變化與回收計畫。", "operatingCashFlow");
    }

    if (latest.netIncome > 0 && latest.cfoToNetIncome < 0.25) {
      push("medium", "獲利品質偏弱", `稅後淨利為 ${money(latest.netIncome)}，但營業現金流未同步支撐獲利。`, "比對應收帳款、存貨與預付款變動，確認是否有盈餘品質疑慮。", "cfoToNetIncome");
    }

    if (grossMarginChange <= -0.15) {
      push("medium", "毛利率下滑", `毛利率為 ${pct(latest.grossMargin)}，${trendText(latest.grossMargin, previous.grossMargin)}。`, "追蹤原物料成本、產品組合與報價調整能力。", "grossMargin");
    }

    if (operatingMarginChange <= -0.2) {
      push("medium", "營業利益率惡化", `營業利益率為 ${pct(latest.operatingMargin)}，${trendText(latest.operatingMargin, previous.operatingMargin)}。`, "檢查固定成本吸收、費用率與一次性損益。", "operatingMargin");
    }

    if (arGrowth > revenueGrowth + 0.15 || latest.arToRevenue > 0.35) {
      push("medium", "應收帳款壓力上升", `應收帳款占營收比為 ${pct(latest.arToRevenue)}，應收帳款成長速度高於營收。`, "檢查逾期帳齡、主要客戶集中度與期後收款。", "arToRevenue");
    }

    if (inventoryGrowth > revenueGrowth + 0.2 || latest.inventoryToRevenue > 0.3) {
      push("medium", "存貨水位偏高", `存貨占營收比為 ${pct(latest.inventoryToRevenue)}，需確認備貨與去化情形。`, "覆核存貨庫齡、跌價損失與訂單覆蓋率。", "inventoryToRevenue");
    }

    if (latest.interestCoverage < 2) {
      push("medium", "利息保障倍數偏低", `利息保障倍數 ${multiple(latest.interestCoverage)}，對利率或獲利波動較敏感。`, "評估升息、展延與獲利下行情境下的償息能力。", "interestCoverage");
    }

    if (latest.netIncome < 0 || latest.roe < 0) {
      push("high", "獲利轉負", `最新年度稅後淨利為 ${money(latest.netIncome)}，ROE 為 ${pct(latest.roe)}。`, "暫緩自動續約，要求改善計畫與最新自結數。", "netIncome");
    }

    if (equityChange <= -0.2) {
      push("medium", "權益明顯下降", `股東權益為 ${money(latest.equity)}，${trendText(latest.equity, previous.equity)}。`, "確認虧損、股利政策或其他權益減項原因。", "equity");
    }

    if (!alerts.length) {
      push("low", "未偵測重大異常", "主要比率與現金流維持穩定，仍建議保留人工覆核。", "維持例行追蹤，補齊最新期後財務資料。", "baseline");
    }

    return alerts;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function riskBand(score) {
    if (score >= 75) return { label: "高風險", tone: "danger", recommendation: "加強條件" };
    if (score >= 45) return { label: "中高風險", tone: "danger", recommendation: "加強條件" };
    if (score >= 30) return { label: "觀察", tone: "warning", recommendation: "列入觀察" };
    return { label: "正常", tone: "ok", recommendation: "維持追蹤" };
  }

  function calculateRiskProfile(alerts, rows) {
    const latest = rows.at(-1);
    const previous = rows.at(-2);
    const liabilityGrowth = previous ? change(latest.totalLiabilities, previous.totalLiabilities) : 0;
    const highCount = alerts.filter((item) => item.severity === "high").length;
    const mediumCount = alerts.filter((item) => item.severity === "medium").length;

    const liquidity = clamp(
      (latest.currentRatio < 1 ? 14 : latest.currentRatio < 1.2 ? 8 : 0) +
        (latest.quickRatio < 0.8 ? 6 : latest.quickRatio < 1 ? 3 : 0) +
        (latest.shortDebtToCurrentLiabilities > 0.35 ? 5 : latest.shortDebtToCurrentLiabilities > 0.2 ? 3 : 0),
      0,
      25,
    );
    const leverage = clamp(
      (latest.debtRatio > 0.7 ? 14 : latest.debtRatio > 0.6 ? 8 : 0) +
        (liabilityGrowth > 0.35 ? 6 : liabilityGrowth > 0.15 ? 3 : 0),
      0,
      20,
    );
    const cashflow = clamp(
      (latest.cfoDebtRatio < 0 ? 18 : latest.cfoDebtRatio < 0.03 ? 10 : latest.cfoDebtRatio < 0.05 ? 6 : 0) +
        (latest.cfoToNetIncome < 0.25 ? 5 : 0) +
        (latest.operatingCashFlow < 0 ? 7 : 0),
      0,
      25,
    );
    const profitability = clamp(
      (latest.operatingMargin < 0.05 ? 6 : latest.operatingMargin < 0.08 ? 3 : 0) +
        (latest.netMargin < 0.02 ? 5 : latest.netMargin < 0.05 ? 2 : 0) +
        (latest.interestCoverage < 2 ? 4 : latest.interestCoverage < 4 ? 2 : 0) +
        (latest.netIncome < 0 ? 5 : 0),
      0,
      15,
    );
    const workingCapital = clamp(
      (latest.arToRevenue > 0.35 ? 4 : latest.arToRevenue > 0.25 ? 2 : 0) +
        (latest.inventoryToRevenue > 0.3 ? 4 : latest.inventoryToRevenue > 0.22 ? 2 : 0) +
        (latest.workingCapitalLoad > 0.75 ? 4 : latest.workingCapitalLoad > 0.55 ? 2 : 0) +
        (latest.dso > 120 ? 3 : latest.dso > 90 ? 1 : 0) +
        (latest.inventoryDays > 150 ? 3 : latest.inventoryDays > 100 ? 1 : 0),
      0,
      15,
    );

    const components = [
      { key: "liquidity", name: "流動性", score: liquidity, max: 25 },
      { key: "leverage", name: "槓桿", score: leverage, max: 20 },
      { key: "cashflow", name: "現金流", score: cashflow, max: 25 },
      { key: "profitability", name: "獲利", score: profitability, max: 15 },
      { key: "workingCapital", name: "營運資金", score: workingCapital, max: 15 },
    ];
    const alertPressure = Math.min(15, highCount * 6 + mediumCount * 3);
    const score = clamp(Math.round(components.reduce((sum, item) => sum + item.score, 0) + alertPressure), 0, 100);
    const band = riskBand(score);
    const topComponents = components
      .slice()
      .sort((a, b) => b.score / b.max - a.score / a.max)
      .slice(0, 2)
      .map((item) => item.name)
      .join("、");

    return {
      score,
      band: band.label,
      tone: band.tone,
      suggestedRecommendation: band.recommendation,
      components,
      alertPressure,
      summary: topComponents ? `${topComponents}壓力較高` : "未見主要壓力項",
    };
  }

  function evaluateRecommendation(alerts, rows, riskProfile = null) {
    const latest = rows.at(-1);
    const highCount = alerts.filter((item) => item.severity === "high").length;
    const mediumCount = alerts.filter((item) => item.severity === "medium").length;
    const score = highCount * 3 + mediumCount * 1.25;
    const keyReasons = alerts
      .filter((item) => item.severity !== "low")
      .slice(0, 2)
      .map((item) => item.title)
      .join("、");
    const confidence = Math.max(72, Math.min(92, 90 - highCount * 3 - mediumCount));

    if (riskProfile) {
      const label = riskProfile.suggestedRecommendation;
      return {
        label,
        reason: keyReasons ? `${keyReasons}；${riskProfile.summary}` : riskProfile.summary,
        riskLabel: riskProfile.band,
        confidence,
        score,
        riskScore: riskProfile.score,
      };
    }

    if (score >= 6 || latest.netIncome < 0 || latest.roe < 0) {
      return {
        label: "加強條件",
        reason: keyReasons ? `${keyReasons}需優先檢視` : "多項高風險指標同時觸發",
        riskLabel: "高關注",
        confidence,
        score,
      };
    }

    if (score >= 2.5 || latest.debtRatio > 0.6) {
      return {
        label: "列入觀察",
        reason: keyReasons ? `${keyReasons}需追蹤` : "部分償債或現金流指標需追蹤",
        riskLabel: "中度關注",
        confidence,
        score,
      };
    }

    return {
      label: "維持追蹤",
      reason: "營運、償債與現金流結構穩定",
      riskLabel: "正常",
      confidence,
      score,
    };
  }

  function buildRatioRows(rows, options = {}) {
    const latest = rows.at(-1);
    const previous = rows.at(-2);
    const compareLabel = options.compareLabel || "去年";

    return ratioDefinitions.map((definition) => {
      const latestValue = latest[definition.key];
      const previousValue = previous[definition.key];
      const formatter = (value) => formatMetric(value, definition.format);
      return {
        name: definition.name,
        latest: formatter(latestValue),
        previous: formatter(previousValue),
        delta: comparisonText(latestValue, previousValue, compareLabel, pct),
        tag: definition.tag(latestValue),
        reading: definition.reading(latestValue),
        key: definition.key,
      };
    });
  }

  function buildTtmRows(singleQuarterRows) {
    const rows = enrichStatements((singleQuarterRows || []).map((row) => ({ ...row, periodBasis: "singleQuarter" })));
    const ttmRows = [];
    const flowFields = ["revenue", "grossProfit", "operatingIncome", "netIncome", "interestExpense", "operatingCashFlow"];
    const balanceFields = ["currentAssets", "inventory", "accountsReceivable", "shortTermBorrowings", "currentLiabilities", "totalLiabilities", "totalAssets", "equity"];

    for (let index = 3; index < rows.length; index += 1) {
      const windowRows = rows.slice(index - 3, index + 1);
      const latest = windowRows.at(-1);
      const item = {
        year: latest.year,
        season: latest.season,
        period: `${periodLabel(latest)} TTM`,
        periodBasis: "ttm",
        sourcePeriod: periodLabel(latest),
      };

      for (const field of flowFields) {
        item[field] = windowRows.reduce((sum, row) => sum + (Number.isFinite(row[field]) ? row[field] : 0), 0);
      }

      for (const field of balanceFields) {
        item[field] = latest[field];
      }

      ttmRows.push(item);
    }

    return enrichStatements(ttmRows);
  }

  function buildYtdComparableRows(ytdRows) {
    const latest = ytdRows.at(-1);
    if (!latest || !latest.season) return ytdRows;

    const sameSeasonRows = ytdRows.filter((row) => row.season === latest.season);
    return sameSeasonRows.length >= 2 ? sameSeasonRows : ytdRows;
  }

  function findSameQuarterPreviousYear(rows, latest) {
    return rows.find((row) => row.year === latest.year - 1 && row.season === latest.season);
  }

  function countTrailingNegativeCashFlow(rows) {
    let count = 0;
    for (let index = rows.length - 1; index >= 0; index -= 1) {
      if (rows[index].operatingCashFlow < 0) count += 1;
      else break;
    }
    return count;
  }

  function detectQuarterlyAlerts(quarterRows, ttmRows) {
    const latest = quarterRows.at(-1);
    const previous = quarterRows.at(-2);
    const yoy = findSameQuarterPreviousYear(quarterRows, latest);
    const latestTtm = ttmRows.at(-1);
    const previousTtm = ttmRows.at(-2);
    const yoyTtm = findSameQuarterPreviousYear(ttmRows, latestTtm);
    const negativeCashFlowQuarters = countTrailingNegativeCashFlow(quarterRows);
    const alerts = [];
    const push = (severity, title, detail, action, metricKey) => {
      alerts.push({ severity, title, detail, action, metricKey });
    };

    if (latestTtm && latestTtm.operatingCashFlow < 0) {
      push(
        "high",
        "近四季營業現金流為負",
        `${periodLabel(latest)} 的 TTM 營業現金流為 ${money(latestTtm.operatingCashFlow)}，獲利與現金流仍未完全同步。`,
        "要求客戶補充應收帳款、存貨與付款條件變動，並追蹤期後收款。",
        "operatingCashFlow",
      );
    } else if (latest.operatingCashFlow < 0) {
      push(
        "medium",
        "單季營業現金流為負",
        `${periodLabel(latest)} 營業現金流為 ${money(latest.operatingCashFlow)}。`,
        "確認是否為季節性備貨、客戶收款遞延或付款條件改變。",
        "operatingCashFlow",
      );
    }

    if (latest.netIncome > 0 && latest.operatingCashFlow < 0) {
      push(
        "medium",
        "單季獲利未轉成現金",
        `${periodLabel(latest)} 稅後淨利為 ${money(latest.netIncome)}，但營業現金流為 ${money(latest.operatingCashFlow)}。`,
        "比對應收帳款、存貨與應付帳款變動，確認盈餘品質。",
        "cfoToNetIncome",
      );
    }

    if (negativeCashFlowQuarters >= 2) {
      push(
        "high",
        "營業現金流連續轉負",
        `最近 ${negativeCashFlowQuarters} 季營業現金流連續為負，最新季為 ${money(latest.operatingCashFlow)}。`,
        "要求提出期後收款、備貨去化與營運資金改善時程。",
        "operatingCashFlow",
      );
    }

    if (yoy) {
      const revenueGrowth = change(latest.revenue, yoy.revenue);
      const inventoryGrowth = change(latest.inventory, yoy.inventory);
      const arGrowth = change(latest.accountsReceivable, yoy.accountsReceivable);
      const liabilityGrowth = change(latest.totalLiabilities, yoy.totalLiabilities);
      const workingCapitalGrowth = change(latest.accountsReceivable + latest.inventory, yoy.accountsReceivable + yoy.inventory);
      const dsoIncrease = latest.dso - yoy.dso;
      const inventoryDaysIncrease = latest.inventoryDays - yoy.inventoryDays;

      if (liabilityGrowth >= 0.35) {
        push(
          "high",
          "總負債較去年同期快速增加",
          `${periodLabel(latest)} 總負債為 ${money(latest.totalLiabilities)}，${comparisonText(latest.totalLiabilities, yoy.totalLiabilities, "去年同期")}。`,
          "確認新增借款用途、短債到期分布與可用資金安排。",
          "totalLiabilities",
        );
      }

      if (inventoryGrowth > revenueGrowth + 0.2) {
        push(
          "medium",
          "存貨成長快於營收",
          `${periodLabel(latest)} 存貨為 ${money(latest.inventory)}，${comparisonText(latest.inventory, yoy.inventory, "去年同期")}，高於營收成長幅度。`,
          "檢查備貨假設、庫齡、跌價損失與主要客戶訂單覆蓋率。",
          "inventory",
        );
      }

      if (arGrowth > revenueGrowth + 0.15) {
        push(
          "medium",
          "應收帳款成長快於營收",
          `${periodLabel(latest)} 應收帳款為 ${money(latest.accountsReceivable)}，${comparisonText(latest.accountsReceivable, yoy.accountsReceivable, "去年同期")}。`,
          "覆核帳齡、逾期、期後收款與客戶集中度。",
          "accountsReceivable",
        );
      }

      if (workingCapitalGrowth > revenueGrowth + 0.2) {
        push(
          "medium",
          "應收與存貨吃掉營收成長",
          `${periodLabel(latest)} 應收帳款加存貨為 ${money(latest.accountsReceivable + latest.inventory)}，${comparisonText(latest.accountsReceivable + latest.inventory, yoy.accountsReceivable + yoy.inventory, "去年同期")}。`,
          "比對新增營收是否轉為現金，並要求帳齡、庫齡與主要訂單明細。",
          "workingCapitalLoad",
        );
      }

      if (dsoIncrease >= 30) {
        push(
          "medium",
          "應收帳款週轉天數拉長",
          `${periodLabel(latest)} DSO 為 ${days(latest.dso)}，較去年同期增加 ${Math.round(dsoIncrease)} 天。`,
          "要求提供期後收款、逾期帳齡與主要客戶信用條件變動。",
          "dso",
        );
      }

      if (inventoryDaysIncrease >= 30) {
        push(
          "medium",
          "存貨週轉天數拉長",
          `${periodLabel(latest)} 存貨週轉天數為 ${days(latest.inventoryDays)}，較去年同期增加 ${Math.round(inventoryDaysIncrease)} 天。`,
          "要求提供庫齡表、跌價評估與訂單覆蓋率。",
          "inventoryDays",
        );
      }
    }

    if (previous) {
      const dsoQoqIncrease = latest.dso - previous.dso;
      const inventoryDaysQoqIncrease = latest.inventoryDays - previous.inventoryDays;
      if (dsoQoqIncrease >= 20) {
        push(
          "medium",
          "應收週轉天數較前季拉長",
          `${periodLabel(latest)} DSO 較前一季增加 ${Math.round(dsoQoqIncrease)} 天。`,
          "檢查季末拉貨、驗收條件與期後收款落點。",
          "dso",
        );
      }

      if (inventoryDaysQoqIncrease >= 20) {
        push(
          "medium",
          "存貨週轉天數較前季拉長",
          `${periodLabel(latest)} 存貨週轉天數較前一季增加 ${Math.round(inventoryDaysQoqIncrease)} 天。`,
          "檢查備貨週期是否超出訂單覆蓋，並確認庫齡分布。",
          "inventoryDays",
        );
      }
    }

    if (latest.currentRatio < 1) {
      push("high", "最新季流動比率低於 1", `${periodLabel(latest)} 流動比率為 ${ratio(latest.currentRatio)}。`, "確認短期借款到期、營運資金缺口與可動用資金。", "currentRatio");
    } else if (latest.quickRatio < 0.8) {
      push("medium", "最新季速動比率偏低", `${periodLabel(latest)} 速動比率為 ${ratio(latest.quickRatio)}。`, "確認存貨變現性及應收帳款可收回性。", "quickRatio");
    }

    if (latest.shortDebtToCurrentLiabilities > 0.35) {
      push(
        "medium",
        "短期借款占流動負債偏高",
        `${periodLabel(latest)} 短期借款 / 流動負債為 ${pct(latest.shortDebtToCurrentLiabilities)}。`,
        "確認短借到期結構、展延條件與備償資金來源。",
        "shortDebtToCurrentLiabilities",
      );
    }

    if (latestTtm && previousTtm && change(latestTtm.operatingCashFlow, previousTtm.operatingCashFlow) <= -0.25) {
      push(
        "medium",
        "TTM 現金流趨勢惡化",
        `最新 TTM 營業現金流為 ${money(latestTtm.operatingCashFlow)}，${comparisonText(latestTtm.operatingCashFlow, previousTtm.operatingCashFlow, "前一季 TTM")}。`,
        "將現金流列為下一次追蹤主軸，要求月營收與期後收款佐證。",
        "operatingCashFlow",
      );
    }

    if (latestTtm && yoyTtm && change(latestTtm.revenue, yoyTtm.revenue) <= -0.1) {
      push(
        "medium",
        "TTM 營收較去年同期轉弱",
        `最新 TTM 營收為 ${money(latestTtm.revenue)}，${comparisonText(latestTtm.revenue, yoyTtm.revenue, "去年同期 TTM")}。`,
        "追蹤接單能見度、主要產品需求與客戶集中風險。",
        "revenue",
      );
    }

    if (!alerts.length) {
      push("low", "未偵測重大季度異常", "最新季度、TTM 與資產負債表時點數未觸發重大預警。", "維持例行季度追蹤與來源覆核。", "baseline");
    }

    return alerts;
  }

  function buildReviewSections(company, rows, alerts, recommendation, riskProfile) {
    const latest = rows.at(-1);
    const previous = rows.at(-2);
    const materialAlerts = alerts.filter((item) => item.severity !== "low");
    const keyAlerts = materialAlerts
      .slice(0, 4)
      .map((item) => item.title)
      .join("、");
    const actions = materialAlerts
      .slice(0, 3)
      .map((item) => item.action)
      .filter(Boolean)
      .join("；");
    const memoActions = actions || "維持例行財報追蹤、來源文件確認與人工註記。";

    return [
      {
        title: "一、分析結論",
        text: `建議 ${recommendation.label}；風險分數 ${riskProfile.score}/100（${riskProfile.band}）。主要依據為${recommendation.reason}。`,
      },
      {
        title: "二、追蹤建議",
        text: `以年度資料作為基準，最新年度營收為 ${money(latest.revenue)}，${trendText(latest.revenue, previous.revenue)}。建議持續追蹤期後財務、營運資金與現金流轉換。`,
      },
      {
        title: "三、主要風險",
        text: `${keyAlerts || "未偵測重大異常"}。負債比率 ${pct(latest.debtRatio)}、流動比率 ${ratio(latest.currentRatio)}、營業現金流 ${money(latest.operatingCashFlow)}。`,
      },
      {
        title: "四、支撐因素",
        text: `稅後淨利為 ${money(latest.netIncome)}，淨利率 ${pct(latest.netMargin)}，ROA ${pct(latest.roa)}，ROE ${pct(latest.roe)}。正面因素仍需以現金流與期後收款驗證。`,
      },
      {
        title: "五、必要釐清問題",
        text: memoActions,
      },
      {
        title: "六、建議追蹤條件",
        text: "保留人工判讀；要求期後收款、短債到期計畫與最新自結數。資料未補齊前，不宜單靠模型結論做決策。",
      },
      {
        title: "七、需補資料",
        text: "最近一期財報來源頁、期後應收帳款帳齡、存貨庫齡、主要客戶訂單或出貨證明、短期借款明細與公司營運說明。",
      },
    ];
  }

  function buildQuarterRows(quarterRows) {
    return quarterRows.slice(-6).map((row) => {
      const stress =
        row.operatingCashFlow < 0
          ? "現金流轉負"
          : row.quickRatio < 0.8
            ? "速動緩衝偏低"
            : row.inventoryToRevenue > 0.3
              ? "存貨水位偏高"
              : "可觀察";
      const tag = row.operatingCashFlow < 0 || row.quickRatio < 0.8 ? "danger" : stress === "可觀察" ? "ok" : "warning";
      return {
        period: periodLabel(row),
        revenue: money(row.revenue),
        operatingCashFlow: money(row.operatingCashFlow),
        currentRatio: ratio(row.currentRatio),
        stress,
        tag,
      };
    });
  }

  function buildQuarterlyReviewSections(company, annualRows, quarterRows, ttmRows, alerts, recommendation, riskProfile) {
    const latestAnnual = annualRows.at(-1);
    const previousAnnual = annualRows.at(-2);
    const latestQuarter = quarterRows.at(-1);
    const previousQuarter = quarterRows.at(-2);
    const latestTtm = ttmRows.at(-1);
    const previousTtm = ttmRows.at(-2);
    const materialAlerts = alerts.filter((item) => item.severity !== "low");
    const keyAlerts = materialAlerts
      .slice(0, 4)
      .map((item) => item.title)
      .join("、");
    const actions = materialAlerts
      .slice(0, 3)
      .map((item) => item.action)
      .filter(Boolean)
      .join("；");
    const memoActions = actions || "維持季度追蹤、來源頁碼與人工覆核。";

    return [
      {
        title: "一、分析結論",
        text: `建議 ${recommendation.label}；風險分數 ${riskProfile.score}/100（${riskProfile.band}）。本次以最新季、單季異常與 TTM 比率為主要分析口徑。`,
      },
      {
        title: "二、追蹤建議",
        text: `建議優先追蹤期後收款、存貨去化、短債到期與最新自結數；若現金流未改善，應提高追蹤頻率並補充管理層說明。`,
      },
      {
        title: "三、主要風險",
        text: `${keyAlerts || "未偵測重大季度異常"}。最新 TTM 營業現金流為 ${money(latestTtm.operatingCashFlow)}，流動比率 ${ratio(latestQuarter.currentRatio)}，負債比率 ${pct(latestQuarter.debtRatio)}。`,
      },
      {
        title: "四、支撐因素",
        text: `${periodLabel(latestQuarter)} 單季營收為 ${money(latestQuarter.revenue)}，${comparisonText(latestQuarter.revenue, previousQuarter.revenue, "前一季")}；最新年度營收為 ${money(latestAnnual.revenue)}，${comparisonText(latestAnnual.revenue, previousAnnual.revenue, "去年")}。`,
      },
      {
        title: "五、必要釐清問題",
        text: memoActions,
      },
      {
        title: "六、建議追蹤條件",
        text: "保留人工判讀；應確認期後收款、庫齡與短債展延。若 TTM 現金流未轉正，建議將現金流改善列為下一期重點追蹤。",
      },
      {
        title: "七、需補資料",
        text: "MOPS 原始頁與整理檔、最近一期自結報表、應收帳款帳齡、期後收款證明、存貨庫齡、短期借款明細與主要客戶訂單資料。",
      },
    ];
  }

  function analyzeCompany(company) {
    const rows = enrichStatements((company.statements || []).map((row) => ({ ...row, periodBasis: "annual" })));
    if (rows.length < 2) {
      throw new Error("至少需要兩個年度的財務資料才能進行趨勢與異常分析。");
    }

    const quarterly = company.quarterly || {};
    if (Array.isArray(quarterly.singleQuarter) && quarterly.singleQuarter.length >= 4) {
      const quarterRows = enrichStatements(quarterly.singleQuarter.map((row) => ({ ...row, periodBasis: "singleQuarter" })));
      const ytdRows = enrichStatements((quarterly.ytdAndPeriodEnd || []).map((row) => ({ ...row, periodBasis: "ytd" })));
      const ytdComparableRows = buildYtdComparableRows(ytdRows);
      const ttmRows = buildTtmRows(quarterly.singleQuarter);
      const alerts = detectQuarterlyAlerts(quarterRows, ttmRows);
      const riskProfile = calculateRiskProfile(alerts, ttmRows);
      const recommendation = evaluateRecommendation(alerts, ttmRows, riskProfile);
      const views = {
        annual: {
          key: "annual",
          label: "年度",
          rows,
          chartRows: rows,
          ratios: buildRatioRows(rows, { compareLabel: "去年" }),
          ratioBasisLabel: "年度分析比率",
          ratioLatestHeader: "最新年度",
          ratioPreviousHeader: "去年",
          kpiCompareLabel: "去年",
          chartBasisLabel: "年度趨勢",
        },
        ytd: {
          key: "ytd",
          label: "季累計",
          rows: ytdComparableRows,
          chartRows: ytdComparableRows.slice(-6),
          ratios: buildRatioRows(ytdComparableRows, { compareLabel: "去年同期累計" }),
          ratioBasisLabel: "季累計同季分析比率",
          ratioLatestHeader: "最新季累計",
          ratioPreviousHeader: "去年同期累計",
          kpiCompareLabel: "去年同期累計",
          chartBasisLabel: `季累計同季趨勢 Q${ytdComparableRows.at(-1)?.season || ""}`.trim(),
        },
        quarter: {
          key: "quarter",
          label: "單季",
          rows: quarterRows,
          chartRows: quarterRows.slice(-6),
          ratios: buildRatioRows(quarterRows, { compareLabel: "前一季" }),
          ratioBasisLabel: "單季預警比率",
          ratioLatestHeader: "最新單季",
          ratioPreviousHeader: "前一季",
          kpiCompareLabel: "前一季",
          chartBasisLabel: "單季趨勢",
        },
        ttm: {
          key: "ttm",
          label: "TTM",
          rows: ttmRows,
          chartRows: ttmRows.slice(-6),
          ratios: buildRatioRows(ttmRows, { compareLabel: "前一季 TTM" }),
          ratioBasisLabel: "TTM 分析比率",
          ratioLatestHeader: "最新 TTM",
          ratioPreviousHeader: "前一季 TTM",
          kpiCompareLabel: "前一季 TTM",
          chartBasisLabel: "TTM 趨勢",
        },
      };

      return {
        basis: "quarterly",
        defaultView: "ttm",
        views,
        rows,
        ytdRows,
        ytdComparableRows,
        quarterRows,
        ttmRows,
        kpiRows: ttmRows,
        chartRows: ttmRows.slice(-6),
        alerts,
        alertRules: quarterlyAlertRules,
        recommendation,
        riskProfile,
        ratios: views.ttm.ratios,
        quarterTableRows: buildQuarterRows(quarterRows),
        ratioBasisLabel: "TTM 分析比率",
        ratioLatestHeader: "最新 TTM",
        ratioPreviousHeader: "前一季 TTM",
        kpiCompareLabel: "前一季",
        summarySections: buildQuarterlyReviewSections(company, rows, quarterRows, ttmRows, alerts, recommendation, riskProfile),
      };
    }

    const alerts = detectAlerts(rows);
    const riskProfile = calculateRiskProfile(alerts, rows);
    const recommendation = evaluateRecommendation(alerts, rows, riskProfile);
    const views = {
      annual: {
        key: "annual",
        label: "年度",
        rows,
        chartRows: rows,
        ratios: buildRatioRows(rows, { compareLabel: "去年" }),
        ratioBasisLabel: "年度分析比率",
        ratioLatestHeader: "最新年度",
        ratioPreviousHeader: "去年",
        kpiCompareLabel: "去年",
        chartBasisLabel: "年度趨勢",
      },
    };
    return {
      basis: "annual",
      defaultView: "annual",
      views,
      rows,
      kpiRows: rows,
      chartRows: rows,
      alerts,
      alertRules: annualAlertRules,
      recommendation,
      riskProfile,
      ratios: buildRatioRows(rows, { compareLabel: "去年" }),
      quarterTableRows: [],
      ratioBasisLabel: "年度分析比率",
      ratioLatestHeader: "最新年度",
      ratioPreviousHeader: "去年",
      kpiCompareLabel: "去年",
      summarySections: buildReviewSections(company, rows, alerts, recommendation, riskProfile),
    };
  }

  const api = {
    requiredColumns,
    ratioDefinitions,
    money,
    pct,
    ratio,
    multiple,
    change,
    comparisonText,
    trendText,
    enrichStatements,
    detectAlerts,
    detectQuarterlyAlerts,
    calculateRiskProfile,
    evaluateRecommendation,
    buildRatioRows,
    buildTtmRows,
    buildReviewSections,
    buildQuarterlyReviewSections,
    analyzeCompany,
  };

  global.CreditReviewAnalysis = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
