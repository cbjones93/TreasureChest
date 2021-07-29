using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IFavoriteRepository
    {
        List<Favorite> GetAllFavorites();
        public List<Favorite> GetAllFavoritesByUserId(int userId);
        public void AddFavorite(Favorite favorite);
        public void Delete(int id);
    }
}