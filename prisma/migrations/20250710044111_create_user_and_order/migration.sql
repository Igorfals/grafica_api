-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Order" (
    "id_order" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "estimation_date" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "is_order" BOOLEAN NOT NULL DEFAULT true,
    "items" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id_order")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
