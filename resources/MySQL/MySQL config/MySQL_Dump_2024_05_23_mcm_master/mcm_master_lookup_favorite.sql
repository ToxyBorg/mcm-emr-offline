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
-- Table structure for table `lookup_favorite`
--

DROP TABLE IF EXISTS `lookup_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lookup_favorite` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `lookup_name` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_favorite`
--

LOCK TABLES `lookup_favorite` WRITE;
/*!40000 ALTER TABLE `lookup_favorite` DISABLE KEYS */;
INSERT INTO `lookup_favorite` VALUES (3,'tarek','2023-07-21 23:07:56','tarek','2023-07-21 23:07:56',0,'VACCINE','{\"value\":\"Anti-hépatite B (HBV)\",\"range\":\"BIRTH\"}'),(4,'tarek','2023-07-21 23:08:02','tarek','2023-07-21 23:08:02',0,'VACCINE','{\"value\":\"BCG\",\"range\":\"BIRTH\"}'),(5,'tarek','2023-07-21 23:08:13','tarek','2023-07-21 23:08:13',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique, anti coquelucheux (DTCh)\",\"range\":\"TWO_MONTHS\"}'),(6,'tarek','2023-07-21 23:08:18','tarek','2023-07-21 23:08:18',0,'VACCINE','{\"value\":\"Anti-haemophilusinfluenzae B (Hib)\",\"range\":\"TWO_MONTHS\"}'),(7,'tarek','2023-07-21 23:08:23','tarek','2023-07-21 23:08:23',0,'VACCINE','{\"value\":\"Anti-hépatite B (HBV)\",\"range\":\"TWO_MONTHS\"}'),(9,'tarek','2023-07-21 23:08:35','tarek','2023-07-21 23:08:35',0,'VACCINE','{\"value\":\"Anti-poliomyélitique injectable (VPI)\",\"range\":\"THREE_MONTHS\"}'),(10,'tarek','2023-07-21 23:08:41','tarek','2023-07-21 23:08:41',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique, anti coquelucheux (DTCh)\",\"range\":\"FOUR_MONTHS\"}'),(11,'tarek','2023-07-21 23:08:47','tarek','2023-07-21 23:08:47',0,'VACCINE','{\"value\":\"Anti-haemophilusinfluenzae B (Hib)\",\"range\":\"FOUR_MONTHS\"}'),(12,'tarek','2023-07-21 23:08:53','tarek','2023-07-21 23:08:53',0,'VACCINE','{\"value\":\"Anti-hépatite B (HBV)\",\"range\":\"FOUR_MONTHS\"}'),(14,'tarek','2023-07-21 23:09:04','tarek','2023-07-21 23:09:04',0,'VACCINE','{\"value\":\"Anti-rougeoleux, anti-ourlien, anti-rubéoleux (ROR)\",\"range\":\"ELEVEN_MONTHS\"}'),(15,'tarek','2023-07-21 23:09:10','tarek','2023-07-21 23:09:10',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique, anti coquelucheux (DTCh)\",\"range\":\"TWELVE_MONTHS\"}'),(16,'tarek','2023-07-21 23:09:40','tarek','2023-07-21 23:09:40',0,'VACCINE','{\"value\":\"Anti-haemophilusinfluenzae B (HBV)\",\"range\":\"TWELVE_MONTHS\"}'),(17,'tarek','2023-07-21 23:09:46','tarek','2023-07-21 23:09:46',0,'VACCINE','{\"value\":\"Anti-haemophilusinfluenzae B (Hib)\",\"range\":\"TWELVE_MONTHS\"}'),(18,'tarek','2023-07-21 23:09:58','tarek','2023-07-21 23:09:58',0,'VACCINE','{\"value\":\"Anti-rougeoleux, anti-ourlien, anti-rubéoleux (ROR)\",\"range\":\"EIGHTEEN_MONTHS\"}'),(20,'tarek','2023-07-21 23:10:14','tarek','2023-07-21 23:10:14',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique, anti coquelucheux (DTC enfant)\",\"range\":\"SIX_YEARS\"}'),(21,'tarek','2023-07-21 23:11:07','tarek','2023-07-21 23:11:07',0,'VACCINE','{\"value\":\"Anti-poliomyélitique injectable (VPI)\",\"range\":\"SIX_YEARS\"}'),(22,'tarek','2023-07-21 23:11:36','tarek','2023-07-21 23:11:36',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique (DT)\",\"range\":\"BETWEEN_11_AND_13_YEARS\"}'),(23,'tarek','2023-07-21 23:11:47','tarek','2023-07-21 23:11:47',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique (DT)\",\"range\":\"BETWEEN_16_AND_18_YEARS\"}'),(24,'tarek','2023-07-21 23:11:57','tarek','2023-07-21 23:11:57',0,'VACCINE','{\"value\":\"Anti-diphtérique, anti-tétanique (DT)\",\"range\":\"EACH_10_YEARS_AFTER_18\"}'),(25,'tarek','2023-09-23 23:12:38','tarek','2023-09-23 23:12:38',0,'COMPLEMENTARY_EXAM','{\"value\":\"FNS\",\"type\":\"SEROLOGY\"}'),(26,'tarek','2023-09-23 23:12:58','tarek','2023-09-23 23:12:58',0,'COMPLEMENTARY_EXAM','{\"value\":\"Groupage sanguin\",\"type\":\"SEROLOGY\"}'),(27,'tarek','2023-09-23 23:13:38','tarek','2023-09-23 23:13:38',0,'COMPLEMENTARY_EXAM','{\"value\":\"TP-TCK\",\"type\":\"SEROLOGY\"}'),(28,'tarek','2023-09-23 23:14:07','tarek','2023-09-23 23:14:07',0,'COMPLEMENTARY_EXAM','{\"value\":\"Taux de Fibrinogène\",\"type\":\"SEROLOGY\"}'),(29,'tarek','2023-09-23 23:14:27','tarek','2023-09-23 23:14:27',0,'COMPLEMENTARY_EXAM','{\"value\":\"Ferritinémie\",\"type\":\"SEROLOGY\"}'),(30,'tarek','2023-09-23 23:14:41','tarek','2023-09-23 23:14:41',0,'COMPLEMENTARY_EXAM','{\"value\":\"Fer sérique\",\"type\":\"SEROLOGY\"}'),(31,'tarek','2023-09-23 23:14:56','tarek','2023-09-23 23:14:56',0,'COMPLEMENTARY_EXAM','{\"value\":\"Glycémie à jeun\",\"type\":\"SEROLOGY\"}'),(32,'tarek','2023-09-23 23:15:05','tarek','2023-09-23 23:15:05',0,'COMPLEMENTARY_EXAM','{\"value\":\"HBA1C\",\"type\":\"SEROLOGY\"}'),(33,'tarek','2023-09-23 23:15:24','tarek','2023-09-23 23:15:24',0,'COMPLEMENTARY_EXAM','{\"value\":\"SGOT (ASAT)\",\"type\":\"SEROLOGY\"}'),(34,'tarek','2023-09-23 23:16:11','tarek','2023-09-23 23:16:11',0,'COMPLEMENTARY_EXAM','{\"value\":\"Gamma GT - Phosphatases Alcalines\",\"type\":\"SEROLOGY\"}'),(35,'tarek','2023-09-23 23:17:04','tarek','2023-09-23 23:17:04',0,'COMPLEMENTARY_EXAM','{\"value\":\"Bilirubine totale\",\"type\":\"SEROLOGY\"}'),(36,'tarek','2023-09-23 23:17:39','tarek','2023-09-23 23:17:39',0,'COMPLEMENTARY_EXAM','{\"value\":\"Bilirubine\\tConjuguée\",\"type\":\"SEROLOGY\"}'),(37,'tarek','2023-09-23 23:18:05','tarek','2023-09-23 23:18:05',0,'COMPLEMENTARY_EXAM','{\"value\":\"Bilirubine Non Conjuguée\",\"type\":\"SEROLOGY\"}'),(38,'tarek','2023-09-23 23:19:12','tarek','2023-09-23 23:19:12',0,'COMPLEMENTARY_EXAM','{\"value\":\"Urée - Créatininémie\",\"type\":\"SEROLOGY\"}'),(39,'tarek','2023-09-23 23:19:36','tarek','2023-09-23 23:19:36',0,'COMPLEMENTARY_EXAM','{\"value\":\"Cholestérol total\",\"type\":\"SEROLOGY\"}'),(40,'tarek','2023-09-23 23:19:49','tarek','2023-09-23 23:19:49',0,'COMPLEMENTARY_EXAM','{\"value\":\"HDL cholestérol\",\"type\":\"SEROLOGY\"}'),(41,'tarek','2023-09-23 23:19:56','tarek','2023-09-23 23:19:56',0,'COMPLEMENTARY_EXAM','{\"value\":\"LDL cholestérol\",\"type\":\"SEROLOGY\"}'),(42,'tarek','2023-09-23 23:20:11','tarek','2023-09-23 23:20:11',0,'COMPLEMENTARY_EXAM','{\"value\":\"Triglycérides\",\"type\":\"SEROLOGY\"}'),(43,'tarek','2023-09-23 23:20:36','tarek','2023-09-23 23:20:36',0,'COMPLEMENTARY_EXAM','{\"value\":\"Kaliémie - Natrémie\",\"type\":\"SEROLOGY\"}'),(44,'tarek','2023-09-23 23:21:09','tarek','2023-09-23 23:21:09',0,'COMPLEMENTARY_EXAM','{\"value\":\"Calcémie - Phosphorémie\",\"type\":\"SEROLOGY\"}'),(45,'tarek','2023-09-23 23:21:36','tarek','2023-09-23 23:21:36',0,'COMPLEMENTARY_EXAM','{\"value\":\"Protidémie\",\"type\":\"SEROLOGY\"}'),(46,'tarek','2023-09-23 23:22:04','tarek','2023-09-23 23:22:04',0,'COMPLEMENTARY_EXAM','{\"value\":\"Albuminémie\",\"type\":\"SEROLOGY\"}'),(47,'tarek','2023-09-23 23:22:42','tarek','2023-09-23 23:22:42',0,'COMPLEMENTARY_EXAM','{\"value\":\"Acide urique\",\"type\":\"SEROLOGY\"}'),(48,'tarek','2023-09-23 23:22:51','tarek','2023-09-23 23:22:51',0,'COMPLEMENTARY_EXAM','{\"value\":\"CRP\",\"type\":\"SEROLOGY\"}'),(49,'tarek','2023-09-23 23:22:58','tarek','2023-09-23 23:22:58',0,'COMPLEMENTARY_EXAM','{\"value\":\"VS\",\"type\":\"SEROLOGY\"}'),(50,'tarek','2023-09-23 23:23:06','tarek','2023-09-23 23:23:06',0,'COMPLEMENTARY_EXAM','{\"value\":\"TSH\",\"type\":\"SEROLOGY\"}'),(51,'tarek','2023-09-23 23:23:44','tarek','2023-09-23 23:23:44',0,'COMPLEMENTARY_EXAM','{\"value\":\"FT3 - FT4\",\"type\":\"SEROLOGY\"}'),(52,'tarek','2023-09-23 23:24:07','tarek','2023-09-23 23:24:07',0,'COMPLEMENTARY_EXAM','{\"value\":\"HCG (ß HCG)\",\"type\":\"SEROLOGY\"}'),(53,'tarek','2023-09-23 23:24:30','tarek','2023-09-23 23:24:30',0,'COMPLEMENTARY_EXAM','{\"value\":\"FSH-LH\",\"type\":\"SEROLOGY\"}'),(54,'tarek','2023-09-23 23:25:11','tarek','2023-09-23 23:25:11',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie HBS (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(55,'tarek','2023-09-23 23:25:25','tarek','2023-09-23 23:25:25',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie HCV (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(56,'tarek','2023-09-23 23:25:39','tarek','2023-09-23 23:25:39',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie HIV (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(57,'tarek','2023-09-23 23:25:52','tarek','2023-09-23 23:25:52',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie CMV (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(58,'tarek','2023-09-23 23:26:05','tarek','2023-09-23 23:26:05',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie Rubéole (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(59,'tarek','2023-09-23 23:26:40','tarek','2023-09-23 23:26:40',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie Toxoplasmose (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(60,'tarek','2023-09-23 23:26:51','tarek','2023-09-23 23:26:51',0,'COMPLEMENTARY_EXAM','{\"value\":\"Sérologie Syphilis (IgG-IgM)\",\"type\":\"SEROLOGY\"}'),(61,'tarek','2023-09-23 23:27:12','tarek','2023-09-23 23:27:12',0,'COMPLEMENTARY_EXAM','{\"value\":\"ECBU\",\"type\":\"SEROLOGY\"}'),(62,'tarek','2023-09-23 23:27:19','tarek','2023-09-23 23:27:19',0,'COMPLEMENTARY_EXAM','{\"value\":\"Chimie des urines\",\"type\":\"SEROLOGY\"}'),(63,'tarek','2023-09-23 23:27:50','tarek','2023-09-23 23:27:50',0,'COMPLEMENTARY_EXAM','{\"value\":\"Protéinurie\",\"type\":\"SEROLOGY\"}');
/*!40000 ALTER TABLE `lookup_favorite` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:57:34
