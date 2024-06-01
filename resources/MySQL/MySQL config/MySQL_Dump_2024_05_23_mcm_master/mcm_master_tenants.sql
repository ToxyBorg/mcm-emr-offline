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
-- Table structure for table `tenants`
--

DROP TABLE IF EXISTS `tenants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tenants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `version` int DEFAULT NULL,
  `db_name` varchar(50) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `maximum_pool_size` int NOT NULL DEFAULT '250',
  `pool_name` varchar(100) NOT NULL DEFAULT 'mcm_pool',
  `lab_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `commune` varchar(255) DEFAULT NULL,
  `wilaya` varchar(255) DEFAULT NULL,
  `last_activity_date` timestamp NULL DEFAULT NULL,
  `last_login_date` timestamp NULL DEFAULT NULL,
  `only_lite_mode` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ct_db_name_unique` (`db_name`),
  KEY `FK_tenants_lab` (`lab_id`),
  CONSTRAINT `FK_tenants_lab` FOREIGN KEY (`lab_id`) REFERENCES `lab` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenants`
--

LOCK TABLES `tenants` WRITE;
/*!40000 ALTER TABLE `tenants` DISABLE KEYS */;
INSERT INTO `tenants` VALUES (1,'system','2022-05-16 04:06:46',NULL,NULL,0,'mcm_master',0,250,'mcm_master_connection-pool',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-17 00:43:12',_binary '\0'),(2,'tarek','2022-05-16 04:36:08','tarek','2022-12-02 23:47:04',1,'team',0,250,'mcm_pool',1,'Docteur Benmbarek Fadila\nMedecin specialiste en pédiaterie \n','Cardiologie','docbmenmbarekfadila@gmail.co','0541582912','14 rue colonel fabien','36016','36','2024-05-11 19:29:57','2024-05-11 19:29:08',_binary '\0'),(4,'tarek','2022-06-28 16:34:57','tarek','2022-12-02 23:46:08',1,'rifka',0,250,'mcm_pool',1,'Dr Tourab Rifka\nCabinet de Rééducation Nutritionnelle\nOmnipraticienne\nMédecine Nutritionnelle et Diététique\nN° d\'ordre 3477/23','Physiologie clinique et exploration fonctionnelle métabolique et nutrition','dr.tourab@gmail.com','0558 69 59 94',' Boulevard 1er Novembre bloc 13,Le Majestic, Annaba.','23001','23','2024-05-15 12:55:05','2024-05-15 10:46:44',_binary '\0'),(6,'tarek','2022-07-12 01:41:09','tarek','2022-07-12 01:41:09',0,'babari',0,250,'mcm_pool',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-12 12:26:22','2024-05-15 08:11:20',_binary '\0'),(10,'tarek','2022-07-18 16:29:58','tarek','2022-07-18 16:29:58',0,'boudjenah',0,250,'mcm_pool',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_binary '\0'),(53,'tarek','2023-02-21 03:03:48','tarek','2023-02-21 03:03:48',0,'beddek',0,250,'mcm_pool',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_binary '\0'),(64,'tarek','2023-04-27 00:10:45','tarek','2023-04-27 00:10:45',0,'benhamdi',0,250,'mcm_pool',2,'Benhamdi Ismail','Chirurgie orthopédique et traumatologie','ismjuve@gmail.com','0781467667','bd aoued bendjebar n43 relizane ','48001','48','2024-05-16 11:10:24','2024-05-16 09:07:54',_binary '\0'),(71,'wouroud','2023-05-06 22:58:51','wouroud','2023-05-06 22:58:51',0,'larbi',0,250,'mcm_pool',NULL,'Dr. LARBI. Kh                                       \nmédecin spécialiste en médecine interne      \nN° d\'ordre:22/20/046','Médecine interne','khadouj-mi@hotmail.fr','0698487094','N125 bloc B RESIDANCE TAHAR , cité ELARBI BEN M\'HIDI(GAMBETTA), SBA','22001','22','2024-05-12 08:20:18','2024-05-16 09:10:21',_binary '\0'),(78,'wouroud','2023-05-08 11:57:05','wouroud','2023-05-08 11:57:05',0,'mecheret',0,250,'mcm_pool',NULL,'عيادة الحكيم مشرط محمد\nDr Mecheret Mohammed\nDocteur en Medecine Generale\nN°ordre :22/11/494','Médecine générale','memo356memo@gmail.com','048-71-60-32','01 Rue beldjeriouet benkhada  Mostefa ben brahim  Sidi bel abbes','22004','22','2023-11-27 16:51:30','2023-11-27 16:30:06',_binary ''),(167,'romaissa','2023-06-25 09:23:05','romaissa','2023-06-25 09:23:05',0,'mahrous',0,250,'mcm_pool',NULL,'Samy Mahrous Fouad','Médecine du sport','','0778802091 / 0541594625','Zaafrania double voie villa n°04, Annaba','23001','23','2023-11-28 07:55:21','2024-05-14 14:15:16',_binary ''),(190,'tarek','2023-10-10 12:57:10','tarek','2023-10-10 12:57:10',0,'belhadj',0,250,'mcm_pool',1,'Belhadj N','Gynécologie - obstétrique',NULL,'0696820880 / 0553578993','03 , rue 08 novembre Hai Adda Bou Djllal - Sidi Bel Abbes-','22001','22','2023-10-17 14:05:07','2023-11-11 14:52:04',_binary '\0'),(191,'tarek','2023-10-16 00:59:39','tarek','2023-10-16 00:59:39',0,'hadil',0,250,'mcm_pool',1,'hadil','Médecine générale','','0791623095','sidi bel abbes','22001','22','2024-01-01 14:11:17','2024-03-26 00:53:45',_binary '\0'),(192,'tarek','2023-11-15 16:59:37','tarek','2023-11-15 16:59:37',0,'mouzaia',0,250,'mcm_pool',1,'Mouzaia','Chirurgie générale','mouzia@gmail.com',NULL,'Mouzaia','09016','9','2024-04-22 17:46:39','2024-05-16 17:57:46',_binary '\0'),(193,'tarek','2023-11-19 14:46:15','tarek','2023-11-19 14:46:15',0,'new',0,250,'mcm_pool',1,'New','Gynécologie - obstétrique',NULL,NULL,'Alger','16001','16','2023-11-27 12:27:19','2023-11-27 12:26:14',_binary '\0'),(194,'tarek','2023-12-13 01:07:05','tarek','2023-12-13 01:07:05',0,'rachedi',0,250,'mcm_pool',1,'Amel Rachedi','Neurologie','amelrachedi80@gmail.com','0542 73 71 55','Cité kouba rue du lycée villa n 12 RDC Annaba','23001','23','2024-01-24 11:28:10','2024-01-24 11:27:15',_binary '\0');
/*!40000 ALTER TABLE `tenants` ENABLE KEYS */;
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

-- Dump completed on 2024-05-23  6:58:02
