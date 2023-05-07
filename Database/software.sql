-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 10:12 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `software`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `Id` int(11) NOT NULL,
  `FullName` varchar(300) DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `UnivRegNo` varchar(20) DEFAULT NULL,
  `ContactNo` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Faculty` varchar(100) DEFAULT NULL,
  `Dept` varchar(100) DEFAULT NULL,
  `NidNo` varchar(50) DEFAULT NULL,
  `NidPhoto` varchar(100) DEFAULT NULL,
  `PrivateAddress` varchar(300) DEFAULT NULL,
  `Password` varchar(125) NOT NULL,
  `Role` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`Id`, `FullName`, `UserName`, `UnivRegNo`, `ContactNo`, `Email`, `Faculty`, `Dept`, `NidNo`, `NidPhoto`, `PrivateAddress`, `Password`, `Role`) VALUES
(20, 'Saman De Silva', 'saman', '2019/csc/001', '0124356987', 'saman@gmail.com', 'science', 'cs', NULL, NULL, 'Kalutara ', '$2b$10$gqNUt/gm2yN1c3NJXFMPMu9h.4YJx./aNKwSiRpEmx1ZZp4h8jrLu', 'student'),
(23, 'Dananjan Ferendo', 'Danan', '2019/csc/002', '0912457233', 'danan@gmail.com', 'art', 'art b', NULL, NULL, 'Kalutara ', '$2b$10$uOv5X0Q/BRy.sIHiyv8qJ.XjdL9oWgS7uifcX87p5H3284.Q2sS8i', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
