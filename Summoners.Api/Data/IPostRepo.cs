using Summoners.Api.Models;

namespace Summoners.Api.Data;

public interface IPostRepo
{
    Task<IEnumerable<Post>> GetPosts();
    Task<Post?> GetOnePost(int id);
    Task<Comment?> GetOneComment(int id);
    Task<IEnumerable<PostDTO>> GetPostsForUser(string name);
    Task<IEnumerable<CommentDTO>> GetPostComments(int id);
    Task<Post> CreatePost(string name, PostDTO postDTO);
    Task<Comment> CreateComment(int id, CommentDTO commentDTO);
    void DeleteOnePost(int id);
    void DeleteOneComment(int id);
}