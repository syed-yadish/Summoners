using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Summoners.Api.Models;

namespace Summoners.Api.Data;
public class PostRepo : IPostRepo
{
    private readonly SummonersContext _context;
    public PostRepo(SummonersContext context) => _context = context;
    public async Task<IEnumerable<Post>> GetPosts()
    {
        if (_context?.Posts == null)
        {
            return new List<Post>();
        }

        return await _context.Posts.ToListAsync();
    }

    public async Task<Post?> GetOnePost(int id)
    {
        return await _context.Posts.FindAsync(id);
    }

    public async Task<Comment?> GetOneComment(int id)
    {
        return await _context.Comments.FindAsync(id);
    }

    public async Task<IEnumerable<PostDTO>> GetPostsForUser(string name)
    {
        if (_context.Posts == null)
        {
            return new List<PostDTO>();
        }

        var user = await GetOrCreateUser(name);

        var posts = await _context.Posts
            .Where(c => c.UserId == user.Id)
            .ToListAsync();

        var postDTO = new List<PostDTO>();

        foreach (var p in posts)
        {
            postDTO.Add(
                new PostDTO
                {
                    PostId = p.Id,
                    Title = p.Title,
                    Description = p.Description
                });
        }

        return postDTO;
    }

    public async Task<IEnumerable<CommentDTO>> GetPostComments(int id)
    {
        if (_context.Comments == null)
        {
            return new List<CommentDTO>();
        }

        var comments =  await _context.Comments
            .Where(p => p.PostId == id)
            .ToListAsync();

        var commentDTO = new List<CommentDTO>();

        foreach(var c in comments)
        {
            commentDTO.Add(
                new CommentDTO
                {
                    Text = c.Text,
                    Author = c.Author,
                    PostId = c.PostId
                }
            );
        }

        return commentDTO;
    }

    public async Task<Post> CreatePost(string name, PostDTO postDTO)
    {
        var user = await GetOrCreateUser(name);

        var post = new Post
        {
            UserId = user.Id,
            Title = postDTO.Title,
            Description = postDTO.Description
        };

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return (post);
    }

    public async Task<Comment> CreateComment(int id, CommentDTO commentDTO)
    {
        if (!PostExists(id))
        {
            return null!;
        }

        var comment = new Comment
        {
            Author = commentDTO.Author,
            Text = commentDTO.Text,
            PostId = commentDTO.PostId
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return comment;
    }

    public void DeleteOnePost(int id)
    {
        if (_context.Posts == null)
        {
            return ;
        }

        var post = _context.Posts.Find(id);

        if (post == null)
        {
            return ;
        }

        _context.Posts.Remove(post);
        _context.SaveChangesAsync();

        return ;
    }

    public void DeleteOneComment(int id)
    {
        if (_context.Comments == null)
        {
            return ;
        }

        var comment = _context.Comments.Find(id);

        if (comment == null)
        {
            return ;
        }

        _context.Comments.Remove(comment);
        _context.SaveChangesAsync();

        return ;
    }

    private async Task<User> GetOrCreateUser(string summonerName)
    {
        var user = await _context.Users
            .Where(c => c.SummonerName == summonerName)
            .SingleOrDefaultAsync();

        if (_context.Users.Count() == 0 || user == null)
        {
            var newUser = new User
            {
                SummonerName = summonerName
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            user = newUser;
        }

        return user;
    }

    private bool PostExists(int id)
    {
        return (_context.Posts?.Any(e => e.Id == id)).GetValueOrDefault();
    }


}