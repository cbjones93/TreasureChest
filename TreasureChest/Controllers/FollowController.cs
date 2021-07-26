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
    public class FollowController : ControllerBase
    {
        private readonly IFollowRepository _followRepository;
        private readonly IUserRepository _userRepository;

        public FollowController(IFollowRepository followRepository, IUserRepository userRepository)
        {
            _followRepository = followRepository;
            _userRepository = userRepository;
        }
        // GET: api/<FollowController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_followRepository.GetAllFollows());
        }

        // GET api/<FollowController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FollowController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FollowController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FollowController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
