<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200630120214 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE hobbies_country');
        $this->addSql('ALTER TABLE hobbies ADD name VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_38CA341D5E237E06 ON hobbies (name)');
        $this->addSql('ALTER TABLE user ADD hobbies VARCHAR(180) NOT NULL, CHANGE roles roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\'');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64938CA341D ON user (hobbies)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE hobbies_country (hobbies_id INT NOT NULL, country_id INT NOT NULL, INDEX IDX_BD8B4335B2242D72 (hobbies_id), INDEX IDX_BD8B4335F92F3E70 (country_id), PRIMARY KEY(hobbies_id, country_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE hobbies_country ADD CONSTRAINT FK_BD8B4335B2242D72 FOREIGN KEY (hobbies_id) REFERENCES hobbies (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE hobbies_country ADD CONSTRAINT FK_BD8B4335F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE CASCADE');
        $this->addSql('DROP INDEX UNIQ_38CA341D5E237E06 ON hobbies');
        $this->addSql('ALTER TABLE hobbies DROP name');
        $this->addSql('DROP INDEX UNIQ_8D93D64938CA341D ON user');
        $this->addSql('ALTER TABLE user DROP hobbies, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
