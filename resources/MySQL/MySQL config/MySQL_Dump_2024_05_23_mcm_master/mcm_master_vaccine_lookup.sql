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
-- Table structure for table `vaccine_lookup`
--

DROP TABLE IF EXISTS `vaccine_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine_lookup` (
  `value` varchar(255) NOT NULL,
  `range` varchar(255) NOT NULL,
  PRIMARY KEY (`value`,`range`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine_lookup`
--

LOCK TABLES `vaccine_lookup` WRITE;
/*!40000 ALTER TABLE `vaccine_lookup` DISABLE KEYS */;
INSERT INTO `vaccine_lookup` VALUES ('Anti-diphtérique, anti-tétanique (DT)','BETWEEN_11_AND_13_YEARS'),('Anti-diphtérique, anti-tétanique (DT)','BETWEEN_16_AND_18_YEARS'),('Anti-diphtérique, anti-tétanique (DT)','EACH_10_YEARS_AFTER_18'),('Anti-diphtérique, anti-tétanique, anti coquelucheux (DTC enfant)','SIX_YEARS'),('Anti-diphtérique, anti-tétanique, anti coquelucheux (DTCh)','FOUR_MONTHS'),('Anti-diphtérique, anti-tétanique, anti coquelucheux (DTCh)','TWELVE_MONTHS'),('Anti-diphtérique, anti-tétanique, anti coquelucheux (DTCh)','TWO_MONTHS'),('Anti-haemophilusinfluenzae B (HBV)','TWELVE_MONTHS'),('Anti-haemophilusinfluenzae B (Hib)','FOUR_MONTHS'),('Anti-haemophilusinfluenzae B (Hib)','TWELVE_MONTHS'),('Anti-haemophilusinfluenzae B (Hib)','TWO_MONTHS'),('Anti-hépatite B (HBV)','BIRTH'),('Anti-hépatite B (HBV)','FOUR_MONTHS'),('Anti-hépatite B (HBV)','TWO_MONTHS'),('Anti-hépatite B, anti-poliomyélitique oral (VPO)','FOUR_MONTHS'),('Anti-hépatite B, anti-poliomyélitique oral (VPO)','TWELVE_MONTHS'),('Anti-hépatite B, anti-poliomyélitique oral (VPO)','TWO_MONTHS'),('Anti-pneumococcique (PN)','FOUR_MONTHS'),('Anti-pneumococcique (PN)','TWELVE_MONTHS'),('Anti-pneumococcique (PN)','TWO_MONTHS'),('Anti-poliomyélitique injectable (VPI)','SIX_YEARS'),('Anti-poliomyélitique injectable (VPI)','THREE_MONTHS'),('Anti-poliomyélitique oral (VPO)','BETWEEN_11_AND_13_YEARS'),('Anti-rougeoleux, anti-ourlien, anti-rubéoleux (ROR)','EIGHTEEN_MONTHS'),('Anti-rougeoleux, anti-ourlien, anti-rubéoleux (ROR)','ELEVEN_MONTHS'),('BCG','BIRTH');
/*!40000 ALTER TABLE `vaccine_lookup` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:57:29
