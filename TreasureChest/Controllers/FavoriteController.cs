using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IUserRepository _userRepository;
        public FavoriteController(IFavoriteRepository favoriteRepository, IUserRepository userRepository)
        {
            _favoriteRepository = favoriteRepository;
            _userRepository = userRepository;
        }
        // GET: api/<FavoriteController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_favoriteRepository.GetAllFavorites());
        }

        // GET api/<FavoriteController>/5
        [HttpGet("favoritesbyuser/{id}")]
        public IActionResult GetFavoritesByUser(int id)
        {
            var favorites = _favoriteRepository.GetAllFavoritesByUserId(id);
            if (favorites == null)
            {
                return NotFound();

            }
            return Ok(favorites);
        }

        // POST api/<FavoriteController>
        [HttpPost]
        public IActionResult Post(Favorite favorite)
        {
            var currentUserProfile = GetCurrentUserProfile();
            favorite.UserId = currentUserProfile.Id;
            _favoriteRepository.AddFavorite(favorite);
            return CreatedAtAction(nameof(GetAll), new { id = favorite.Id }, favorite);
        }

        // PUT api/<FavoriteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FavoriteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _favoriteRepository.Delete(id);
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
