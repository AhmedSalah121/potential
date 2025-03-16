-- CreateTable
CREATE TABLE "DebtOverview" (
    "id" SERIAL NOT NULL,
    "total_debt_usd" BIGINT NOT NULL,
    "external_debt_usd" BIGINT NOT NULL,
    "domestic_debt_usd" BIGINT NOT NULL,
    "debt_to_gdp" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebtOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebtHistory" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "total_debt_usd" BIGINT NOT NULL,
    "debt_to_gdp" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebtHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebtSources" (
    "id" SERIAL NOT NULL,
    "creditor_name" VARCHAR(100) NOT NULL,
    "amount_usd" BIGINT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebtSources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Population" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "population" BIGINT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Population_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DebtHistory_year_key" ON "DebtHistory"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Population_year_key" ON "Population"("year");
