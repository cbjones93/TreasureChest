using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public Post Post { get; set; }
    }
}
