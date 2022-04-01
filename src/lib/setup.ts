process.env.NODE_ENV ??= "development";

require("@sapphire/plugin-logger/register");
require("#util/sanitizer/init");
import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework";
import { inspect } from "util";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

inspect.defaultOptions.depth = 1;
