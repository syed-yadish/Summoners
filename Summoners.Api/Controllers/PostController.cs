using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Summoners.Api.Models;
using Summoners.Api.Data;

namespace Summoners.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepo _repo;
        public PostController(IPostRepo repo)
        {
            _repo = repo;
        }

        // Unnecessary atm
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts()
        {
            var posts = await _repo.GetPosts();
            if (posts.Count() == 0)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        // GET: api/Post
        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts(string name)
        {
            var posts = await _repo.GetPostsForUser(name);

            return Ok(posts);
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments(int id)
        {
            var comments = await _repo.GetPostComments(id);

            return Ok(comments);
        }

        [HttpGet("comments/{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _repo.GetOneComment(id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // POST: api/Post/{name}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{name}")]
        public async Task<ActionResult<Post>> PostPost(string name, PostDTO postDTO)
        {
            var post = await _repo.CreatePost(name, postDTO);
            if (post == null)
            {
                return Problem("Post not created");
            }

            return Ok();
        }

         // POST: api/Post/{id}/comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}/comments")]
        public async Task<ActionResult<Post>> PostComment(int id, CommentDTO commentDTO)
        {

            if (id != commentDTO.PostId)
            {
                return BadRequest();
            }

            var comment = await _repo.CreateComment(id, commentDTO);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok();
        }
    
        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            _repo.DeleteOnePost(id);

            var post = await _repo.GetOnePost(id);

            if (post != null)
            {
                return Problem("Delete action failed");
            }

            return NoContent();
        }

        [HttpDelete("comments/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            _repo.DeleteOneComment(id);

            var comment = await _repo.GetOneComment(id);

            if (comment == null)
            {
                return NoContent();
            }

            return NoContent();
        }

    }
}
