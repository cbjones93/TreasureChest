using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IFavoriteRepository
    {
        List<Favorite> GetAllFavorites();
        public List<Favorite> GetAllFavoritesByUserId(int userId);
    }
}