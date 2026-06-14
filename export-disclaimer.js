(function () {
  const fullDisclaimer = [
    "本工具依公開財報資料、使用者匯入資料及系統規則產生財務比率、異常偵測、風險分數與分析摘要。相關內容僅供研究、教學、內部討論或初步分析參考，不構成任何投資建議、買賣建議。",
    "",
    "本工具不保證資料即時性、完整性、正確性或分析結果之適用性。使用者應自行核對公開資訊觀測站、公司財報、會計師意見、重大訊息及其他原始資料，並依自身目的、風險承受能力與專業判斷作成決策。",
    "",
    "任何因使用本工具內容所產生之投資、交易或其他決策及其結果，均由使用者自行承擔。本工具提供者不對任何直接或間接損失負責。",
  ].join("\n");

  function appendDisclaimer(report) {
    if (report.includes("七、免責聲明") || report.includes(fullDisclaimer)) {
      return report;
    }

    return [report, "", "七、免責聲明", fullDisclaimer].join("\n");
  }

  const originalBuildExportReport =
    typeof buildExportReport === "function"
      ? buildExportReport
      : typeof window !== "undefined" && typeof window.buildExportReport === "function"
        ? window.buildExportReport
        : null;

  if (originalBuildExportReport) {
    const wrappedBuildExportReport = function (...args) {
      return appendDisclaimer(originalBuildExportReport.apply(this, args));
    };

    try {
      buildExportReport = wrappedBuildExportReport;
    } catch (error) {
      if (typeof window !== "undefined") {
        window.buildExportReport = wrappedBuildExportReport;
      }
    }
  }
})();
