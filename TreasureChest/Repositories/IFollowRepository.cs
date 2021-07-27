using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IFollowRepository
    {
        public List<Follow> GetAllFollows();
        public List<Follow> GetAllFollowsByUserId(int id);
        public void Add(Follow follow);
        public void Delete(int id);
    }
}