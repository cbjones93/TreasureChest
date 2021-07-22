﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FirebaseUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public DateTime CreateDateTime { get; set; }

        public string ImageLocation { get; set; }
    }
}
