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
        public IActionResult Get(int id)
        {
            var follow = _followRepository.GetAllFollowsByUserId(id);
            return Ok(follow);
        }

        // POST api/<FollowController>
        [HttpPost]
        public IActionResult Post(Follow follow)
        {
            var currentUserProfile = GetCurrentUserProfile();
            follow.currentUserId = currentUserProfile.Id;
            _followRepository.Add(follow);
            return CreatedAtAction(nameof(GetAll), new { id = follow.Id }, follow);
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
            _followRepository.Delete(id);
           
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
