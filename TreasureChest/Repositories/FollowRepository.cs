using Microsoft.Extensions.Configuration;
using TreasureChest.Utils;
using TreasureChest.Models;
using System.Collections.Generic;

namespace TreasureChest.Repositories
{
    public class FollowRepository : BaseRepository, IFollowRepository
    {
        public FollowRepository(IConfiguration configuration) : base(configuration) { }

        public List<Follow> GetAllFollows()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.id as followUserId, u.firstname, u.lastname, u.email, u.address, u.imagelocation, f.id, f.currentuserid, f.userid from Users u
                        LEFT JOIN follow f on f.userid = u.id
                        WHERE u.id = f.UserId";
                    var reader = cmd.ExecuteReader();
                    var follows = new List<Follow>();
                    while(reader.Read())
                    {
                        follows.Add(new Follow()
                        { 
                            Id = DbUtils.GetInt(reader, "Id"),
                            currentUserId = DbUtils.GetInt(reader, "currentUserId"),
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "followUserId"),
                                FirstName = DbUtils.GetString(reader, "firstname"),
                                LastName = DbUtils.GetString(reader, "lastname"),
                                Email = DbUtils.GetString(reader, "email"),
                                Address = DbUtils.GetString(reader, "address"),
                                ImageLocation = DbUtils.GetString(reader, "imagelocation")

                            }
                        });

                    }
                    reader.Close();
                    return follows;
                }
            }

        }
    }
}
