(function () {
  const helpByMetric = {
    流動比率: "流動資產 / 流動負債。用來看一年內可動用資產是否足以覆蓋短期負債；低於 1 通常代表短期資金壓力較高。",
    速動比率: "（流動資產 - 存貨）/ 流動負債。排除較不易快速變現的存貨，觀察更保守的短期償債能力。",
    負債比率: "總負債 / 總資產。衡量財務槓桿與資本結構壓力；越高代表資產中由負債支撐的比例越高。",
    毛利率: "毛利 / 營收。觀察產品報價、成本控制與產品組合品質；下降時要追蹤成本與價格壓力。",
    營業利益率: "營業利益 / 營收。觀察本業獲利能力，較不受業外收入與一次性項目影響。",
    稅後淨利率: "稅後淨利 / 營收。看每一元營收最後留下多少淨利，會受到本業、業外、稅費與一次性因素影響。",
    ROA: "稅後淨利 / 總資產。衡量公司使用全部資產創造獲利的效率。",
    ROE: "稅後淨利 / 股東權益。衡量股東資本的報酬率；需搭配負債比率判斷是否靠槓桿推高。",
    利息保障倍數: "營業利益 / 利息費用。衡量本業獲利覆蓋利息支出的能力；倍數越低，利率與獲利波動風險越高。",
    "營業現金流 / 負債": "營業現金流 / 總負債。看現金流對負債的支撐度；為負時代表營運本身沒有產生現金支撐。",
    "應收帳款 / 營收": "應收帳款 / 營收。觀察收款壓力與買方信用條件；比率升高可能代表營收尚未有效轉成現金。",
    "存貨 / 營收": "存貨 / 營收。觀察備貨、庫存去化與跌價風險；比率升高時要追蹤庫齡與訂單覆蓋。",
    "應收 + 存貨 / 營收": "（應收帳款 + 存貨）/ 營收。衡量營收被營運資金占用的程度；越高越可能壓縮自由現金流。",
    "短期借款 / 流動負債": "短期借款 / 流動負債。觀察短債集中度與到期壓力；比率高時需確認展延與資金來源。",
    應收帳款週轉天數: "應收帳款 / 營收 × 期間天數。估算平均收款天數；天數拉長代表回款速度變慢。",
    存貨週轉天數: "存貨 / 銷貨成本 × 期間天數。估算平均存貨去化天數；天數拉長代表庫存占用時間變長。",
  };

  function metricName(strong) {
    return Array.from(strong.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent)
      .join("")
      .trim();
  }

  function decorateRatios() {
    document.querySelectorAll("#ratioTable td[data-label='指標'] strong").forEach((strong) => {
      if (strong.querySelector(".metric-help")) return;

      const name = metricName(strong) || strong.textContent.trim();
      const help = helpByMetric[name] || "此指標用於輔助判斷財務結構、獲利品質與營運資金變化。";
      const trigger = document.createElement("span");
      trigger.className = "metric-help";
      trigger.tabIndex = 0;
      trigger.setAttribute("aria-label", help);
      trigger.dataset.tooltip = help;
      trigger.textContent = "i";

      strong.classList.add("metric-name");
      strong.append(" ", trigger);
    });
  }

  function start() {
    const table = document.querySelector("#ratioTable");
    if (!table) return;

    decorateRatios();
    new MutationObserver(decorateRatios).observe(table, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
