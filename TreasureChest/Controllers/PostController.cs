using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TreasureChest.Models;
using TreasureChest.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TreasureChest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;
        public PostController(IPostRepository postRepository, IUserRepository userRepository)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
        }
        // GET: api/<PostController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            return Ok(post);
        }
        [HttpGet("GetCategory/{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var post = _postRepository.GetPostsByCategoryId(id);
            return Ok(post);
        }

        [HttpGet("myPosts/")]
        public IActionResult GetPostsByUser()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var posts = _postRepository.GetPostsByUser(currentUserProfileId);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_postRepository.Search(q, sortDesc));
        }



        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            post.SellerId = currentUserProfile.Id;
            post.PostDateTime = DateTime.Now;
            _postRepository.AddPost(post);
            return CreatedAtAction(nameof(GetAll), new { id = post.Id }, post);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            _postRepository.Update(post);
            return NoContent();
        }

        [HttpPut("buyitem/{id}")]
        public IActionResult BuyItem(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            var currentUserProfile = GetCurrentUserProfile();
            post.BuyerId = currentUserProfile.Id;
            _postRepository.BuyItem(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            _postRepository.Delete(id);
            return NoContent();
        }

        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }
        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
