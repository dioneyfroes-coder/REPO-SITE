const fs = require("fs-extra");
const path = require("path");

module.exports = function () {
  return {
    name: "sync-backend-docs",
    async loadContent() {
      const src = path.join(__dirname, "../../docs-source");
      const dest = path.join(__dirname, "../../docs");

      await fs.emptyDir(dest);
      await fs.copy(src, dest);
    },
  };
};


