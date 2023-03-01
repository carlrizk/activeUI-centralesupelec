import _merge from "lodash/merge";

import {
  ExtensionModule,
  pluginWidgetPivotTable,
} from "@activeviam/activeui-sdk";
import { validateEnv, withSandboxClients } from "@activeviam/sandbox-clients";

import { plugins } from "./plugins";

/**
 * Throw an error in case env.js is invalid.
 * env.js is used by withSandboxClients.
 * You do not need it if you choose to opt out of withSandboxClients.
 */
validateEnv();

const extension: ExtensionModule = {
  activate: async (configuration) => {
    _merge(configuration.pluginRegistry, plugins);
    configuration.applicationName = "ActiveUI";
    configuration.initialDashboardPageState = {
      content: { "0": pluginWidgetPivotTable.initialState },
      layout: {
        children: [
          {
            leafKey: "0",
            size: 1,
          },
        ],
        direction: "row",
      },
    };
    configuration.higherOrderComponents = [withSandboxClients];
  },
};

export default extension;
