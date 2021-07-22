using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IPostRepository
    {
        public Post GetPostById(int id);
    }
}
