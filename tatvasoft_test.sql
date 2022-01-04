-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 04, 2022 at 07:43 PM
-- Server version: 5.7.33-0ubuntu0.16.04.1
-- PHP Version: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tatvasoft_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `publised_date` date NOT NULL,
  `modify_date` date NOT NULL,
  `status` int(11) NOT NULL COMMENT '1- Publish, 2- Unpublish',
  `category_id` int(11) NOT NULL,
  `auther` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `user_id`, `title`, `description`, `publised_date`, `modify_date`, `status`, `category_id`, `auther`, `created_date`) VALUES
(3, 1, 'Testtttttttt', 'ksjdkas dkas dka', '2022-01-22', '2022-01-19', 0, 3, 'Pawan pARMAR', '2022-01-04 12:50:58'),
(5, 2, 'test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-01-10', '2022-01-09', 0, 1, 'Pawan', '2022-01-04 13:08:48'),
(6, 2, 'test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-01-10', '2022-01-09', 0, 1, 'Pawan', '2022-01-04 13:38:24'),
(7, 2, 'test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-01-10', '2022-01-09', 0, 1, 'Pawan', '2022-01-04 13:38:58'),
(8, 2, 'test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-01-10', '2022-01-09', 0, 1, 'Pawan', '2022-01-04 13:38:59'),
(11, 5, 'What is Lorem Ipsum 1st', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-02-11', '2022-01-04', 1, 1, 'Deepika', '2022-01-04 14:05:17'),
(12, 5, 'What is Lorem Ipsum 2st', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-02-12', '2022-01-04', 1, 3, 'Deepika', '2022-01-04 14:05:21'),
(13, 5, 'What is Lorem Ipsum 3st', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2022-02-15', '2022-01-04', 1, 1, 'Deepika', '2022-01-04 14:05:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` varchar(50) NOT NULL,
  `role` int(11) NOT NULL COMMENT '1-Admin, 2-User',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-Active, 0-Pending',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `dob`, `role`, `status`, `created_date`) VALUES
(1, 'Pawan', 'Parmar', 'pawanparmar652@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '19-09-1997', 2, 1, '2022-01-04 11:26:38'),
(2, 'Pawan', 'Parmar', 'pawanparmar@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '19-09-1997', 2, 1, '2022-01-04 11:27:30'),
(3, 'admin', 'developer', 'admin@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '19-09-1997', 1, 1, '2022-01-04 12:49:15'),
(4, 'Dharmendra', 'Parmar', 'dharmendra@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '19-09-1998', 2, 1, '2022-01-04 13:54:18'),
(5, 'Deepika', 'Parmar', 'deepika@gmail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', '19-09-2000', 2, 1, '2022-01-04 14:01:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
