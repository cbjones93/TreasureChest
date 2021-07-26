using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class Follow
    {
        public int Id { get; set; }
        public int currentUserId { get; set; }
        public int userId { get; set; }

        public User user { get; set; }
    }
}
