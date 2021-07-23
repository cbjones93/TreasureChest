using Microsoft.Extensions.Configuration;
using TreasureChest.Utils;
using TreasureChest.Models;
using System.Collections.Generic;

namespace TreasureChest.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id as Id, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.IsPurchased, u.id as userId, u.firstname, u.lastname, c.id as CatId, c.[name] as categoryName FROM Posts P 
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
                    }
                    reader.Close();
                    return post;
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
                    SELECT p.Id as Id, p.[name] as postName, p.description, p.ImageLocation, p.Price, p.PostDateTime, p.IsPurchased, u.id as userId, u.firstname, u.lastname, c.id as CatId, c.[name] as categoryName FROM Posts P 
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
    }
}
