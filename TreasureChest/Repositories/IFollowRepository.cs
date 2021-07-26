using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IFollowRepository
    {
        List<Follow> GetAllFollows();
    }
}