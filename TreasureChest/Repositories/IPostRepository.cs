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
        public List<Post> GetAllPosts();
        public void AddPost(Post post);
        public void Update(Post post);
        public void Delete(int id);
        public List<Post> GetPostsByUser(string firebaseUserId);
    }
}
