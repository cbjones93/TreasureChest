USE [TreasureChest]
GO

set identity_insert [Users] on
insert into Users (Id, FirebaseUserId,FirstName, LastName, Email, Address, CreateDateTime, ImageLocation) VALUES (1,'1','Foo', 'Barington', 'foo@bar.com','106 Larry Dr' ,'2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set1');
insert into Users (Id, FirebaseUserId, FirstName, LastName, Email, Address, CreateDateTime, ImageLocation) VALUES (2,'2','Reina', 'Sandiwth', 'rsandwith0@google.com','110 Simpson Lane' ,'2020-05-16', 'https://robohash.org/numquamutut.png?size=150x150&set=set1');
insert into Users (Id, FirebaseUserId, FirstName, LastName, Email, Address, CreateDateTime, ImageLocation) VALUES (3,'3','Arnold', 'Otton', 'aotton2@ow.lyx','525 Chairman St' ,'2020-01-07', 'https://robohash.org/numquamutut.png?size=150x150&set=set1');
set identity_insert [Users] off 


set identity_insert [Categories] on
insert into Categories (Id, [name]) VALUES (1, 'Graphics Card')
set identity_insert [Categories] off

set identity_insert [Items] on
insert into Items (Id, [Name], [Description], ImageLocation, Price, SellerId, PostDateTime, IsPurchased, CategoryId)
VALUES (1, 'Nvidia GeForce RTX 3060 Ti', 'The newest arrival in the RTX 3000 line, this graphics card punches way above its weight class, delivering a performance that could rival that of the RTX 2080 Super while keeping its price tag incredibly affordable for most people. ', 'https://cdn.mos.cms.futurecdn.net/6RiCbrdcuWnNdFeK5isqrh-970-80.jpg.webp', 890,1, '2020-05-11', 'false', 1)
set identity_insert [Items] off

set identity_insert [Favorites] on
insert into Favorites (Id, ItemId, UserId) VALUES (1,1,1)
set identity_insert [Favorites] off

set identity_insert [Follow] on
insert into Follow(Id, CurrentUserId , UserId) VALUES (1,1,2)
set identity_insert [Follow] off