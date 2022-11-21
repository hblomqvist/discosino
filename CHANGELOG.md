# Changelog

## 0.1.0 (2022-11-21)


### Features

* add production `idHints` for commands ([b1b0840](https://github.com/hblomqvist/discosino/commit/b1b0840a82254d27a286b3d806236ba590c7e730))
* **client:** log to console on login ([6815ae5](https://github.com/hblomqvist/discosino/commit/6815ae5e3822822b65f20be2b0a72f381ca02936))
* **client:** print pretty banner + version on startup ([64d0f14](https://github.com/hblomqvist/discosino/commit/64d0f14e7e29b3db49ef805615114f223a8c18a7))
* **commands:** re-register and use permissions v2 ([d690013](https://github.com/hblomqvist/discosino/commit/d690013bf51ecf89d99db487acd3133fbf333f9c))
* **commands:** use global registration in development ([be7d973](https://github.com/hblomqvist/discosino/commit/be7d9735231a350413ee62620078043f26340d12))
* **database:** avoid creating unnecessary accounts ([0868d12](https://github.com/hblomqvist/discosino/commit/0868d12a1e79152ca1108db0c96ea46099a549ab))
* **database:** initial setup ([5ad5817](https://github.com/hblomqvist/discosino/commit/5ad58175b2ce876afd452db28c0c85250c9f4239))
* **economy:** add balance command ([6329e7e](https://github.com/hblomqvist/discosino/commit/6329e7ed8ff90a0bfce5b4d181d67289f825556d))
* **economy:** improve formatting of funds ([d2fc809](https://github.com/hblomqvist/discosino/commit/d2fc8095feb6d387993cd878f0d34e0c13c307c9))
* **economy:** use author instead of footer for balance embed ([35f4469](https://github.com/hblomqvist/discosino/commit/35f4469f7a83dfde9419480a1c00103fa4e36dfd))
* **economy:** use improved formatting of funds ([0716c0d](https://github.com/hblomqvist/discosino/commit/0716c0dee11b760188d51b7afad7b1144af566d3))
* **env:** improve parsing of env vars ([394bc44](https://github.com/hblomqvist/discosino/commit/394bc441b3994527b092cfe98b040af19e95777b))
* **eval:** add eval command ([#1](https://github.com/hblomqvist/discosino/issues/1)) ([a585760](https://github.com/hblomqvist/discosino/commit/a5857606707bd6564088fbb5e187b50aaa3b69f3))
* **eval:** improve console output and fix various bugs ([2df53e3](https://github.com/hblomqvist/discosino/commit/2df53e33053bc27b2aaa4898ddd07ecde3609ff4))
* **eval:** improve output and refactor ([1389070](https://github.com/hblomqvist/discosino/commit/138907029be5e2a8c3be8665a38ca2417fcd8fda))
* **eval:** lower the `printWidth` for prettified input ([d659f20](https://github.com/hblomqvist/discosino/commit/d659f20120533894f96e7080748435661050de65))
* **eval:** use modals for code input ([163a5c3](https://github.com/hblomqvist/discosino/commit/163a5c36b989248de01a5e8632efeafba31edf5e))
* **eval:** use quotes in output if type is string ([14c6d34](https://github.com/hblomqvist/discosino/commit/14c6d3463c77bec4db5c90140f2610f70862fe00))
* improve duration formatting ([19027b2](https://github.com/hblomqvist/discosino/commit/19027b2e42c907d71eaced5f9b89a2c487ee3a58))
* log command usage to debug console ([d8b4382](https://github.com/hblomqvist/discosino/commit/d8b43826763d83dd454137c15993cca6eea8aa5c))
* log database status on startup ([2ec3bbc](https://github.com/hblomqvist/discosino/commit/2ec3bbcb686e49766fa1f16bff0c59c0c966ba82))
* log to console before logging in ([4d8a4d9](https://github.com/hblomqvist/discosino/commit/4d8a4d924737501c45b2db6e830f42c4c8076152))
* new error handling ([a1a40ac](https://github.com/hblomqvist/discosino/commit/a1a40acf8320ae5f487d2a247d041d9218d8b8b8))
* **ping:** add ping command ([628d274](https://github.com/hblomqvist/discosino/commit/628d274b795c7364969057c24500af24665f3bab))
* **sanitizer:** improve secret detection ([4e3bdf7](https://github.com/hblomqvist/discosino/commit/4e3bdf734311dd46122029227e93511faa57e9a9))
* **util:** new `successEmbed` function for later use ([cc21be5](https://github.com/hblomqvist/discosino/commit/cc21be56739524cb17fdd11b192f41d39cdcebcc))


### Bug Fixes

* **client:** login using token from `ENV` object ([42ff60c](https://github.com/hblomqvist/discosino/commit/42ff60ca1cc00b2b4f6cc99fa4e40dafc79665c7))
* **commands:** update development `idHints` ([7a2f023](https://github.com/hblomqvist/discosino/commit/7a2f02391d161dd176f0b03320ee59e8192a5739))
* **config:** update colors and emojis ([18eef0f](https://github.com/hblomqvist/discosino/commit/18eef0f3233143417a2edbd3f15b7d23aff34554))
* **deps:** add `discord-api-types` as a dependency ([dcc3eb7](https://github.com/hblomqvist/discosino/commit/dcc3eb73a65abd475e039247854760a5df92322b))
* **deps:** update lockfile ([31f8711](https://github.com/hblomqvist/discosino/commit/31f8711362c26bdf38de665e6dade1b25106e379))
* **docker:** add essential build dependencies ([16a4f76](https://github.com/hblomqvist/discosino/commit/16a4f7690e351c31ead911904d6ba7ee0af5c506))
* edit `watch` script to support hot reloading inside docker ([09c4ec5](https://github.com/hblomqvist/discosino/commit/09c4ec5a4bc61c95e54e6138be34744c5f5def10))
* **embeds:** undefined description bug ([5537007](https://github.com/hblomqvist/discosino/commit/553700798cf93d8cca55796f06a3e27099681725))
* **env:** negate return value of `envIsDefined` ([c1afc3a](https://github.com/hblomqvist/discosino/commit/c1afc3a525bf67bb6e07946c1509233100dc35d7))
* **eval:** add missing dot ([a55a3cb](https://github.com/hblomqvist/discosino/commit/a55a3cb88910f708ba5130c81c99a4110266d873))
* **eval:** make sure type cannot be empty ([e5ead21](https://github.com/hblomqvist/discosino/commit/e5ead21ed1cf4a6fc711082d464a78fdb946c503))
* **eval:** set default timeout to 60 instead of 1 ([17d1f9c](https://github.com/hblomqvist/discosino/commit/17d1f9cc0f84775b72213a5631b10986a02eda0d))
* **eval:** update pastebin error message ([88aeede](https://github.com/hblomqvist/discosino/commit/88aeede33e0e97de23951def7c4b432e1c208c00))
* **husky:** postinstall script ([fb20f1e](https://github.com/hblomqvist/discosino/commit/fb20f1ec03364df742597c8b4e5f32717b4755a6))
* **ping:** add `CHANNEL` partial for DM channel ([613c169](https://github.com/hblomqvist/discosino/commit/613c16906d269966665669d76a021518848e9ee5))
* **sanitizer:** include database connection string ([2032414](https://github.com/hblomqvist/discosino/commit/203241409d39205cf29bd565893a9d8310090a5d))
* **sapphire:** workaround for bug ([7a05a7c](https://github.com/hblomqvist/discosino/commit/7a05a7cddb7e43a62793cdca2edd1d908abd1dee))
* set `NODE_ENV` to development if not defined ([ecc8446](https://github.com/hblomqvist/discosino/commit/ecc8446ea1cc8ae6c38875336a2f43993f75388a))
* **setup:** bump `COLUMNS` to 200 to be safe ([819ed2c](https://github.com/hblomqvist/discosino/commit/819ed2cefbdf1e7df5a664e19d306dc79b6bcef6))
* should work this time ([9dfc6c8](https://github.com/hblomqvist/discosino/commit/9dfc6c8edabe5227defbac427a32f10ab20b7300))
* skip lib check and update types ([b66a238](https://github.com/hblomqvist/discosino/commit/b66a23822a42f361dad52a900160be00a4f8fcc4))
* terminal colors and width ([1ef9084](https://github.com/hblomqvist/discosino/commit/1ef90846bf060ade15d19e22193e48feb3dd82ac))
* use correct root path ([6442125](https://github.com/hblomqvist/discosino/commit/644212541eb1d9e9bcb45acdea30d69bd85982ae))


### Reverts

* **commands:** undo the quick rename ([44e9317](https://github.com/hblomqvist/discosino/commit/44e93173a644da2152f48a7abfe5456f05088a1e))
* **husky:** use old install script ([7077684](https://github.com/hblomqvist/discosino/commit/707768453fd480bb55613d4f6a5108fa7d0c8390))
* **sapphire:** bug workaround is no longer needed ([933ec06](https://github.com/hblomqvist/discosino/commit/933ec06f2c8c7fd7fee0d3e240f578a636537dbf))


### Miscellaneous Chores

* release 0.1.0 ([6018080](https://github.com/hblomqvist/discosino/commit/60180800429e3b3ef1e73eb7ad7797d1237fea36))
