-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "relatedEntityId" INTEGER;

-- CreateTable
CREATE TABLE "RelatedEntity" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "RelatedEntity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_relatedEntityId_fkey" FOREIGN KEY ("relatedEntityId") REFERENCES "RelatedEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
