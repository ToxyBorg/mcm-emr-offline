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
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `logo` mediumtext,
  `fax` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `include_header_image` bit(1) NOT NULL DEFAULT b'0',
  `header_include_office_logo` bit(1) NOT NULL DEFAULT b'0',
  `header_image` mediumtext,
  `header_include_office_name` bit(1) NOT NULL DEFAULT b'0',
  `header_include_office_address` bit(1) NOT NULL DEFAULT b'0',
  `header_include_office_email` bit(1) NOT NULL DEFAULT b'0',
  `header_include_office_phone` bit(1) NOT NULL DEFAULT b'0',
  `header_include_office_fax` bit(1) NOT NULL DEFAULT b'0',
  `header_customize_text` bit(1) NOT NULL DEFAULT b'0',
  `include_footer_image` bit(1) NOT NULL DEFAULT b'0',
  `footer_include_office_logo` bit(1) NOT NULL DEFAULT b'0',
  `footer_image` mediumtext,
  `footer_include_office_name` bit(1) NOT NULL DEFAULT b'0',
  `footer_include_office_address` bit(1) NOT NULL DEFAULT b'0',
  `footer_include_office_email` bit(1) NOT NULL DEFAULT b'0',
  `footer_include_office_phone` bit(1) NOT NULL DEFAULT b'0',
  `footer_include_office_fax` bit(1) NOT NULL DEFAULT b'0',
  `footer_customize_text` bit(1) NOT NULL DEFAULT b'0',
  `enable_digital_signature` bit(1) NOT NULL DEFAULT b'0',
  `generate_barcode` bit(1) NOT NULL DEFAULT b'0',
  `use_initial_checkup` bit(1) NOT NULL DEFAULT b'0',
  `use_cat` bit(1) NOT NULL DEFAULT b'1',
  `use_exam` bit(1) NOT NULL DEFAULT b'0',
  `auto_add_exam_as_article` bit(1) NOT NULL DEFAULT b'0',
  `date_format` varchar(255) DEFAULT NULL,
  `time_format` varchar(255) DEFAULT NULL,
  `file_extensions` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT 'c:/MCM/',
  `pin_authentication_activated` bit(1) NOT NULL DEFAULT b'0',
  `db_export_ability` bit(1) NOT NULL DEFAULT b'0',
  `session_expiration_duration` bit(1) NOT NULL DEFAULT b'0',
  `start_time` varchar(255) DEFAULT NULL,
  `appointment_period` bigint NOT NULL DEFAULT '0',
  `end_time` varchar(255) DEFAULT NULL,
  `last_update` datetime NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `use_fever` bit(1) NOT NULL DEFAULT b'0',
  `use_pulse` bit(1) NOT NULL DEFAULT b'0',
  `use_blood_pressure` bit(1) NOT NULL DEFAULT b'1',
  `use_respiratory_rate` bit(1) NOT NULL DEFAULT b'0',
  `use_oxygen_saturation` bit(1) NOT NULL DEFAULT b'0',
  `use_weight` bit(1) NOT NULL DEFAULT b'1',
  `use_height` bit(1) NOT NULL DEFAULT b'1',
  `use_bmi` bit(1) NOT NULL DEFAULT b'1',
  `use_pain` bit(1) NOT NULL DEFAULT b'0',
  `use_pregnancy_month` bit(1) NOT NULL DEFAULT b'0',
  `use_other` bit(1) NOT NULL DEFAULT b'0',
  `use_rth` bit(1) NOT NULL DEFAULT b'0',
  `use_cranial_circumference` bit(1) NOT NULL DEFAULT b'0',
  `use_shoe_size` bit(1) NOT NULL DEFAULT b'0',
  `display_title` bit(1) NOT NULL DEFAULT b'0',
  `display_patient_infos` bit(1) NOT NULL DEFAULT b'0',
  `header_height` int DEFAULT NULL,
  `footer_height` int DEFAULT NULL,
  `use_payment` bit(1) NOT NULL DEFAULT b'1',
  `speciality` varchar(255) DEFAULT NULL,
  `commune` varchar(255) DEFAULT NULL,
  `wilaya` varchar(255) DEFAULT NULL,
  `show_divider` bit(1) NOT NULL DEFAULT b'1',
  `use_auto_terminate_visits` bit(1) NOT NULL DEFAULT b'0',
  `use_appointment_time` bit(1) NOT NULL DEFAULT b'1',
  `use_lite_mode` bit(1) NOT NULL DEFAULT b'0',
  `use_glycemia` bit(1) NOT NULL DEFAULT b'0',
  `only_lite_mode` bit(1) NOT NULL DEFAULT b'0',
  `use_growth_charts` bit(1) NOT NULL DEFAULT b'0',
  `use_flexible_payment` bit(1) NOT NULL DEFAULT b'0',
  `dynamic_vital_signs` longtext,
  `display_date` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,'system','2022-05-16 04:06:46',NULL,NULL,0,'mcm_master','office@gmail.com','01127661065',NULL,NULL,'Algeria/Algiers',NULL,_binary '\0',_binary '\0',NULL,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',NULL,NULL,NULL,'c:/MCM/',_binary '\0',_binary '\0',_binary '\0',NULL,0,NULL,'2022-05-16 04:06:46','DOCTOR DR',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,NULL,_binary '',NULL,NULL,NULL,_binary '',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,_binary '\0');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:57:51
