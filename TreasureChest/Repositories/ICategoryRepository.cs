using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
    }
}