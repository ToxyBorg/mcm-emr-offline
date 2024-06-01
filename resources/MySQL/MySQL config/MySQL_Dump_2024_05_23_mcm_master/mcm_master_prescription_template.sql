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
-- Table structure for table `prescription_template`
--

DROP TABLE IF EXISTS `prescription_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_template` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sponsored` bit(1) NOT NULL DEFAULT b'0',
  `prescription_id` bigint DEFAULT NULL,
  `lab_id` bigint DEFAULT NULL,
  `specialities` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pt_name_unique` (`name`),
  KEY `FK_prescription_template_prescription` (`prescription_id`),
  CONSTRAINT `FK_prescription_template_prescription` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_template`
--

LOCK TABLES `prescription_template` WRITE;
/*!40000 ALTER TABLE `prescription_template` DISABLE KEYS */;
INSERT INTO `prescription_template` VALUES (2,'tarek','2022-09-18 19:55:05','tarek','2022-09-18 19:55:05',0,'Hypertrophie bénigne de la prostate',_binary '',2,NULL,NULL),(3,'tarek','2022-09-18 19:59:00','tarek','2022-09-18 19:59:00',0,'Boufée de chaleur de la femme ménopausée',_binary '',3,NULL,NULL),(4,'tarek','2022-09-18 20:17:01','tarek','2022-09-18 20:17:01',0,'Hypercholestérolémie',_binary '',4,NULL,NULL),(5,'tarek','2022-09-18 20:26:31','tarek','2022-09-18 20:26:31',0,'Intoxication alimentaire avec vomissements ',_binary '',5,NULL,NULL),(6,'tarek','2022-09-18 20:29:34','tarek','2022-09-18 20:29:34',0,'Rhinite allergique',_binary '',6,NULL,NULL),(7,'tarek','2022-09-21 21:23:07','tarek','2022-09-21 21:23:07',0,'Arthrose débutante ',_binary '',7,NULL,NULL),(8,'tarek','2022-09-21 21:24:49','tarek','2022-09-21 21:24:49',0,'Constipation de la colopathie fonctionnelle',_binary '',8,NULL,NULL);
/*!40000 ALTER TABLE `prescription_template` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:58:39
