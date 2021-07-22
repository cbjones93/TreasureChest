using Microsoft.Extensions.Configuration;
using TreasureChest.Utils;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT u.id, u.firebaseuserid, u.firstname, u.lastname, u.email, u.address, u.createdatetime, u.imagelocation FROM users u WHERE firebaseuserid = @firebaseuserid";

                    DbUtils.AddParameter(cmd, "@firebaseuserid", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseUserId = DbUtils.GetString(reader, "firebaseuserid"),
                            FirstName = DbUtils.GetString(reader, "firstname"),
                            LastName = DbUtils.GetString(reader, "lastname"),
                            Email = DbUtils.GetString(reader, "email"),
                            Address = DbUtils.GetString(reader, "address"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "createdatetime"),
                            ImageLocation = DbUtils.GetString(reader, "imagelocation")
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }
        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firstname, lastname, email, address, createdatetime, imagelocation FROM USERS WHERE id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    User user = null;
                    var reader = cmd.ExecuteReader();
                    if(reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "firstname"),
                            LastName = DbUtils.GetString(reader, "lastname"),
                            Email = DbUtils.GetString(reader, "email"),
                            Address = DbUtils.GetString(reader, "address"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "createdatetime"),
                            ImageLocation = DbUtils.GetString(reader, "imagelocation")
                        };
                    }
                    reader.Close();
                    return user;
                }
            }

        }
    }
}
