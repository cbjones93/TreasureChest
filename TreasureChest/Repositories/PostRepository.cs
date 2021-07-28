using Microsoft.Extensions.Configuration;
using TreasureChest.Utils;
using TreasureChest.Models;
using System.Collections.Generic;
using System.Linq;

namespace TreasureChest.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetPostsByCategoryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id as postId, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.SellerId, p.IsPurchased, u.id as userId, u.firstname, u.lastname, c.id as CatId, c.[name] as categoryName FROM Posts P 
                        LEFT JOIN Users u on p.sellerid = u.id
                        LEFT JOIN Categories c on p.CategoryId = c.id 
                        WHERE c.id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);


                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "postId"),
                            Name = DbUtils.GetString(reader, "postName"),
                            Description = DbUtils.GetString(reader, "description"),
                            ImageLocation = DbUtils.GetString(reader, "imagelocation"),
                            Price = DbUtils.GetInt(reader, "price"),
                            SellerId = DbUtils.GetInt(reader, "sellerId"),
                            PostDateTime = DbUtils.GetDateTime(reader, "postdatetime"),
                            IsPurchased = reader.GetBoolean(reader.GetOrdinal("ispurchased")),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "catId"),
                                Name = DbUtils.GetString(reader, "categoryName")
                            },
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                FirstName = DbUtils.GetString(reader, "firstname"),
                                LastName = DbUtils.GetString(reader, "lastname")
                            },


                        });
                    }
                    reader.Close();
                    return posts;
                }
            }
        }
        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT p.Id as Id, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.SellerId, p.IsPurchased, p.BuyerId, u.id as userId, u.firstname, u.lastname, c.id as CatId, c.[name] as categoryName FROM Posts P 
                        LEFT JOIN Users u on p.sellerid = u.id
                        LEFT JOIN Categories c on p.CategoryId = c.id 
                        WHERE p.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    Post post = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "postName"),
                            Description = DbUtils.GetString(reader, "description"),
                            ImageLocation = DbUtils.GetString(reader, "imagelocation"),
                            Price = DbUtils.GetInt(reader, "price"),
                            SellerId = DbUtils.GetInt(reader, "sellerId"),
                            PostDateTime = DbUtils.GetDateTime(reader, "postdatetime"),
                            IsPurchased = reader.GetBoolean(reader.GetOrdinal("ispurchased")),
                            BuyerId = DbUtils.GetInt(reader, "buyerid"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "catId"),
                                Name = DbUtils.GetString(reader, "categoryName")
                            },
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                FirstName = DbUtils.GetString(reader, "firstname"),
                                LastName = DbUtils.GetString(reader, "lastname")
                            },


                        };
                    }
                    reader.Close();
                    return post;
                }

            }

        }

        public void AddPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO POSTS ([Name], [Description], ImageLocation, Price, SellerId, PostDateTime, IsPurchased, CategoryId)
                                    OUTPUT INSERTED.ID
                                    VALUES (@Name, @Description, @ImageLocation, @Price, @SellerId, @PostDateTime, 0, @CategoryId)";
                    DbUtils.AddParameter(cmd, "@Name", post.Name);
                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Price", post.Price);
                    DbUtils.AddParameter(cmd, "@SellerId", post.SellerId);
                    DbUtils.AddParameter(cmd, "@PostDateTime", post.PostDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id as Id, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.IsPurchased, p.buyerId, u.id as userId, u.firstname, u.lastname, c.id as CatId, c.[name] as categoryName FROM Posts P 
                        LEFT JOIN Users u on p.sellerid = u.id
                        LEFT JOIN Categories c on p.CategoryId = c.id";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "postName"),
                            Description = DbUtils.GetString(reader, "description"),
                            ImageLocation = DbUtils.GetString(reader, "imagelocation"),
                            Price = DbUtils.GetInt(reader, "price"),
                            PostDateTime = DbUtils.GetDateTime(reader, "postdatetime"),
                            IsPurchased = reader.GetBoolean(reader.GetOrdinal("ispurchased")),
                            BuyerId = DbUtils.GetInt(reader, "buyerid"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "catId"),
                                Name = DbUtils.GetString(reader, "categoryName")
                            },
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                FirstName = DbUtils.GetString(reader, "firstname"),
                                LastName = DbUtils.GetString(reader, "lastname")
                            },
                        });

                    }
                    reader.Close();
                    return posts;
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE POSTS
                                        SET IsPurchased = 1
                                        WHERE Id = @id
                                        ";
                    //DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        public List<Post> GetPostsByUser(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id as Id, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.IsPurchased, u.id as userId, u.firstname, u.lastname u.firebaseUserId, c.id as CatId, c.[name] as categoryName FROM Posts P 
                        LEFT JOIN Users u on p.sellerid = u.id
                        LEFT JOIN Categories c on p.CategoryId = c.id
                        WHERE firebaseuserId = @firebaseuserid AND p.isPurchased = 0
                        ORDER BY p.PostDateTime DESC";
                    DbUtils.AddParameter(cmd, "@firebaseuserid", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "postName"),
                            Description = DbUtils.GetString(reader, "description"),
                            ImageLocation = DbUtils.GetString(reader, "imagelocation"),
                            Price = DbUtils.GetInt(reader, "price"),
                            PostDateTime = DbUtils.GetDateTime(reader, "postdatetime"),
                            IsPurchased = reader.GetBoolean(reader.GetOrdinal("ispurchased")),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "catId"),
                                Name = DbUtils.GetString(reader, "categoryName")
                            },
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                FirstName = DbUtils.GetString(reader, "firstname"),
                                LastName = DbUtils.GetString(reader, "lastname")
                            },
                        });

                    }
                    reader.Close();
                    return posts;
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE Posts
                                SET [Name] = @name,
                                    Description = @description,
                                    ImageLocation = @imageLocation,
                                    Price = @price,
                                    CategoryId = @categoryId
                                WHERE Id =@id";
                    DbUtils.AddParameter(cmd, "@name", post.Name);
                    DbUtils.AddParameter(cmd, "@id", post.Id);
                    DbUtils.AddParameter(cmd, "@description", post.Description);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@price", post.Price);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void BuyItem(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE Posts
                                SET isPurchased = 'True',
                                    buyerId = @buyerid
                                WHERE Id =@id";
                    DbUtils.AddParameter(cmd, "@id", post.Id);
                    DbUtils.AddParameter(cmd, "@buyerId", post.BuyerId);
                    DbUtils.AddParameter(cmd, "@isPurchased", post.IsPurchased);

                    cmd.ExecuteNonQuery();

                }
            }

        }
        public List<Post> Search(string criterion, bool sortDescending)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    var sql = @"
                           SELECT p.Id as postId, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.SellerId, p.IsPurchased, u.id as userId, u.firstname, u.lastname, c.id as CatId, c.[name] as categoryName FROM Posts P 
                        LEFT JOIN Users u on p.sellerid = u.id
                        LEFT JOIN Categories c on p.CategoryId = c.id 
                        WHERE p.[name] LIKE @Criterion or c.[name] LIKE @Criterion or p.[Description] LIKE @Criterion or u.FirstName like @Criterion or u.LastName like @Criterion";

                    if (sortDescending)
                    {
                        sql += " ORDER BY p.PostDateTime DESC";
                    }
                    else
                    {
                        sql += " ORDER BY p.PostDateTime";
                    }
                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        var postId = DbUtils.GetInt(reader, "postId");
                        var existingPost = posts.FirstOrDefault(posts => posts.Id == postId);
                        if (existingPost == null)
                        {
                            existingPost = new Post()
                            {
                                Id = postId,
                                Name = DbUtils.GetString(reader, "postName"),
                                Description = DbUtils.GetString(reader, "description"),
                                ImageLocation = DbUtils.GetString(reader, "imagelocation"),
                                Price = DbUtils.GetInt(reader, "price"),
                                PostDateTime = DbUtils.GetDateTime(reader, "postdatetime"),
                                IsPurchased = reader.GetBoolean(reader.GetOrdinal("ispurchased")),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "catId"),
                                    Name = DbUtils.GetString(reader, "categoryName")
                                },
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "userId"),
                                    FirstName = DbUtils.GetString(reader, "firstname"),
                                    LastName = DbUtils.GetString(reader, "lastname")
                                },
                            };
                            posts.Add(existingPost);
                        }
                    }
                    reader.Close();
                    return posts;
                }

            }
        }
    }
}

