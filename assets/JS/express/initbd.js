import db from './db.js';

const initDb = () => {
  const createTablesSql = `
CREATE TABLE Customer (
    id INT PRIMARY KEY,
    phoneNumber INT,
    name VARCHAR(16)
);

CREATE TABLE Goods (
    id INT PRIMARY KEY,
    name VARCHAR(45),
    general_info VARCHAR(60),
    photo LONGBLOB,
    category INT
);

CREATE TABLE volume_price (
    id INT PRIMARY KEY,
    volume INT NULL,
    price INT,
    id_good INT,
    FOREIGN KEY (id_good) REFERENCES Goods(id)
);

CREATE TABLE add_to_coffee (
    id INT PRIMARY KEY,
    name VARCHAR(45),
    price INT
);

CREATE TABLE all_additives_to_coffee (
    id INT PRIMARY KEY,
    coffee INT,
    addictes INT,
    FOREIGN KEY (coffee) REFERENCES volume_price(id),
    FOREIGN KEY (addictes) REFERENCES add_to_coffee(id)
);

CREATE TABLE CoffeeOrder (
    id INT PRIMARY KEY,
    id_customer INT,
    data DATETIME,
    FOREIGN KEY (id_customer) REFERENCES Customer(id)
);

CREATE TABLE order_goods (
    id INT PRIMARY KEY,
    id_order INT,
    id_good INT,
    FOREIGN KEY (id_order) REFERENCES CoffeeOrder(id),
    FOREIGN KEY (id_good) REFERENCES Goods(id)
);



INSERT INTO Customer (id, phoneNumber, name)
VALUES
(1, 1234567890, 'Иван'),
(2, 9876543210, 'Мария');

INSERT INTO Goods (id, name, general_info, photo, category)
VALUES
(1, 'Эспрессо', 'Кофе с молоком', NULL, 1),
(2, 'Американо', 'Чёрный чай', NULL, 1),
(3, 'Капучино', 'Овсяное печенье', NULL, 1),
(4, 'Латте', 'Овсяное печенье', NULL, 1),
(5, 'Флэт уайт', 'Овсяное печенье', NULL, 1),
(6, 'Мокачино', 'Овсяное печенье', NULL, 1),
(7, 'Раф', 'Овсяное печенье', NULL, 1),
(8, 'Какао', 'Овсяное печенье', NULL, 1),
(9, 'Матча Латте', 'Овсяное печенье', NULL, 1),
(10, 'Айс Латте', 'Овсяное печенье', NULL, 2),
(11, 'Айс Матча Латте', 'Овсяное печенье', NULL, 2),
(12, 'Эспрессо Тоник', 'Овсяное печенье', NULL, 2),
(13, 'Матча Тоник', 'Овсяное печенье', NULL, 2),
(14, 'Оранж Бамбл', 'Овсяное печенье', NULL, 2),
(15, 'Матча Бамбл', 'Овсяное печенье', NULL, 2),
(16, 'Лимонад', 'Овсяное печенье', NULL, 2),
(17, 'Чай черный', 'Овсяное печенье', NULL, 3),
(18, 'Чай зелёный', 'Овсяное печенье', NULL, 3),
(19, 'Чай фруктовый', 'Овсяное печенье', NULL, 3),
(20, 'Чай травяной', 'Овсяное печенье', NULL, 3),
(21, 'Фильтр кофе', 'Овсяное печенье', NULL, 1);
INSERT INTO volume_price (id, volume, price, id_good)
VALUES
(1, 200, 120, 1), -- Эспрессо 200 мл за 120р
(2, 200, 120, 2), -- Американо 200 мл за 120р
(3, 300, 160, 2), -- Американо 300 мл за 160р
(4, 200, 160, 21), -- Фильтр кофе 200 мл за 160р
(5, 300, 200, 21), -- Фильтр кофе 300 мл за 200р
(6, 200, 140, 3), -- Капучино 200 мл за 140р
(7, 300, 180, 3), -- Капучино 200 мл за 180р
(8, 200, 140, 4), -- Латте 200 мл за 140р
(9, 300, 180, 4), -- Латте 300 мл зза 180р
(10, 200, 160, 5), -- Флэт Уайт 200 мл за 160р 
(11, 200, 180, 6), -- Мокачино 200 мл за 180р 
(12, 300, 220, 6), -- Мокачино 300 мл за 220р 
(13, 200, 180, 7), -- Раф 200 мл за 180р
(14, 300, 220, 7), -- Раф 300 мл за 220р 
(15, 200, 140, 8), -- Какао 200мл за 140р 
(16, 300, 180, 8), -- Какао 300 мл 180р 
(17, 200, 180, 9), -- Матча латте 200 мл за 180р 
(18, 300, 220, 9), -- Матча латте 300мл за 220р
(19, 300, 220, 10), -- Айс латте 300мл за 220р 
(20, 300, 220, 11), -- Айс матча латте 300мл за 220р 
(21, 300, 220, 12), -- Эспрессо тоник 300мл за 220р  
(22, 300, 220, 13), -- Матча тоник 300мл за 220р 
(23, 300, 220, 14), -- Оранж бамбл 300мл за 220р 
(24, 300, 220, 15), -- Матча бамбл 300мл за 220р 
(25, 300, 220 ,16), -- Лимонад 300мл за 220р
(26, 200, 80, 17), -- Чай черный 200мл за 80р 
(27, 300, 120, 17), -- Чай черный 300мл за 120р 
(28, 200, 80, 18), -- Чап зеленый 200мл за 80р 
(29, 300, 120, 18), -- Чай зеленый 300мл за 120р
(30, 200, 80, 19), -- Чай фруктовый 200мл за 80р 
(31, 300, 120, 19), -- Чай фруктовый 300мл за 120р 
(32, 200, 80, 20), -- Чай травяной 200мл за 80р 
(33, 300, 120 , 20); -- Чай травяной 300мл за 120р

INSERT INTO add_to_coffee (id, name, price)
VALUES
(1, 'Растительное молоко', 60),
(2, 'Ванильный', 40),
(3, 'Солёная карамель', 40),
(4, 'Карамель', 40),
(5, 'Лесной орех', 40),
(6, 'Банан', 40),
(7, 'Манго', 40),
(8, 'Малина', 40),
(9, 'Кокос', 40);

INSERT INTO all_additives_to_coffee (id, coffee, addictes)
VALUES
(1, 1, 1),-- Эспрессо 200 мл с Растительным молоком 
(2, 1, 2), -- Эспрессо 200 мл с Ваниль
(3, 1, 3), -- Эспрессо 200 мл с Соленая карамель
(4, 1, 4), -- Эспрессо 200 мл с Карамель
(5, 1, 5), -- Эспрессо 200 мл с Лесной орех
(6, 1, 6), -- Эспрессо 200 мл с Банан
(7, 1, 7), -- Эспрессо 200 мл с Манго  
(8, 1, 8), -- Эспрессо 200 мл с Малина
(9, 1, 9), -- Эспрессо 200 мл с Кокос
(10, 2, 1), -- Амекрикано 200мл с Растительным молоком 
(11, 2, 2), -- Амекрикано 200мл с Ваниль 
(12, 2, 3), -- Амекрикано 200мл с Соленая карамель
(13, 2, 4),  -- Амекрикано 200мл с Карамель
(14, 2, 5),  -- Амекрикано 200мл с Лесной орех
(16, 2, 6),  -- Амекрикано 200мл с Банан
(17, 2, 7),  -- Амекрикано 200мл с Манго
(18, 2, 8),  -- Амекрикано 200мл с Малина
(19, 2, 9),  -- Амекрикано 200мл с Кокос
(20, 3, 1),  -- Амекрикано 300мл с Растительным молоком
(21, 3, 2),  -- Амекрикано 300мл с Ваниль
(22, 3, 3),  -- Амекрикано 300мл с Соленая карамель
(23, 3, 4),  -- Амекрикано 300мл с Карамель
(24, 3, 5),  -- Амекрикано 300мл с Лесной орех
(25, 3, 6),  -- Амекрикано 300мл с Банан
(26, 3, 7),  -- Амекрикано 300мл с Манго
(27, 3, 8),  -- Амекрикано 300мл с Малина
(28, 3, 9),  -- Амекрикано 300мл с Кокос
(29, 4, 1),  -- Фильтр кофе 200мл с Растительным молоком
(30, 4, 2),  -- Фильтр кофе 200мл с Ваниль
(31, 4, 3),  -- Фильтр кофе 200мл с Соленая карамель
(32, 4, 4),  -- Фильтр кофе 200мл с Карамель
(33, 4, 5),  -- Фильтр кофе 200мл с Лесной орех
(34, 4, 6),  -- Фильтр кофе 200мл с Банан
(35, 4, 7),  -- Фильтр кофе 200мл с Манго
(36, 4, 8),  -- Фильтр кофе 200мл с Малина
(37, 4, 9),  -- Фильтр кофе 200мл с Кокос
(38, 5, 1),  -- Фильтр кофе 300мл с Растительным молоком
(39, 5, 2),  -- Фильтр кофе 300мл с Ваниль
(40, 5, 3),  -- Фильтр кофе 300мл с Соленая карамель
(41, 5, 4),  -- Фильтр кофе 300мл с Карамель
(42, 5, 5),  -- Фильтр кофе 300мл с Лесной орех
(43, 5, 6),  -- Фильтр кофе 300мл с Банан
(44, 5, 7),  -- Фильтр кофе 300мл с Манго
(45, 5, 8),  -- Фильтр кофе 300мл с Малина
(46, 5, 9),  -- Фильтр кофе 300мл с Кокос
(47, 6, 1),  -- Капучино 200мл с Растительным молоком
(48, 6, 2),  -- Капучино 200мл с Ваниль
(49, 6, 3),  -- Капучино 200мл с Соленая карамель
(50, 6, 4),  -- Капучино 200мл с Карамель
(51, 6, 5),  -- Капучино 200мл с Лесной орех
(52, 6, 6),  -- Капучино 200мл с Банан
(53, 6, 7),  -- Капучино 200мл с Манго
(54, 6, 8),  -- Капучино 200мл с Малина
(55, 6, 9),  -- Капучино 200мл с Кокос
(56, 7, 1),  -- Капучино 300мл с Растительным молоком
(57, 7, 2),  -- Капучино 300мл с Ваниль
(58, 7, 3),  -- Капучино 300мл с Соленая карамель
(59, 7, 4),  -- Капучино 300мл с Карамель
(60, 7, 5),  -- Капучино 300мл с Лесной орех
(61, 7, 6),  -- Капучино 300мл с Банан
(62, 7, 7),  -- Капучино 300мл с Манго
(63, 7, 8),  -- Капучино 300мл с Малина
(64, 7, 9),  -- Капучино 300мл с Кокос
(65, 8, 1),  -- Латте 200мл с Растительным молоком
(66, 8, 2),  -- Латте 200мл с Ваниль
(67, 8, 3),  -- Латте 200мл с Соленая карамель
(68, 8, 4),  -- Латте 200мл с Карамель
(69, 8, 5),  -- Латте 200мл с Лесной орех
(70, 8, 6),  -- Латте 200мл с Банан
(71, 8, 7),  -- Латте 200мл с Манго
(72, 8, 8),  -- Латте 200мл с Малина
(73, 8, 9),  -- Латте 200мл с Кокос
(74, 9, 1),  -- Латте 300мл с Растительным молоком
(75, 9, 2),  -- Латте 300мл с Ваниль
(76, 9, 3),  -- Латте 300мл с Соленая карамель
(77, 9, 4),  -- Латте 300мл с Карамель
(78, 9, 5),  -- Латте 300мл с Лесной орех
(79, 9, 6),  -- Латте 300мл с Банан
(80, 9, 7),  -- Латте 300мл с Манго
(81, 9, 8),  -- Латте 300мл с Малина
(82, 9, 9),  -- Латте 300мл с Кокос
(83, 10, 1),  -- Флэт Уайт 200мл с Растительным молоком
(84, 10, 2),  -- Флэт Уайт 200мл с Ваниль
(85, 10, 3),  -- Флэт Уайт 200мл с Соленая карамель
(86, 10, 4),  -- Флэт Уайт 200мл с Карамель
(87, 10, 5),  -- Флэт Уайт 200мл с Лесной орех
(88, 10, 6),  -- Флэт Уайт 200мл с Банан
(89, 10, 7),  -- Флэт Уайт 200мл с Манго
(90, 10, 8),  -- Флэт Уайт 200мл с Малина
(91, 10, 9),  -- Флэт Уайт 200мл с Кокос
(92, 11, 1),  -- Мокачино 200мл с Растительным молоком
(93, 11, 2),  -- Мокачино 200мл с Ваниль
(94, 11, 3),  -- Мокачино 200мл с Соленая карамель
(95, 11, 4),  -- Мокачино 200мл с Карамель
(96, 11, 5),  -- Мокачино 200мл с Лесной орех
(97, 11, 6),  -- Мокачино 200мл с Банан
(98, 11, 7),  -- Мокачино 200мл с Манго
(99, 11, 8),  -- Мокачино 200мл с Малина
(100, 11, 9),  -- Мокачино 200мл с Кокос
(101, 12, 1),  -- Мокачино 300мл с Растительным молоком
(102, 12, 2),  -- Мокачино 300мл с Ваниль
(103, 12, 3),  -- Мокачино 300мл с Соленая карамель
(104, 12, 4),  -- Мокачино 300мл с Карамель
(105, 12, 5),  -- Мокачино 300мл с Лесной орех
(106, 12, 6),  -- Мокачино 300мл с Банан
(107, 12, 7),  -- Мокачино 300мл с Манго
(108, 12, 8),  -- Мокачино 300мл с Малина
(109, 12, 9),  -- Мокачино 300мл с Кокос
(110, 13, 1),  -- Раф 200мл с Растительным молоком
(111, 13, 2),  -- Раф 200мл с Ваниль
(112, 13, 3),  -- Раф 200мл с Соленая карамель
(113, 13, 4),  -- Раф 200мл с Карамель
(114, 13, 5),  -- Раф 200мл с Лесной орех
(115, 13, 6),  -- Раф 200мл с Банан
(116, 13, 7),  -- Раф 200мл с Манго
(117, 13, 8),  -- Раф 200мл с Малина
(118, 13, 9),  -- Раф 200мл с Кокос
(119, 14, 1),  -- Раф 300мл с Растительным молоком
(120, 14, 2),  -- Раф 300мл с Ваниль
(121, 14, 3),  -- Раф 300мл с Соленая карамель
(122, 14, 4),  -- Раф 300мл с Карамель
(123, 14, 5),  -- Раф 300мл с Лесной орех
(124, 14, 6),  -- Раф 300мл с Банан
(125, 14, 7),  -- Раф 300мл с Манго
(126, 14, 8),  -- Раф 300мл с Малина
(127, 14, 9),  -- Раф 300мл с Кокос
(128, 15, 1),  -- Какао 200мл с Растительным молоком
(129, 15, 2),  -- Какао 200мл с Ваниль
(130, 15, 3),  -- Какао 200мл с Соленая карамель
(131, 15, 4),  -- Какао 200мл с Карамель
(132, 15, 5),  -- Какао 200мл с Лесной орех
(133, 15, 6),  -- Какао 200мл с Банан
(134, 15, 7),  -- Какао 200мл с Манго
(135, 15, 8),  -- Какао 200мл с Малина
(136, 15, 9),  -- Какао 200мл с Кокос
(137, 16, 1),  -- Какао 300мл с Растительным молоком
(138, 16, 2),  -- Какао 300мл с Ваниль
(139, 16, 3),  -- Какао 300мл с Соленая карамель
(140, 16, 4),  -- Какао 300мл с Карамель
(141, 16, 5),  -- Какао 300мл с Лесной орех
(142, 16, 6),  -- Какао 300мл с Банан
(143, 16, 7),  -- Какао 300мл с Манго
(144, 16, 8),  -- Какао 300мл с Малина
(145, 16, 9),  -- Какао 300мл с Кокос
(146, 17, 1),  -- Матча Латте 200мл с Растительным молоком
(147, 17, 2),  -- Матча Латте 200мл с Ваниль
(148, 17, 3),  -- Матча Латте 200мл с Соленая карамель
(149, 17, 4),  -- Матча Латте 200мл с Карамель
(150, 17, 5),  -- Матча Латте 200мл с Лесной орех
(151, 17, 6),  -- Матча Латте 200мл с Банан
(152, 17, 7),  -- Матча Латте 200мл с Манго
(153, 17, 8),  -- Матча Латте 200мл с Малина
(154, 17, 9),  -- Матча Латте 200мл с Кокос
(155, 18, 1),  -- Матча Латте 300мл с Растительным молоком
(156, 18, 2),  -- Матча Латте 300мл с Ваниль
(157, 18, 3),  -- Матча Латте 300мл с Соленая карамель
(158, 18, 4),  -- Матча Латте 300мл с Карамель
(159, 18, 5),  -- Матча Латте 300мл с Лесной орех
(160, 18, 6),  -- Матча Латте 300мл с Банан
(161, 18, 7),  -- Матча Латте 300мл с Манго
(162, 18, 8),  -- Матча Латте 300мл с Малина
(163, 18, 9),  -- Матча Латте 300мл с Кокос
(164, 19, 1),  -- Айс Латте 200мл с Растительным молоком
(165, 19, 2),  -- Айс Латте 200мл с Ваниль
(166, 19, 3),  -- Айс Латте 200мл с Соленая карамель
(167, 19, 4),  -- Айс Латте 200мл с Карамель
(168, 19, 5),  -- Айс Латте 200мл с Лесной орех
(169, 19, 6),  -- Айс Латте 200мл с Банан
(170, 19, 7),  -- Айс Латте 200мл с Манго
(171, 19, 8),  -- Айс Латте 200мл с Малина
(172, 19, 9),  -- Айс Латте 200мл с Кокос
(173, 20, 1),  -- Айс Латте 300мл с Растительным молоком
(174, 20, 2),  -- Айс Латте 300мл с Ваниль
(175, 20, 3),  -- Айс Латте 300мл с Соленая карамель
(176, 20, 4),  -- Айс Латте 300мл с Карамель
(177, 20, 5),  -- Айс Латте 300мл с Лесной орех
(178, 20, 6),  -- Айс Латте 300мл с Банан
(179, 20, 7),  -- Айс Латте 300мл с Манго
(180, 20, 8),  -- Айс Латте 300мл с Малина
(181, 20, 9),  -- Айс Латте 300мл с Кокос
(182, 21, 1),  -- Айс Матча Латте 200мл с Растительным молоком
(183, 21, 2),  -- Айс Матча Латте 200мл с Ваниль
(184, 21, 3),  -- Айс Матча Латте 200мл с Соленая карамель
(185, 21, 4),  -- Айс Матча Латте 200мл с Карамель
(186, 21, 5),  -- Айс Матча Латте 200мл с Лесной орех
(187, 21, 6),  -- Айс Матча Латте 200мл с Банан
(188, 21, 7),  -- Айс Матча Латте 200мл с Манго
(189, 21, 8),  -- Айс Матча Латте 200мл с Малина
(190, 21, 9),  -- Айс Матча Латте 200мл с Кокос
(191, 22, 1),  -- Айс Матча Латте 300мл с Растительным молоком
(192, 22, 2),  -- Айс Матча Латте 300мл с Ваниль
(193, 22, 3),  -- Айс Матча Латте 300мл с Соленая карамель
(194, 22, 4),  -- Айс Матча Латте 300мл с Карамель
(195, 22, 5),  -- Айс Матча Латте 300мл с Лесной орех
(196, 22, 6),  -- Айс Матча Латте 300мл с Банан
(197, 22, 7),  -- Айс Матча Латте 300мл с Манго
(198, 22, 8),  -- Айс Матча Латте 300мл с Малина
(199, 22, 9),  -- Айс Матча Латте 300мл с Кокос
(200, 23, 1),  -- Эспрессо Тоник 200мл с Растительным молоком
(201, 23, 2),  -- Эспрессо Тоник 200мл с Ваниль
(202, 23, 3),  -- Эспрессо Тоник 200мл с Соленая карамель
(203, 23, 4),  -- Эспрессо Тоник 200мл с Карамель
(204, 23, 5),  -- Эспрессо Тоник 200мл с Лесной орех
(205, 23, 6),  -- Эспрессо Тоник 200мл с Банан
(206, 23, 7),  -- Эспрессо Тоник 200мл с Манго
(207, 23, 8),  -- Эспрессо Тоник 200мл с Малина
(208, 23, 9),  -- Эспрессо Тоник 200мл с Кокос
(209, 24, 1),  -- Матча Тоник 200мл с Растительным молоком
(210, 24, 2),  -- Матча Тоник 200мл с Ваниль
(211, 24, 3),  -- Матча Тоник 200мл с Соленая карамель
(212, 24, 4),  -- Матча Тоник 200мл с Карамель
(213, 24, 5),  -- Матча Тоник 200мл с Лесной орех
(214, 24, 6),  -- Матча Тоник 200мл с Банан
(215, 24, 7),  -- Матча Тоник 200мл с Манго
(216, 24, 8),  -- Матча Тоник 200мл с Малина
(217, 24, 9),  -- Матча Тоник 200мл с Кокос
(218, 25, 1),  -- Оранж Бамбл 200мл с Растительным молоком
(219, 25, 2),  -- Оранж Бамбл 200мл с Ваниль
(220, 25, 3),  -- Оранж Бамбл 200мл с Соленая карамель
(221, 25, 4),  -- Оранж Бамбл 200мл с Карамель
(222, 25, 5),  -- Оранж Бамбл 200мл с Лесной орех
(223, 25, 6),  -- Оранж Бамбл 200мл с Банан
(224, 25, 7),  -- Оранж Бамбл 200мл с Манго
(225, 25, 8),  -- Оранж Бамбл 200мл с Малина
(226, 25, 9),  -- Оранж Бамбл 200мл с Кокос
(227, 26, 1),  -- Матча Бамбл 200мл с Растительным молоком
(228, 26, 2),  -- Матча Бамбл 200мл с Ваниль
(229, 26, 3),  -- Матча Бамбл 200мл с Соленая карамель
(230, 26, 4),  -- Матча Бамбл 200мл с Карамель
(231, 26, 5),  -- Матча Бамбл 200мл с Лесной орех
(232, 26, 6),  -- Матча Бамбл 200мл с Банан
(233, 26, 7),  -- Матча Бамбл 200мл с Манго
(234, 26, 8),  -- Матча Бамбл 200мл с Малина
(235, 26, 9);  -- Матча Бамбл 200мл с Кокос

INSERT INTO CoffeeOrder (id, id_customer, data)
VALUES
(1, 1, '2024-10-11 10:00:00'),
(2, 2, '2024-10-12 12:30:00');


INSERT INTO order_goods (id, id_order, id_good)
VALUES
(1, 1, 1), -- Первый заказ (Кофе)
(2, 1, 2), -- Первый заказ (Чай)
(3, 2, 3); -- Второй заказ (Печенье)


SELECT * FROM Customer;
SELECT * FROM Goods;
select * from CoffeeOrder;
select * from order_goods;
select * from all_additives_to_coffee;
select * from add_to_coffee;
select * from volume_price;
  `;

  db.exec(createTablesSql, (err) => {
    if (err) {
      console.error('Error initializing database:', err.message);
    } else {
      console.log('Database initialized successfully.');
    }
    db.close();
  });
};

initDb();