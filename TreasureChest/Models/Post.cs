using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageLocation { get; set; }
        public int Price { get; set; }
        public int SellerId { get; set; }
        public DateTime PostDateTime { get; set; }
        public bool IsPurchased { get; set; }
        public int CategoryId { get; set; }
        public int BuyerId { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
    }
}
