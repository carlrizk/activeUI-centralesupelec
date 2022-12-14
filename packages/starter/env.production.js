window.env = {
  contentServerVersion: "6.0.0-SNAPSHOT",
  contentServerUrl: "https://activepivot-ranch.activeviam.com:5999",
  // WARNING: Changing the keys of activePivotServers will break previously saved widgets and dashboards.
  // If you must do it, then you also need to update each one's serverKey attribute on your content server.
  activePivotServers: {
    // You can connect to as many servers as needed.
    // In practice most projects only need one.
    "Ranch 6.0": {
      url: "https://activepivot-ranch.activeviam.com:5999",
      version: "6.0.0-SNAPSHOT",
    },
    "Ranch 5.11": {
      url: "https://activepivot-ranch.activeviam.com:5110",
      version: "5.11.2-SNAPSHOT",
    },
    "Ranch 5.9": {
      url: "https://activepivot-ranch.activeviam.com:5900",
      version: "5.9.4",
    },
  },
};
