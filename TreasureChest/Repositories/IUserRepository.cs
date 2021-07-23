using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IUserRepository
    {
        public User GetByFirebaseId(string firebaseUserId);
        public User GetById(int id);
        public void Add(User user);
    }
}
