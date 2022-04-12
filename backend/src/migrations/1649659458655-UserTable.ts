import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1649659458655 implements MigrationInterface {
    name = 'UserTable1649659458655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tn\` int NOT NULL, \`id_tn\` int NOT NULL, \`phone\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`role_id\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
