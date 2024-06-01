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
-- Table structure for table `gift_claim`
--

DROP TABLE IF EXISTS `gift_claim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gift_claim` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `tenant` varchar(255) NOT NULL,
  `tenant_id` bigint NOT NULL,
  `doctor` varchar(255) NOT NULL,
  `doctor_id` bigint NOT NULL,
  `badge` varchar(255) NOT NULL,
  `points` int DEFAULT '0',
  `status` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `gift_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_gift_claim_gift` (`gift_id`),
  CONSTRAINT `FK_gift_claim_gift` FOREIGN KEY (`gift_id`) REFERENCES `gift` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gift_claim`
--

LOCK TABLES `gift_claim` WRITE;
/*!40000 ALTER TABLE `gift_claim` DISABLE KEYS */;
INSERT INTO `gift_claim` VALUES (1,'tarek','2022-06-15 19:50:31','tarek','2022-06-15 19:54:21',2,'team',2,'Tarek Sahalia',4,'BRONZE',1000,'PENDING','2022-06-15 19:50:31',2),(2,'tarek','2022-06-15 19:51:52','tarek','2022-06-15 19:52:58',2,'team',2,'Tarek Sahalia',4,'BRONZE',1000,'REFUSED','2022-06-15 19:51:52',2),(3,'nasro','2022-06-15 20:53:26','tarek','2022-06-15 21:14:44',1,'team',2,'Naceredine Telaidjia',1,'PLATINUM',4000,'REFUSED','2022-06-15 20:53:27',4),(4,'nasro','2022-06-15 20:53:47','tarek','2022-06-15 21:14:33',1,'team',2,'Naceredine Telaidjia',1,'BRONZE',1000,'REFUSED','2022-06-15 20:53:47',2),(5,'nasro','2022-06-15 20:53:54','tarek','2022-06-15 21:14:12',1,'team',2,'Naceredine Telaidjia',1,'SILVER',2000,'VALIDATED','2022-06-15 20:53:55',5),(6,'nasro','2022-06-15 21:15:17','tarek','2022-06-15 21:15:37',1,'team',2,'Naceredine Telaidjia',1,'PLATINUM',4000,'VALIDATED','2022-06-15 21:15:18',4),(7,'nasro','2022-06-15 21:16:01',NULL,NULL,0,'team',2,'Naceredine Telaidjia',1,'BRONZE',1000,'PENDING','2022-06-15 21:16:02',2),(8,'nasro','2022-06-15 21:16:41',NULL,NULL,0,'team',2,'Naceredine Telaidjia',1,'SILVER',2000,'PENDING','2022-06-15 21:16:42',5),(9,'tarek','2022-06-18 18:01:53',NULL,NULL,0,'team',2,'Tarek Sahalia',4,'SILVER',2000,'PENDING','2022-06-18 18:01:54',5),(10,'tarek','2022-06-18 18:03:19',NULL,NULL,0,'team',2,'Tarek Sahalia',4,'GOLD',3000,'PENDING','2022-06-18 18:03:20',1),(11,'tarek','2022-06-18 18:03:31','tarek','2022-06-19 17:52:15',1,'team',2,'Tarek Sahalia',4,'GOLD',3000,'REFUSED','2022-06-18 18:03:32',3),(12,'raja','2022-06-24 16:14:34','tarek','2022-10-16 18:22:43',1,'team',2,'Raja Messaadi',7,'SILVER',2000,'REFUSED','2022-06-24 16:14:34',5);
/*!40000 ALTER TABLE `gift_claim` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:54:51
