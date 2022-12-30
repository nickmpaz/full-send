#!/usr/bin/env node

import { Command } from "commander";
import {
  commandLineDescription,
  commandLineName,
  commandLineVersion,
} from "./definitions/constants";
import { restClient } from "./rest-client";

const program = new Command();

program
  .name(commandLineName)
  .description(commandLineDescription)
  .version(commandLineVersion)
  .action(async () => {
    restClient.run();
  });

program.parse();
