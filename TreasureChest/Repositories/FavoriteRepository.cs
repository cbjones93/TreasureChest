using Microsoft.Extensions.Configuration;
using TreasureChest.Utils;
using TreasureChest.Models;
using System.Collections.Generic;

namespace TreasureChest.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Favorite> GetAllFavorites()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT id, ItemId, UserId FROM FAVORITES";

                    var reader = cmd.ExecuteReader();
                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ItemId = DbUtils.GetInt(reader, "ItemId"),
                            UserId = DbUtils.GetInt(reader, "UserId")
                        });
                    }
                    reader.Close();
                    return favorites;
                }
            }
        }
        public List<Favorite> GetAllFavoritesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT f.id, f.ItemId, f.UserId,  u.firstName, u.LastName, p.id as postId, p.[name], p.IsPurchased, p.imageLocation, p.postdatetime FROM FAVORITES f
                            LEFT JOIN Users u on f.UserId = u.id
                            LEFT JOIN Posts p on f.ItemId = p.id
                            WHERE f.UserId = @userId AND p.IsPurchased = 0
                            ORDER BY p.PostDateTime DESC";
                    DbUtils.AddParameter(cmd, "userId", userId);
                    var reader = cmd.ExecuteReader();

                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            ItemId = DbUtils.GetInt(reader, "ItemId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName")
                            },
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "postId"),
                                Name = DbUtils.GetString(reader, "name"),
                                IsPurchased = reader.GetBoolean(reader.GetOrdinal("isPurchased")),
                                PostDateTime= DbUtils.GetDateTime(reader, "postdatetime"),
                                ImageLocation=DbUtils.GetString(reader, "imageLocation")
                            }
                        });
                    }
                    reader.Close();
                    return favorites;

                }
            }
        }
    }
}
