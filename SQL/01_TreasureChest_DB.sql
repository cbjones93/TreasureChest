USE [master]

IF db_id('TreasureChest') IS NULL
    CREATE DATABASE[TreasureChest]
GO

USE [TreasureChest]
GO

DROP TABLE IF EXISTS [Follow];
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Favorites];
DROP TABLE IF EXISTS [Items];
DROP TABLE IF EXISTS [Categories];
GO

CREATE TABLE [Follow] (
    [Id] integer PRIMARY KEY IDENTITY,
    [CurrentUserId] integer NOT NULL,
    [UserId] integer NOT NULL
)

CREATE TABLE [Users] (
    [Id] integer PRIMARY KEY IDENTITY,
    [FirebaseUserId] NVARCHAR(28) NOT NULL,
    [FirstName] nvarchar(50) NOT NULL,
    [LastName] nvarchar(50) NOT NULL,
    [Email] nvarchar(555) NOT NULL,
    [Address] nvarchar(555) NOT NULL,
    [CreateDateTime] datetime NOT NULL,
    [ImageLocation] nvarchar(255)

     CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Favorites] (
    [Id] integer PRIMARY KEY IDENTITY,
    [ItemId] integer NOT NULL,
    [UserId] integer NOT NULL
)

CREATE TABLE [Items] (
     [Id] integer PRIMARY KEY IDENTITY,
     [Name] nvarchar(50) NOT NULL,
     [Description] text NOT NULL,
)