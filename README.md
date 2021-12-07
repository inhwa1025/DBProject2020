# HairShop Management System




## 2020-2 KHU DATABASE Project


![dbproj](https://user-images.githubusercontent.com/64248143/145075450-50128c6e-c2f3-42e4-a32d-cab0312fbd51.JPG)


## 사용언어

MySQL, Node.js



## 사용방법

1. git clone
2. connect MySQL
3. node.js 설치
    $ npm install  
4. $ npm start main.js
5. localhost:3000으로 접속
 

## DB 테이블 

``` SQL
TABLE `employee` (
  `empid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `title` varchar(20),
  `phone` varchar(20),
  `hiredate` date,
  `manager` int,
  PRIMARY KEY (`empid`),
  FOREIGN KEY (`manager`) REFERENCES employee(empid)
)

TABLE `customer` (
  `custid` intNOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20),
  PRIMARY KEY (`custid`)
)

TABLE `reserve` (
  `reserveid` int NOT NULL AUTO_INCREMENT,
  `custid` int NOT NULL,
  `date` date NOT NULL,
  `sisul` varchar(20),
  `designer` int DEFAULT NULL,
  `price` int,
  PRIMARY KEY (`reserveid`),
  FOREIGN KEY (`custid`) REFERENCES customer(custid),
  FOREIGN KEY (`designer`) REFERENCES designer(empid)
)

TABLE `stock` (
  `stockid` int NOT NULL AUTO_INCREMENT,
  `stockname` varchar(20) NOT NULL,
  `usedate` date,
  `quantity` int,
  PRIMARY KEY (`stockid`)
)

TABLE `purchase` (
  `ordernum` int NOT NULL AUTO_INCREMENT,
  `orderdate` varchar(20) NOT NULL,
  `stockname` varchar(20) NOT NULL,
  `store` varchar(20),
  `usedate` date,
  `quantity` int,
  PRIMARY KEY (`ordernum`)
)


```

## ER Model

![ERmodel_최종](https://user-images.githubusercontent.com/64248143/101359262-5d5a6600-38df-11eb-9fe1-279ed9ff1e46.png)


## Flow Chart

![FlowChart](https://user-images.githubusercontent.com/64248143/101359322-6fd49f80-38df-11eb-98bb-6f76386a2115.png)
