import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework";
import { inspect } from "util";

require("@sapphire/plugin-logger/register");

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

inspect.defaultOptions.depth = 1;
