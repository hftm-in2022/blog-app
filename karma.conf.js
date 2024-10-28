module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("karma-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    reporters: ["progress", "kjhtml", "html"],
    htmlReporter: {
      outputDir: "reports", // Verzeichnis, in dem die HTML-Dateien gespeichert werden
      reportName: "test-summary", // Name der HTML-Datei
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./reports/coverage"),
      subdir: ".",
      reporters: [
        { type: "html" }, // Generiert HTML-Bericht für die Coverage
        { type: "text-summary" }, // Konsolen-Zusammenfassung
      ],
    },
    singleRun: true,
    restartOnFileChange: true,
  });
};
