import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleTable1649659635643 implements MigrationInterface {
    name = 'RoleTable1649659635643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(64) NOT NULL, \`short_description\` varchar(64) NOT NULL, \`long_description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
