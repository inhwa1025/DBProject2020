--
-- Table structure for table `employee`
--
 
CREATE TABLE `employee` (
  `empid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `title` varchar(20),
  `phone` varchar(20),
  `hiredate` date,
  `manager` int,
  PRIMARY KEY (`empid`),
  FOREIGN KEY (`manager`) REFERENCES employee(empid)
);
 
--
-- Dumping data for table `employee`
--
/*
INSERT INTO `employee` VALUES (14581,'ena','사장', '010-1234-5678', '2015-03-07', NULL);
INSERT INTO `employee` VALUES (14582,'duru','실장', '010-9876-5432', '2015-05-18', NULL);
INSERT INTO `employee` VALUES (14583,'taeho','디자이너', '010-6543-2198', '2018-08-09', NULL);
INSERT INTO `employee` VALUES (14584,'dawn','디자이너', '010-6543-8198', '2018-11-04', NULL);
INSERT INTO `employee` VALUES (14585,'monica','디자이너','010-3333-3333','2019-02-03',14583);
INSERT INTO `employee` VALUES (14586,'ross','스텝','010-2222-2222','2019-02-03',14582);
INSERT INTO `employee` VALUES (14587,'rachel','스텝','010-4444-4444','2019-05-08',14584);
INSERT INTO `employee` VALUES (14588,'joey','스텝','010-5555-5555','2019-10-25',14584);
INSERT INTO `employee` VALUES (14589,'pheobe','스텝','010-6666-6666','2020-04-08',14583);
INSERT INTO `employee` VALUES (14590,'chandler','스텝','010-8888-8888','2020-07-21',14582);
*/


--
-- Table structure for table `customer`
--
 
CREATE TABLE `customer` (
  `custid` intNOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20),
  PRIMARY KEY (`custid`)
);
--
-- Dumping data for table `customer`
--
/*
INSERT INTO `customer` VALUES (52341,'emily','010-3333-3333');
INSERT INTO `customer` VALUES (52342,'lucas','010-2222-2222');
INSERT INTO `customer` VALUES (52343,'samuel','010-4444-4444');
*/



--
-- Table structure for table `reserve`
--
 
CREATE TABLE `reserve` (
  `reserveid` int NOT NULL AUTO_INCREMENT,
  `custid` int NOT NULL,
  `date` date NOT NULL,
  `sisul` varchar(20),
  `designer` int DEFAULT NULL,
  `price` int,
  PRIMARY KEY (`reserveid`),
  FOREIGN KEY (`custid`) REFERENCES customer(custid),
  FOREIGN KEY (`designer`) REFERENCES designer(empid)
);
--
-- Dumping data for table `reserve`
--
/*
INSERT INTO `reserve` VALUES (61321,52341,'2020-12-01','cut',14583,NULL);
INSERT INTO `reserve` VALUES (61322,52343,'2020-12-03','cut',NULL,NULL);
INSERT INTO `reserve` VALUES (61323,52342,'2020-12-05','dyeing',14584,NULL);
*/



--
-- Table structure for table `stock`
--
 
CREATE TABLE `stock` (
  `stockid` int NOT NULL AUTO_INCREMENT,
  `stockname` varchar(20) NOT NULL,
  `usedate` date,
  `quantity` int,
  PRIMARY KEY (`stockid`)
);
--
-- Dumping data for table `stock`
--
/*
INSERT INTO `stock` VALUES (70001,'sampoo','2021-08-26',20);
INSERT INTO `stock` VALUES (70002,'treatment','2021-09-07',23);
INSERT INTO `stock` VALUES (70003,'robe',NULL,16);
*/


--
-- Table structure for table `purchase`
--
 
CREATE TABLE `purchase` (
  `ordernum` int NOT NULL AUTO_INCREMENT,
  `orderdate` varchar(20) NOT NULL,
  `stockname` varchar(20) NOT NULL,
  `store` varchar(20),
  `usedate` date,
  `quantity` int,
  PRIMARY KEY (`ordernum`)
);
--
-- Dumping data for table `purchase`
--
/*
INSERT INTO `purchase` VALUES (80001,'2019-08-04','robe','Cshop',NULL,20);
INSERT INTO `purchase` VALUES (80002,'2020-02-15','sampoo','Ashop','2021-08-26',40);
INSERT INTO `purchase` VALUES (80003,'2020-03-07','treatment','Ashop','2021-09-07',40);
*/