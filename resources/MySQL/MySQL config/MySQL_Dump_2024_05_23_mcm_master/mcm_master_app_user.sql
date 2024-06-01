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
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '0',
  `photo` mediumtext,
  `role` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL DEFAULT 'DEFAULT',
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `layout` varchar(255) NOT NULL DEFAULT 'SIDE_MENU',
  `welcome_page` varchar(255) NOT NULL DEFAULT 'DASHBOARD',
  `provider` bit(1) NOT NULL DEFAULT b'0',
  `immutable` bit(1) NOT NULL DEFAULT b'0',
  `patient_tabs_config` text,
  `office_id` bigint DEFAULT NULL,
  `points` int DEFAULT '0',
  `lab_id` bigint DEFAULT NULL,
  `accordions_config` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ct_username_unique` (`username`),
  KEY `FK_user_office` (`office_id`),
  CONSTRAINT `FK_user_office` FOREIGN KEY (`office_id`) REFERENCES `office` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES (1,'system','2022-05-16 04:06:46','tarek','2024-03-25 13:55:25',2,'Tarek','sahalia','$2a$10$nGl2gS8I/6RqlPybCoi0Y.X9F5R6mUt6fFpAbSN.bTy/qeRnrkpKe','tarek','0',NULL,'SYSTEM','DEFAULT','en','SIDE_MENU','DASHBOARD',_binary '\0',_binary '',NULL,1,0,NULL,NULL),(2,'tarek','2023-01-11 22:35:49','tarek','2023-08-01 22:21:12',5,'none','none','$2a$10$wTrZ1LR/4sKBACsvrO..aes4SL4pHRzJMbi9NI5ajVZLFwRyHATtq','none','1',NULL,'LAB','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,6,NULL),(3,'tarek','2023-02-15 01:50:56','tarek','2023-11-02 00:03:37',4,'MCM_LAB','MCM_LAB','$2a$10$st822D3c7fzrf4cZQ2SHWuLnXbAl9/UDfUppUC7rOMo41GZ9Tb2sW','mcmlab','1',NULL,'LAB','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,7,NULL),(4,'tarek','2023-04-03 00:31:15','tarek','2023-08-01 22:19:40',1,'Wouroud','Wouroud','$2a$10$TZ/CrgKuOfCfFzB3yxOe6.Gf0i1orcGEDL4AufOnN.GEW/cyU2MOG','wouroud','1',NULL,'MANAGER','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"ORDONNANCES\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,NULL,NULL),(5,'tarek','2023-04-03 00:31:36','tarek','2023-04-03 00:31:46',1,'Romaissa','Romaissa','$2a$10$sPTsHz7eVcjBXvAYx5rfFulH2tmqmZzGOy6Z5aRoy1WtUVDlX5pue','romaissa','0',NULL,'MANAGER','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"ORDONNANCES\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,NULL,NULL),(6,'tarek','2023-05-11 21:00:47','tarek','2023-08-01 22:19:31',1,'hakim','Saidi','$2a$10$7xL9EUsxVSnYdbNAx.H/Ie0KRfSn6SLJQuXz.tJUQs1LbzZ/kYgti','hakim','1',NULL,'MANAGER','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"ORDONNANCES\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,NULL,NULL),(7,'tarek','2023-05-11 23:24:43','tarek','2023-08-01 22:19:26',1,'Chahra','Saidi','$2a$10$F025i503XwiQg9O24H/S8eTcDSpxHHAkSC20KIJIp4uZhJxwo7Oz6','chahra','1',NULL,'MANAGER','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"ORDONNANCES\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,NULL,NULL),(8,'tarek','2023-07-02 15:22:30','tarek','2023-11-02 00:06:32',2,'Clinique 2.0','Clinique 2.0','$2a$10$h0iuleNKrdqvJqEQu2G.O.FwqN17p9n0/WZ/3IzCqQeZnmw.cnCP.','tabbaord','1',NULL,'LAB','DEFAULT','fr','SIDE_MENU','DASHBOARD',_binary '\0',_binary '\0','{\"REMARKS\":true,\"GENERAL\":true,\"VISITS\":true,\"ORDONNANCES\":true,\"VITAL_SIGNS\":true,\"VISIT_MEDICAMENTS\":true,\"COMPLEMENTARY_EXAMS\":true,\"ALLERGIES\":true,\"CLINICAL_INFORMATIONS\":true,\"PATHOLOGICAL_ANTECEDENTS\":true,\"IMMUNISATIONS\":true,\"DISEASES\":true,\"CERTIFICATES\":true,\"PAYMENTS\":true}',1,0,8,NULL);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:54:56
