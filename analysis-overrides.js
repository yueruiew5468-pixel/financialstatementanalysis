(function () {
  "use strict";

  const api = window.CreditReviewAnalysis;
  if (!api || typeof api.analyzeCompany !== "function") return;

  const originalAnalyzeCompany = api.analyzeCompany;
  const labelMap = {
    加強條件: "高風險觀察",
    列入觀察: "中性偏審慎",
    維持追蹤: "穩健追蹤",
  };

  const actionMap = new Map([
    ["要求客戶補充訂單、主要客戶流失與未來接單說明。", "觀察產品需求、主要買方變化與後續接單能見度。"],
    ["檢查短中長期負債組成與是否需增提擔保或保證。", "拆解短中長期負債結構，觀察槓桿是否持續升高。"],
    ["要求說明現金流轉負原因、付款條件變化與回收計畫。", "比對應收、存貨與應付項目，判斷現金流轉弱是否來自營運資金占用。"],
    ["檢查逾期帳齡、主要客戶集中度與期後收款。", "觀察帳齡、期後收款與主要買方集中度，確認營收是否有效轉成現金。"],
    ["評估升息、展延與獲利下行情境下的償息能力。", "觀察利率、獲利下行情境對利息覆蓋能力的影響。"],
    ["暫緩自動續約，要求改善計畫與最新自結數。", "拆解本業、業外與一次性項目，判斷虧損是否具持續性。"],
    ["維持例行追蹤，補齊最新期後財務資料。", "維持例行財報追蹤，並持續比對最新期後資訊。"],
    ["要求客戶補充應收帳款、存貨與付款條件變動，並追蹤期後收款。", "觀察應收帳款、存貨與付款條件變動，判斷營運資金是否持續占用現金。"],
    ["確認是否為季節性備貨、客戶收款遞延或付款條件改變。", "判斷是否為季節性備貨、收款遞延或付款條件改變造成。"],
    ["要求提出期後收款、備貨去化與營運資金改善時程。", "持續追蹤期後收款、備貨去化與營運資金改善速度。"],
    ["檢查備貨假設、庫齡、跌價損失與主要客戶訂單覆蓋率。", "檢查備貨假設、庫齡、跌價損失與主要買方訂單覆蓋率。"],
    ["覆核帳齡、逾期、期後收款與客戶集中度。", "觀察帳齡、逾期、期後收款與主要買方集中度。"],
    ["比對新增營收是否轉為現金，並要求帳齡、庫齡與主要訂單明細。", "比對新增營收是否轉為現金，並檢視帳齡、庫齡與主要訂單覆蓋。"],
    ["要求提供期後收款、逾期帳齡與主要客戶信用條件變動。", "觀察期後收款、逾期帳齡與主要買方信用條件變動。"],
    ["要求提供庫齡表、跌價評估與訂單覆蓋率。", "觀察庫齡結構、跌價評估與訂單覆蓋率。"],
    ["確認短借到期結構、展延條件與備償資金來源。", "觀察短借到期結構、資金來源與流動性緩衝。"],
    ["將現金流列為下一次追蹤主軸，要求月營收與期後收款佐證。", "將現金流列為下一期追蹤主軸，並搭配月營收與期後收款觀察。"],
    ["追蹤接單能見度、主要產品需求與客戶集中風險。", "追蹤接單能見度、主要產品需求與買方集中風險。"],
  ]);

  function ratio(value) {
    return Number.isFinite(value) ? value.toFixed(2) : "n/a";
  }

  function multiple(value) {
    return Number.isFinite(value) ? `${value.toFixed(2)} 倍` : "n/a";
  }

  function days(value) {
    return Number.isFinite(value) ? `${Math.round(value)} 天` : "n/a";
  }

  function periodLabel(row) {
    return row.period || (row.season ? `${row.year}Q${row.season}` : `${row.year}`);
  }

  function cleanAction(text) {
    return (text || "").replace(/[。；;]+$/u, "");
  }

  function joinObservationItems(alerts) {
    return alerts
      .slice(0, 3)
      .map((item) => cleanAction(item.action))
      .filter(Boolean)
      .join("；");
  }

  function patchRecommendation(recommendation) {
    if (!recommendation) return recommendation;
    return {
      ...recommendation,
      label: labelMap[recommendation.label] || recommendation.label,
    };
  }

  function patchAlerts(alerts) {
    return (alerts || []).map((alert) => ({
      ...alert,
      action: actionMap.get(alert.action) || alert.action,
      reading:
        alert.reading === "收款與客戶集中風險偏高"
          ? "收款與主要買方集中風險偏高"
          : alert.reading,
    }));
  }

  function materialAlertTitles(alerts) {
    return alerts
      .filter((item) => item.severity !== "low")
      .slice(0, 4)
      .map((item) => item.title)
      .join("、");
  }

  function buildAnnualSections(company, result) {
    const rows = result.rows || [];
    const latest = rows.at(-1);
    const previous = rows.at(-2);
    if (!latest || !previous) return result.summarySections;

    const alerts = result.alerts || [];
    const recommendation = result.recommendation || {};
    const riskProfile = result.riskProfile || {};
    const keyAlerts = materialAlertTitles(alerts);
    const observationText =
      joinObservationItems(alerts.filter((item) => item.severity !== "low")) ||
      "持續比對月營收、管理層展望、期後現金流與下一期財報變化";

    return [
      {
        title: "一、整體財務判讀",
        text: `${company.company} 目前判讀為「${recommendation.label}」；風險等級為「${riskProfile.band}」。主要壓力來自 ${recommendation.reason}，後續應以現金流、營運資金與槓桿變化作為核心觀察軸。`,
      },
      {
        title: "二、營收與獲利趨勢",
        text: `最新年度營收為 ${api.money(latest.revenue)}，${api.trendText(latest.revenue, previous.revenue)}；毛利率 ${api.pct(latest.grossMargin)}、營業利益率 ${api.pct(latest.operatingMargin)}、稅後淨利率 ${api.pct(latest.netMargin)}。需觀察營收成長是否能同步維持毛利與本業獲利品質。`,
      },
      {
        title: "三、現金流與盈餘品質",
        text: `營業現金流為 ${api.money(latest.operatingCashFlow)}，營業現金流 / 負債為 ${api.pct(latest.cfoDebtRatio)}，獲利轉現金比率為 ${ratio(latest.cfoToNetIncome)}。若損益表獲利未同步轉為現金，代表盈餘品質與營運資金占用需要進一步追蹤。`,
      },
      {
        title: "四、資產負債與償債能力",
        text: `流動比率 ${ratio(latest.currentRatio)}、速動比率 ${ratio(latest.quickRatio)}、負債比率 ${api.pct(latest.debtRatio)}、利息保障倍數 ${multiple(latest.interestCoverage)}。此區重點在於短期流動性緩衝、財務槓桿與利息覆蓋能力是否同步惡化。`,
      },
      {
        title: "五、營運資金變化",
        text: `應收帳款 / 營收為 ${api.pct(latest.arToRevenue)}，存貨 / 營收為 ${api.pct(latest.inventoryToRevenue)}，應收加存貨 / 營收為 ${api.pct(latest.workingCapitalLoad)}；應收帳款週轉天數 ${days(latest.dso)}、存貨週轉天數 ${days(latest.inventoryDays)}。若兩者升高，表示營收成長可能被營運資金占用抵銷。`,
      },
      {
        title: "六、異常訊號摘要",
        text: `${keyAlerts || "目前未偵測重大財務異常"}。異常偵測結果應與趨勢圖、比率矩陣及原始財報來源交叉比對，避免單一指標造成過度解讀。`,
      },
      {
        title: "七、後續觀察重點",
        text: `${observationText}。`,
      },
    ];
  }

  function buildQuarterlySections(company, result) {
    const annualRows = result.rows || [];
    const quarterRows = result.quarterRows || [];
    const ttmRows = result.ttmRows || [];
    const latestAnnual = annualRows.at(-1);
    const previousAnnual = annualRows.at(-2);
    const latestQuarter = quarterRows.at(-1);
    const previousQuarter = quarterRows.at(-2);
    const latestTtm = ttmRows.at(-1);
    if (!latestAnnual || !previousAnnual || !latestQuarter || !previousQuarter || !latestTtm) {
      return result.summarySections;
    }

    const alerts = result.alerts || [];
    const recommendation = result.recommendation || {};
    const riskProfile = result.riskProfile || {};
    const keyAlerts = materialAlertTitles(alerts);
    const observationText =
      joinObservationItems(alerts.filter((item) => item.severity !== "low")) ||
      "持續觀察月營收、管理層展望、庫存去化、期後收款，以及下一期 TTM 營業現金流是否改善";

    return [
      {
        title: "一、整體財務判讀",
        text: `${company.company} 目前判讀為「${recommendation.label}」；風險等級為「${riskProfile.band}」。本次以 ${periodLabel(latestQuarter)} 最新季資料、單季異常與 TTM 指標作為主要分析口徑，重點在於成長動能是否伴隨現金流與營運資金壓力。`,
      },
      {
        title: "二、營收與獲利趨勢",
        text: `${periodLabel(latestQuarter)} 單季營收為 ${api.money(latestQuarter.revenue)}，${api.comparisonText(latestQuarter.revenue, previousQuarter.revenue, "前一季")}；最新年度營收為 ${api.money(latestAnnual.revenue)}，${api.comparisonText(latestAnnual.revenue, previousAnnual.revenue, "去年")}。TTM 毛利率 ${api.pct(latestTtm.grossMargin)}、營業利益率 ${api.pct(latestTtm.operatingMargin)}、稅後淨利率 ${api.pct(latestTtm.netMargin)}，需觀察成長是否能轉化為穩定獲利。`,
      },
      {
        title: "三、現金流與盈餘品質",
        text: `最新 TTM 營業現金流為 ${api.money(latestTtm.operatingCashFlow)}，單季營業現金流為 ${api.money(latestQuarter.operatingCashFlow)}，獲利轉現金比率為 ${ratio(latestTtm.cfoToNetIncome)}。若淨利維持成長但現金流偏弱，代表盈餘品質與營運資金占用需優先檢視。`,
      },
      {
        title: "四、資產負債與償債能力",
        text: `${periodLabel(latestQuarter)} 流動比率 ${ratio(latestQuarter.currentRatio)}、速動比率 ${ratio(latestQuarter.quickRatio)}、負債比率 ${api.pct(latestQuarter.debtRatio)}、短期借款 / 流動負債 ${api.pct(latestQuarter.shortDebtToCurrentLiabilities)}。此區重點在短期流動性、負債增加速度與財務槓桿是否持續升高。`,
      },
      {
        title: "五、營運資金變化",
        text: `${periodLabel(latestQuarter)} 應收帳款 / 營收為 ${api.pct(latestQuarter.arToRevenue)}，存貨 / 營收為 ${api.pct(latestQuarter.inventoryToRevenue)}，應收加存貨 / 營收為 ${api.pct(latestQuarter.workingCapitalLoad)}；應收帳款週轉天數 ${days(latestQuarter.dso)}、存貨週轉天數 ${days(latestQuarter.inventoryDays)}。若營運資金占用升高，將壓縮自由現金流與短期資金彈性。`,
      },
      {
        title: "六、異常訊號摘要",
        text: `${keyAlerts || "目前未偵測重大季度異常"}。異常訊號應搭配單季、季累計、TTM 與年度趨勢交叉檢視，避免只看單一期間造成誤判。`,
      },
      {
        title: "七、後續觀察重點",
        text: `${observationText}。`,
      },
    ];
  }

  api.analyzeCompany = function analyzeCompanyWithSummaryOverrides(company) {
    const result = originalAnalyzeCompany(company);
    const recommendation = patchRecommendation(result.recommendation);
    const alerts = patchAlerts(result.alerts);
    const patched = { ...result, recommendation, alerts };
    patched.summarySections =
      result.basis === "quarterly"
        ? buildQuarterlySections(company, patched)
        : buildAnnualSections(company, patched);
    return patched;
  };
})();