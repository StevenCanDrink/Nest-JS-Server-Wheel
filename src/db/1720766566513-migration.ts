import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720766566513 implements MigrationInterface {
    name = 'Migration1720766566513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('USER'), "point" integer NOT NULL DEFAULT (0), "turn" integer NOT NULL DEFAULT (0), "privilege" integer NOT NULL DEFAULT (1), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
