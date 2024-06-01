CREATE DATABASE  IF NOT EXISTS `mcm_master` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mcm_master`;
-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: mcm-prod.chwkfp078t9a.eu-west-3.rds.amazonaws.com    Database: mcm_master
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `speciality_lookup`
--

DROP TABLE IF EXISTS `speciality_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speciality_lookup` (
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speciality_lookup`
--

LOCK TABLES `speciality_lookup` WRITE;
/*!40000 ALTER TABLE `speciality_lookup` DISABLE KEYS */;
INSERT INTO `speciality_lookup` VALUES ('Anatomie pathologique'),('Anesthésie - réanimation'),('Anesthésie - réanimation pédiatrique'),('Biochimie'),('Cardiologie'),('Chirurgie cardiaque'),('Chirurgie générale'),('Chirurgie maxillo-faciale'),('Chirurgie neurologique'),('Chirurgie orthopédique et traumatologie'),('Chirurgie pédiatrique'),('Chirurgie plastique esthétique et de brûlologie'),('Chirurgie thoracique'),('Chirurgie urologique'),('Chirurgie vasculaire'),('Complément alimentaire'),('Dentiste'),('Dermatologie et vénéréologie'),('Endocrinologie - diabétologie'),('Épidémiologie et médecine préventive'),('Gynécologie - obstétrique'),('Hématologie'),('Hémobiologie et transfusion sanguine'),('Hépato-gastro-entérologie'),('Histo-embryologie et génétiques cliniques'),('Imagerie médicale et radiologie'),('Immunologie'),('Infectiologie'),('Médecine du sport'),('Médecine du travail'),('Médecine générale'),('Médecine interne'),('Médecine légale'),('Médecine nucléaire et imagerie moléculaire'),('Médecine physique et réadaptation'),('Microbiologie'),('Néphrologie'),('Neurologie'),('Neurophysiologie clinique et exploration fonctionnelle du système nerveux'),('Neuropsychiatry'),('Nutrition humaine et diététique'),('O R L'),('Oncologie médicale'),('Ophtalmologie'),('ORL'),('Parasitologie - Mycologie'),('Pédiatrie'),('Pédopsychiatrie'),('Pharmacologie clinique'),('Physiologie clinique et exploration fonctionnelle métabolique et nutrition'),('Pneumo-phtisiologie'),('Psychiatrie'),('Radiothérapie oncologie'),('Réanimation médicale'),('Rhumatologie');
/*!40000 ALTER TABLE `speciality_lookup` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-23  6:57:57
