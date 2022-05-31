-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "owner_id" INTEGER NOT NULL,
    "money_amount" TEXT NOT NULL DEFAULT E'0',
    "token_amount" TEXT NOT NULL DEFAULT E'0',

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("owner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_guild_id_user_id_key" ON "members"("guild_id", "user_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
