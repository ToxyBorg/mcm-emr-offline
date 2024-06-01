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
-- Table structure for table `visit_medicament`
--

DROP TABLE IF EXISTS `visit_medicament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_medicament` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `medicament` varchar(255) NOT NULL,
  `quantity` int DEFAULT NULL,
  `dosage` varchar(255) DEFAULT NULL,
  `note` text,
  `date` date DEFAULT NULL,
  `form` varchar(255) NOT NULL,
  `compact` varchar(255) NOT NULL,
  `direction` varchar(255) NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `doctor` varchar(255) DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  `visit_id` bigint DEFAULT NULL,
  `prescription_id` bigint DEFAULT NULL,
  `sponsored` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `FK_visit_medicament_prescription` (`prescription_id`),
  CONSTRAINT `FK_visit_medicament_prescription` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_medicament`
--

LOCK TABLES `visit_medicament` WRITE;
/*!40000 ALTER TABLE `visit_medicament` DISABLE KEYS */;
INSERT INTO `visit_medicament` VALUES (6,'tarek','2022-09-18 20:03:08','tarek','2022-09-18 20:03:08',0,'FRAXAL',1,'10 MG','',NULL,'Cp.','','1/2 /J','01 Mois','ACTIVE',NULL,NULL,NULL,2,_binary ''),(7,'tarek','2022-09-18 20:05:53','tarek','2022-09-18 20:05:53',0,'SAPBUFEN',1,'200 mg','',NULL,'Cp.','','1/J','10 J','ACTIVE',NULL,NULL,NULL,3,_binary ''),(8,'tarek','2022-09-18 20:05:53','tarek','2022-09-18 20:05:53',0,'PARACÉTAMOL',1,'1000 MG','',NULL,'Cp.','','1/J','10 J','ACTIVE',NULL,NULL,NULL,3,_binary '\0'),(9,'tarek','2022-09-18 20:17:01','tarek','2022-09-18 20:17:01',0,'ROSUVASTOR',1,'10 MG','',NULL,'Cp.','','1/J','01 Mois','ACTIVE',NULL,NULL,NULL,4,_binary ''),(10,'tarek','2022-09-18 20:26:31','tarek','2022-09-18 20:26:31',0,'SPASCOL',1,'100 mg','',NULL,'Gel.','','2x/j','','ACTIVE',NULL,NULL,NULL,5,_binary ''),(11,'tarek','2022-09-18 20:26:31','tarek','2022-09-18 20:26:31',0,'PINAVERIUM',1,'100 MG','',NULL,'Cp.','','2x/j','','ACTIVE',NULL,NULL,NULL,5,_binary ''),(12,'tarek','2022-09-18 20:26:31','tarek','2022-09-18 20:26:31',0,'PERIDIUM',1,'10 MG','',NULL,'Cp.','','2x/j','','ACTIVE',NULL,NULL,NULL,5,_binary ''),(13,'tarek','2022-09-18 20:29:34','tarek','2022-09-18 20:29:34',0,'NASALIX',1,'55 µG','',NULL,'Susp.Nas.','','2/J','','ACTIVE',NULL,NULL,NULL,6,_binary ''),(14,'tarek','2022-09-18 20:29:34','tarek','2022-09-18 20:29:34',0,'DESLOR',1,'0.5 MG/ ML','',NULL,'Sirop','','1/J','','ACTIVE',NULL,NULL,NULL,6,_binary ''),(20,'tarek','2022-09-21 21:32:54','tarek','2022-09-21 21:32:54',0,'PARAMOL',1,'1 G','',NULL,'Cp.','','3x/j','','ACTIVE',NULL,NULL,NULL,7,_binary '\0'),(21,'tarek','2022-09-21 21:32:54','tarek','2022-09-21 21:32:54',0,'VITAMINE D3 B.O.N',1,'200 000 UI/ ML','',NULL,'Inj.','','1x/j','','ACTIVE',NULL,NULL,NULL,7,_binary '\0'),(22,'tarek','2022-09-21 21:32:54','tarek','2022-09-21 21:32:54',0,'FENAQUENE',1,'50 gm','',NULL,'Cp.','Boîte(s)','2x/j','','ACTIVE',NULL,NULL,NULL,7,_binary ''),(23,'tarek','2022-09-21 21:34:03','tarek','2022-09-21 21:34:03',0,'SPASMOL',1,'80 MG','',NULL,'Cp.','Boîte(s)','2x/j','','ACTIVE',NULL,NULL,NULL,8,_binary '\0'),(24,'tarek','2022-09-21 21:34:03','tarek','2022-09-21 21:34:03',0,'GLYCERINE',1,'1.8 G','',NULL,'Suppo.','Boîte(s)','1x/j','','ACTIVE',NULL,NULL,NULL,8,_binary '');
/*!40000 ALTER TABLE `visit_medicament` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:55:03
