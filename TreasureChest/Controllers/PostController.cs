using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreasureChest.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TreasureChest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
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

        // POST api/<PostController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
