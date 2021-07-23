using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreasureChest.Models;
using TreasureChest.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TreasureChest.Controllers
{     

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    // GET: api/<UserController>
   
    [HttpGet("firebase/{firebaseUserId}")]
    public IActionResult GetByFirebaseUserId(string firebaseUserId)
    {
        var userProfile = _userRepository.GetByFirebaseId(firebaseUserId);
        if (userProfile == null)
        {
            return NotFound();
        }
        return Ok(userProfile);
    }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Register(User user)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
           _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = user.FirebaseUserId }, user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<UserController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
}
