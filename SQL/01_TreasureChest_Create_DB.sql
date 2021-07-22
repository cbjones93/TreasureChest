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
    [UserId] integer NOT NULL,
)
GO

CREATE TABLE [Users] (
    [Id] integer PRIMARY KEY IDENTITY,
    [FirebaseUserId] NVARCHAR(28) NOT NULL,
    [FirstName] nvarchar(50) NOT NULL,
    [LastName] nvarchar(50) NOT NULL,
    [Email] nvarchar(555) NOT NULL,
    [Address] nvarchar(555) NOT NULL,
    [CreateDateTime] datetime NOT NULL,
    [ImageLocation] nvarchar(255),

     CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO
CREATE TABLE [Items] (
     [Id] integer PRIMARY KEY IDENTITY,
     [Name] nvarchar(50) NOT NULL,
     [Description] text NOT NULL,
     [ImageLocation] nvarchar(255),
     [Price] integer NOT NULL,
     [SellerId] integer NOT NULL,
     [PostDateTime] datetime NOT NULL,
     [IsPurchased] bit default(0) not null,
     [CategoryId] Integer NOT NULL 
     CONSTRAINT [FK_Items_Users] FOREIGN KEY ([SellerId]) REFERENCES [Users] ([Id])
)
GO
CREATE TABLE [Favorites] (
    [Id] integer PRIMARY KEY IDENTITY,
    [ItemId] integer NOT NULL,
    [UserId] integer NOT NULL,
    CONSTRAINT [FK_Favorites_Items] FOREIGN KEY ([ItemId]) REFERENCES [Items] ([Id]),
    CONSTRAINT [FK_Favorites_Users] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])

)
CREATE TABLE [Categories] (
  [id] integer PRIMARY KEY IDENTITY,
  [name]  nvarchar(50) NOT NULL,
)




GO
ALTER TABLE [Items]
Add FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id])
GO
ALTER TABLE [Follow] ADD FOREIGN KEY ([CurrentUserId]) REFERENCES [Users] ([Id])
ALTER TABLE [Follow] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO